<template>
  <div>
    <div style="height: 33px">
      <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
                style="width:200px; float:left">
        <template #append>
          <el-button @click="queryList()" icon="el-icon-search" size="mini"></el-button>
        </template>
      </el-input>
      <!--新增-->
      <el-button type="primary" @click="pageControl.isNewSuite=true" size="mini" style="float:right">新增套件</el-button>
    </div>
    <!--列表-->
    <el-table border :data="pageData.list" @row-click="edit" :row-style="{cursor: 'pointer'}" size="mini" height="calc(75vh)" style="width: 100%;">
      <el-table-column prop="suiteId" label="编号" width="120">
      </el-table-column>
      <el-table-column label="标题" width="200" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag size="mini">{{ getStatus(scope.row.status) }}</el-tag>
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="说明" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="total" label="用例总数" width="100">
      </el-table-column>
      <el-table-column prop="ownerName" label="责任人" width="100">
      </el-table-column>
<!--      <el-table-column prop="passed" label="通过" width="100">-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="failed" label="失败" width="100">-->
<!--      </el-table-column>-->
<!--      <el-table-column label="操作" width="110">-->
<!--        <template slot-scope="scope">-->
<!--          <el-link @click="use(scope.row.suiteId)" :underline="false" type="primary">执行</el-link>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <!--分页-->
    <el-pagination layout="total, prev, pager, next" @current-change="queryList()" :current-page.sync="pageControl.search.pageIndex"
                   :total="pageData.total" style="float: right">
    </el-pagination>
    <!--弹出框-->
    <el-drawer :visible.sync="pageControl.isNewSuite" title="新增测试集" size="55%">
      <el-card shadow="never" style="height: 100%">
        <el-input v-model="pageControl.quickCreate.name" @keyup.enter.native="quickCreate()" placeholder="请输入名称后回车，或点确认新增" size="small" maxlength="30" show-word-limit>
          <template #append>
            <el-button @click="quickCreate()" type="primary" size="small" plain>确认新增</el-button>
          </template>
        </el-input>
      </el-card>
    </el-drawer>
    <el-drawer v-if="pageControl.isEditSuite" :visible.sync="pageControl.isEditSuite" title="编辑测试集" :with-header="false" size="55%">
      <el-card style="min-height: 100%">
        <tl-detail :suite-id="pageControl.selectedSuiteId" :is-edit="true" :visible.sync="pageControl.isEditSuite"></tl-detail>
      </el-card>
    </el-drawer>
    <el-dialog :visible.sync="pageControl.isUseSuite" title="执行测试">
      <el-card>
        <tl-use :tool-id="pageControl.selectedSuiteId"></tl-use>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import tlDetail from './suiteDetail'
import tlUse from './suiteUse'
import {quickCreateAPI, queryAPI} from '@/api/autoSuite'

export default {
  components: {tlDetail, tlUse},

  data () {
    return {
      pageData: {
        list: [{
          suiteId: 12345,
          name: 'name',
          description: 'desc',
          passed: 0,
          failed: 0
        }],
        total: 0
      },
      pageControl: {
        isNewSuite: false,
        isEditSuite: false,
        isUseSuite: false,
        selectedSuiteId: '0',
        search: {
          pageIndex: 1,
          name: null
        },
        quickCreate: {
          name: null
        }
      }
    }
  },
  created: function () {
    this.queryList()
  },
  watch: {
    'pageControl.isEditSuite': function () {
      if (!this.pageControl.isEditSuite) {
        this.queryList()
      }
    }
  },
  methods: {
    getStatus (status) {
      switch (status) {
        case 1:
          return '空闲'
        case 2:
          return '执行中'
        default:
          return '未知'
      }
    },
    use (suiteId) {
      this.pageControl.selectedSuiteId = suiteId
      this.pageControl.isUseSuite = true
    },
    edit (row, event, column) {
      this.pageControl.selectedSuiteId = row.suiteId
      this.pageControl.isEditSuite = true
    },
    queryList () {
      queryAPI(this.pageControl.search).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
        }
      })
    },
    quickCreate () {
      quickCreateAPI(this.pageControl.quickCreate).then(response => {
        if (response.data.success === true) {
          this.pageControl.selectedSuiteId = response.data.data
          this.pageControl.isNewSuite = false
          this.pageControl.isEditSuite = true
          this.pageControl.quickCreate.name = ''
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
