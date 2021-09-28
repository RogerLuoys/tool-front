<template>
  <div>
    <el-row style="height: 15px">
      <el-col :span="15">
        <span>编辑测试集</span>
      </el-col>
      <el-col :span="8" style="text-align: right">
        <el-dropdown @click="use()" size="mini" split-button type="primary">
          开始执行
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>批量重试</el-dropdown-item>
            <el-dropdown-item @click="remove()">重置</el-dropdown-item>
            <el-dropdown-item @click="remove()">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <!--基本信息-->
    <el-divider content-position="right"></el-divider>
    <el-form :model="pageData" label-width="90px">
      <el-form-item label="标题">
        <el-input v-model="pageData.name" @change="update" placeholder="请输入标题" size="small" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="pageData.description" @change="update" placeholder="请描述功能和实现方法" type="textarea" maxlength="200"
                  show-word-limit></el-input>
      </el-form-item>
      <!--用例列表-->
      <el-divider content-position="right">用例列表</el-divider>
      <el-table :data="pageData.relatedCase.list" size="mini" style="width: 100%">
        <el-table-column label="编号" width="130">
          <template slot-scope="scope">
            {{scope.row.autoCase.caseId}}
          </template>
        </el-table-column>
        <el-table-column label="标题" width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.autoCase.name}}
          </template>
        </el-table-column>
        <el-table-column label="优先级">
          <template slot-scope="scope">
            {{scope.row.sequence}}
          </template>
        </el-table-column>
        <el-table-column label="结果" width="130">
          <template slot-scope="scope">
            <el-tag size="small">{{ getStatus(scope.row.status) }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="pageControl.isRelatedCase">
        <el-input v-model="pageControl.selectedCaseId" size="small" placeholder="请输入要关联的用例编号"
                  maxlength="20" show-word-limit>
          <template #append>
            <el-button @click="createRelatedCase(pageControl.selectedCaseId)" type="primary" size="small">确认</el-button>
            <el-button @click="pageControl.isRelatedCase=false" size="small">取消</el-button>
          </template>
        </el-input>
      </div>
      <div v-else>
        <el-button size="mini" type="primary" plain>批量关联</el-button>
        <el-button @click="pageControl.isRelatedCase=true" size="mini" plain>单个关联</el-button>
        <!--分页-->
        <el-pagination layout="prev, pager, next" @current-change="queryList()" :current-page="pageControl.search.pageIndex"
                       :total="pageData.relatedCase.total" small style="float: right">
        </el-pagination>
      </div>
    </el-form>
<!--    <el-dialog :visible.sync="pageControl.isNewCase" title="关联用例" append-to-body>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
import {createAPI, createRelatedCaseAPI, updateAPI, removeAPI, queryDetailAPI, useAPI} from '@/api/autoSuite'
// import tlSelectDataSource from './selectDataSource'

export default {
  // components: {tlSelectDataSource},
  props: {
    suiteId: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pageData: {
        suiteId: 0,
        name: '',
        description: '',
        passed: 0,
        failed: 0,
        relatedCase: {
          list: [{
            sequence: null,
            autoCase: {
              caseId: null,
              name: 'name',
              type: 1,
              status: 1
            }
          }],
          total: 0
        }
      },
      pageControl: {
        isRelatedCase: false,
        selectedCaseId: '',
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
    createRelatedCase (caseId) {
      createRelatedCaseAPI({
        suiteId: this.pageData.suiteId,
        caseId: caseId
      }).then(response => {
        if (response.data.success === true) {
          this.queryDetail()
          this.pageControl.isRelatedCase = false
          this.$message.success('创建关联用例成功，请自行编辑')
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
    remove () {
      removeAPI({toolId: this.pageData.toolId}).then(response => {
        if (response.data.success === true) {
          this.$message.success('删除用例成功')
        }
      })
    },
    use (retry) {
      useAPI({
        suiteId: this.suiteId,
        retry: retry
      }, this.$store.state.slaveHost).then(response => {
        if (response.data.success === true) {
          this.$message.success('测试集已开始执行')
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
    }
  }
}
</script>

<style scoped>

</style>
