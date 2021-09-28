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
    <div style="height: 5px"></div>
    <el-table border :data="pageData.list" size="mini" style="width: 100%;height: 411px">
      <el-table-column prop="caseId" label="编号" width="120">
      </el-table-column>
      <el-table-column prop="type" label="状态" width="180">
        <template #default="scope">
          <div>{{ getStatus(scope.row.status) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="标题" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="description" label="说明" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="110">
        <template slot-scope="scope">
          <el-link @click="edit(scope.row.caseId)" :underline="false" type="primary">编辑</el-link>
          <el-link @click="use(scope.row.caseId)" :underline="false" type="primary">执行</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination layout="total, prev, pager, next" @current-change="queryList()" :current-page.sync="pageControl.search.pageIndex"
                   :total="pageData.total" style="float: right">
    </el-pagination>
    <!--弹出框-->
    <el-drawer :visible.sync="pageControl.isNewCase" title="新增测试用例" size="55%">
      <el-card shadow="never" style="height: 100%">
        <el-input v-model="pageControl.quickCreate.name" @keyup.enter.native="quickCreate()" placeholder="请输入名称后回车，或点确认新增" size="small" maxlength="30" show-word-limit>
          <template #append>
            <el-button @click="quickCreate()" type="primary" size="small">确认新增</el-button>
          </template>
        </el-input>
      </el-card>
    </el-drawer>
    <el-drawer :visible.sync="pageControl.isEditCase" title="编辑用例" :with-header="false" size="55%">
      <el-card style="min-height: 100%">
        <tl-detail v-if="pageControl.isEditCase" :case-id="pageControl.selectedCaseId" :visible.sync="pageControl.isEditCase"></tl-detail>
      </el-card>
    </el-drawer>
    <el-dialog :visible.sync="pageControl.isUseCase" title="执行用例">
      <el-card>
        <tl-use :tool-id="pageControl.selectedCaseId"></tl-use>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import tlDetail from './caseDetail'
import tlUse from './caseUse'
import {quickCreateAPI, queryAPI} from '@/api/autoCase'

export default {
  components: {tlDetail, tlUse},

  data () {
    return {
      pageData: {
        list: [{
          caseId: null,
          name: 'name',
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
        selectedCaseId: null,
        search: {
          status: null,
          pageIndex: 1,
          isOnlyOwner: true,
          name: null
        },
        quickCreate: {
          name: null,
          type: 1
        }
      }
    }
  },
  created: function () {
    this.queryList()
  },
  watch: {
    'pageControl.isEditCase': function () {
      if (!this.pageControl.isEditCase) {
        this.queryList()
      }
    }
  },
  methods: {
    getStatus (status) {
      switch (status) {
        case 1:
          return '计划中'
        case 2:
          return '待修复'
        case 3:
          return '已完成'
        default:
          return '未知'
      }
    },
    edit (caseId) {
      this.pageControl.isEditCase = true
      this.pageControl.selectedCaseId = caseId
    },
    use (caseId) {
      this.pageControl.selectedCaseId = caseId
      this.pageControl.isUseCase = true
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
          this.pageControl.selectedCaseId = response.data.data
          this.pageControl.isNewCase = false
          this.pageControl.isEditCase = true
          this.pageControl.quickCreate.name = ''
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
