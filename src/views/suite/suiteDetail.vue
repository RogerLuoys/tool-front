<template>
  <div>
    <el-row style="height: 15px">
      <el-col :span="10">
        <span>编辑测试集</span>
      </el-col>
      <el-col :span="13" style="text-align: right">
        <el-dropdown split-button type="primary" @click="use(false)" @command="suiteSetting" size="mini" style="float:right">
          执行套件
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="retry">批量重试</el-dropdown-item>
              <el-dropdown-item command="reset">重置套件</el-dropdown-item>
              <el-dropdown-item command="delete">删除套件</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
    <!--基本信息-->
    <el-divider content-position="right"></el-divider>
    <el-form :model="pageData" label-width="90px" size="small">
      <el-form-item label="标题">
        <el-input v-model="pageData.name" @change="update" placeholder="请输入标题" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="pageData.description" @change="update" placeholder="请描述功能和实现方法" type="textarea" maxlength="200"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="执行环境">
        <el-radio v-model="pageData.slaveType" :label="1">localhost</el-radio>
        <el-radio v-model="pageData.slaveType" :label="2">任意机器</el-radio>
        <el-radio v-model="pageData.slaveType" :label="3">指定机器</el-radio>
        <div v-if="pageData.slaveType===3">
          <el-select v-model="pageData.slaveList" @change="assignSlave" filterable multiple placeholder="请选择要指定的机器">
            <el-option
              v-for="item in pageControl.options"
              :key="item.resourceId"
              :label="item.resourceName"
              :value="item.resourceName">
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <!--用例列表-->
      <el-divider content-position="right">
        <span>用例列表</span>
        <el-tooltip class="item" effect="dark" content="点编号可进入用例详情，点标题可进入关联设置，失败用例可单个重试" placement="top-start">
          <i class="el-icon-info"></i>
        </el-tooltip>
        <el-divider direction="vertical"></el-divider>
        <el-dropdown @command="relateSetting" size="mini">
          <span style="cursor: pointer; color: #409EFF">
            关联用例<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="singleRelate">单个关联</el-dropdown-item>
              <el-dropdown-item command="batchRelate">批量关联</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-divider>
      <div v-if="pageControl.isRelatedCase">
        <el-input v-model="pageControl.relatedCaseId" size="small" placeholder="请输入要关联的用例编号"
                  maxlength="20" show-word-limit>
          <template #append>
            <el-button @click="createRelatedCase()" type="primary" size="small">确认</el-button>
            <el-button @click="pageControl.isRelatedCase=false" size="small">取消</el-button>
          </template>
        </el-input>
      </div>
      <div v-else-if="pageControl.isBatchRelatedCase">
        <el-input v-model="pageControl.relatedCaseName" size="small" placeholder="请输入用例名(将模糊匹配)"
                  maxlength="20" show-word-limit>
          <template #append>
            <el-button @click="batchRelatedCase()" type="primary" size="small">确认</el-button>
            <el-button @click="pageControl.isBatchRelatedCase=false" size="small">取消</el-button>
          </template>
        </el-input>
      </div>
      <el-table :data="pageData.relatedCase.list" size="mini" style="width: 100%">
        <el-table-column label="编号" width="140">
          <template slot-scope="scope">
            <el-link @click="editCase(scope.row.caseId)" :underline="false" type="primary">
              {{scope.row.autoCase.caseId}}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="标题" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-link @click="editRelatedCase(scope.row)" :underline="false" type="primary">
              {{scope.row.autoCase.name}}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="优先级" width="90">
          <template slot-scope="scope">
            {{scope.row.sequence}}
          </template>
        </el-table-column>
        <el-table-column label="结果" width="130">
          <template slot-scope="scope">
            <el-tag size="small">{{ getStatus(scope.row.status) }}</el-tag>
            <el-link v-if="scope.row.status === 2" @click="useSingle(scope.row)" :underline="false" type="danger">
              重试
            </el-link>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination layout="prev, pager, next" @current-change="queryDetail()" :current-page.sync="pageControl.search.pageIndex"
                     :total="pageData.relatedCase.total" small style="float: right">
      </el-pagination>
    </el-form>
    <!--其它弹窗-->
    <!--编辑用例-->
    <el-drawer :visible.sync="pageControl.isEditCase" title="编辑用例" :with-header="false" size="55%" append-to-body>
      <el-card style="min-height: 100%">
        <tl-case-detail v-if="pageControl.isEditCase" :case-id="pageControl.selectedCaseId" :visible.sync="pageControl.isEditCase"></tl-case-detail>
      </el-card>
    </el-drawer>
    <!--编辑关联设置-->
    <el-dialog :visible.sync="pageControl.isEditRelatedCase" title="编辑关联设置" append-to-body>
      <el-form :model="pageControl.selectedSuiteCase" label-width="90px" size="small">
        <el-form-item label="用例名">
          {{pageControl.selectedSuiteCase.autoCase.name}}
        </el-form-item>
        <el-form-item label="优先级">
          <el-input-number v-model="pageControl.selectedSuiteCase.sequence" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="执行结果">
          <el-radio-group v-model="pageControl.selectedSuiteCase.status" size="small">
            <el-radio :label="1">未开始</el-radio>
            <el-radio :label="2">失败</el-radio>
            <el-radio :label="3">通过</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button @click="updateRelatedCase" type="primary" size="small">保存设置</el-button>
        <el-button @click="removeRelatedCase(pageControl.selectedSuiteCase.caseId)" type="primary" size="small">删除关联</el-button>
      </div>
    </el-dialog>
    <!--重试确认-->
    <el-dialog :visible.sync="pageControl.isRetry" title="提示" width="30%" append-to-body>
      <div style="text-align: center">确认重试套件中所有未成功的用例？</div>
      <div style="height: 30px;"></div>
      <div style="text-align: center">
        <el-button @click="use(true)" type="primary" size="small">确定</el-button>
        <el-button @click="pageControl.isRetry=false" size="small">取消</el-button>
      </div>
    </el-dialog>
    <!--重置确认-->
    <el-dialog :visible.sync="pageControl.isReset" title="提示" width="30%" append-to-body>
      <div style="text-align: center">确认重置套件状态？重置后套件内所有用例状态也将置为未执行</div>
      <div style="height: 30px;"></div>
      <div style="text-align: center">
        <el-button @click="reset" type="primary" size="small">确定</el-button>
        <el-button @click="pageControl.isReset=false" size="small">取消</el-button>
      </div>
    </el-dialog>
    <!--删除确认-->
    <el-dialog :visible.sync="pageControl.isDelete" title="提示" width="30%" append-to-body>
      <div style="text-align: center">确认重置删除套件？只删除套件与用例的关联关系，用例本身不受影响</div>
      <div style="height: 30px;"></div>
      <div style="text-align: center">
        <el-button @click="remove" type="primary" size="small">确定</el-button>
        <el-button @click="pageControl.isDelete=false" size="small">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tlCaseDetail from '../automation/caseDetail'
import {createAPI, createRelatedCaseAPI, batchRelatedCaseAPI, updateAPI, useSingleAPI, updateRelatedCaseAPI, resetAPI, removeAPI, removeRelatedCaseAPI, queryDetailAPI, useAPI} from '@/api/autoSuite'

export default {
  components: {tlCaseDetail},
  props: {
    suiteId: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      pageData: {
        suiteId: 0,
        name: '',
        slaveType: 3,
        slaveList: [],
        description: '',
        environment: '',
        passed: 0,
        failed: 0,
        status: 1,
        relatedCase: {
          list: [{
            caseId: '',
            status: 1,
            sequence: 999,
            autoCase: {
              caseId: '',
              name: 'name',
              environment: '',
              type: 1,
              status: 1
            }
          }],
          total: 0
        }
      },
      pageControl: {
        isRelatedCase: false, // 控制单个关联用例控件显示
        isBatchRelatedCase: false, // 控制批量关联用例控件显示
        isEditRelatedCase: false, // 控制设置用例状态弹窗
        isEditCase: false, // 控制编辑用例抽屉
        isRetry: false, // 控制重试失败用例弹窗
        isReset: false, // 控制重置套件弹窗
        isDelete: false, // 控制删除套件弹窗
        relatedCaseId: '',
        relatedCaseName: '',
        // selectedSequence: '',
        selectedCaseId: '',
        selectedSuiteCase: {
          suiteId: '',
          caseId: '',
          sequence: 999,
          status: 1,
          autoCase: {
            caseId: '',
            name: 'name',
            environment: '',
            type: 1,
            status: 1
          }
        },
        options: [{
          resourceId: 1,
          resourceName: 'test1'
        }, {
          resourceId: 2,
          resourceName: 'test2'
        }],
        search: {
          pageIndex: 1
        }
      }
    }
  },
  watch: {
    suiteId: function (newVal, oldVal) {
      if (this.isEdit) {
        this.queryDetail()
      }
    }
  },
  created: function () {
    console.info('created')
    if (this.isEdit) {
      this.queryDetail()
    }
  },
  methods: {
    getStatus (status) {
      switch (status) {
        case 1:
          return '未执行'
        case 2:
          return '失败'
        case 3:
          return '通过'
        default:
          return '未知'
      }
    },
    assignSlave (id) {
      // for (let i = 0; i < this.pageControl.options.length; i++) {
      //   if (this.pageControl.options[i].methodId === id) {
      //     this.pageData.methodName = this.pageControl.options[i].methodName
      //     break
      //   }
      // }
    },
    relateSetting (command) {
      switch (command) {
        case 'singleRelate':
          this.pageControl.isBatchRelatedCase = false
          this.pageControl.isRelatedCase = true
          break
        case 'batchRelate':
          this.pageControl.isRelatedCase = false
          this.pageControl.isBatchRelatedCase = true
      }
    },
    suiteSetting (command) {
      switch (command) {
        case 'retry':
          this.pageControl.isRetry = true
          break
        case 'reset':
          this.pageControl.isReset = true
          break
        case 'delete':
          this.pageControl.isDelete = true
          break
      }
    },
    save () {
      if (this.isEdit) {
        this.update()
      } else {
        this.create()
      }
    },
    create () {
      createAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.queryDetail()
          this.$message.success('创建用例成功')
        }
      })
    },
    createRelatedCase () {
      createRelatedCaseAPI({
        suiteId: this.pageData.suiteId,
        caseId: this.pageControl.relatedCaseId
      }).then(response => {
        if (response.data.success === true) {
          this.queryDetail()
          this.pageControl.isRelatedCase = false
          this.$message.success('关联用例成功')
        }
      })
    },
    batchRelatedCase () {
      batchRelatedCaseAPI({
        suiteId: this.pageData.suiteId,
        caseName: this.pageControl.relatedCaseName
      }).then(response => {
        if (response.data.success === true) {
          this.queryDetail()
          this.$message.success('批量关联用例成功')
          this.pageControl.isBatchRelatedCase = false
        }
      })
    },
    update () {
      updateAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('编辑用例成功')
        }
      })
    },
    updateRelatedCase () {
      updateRelatedCaseAPI({
        suiteId: this.pageControl.selectedSuiteCase.suiteId,
        caseId: this.pageControl.selectedSuiteCase.caseId,
        sequence: this.pageControl.selectedSuiteCase.sequence,
        status: this.pageControl.selectedSuiteCase.status
      }).then(response => {
        if (response.data.success === true) {
          this.pageControl.isEditRelatedCase = false
          this.queryDetail()
          this.$message.success('编辑关联设置成功')
        }
      })
    },
    reset () {
      resetAPI({suiteId: this.pageData.suiteId}).then(response => {
        if (response.data.success === true) {
          this.pageControl.isReset = false
          this.queryDetail()
          this.$message.success('重置成功')
        }
      })
    },
    remove () {
      removeAPI({suiteId: this.pageData.suiteId}).then(response => {
        if (response.data.success === true) {
          this.pageControl.isDelete = false
          this.$message.success('删除测试套件成功')
          this.$emit('update:visible', false)
        }
      })
    },
    removeRelatedCase (caseId) {
      removeRelatedCaseAPI({
        suiteId: this.pageData.suiteId,
        caseId: caseId
      }).then(response => {
        if (response.data.success === true) {
          this.pageControl.isEditRelatedCase = false
          this.queryDetail()
          this.$message.success('删除关联用例成功')
        }
      })
    },
    use (retry) {
      useAPI({
        suiteId: this.suiteId,
        retry: retry
      }, this.$store.state.slaveHost).then(response => {
        if (response.data.success === true) {
          this.pageControl.isRetry = false
          this.$message.success('套件开始执行')
        }
      })
    },
    useSingle (row) {
      this.pageControl.selectedSuiteCase = row
      this.pageControl.selectedSuiteCase.autoCase.environment = this.pageData.environment
      useSingleAPI(
        this.pageControl.selectedSuiteCase,
        this.$store.state.slaveHost
      ).then(response => {
        if (response.data.success === true) {
          this.$message.success('用例已开始重试')
        }
      })
    },
    queryDetail () {
      queryDetailAPI({
        suiteId: this.suiteId,
        startIndex: this.pageControl.search.pageIndex
      }).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
        }
      })
    },
    editCase (caseId) {
      this.pageControl.selectedCaseId = caseId
      this.pageControl.isEditCase = true
      console.info('editCase' + this.pageControl.isEditCase)
    },
    editRelatedCase (row) {
      console.info('test')
      this.pageControl.selectedSuiteCase = row
      this.pageControl.isEditRelatedCase = true
    }
  }
}
</script>

<style scoped>

</style>
