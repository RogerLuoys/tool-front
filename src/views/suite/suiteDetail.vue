<template>
  <div>
    <el-row style="height: 15px">
      <el-col :span="10">
        <span>编辑测试集</span>
      </el-col>
      <el-col :span="13" style="text-align: right">
<!--        <el-dropdown @click="use()" size="mini" split-button type="primary">-->
<!--          开始执行-->
<!--          <el-dropdown-menu slot="dropdown">-->
<!--            <el-dropdown-item>批量重试</el-dropdown-item>-->
<!--            <el-dropdown-item @click="remove()">重置</el-dropdown-item>-->
<!--            <el-dropdown-item @click="remove()">删除</el-dropdown-item>-->
<!--          </el-dropdown-menu>-->
<!--        </el-dropdown>-->
        <el-button @click="use(false)" size="mini" type="primary">执行</el-button>
        <el-button @click="use(true)" size="mini" type="primary">重试</el-button>
        <el-popconfirm title="将重置套件执行状态和结果，确定吗？" @confirm="reset">
          <template #reference>
            <el-button size="mini">重置</el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm title="将删除该套件，确定吗？" @confirm="remove">
          <template #reference>
            <el-button size="mini">删除</el-button>
          </template>
        </el-popconfirm>
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
        <el-input v-model="pageData.environment" @change="update" placeholder="请输入默认域名或ip端口，输入值将替换用例中的执行环境" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <!--用例列表-->
      <el-divider content-position="right">
        <el-button @click="pageControl.isBatchRelatedCase=true" type="text">批量关联</el-button>
        <el-button @click="pageControl.isRelatedCase=true" type="text">单个关联</el-button>
        <span>用例列表</span>
        <el-tooltip class="item" effect="dark" content="点编号可进入用例详情，点标题可进入关联设置，失败用例可单个重试" placement="top-start">
          <i class="el-icon-info"></i>
        </el-tooltip>
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
<!--      <div v-if="pageControl.isRelatedCase">-->
<!--        <el-input v-model="pageControl.relatedCaseId" size="small" placeholder="请输入要关联的用例编号"-->
<!--                  maxlength="20" show-word-limit>-->
<!--          <template #append>-->
<!--            <el-button @click="createRelatedCase()" type="primary" size="small">确认</el-button>-->
<!--            <el-button @click="pageControl.isRelatedCase=false" size="small">取消</el-button>-->
<!--          </template>-->
<!--        </el-input>-->
<!--      </div>-->
<!--      <div v-else-if="pageControl.isBatchRelatedCase">-->
<!--        <el-input v-model="pageControl.relatedCaseName" size="small" placeholder="请输入用例名(将模糊匹配)"-->
<!--                  maxlength="20" show-word-limit>-->
<!--          <template #append>-->
<!--            <el-button @click="batchRelatedCase()" type="primary" size="small">确认</el-button>-->
<!--            <el-button @click="pageControl.isBatchRelatedCase=false" size="small">取消</el-button>-->
<!--          </template>-->
<!--        </el-input>-->
<!--      </div>-->
<!--      <div v-else>-->
<!--        <el-button @click="pageControl.isBatchRelatedCase=true" size="mini" type="primary" plain>批量关联</el-button>-->
<!--        <el-button @click="pageControl.isRelatedCase=true" size="mini" plain>单个关联</el-button>-->
<!--        &lt;!&ndash;分页&ndash;&gt;-->
<!--        <el-pagination layout="prev, pager, next" @current-change="queryDetail()" :current-page.sync="pageControl.search.pageIndex"-->
<!--                       :total="pageData.relatedCase.total" small style="float: right">-->
<!--        </el-pagination>-->
<!--      </div>-->
      <!--分页-->
      <el-pagination layout="prev, pager, next" @current-change="queryDetail()" :current-page.sync="pageControl.search.pageIndex"
                     :total="pageData.relatedCase.total" small style="float: right">
      </el-pagination>
    </el-form>
    <!--弹窗-->
    <el-drawer :visible.sync="pageControl.isEditCase" title="编辑用例" :with-header="false" size="55%" append-to-body>
      <el-card style="min-height: 100%">
        <tl-case-detail v-if="pageControl.isEditCase" :case-id="pageControl.selectedCaseId" :visible.sync="pageControl.isEditCase"></tl-case-detail>
      </el-card>
    </el-drawer>
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
        isRelatedCase: false,
        isBatchRelatedCase: false,
        isEditRelatedCase: false,
        isEditCase: false,
        relatedCaseId: '',
        relatedCaseName: '',
        selectedSequence: '',
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
          this.queryDetail()
          this.$message.success('重置成功')
        }
      })
    },
    remove () {
      removeAPI({suiteId: this.pageData.suiteId}).then(response => {
        if (response.data.success === true) {
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
