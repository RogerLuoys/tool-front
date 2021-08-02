<template>
  <div>
    <!--搜索-->
    <el-select v-model="pageControl.search.type" clearable size="mini" placeholder="请选择状态"
               style="width:110px; float:left">
      <el-option key="1" label="计划中" :value="1"></el-option>
      <el-option key="2" label="已完成" :value="2"></el-option>
      <el-option key="3" label="待修复" :value="3"></el-option>
    </el-select>
    <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
              style="width:200px; float:left"></el-input>
    <el-button @click="queryList()" icon="el-icon-search" type="primary" size="mini"></el-button>
    <el-checkbox v-model="pageControl.search.isOnlyOwner">仅看自己</el-checkbox>
    <!--新增-->
    <el-button type="primary" @click="pageControl.isNewCase=true" size="mini" style="float:right">新增</el-button>
    <!--列表-->
    <el-table border :data="pageData.list" size="mini" style="width: 100%">
      <el-table-column prop="type" label="状态" width="180">
        <template #default="scope">
          <div>{{ getType(scope.row.status) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180">
      </el-table-column>
      <el-table-column prop="description" label="说明" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="use(scope.row.testCaseId)" type="text" size="small">试用</el-button>
          <el-button @click="edit(scope.row.testCaseId)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination layout="prev, pager, next" @current-change="queryList()" :current-page="pageControl.search.pageIndex"
                   :total="pageData.total" style="float: right">
    </el-pagination>
    <!--弹出框-->
    <el-dialog :visible.sync="pageControl.isNewCase" title="新增用例">
      <tl-detail></tl-detail>
    </el-dialog>
    <el-dialog :visible.sync="pageControl.isEditCase" title="编辑用例">
      <tl-detail :test-case-id="pageControl.selectedTestCaseId"></tl-detail>
    </el-dialog>
    <el-dialog :visible.sync="pageControl.isUseCase" title="执行用例">
      <el-card>
        <tl-use :tool-id="pageControl.selectedTestCaseId"></tl-use>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import tlDetail from './caseDetail'
import tlUse from './caseUse'
import {queryAPI} from '@/api/autoCase'

export default {
  components: {tlDetail, tlUse},

  data () {
    return {
      pageData: {
        list: [{
          testCaseId: 12345,
          title: 'title',
          description: 'desc',
          ownerId: 'tester',
          ownerName: '',
          status: 1
        }],
        total: 1
      },
      pageControl: {
        totalCount: 1,
        selectIndex: 0,
        visible: false,
        isNewCase: false,
        isEditCase: false,
        isUseCase: false,
        selectedTestCaseId: '0',
        search: {
          status: null,
          pageIndex: 1,
          isOnlyOwner: true,
          name: null
        }
      }
    }
  },
  created: function () {
    this.queryList()
  },
  watch: {
    // '$store.state.point.expendPointCount': function (newVal, oldVal) {
    //   if (this.type === 2) {
    //     this.queryPointLogList()
    //   }
    // }
  },
  methods: {
    getType (status) {
      switch (status) {
        case 1:
          return '计划中'
        case 2:
          return '已完成'
        case 3:
          return '待修复'
        default:
          return '未知'
      }
    },
    edit (testCaseId) {
      this.pageControl.isEditCase = true
      this.pageControl.selectedTestCaseId = testCaseId
    },
    use (testCaseId) {
      this.pageControl.selectedTestCaseId = testCaseId
      this.pageControl.isUseCase = true
    },
    queryList () {
      queryAPI(this.pageControl.search).then(response => {
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
