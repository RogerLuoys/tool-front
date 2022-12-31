<template>
  <div>
    <!--搜索-->
    <el-select v-model="pageControl.search.type" clearable size="mini" placeholder="请选择状态"
               style="width:110px; float:left">
      <el-option key="1" label="用例" :value="1"></el-option>
      <el-option key="2" label="超类" :value="2"></el-option>
      <el-option key="3" label="PO" :value="3"></el-option>
    </el-select>
    <el-select v-model="pageControl.search.status" clearable size="mini" placeholder="请选择状态"
               style="width:110px; float:left">
      <el-option key="1" label="计划中" :value="1"></el-option>
      <el-option key="2" label="待修复" :value="2"></el-option>
      <el-option key="3" label="已完成" :value="3"></el-option>
    </el-select>
    <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
              style="width:200px; float:left"></el-input>
    <el-button @click="queryList()" icon="el-icon-search" type="primary" size="mini"></el-button>
    <!--新增-->
    <el-button type="primary" @click="pageControl.isNewCase=true" size="mini" style="float:right">新增</el-button>
    <!--列表-->
    <div style="height: 5px"></div>
    <el-table border :data="pageData.list" size="mini" height="calc(66.4vh)" style="width: 100%;">
      <el-table-column prop="caseId" label="编号" width="120">
      </el-table-column>
      <el-table-column prop="type" label="状态" width="90">
        <template #default="scope">
          <el-tag size="small">{{ getStatus(scope.row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="标题" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="description" label="说明" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="finishTime" label="计划完成时间" width="130" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="ownerName" label="责任人" width="130" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="110">
        <template slot-scope="scope">
          <el-link @click="edit(scope.row.caseId)" :underline="false" type="primary">编辑</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination layout="total, prev, pager, next" @current-change="queryList()" :current-page.sync="pageControl.search.pageIndex"
                   :total="pageData.total" style="float: right">
    </el-pagination>
    <!--弹出框-->
    <!--新增弹窗-->
    <el-drawer :visible.sync="pageControl.isNewCase" title="新增测试用例" size="55%">
      <el-card shadow="never" style="height: 100%">
        <el-input v-model="pageControl.quickCreate.name" @keyup.enter.native="quickCreate()" placeholder="请输入名称后回车，或点确认新增" size="small" maxlength="30" show-word-limit>
          <template #append>
            <el-button @click="quickCreate()" type="primary" size="small">确认新增</el-button>
          </template>
        </el-input>
      </el-card>
    </el-drawer>
    <!--编辑弹窗-->
    <el-drawer :visible.sync="pageControl.isEditCase" title="编辑用例" :with-header="false" size="55%">
      <el-card style="min-height: 100%">
        <tl-detail v-if="pageControl.isEditCase" :case-id="pageControl.selectedCaseId" :visible.sync="pageControl.isEditCase"></tl-detail>
      </el-card>
    </el-drawer>
    <!--执行弹窗-->
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
import {quickCreateAPI, queryAPI, testAPI} from '@/api/autoCase'

export default {
  components: {tlDetail, tlUse},
  props: {
    supperCaseId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      pageData: {
        list: [{
          caseId: 1,
          name: 'name',
          description: 'desc',
          finishTime: '2022-12-31',
          ownerId: 'tester',
          ownerName: '测试一',
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
        search: {//  列表搜索入参
          supperCaseId: 0,
          type: 1,
          status: null,
          pageIndex: 1,
          name: null
        },
        quickCreate: {//  快速新增用例的入参
          name: null,
          type: 1,
          supperCaseId: 0
        }
      }
    }
  },
  created: function () {
    console.info('created2')
    this.pageControl.search.supperCaseId = this.supperCaseId
    this.pageControl.quickCreate.supperCaseId = this.supperCaseId
    console.info(this.pageControl.quickCreate)
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
    test () {
      console.info('测试')
      testAPI({caseId: '123456'}, this.$store.state.slaveHost).then(
        response => {
          console.info(response.data.data)
        }
      )
    },
    test2 () {
      let caseId1 = '01020304'
      let url = this.$store.state.slaveHost + 'autoCase/test?caseId=' + caseId1
      console.info(url)
      window.open(url, '_blank')
    },
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
    quickCreate () { // 快速新增用例
      console.info(this.pageControl.quickCreate)
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
