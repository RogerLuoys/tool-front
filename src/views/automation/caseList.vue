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
      <el-table-column prop="name" label="标题" width="180">
      </el-table-column>
      <el-table-column prop="description" label="说明" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="use(scope.row.caseId)" type="text" size="small">试用</el-button>
          <el-button @click="$router.push(`caseDetail/${scope.row.caseId}`)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination layout="prev, pager, next" @current-change="queryList()" :current-page="pageControl.search.pageIndex"
                   :total="pageData.total" style="float: right">
    </el-pagination>
    <!--弹出框-->
    <el-dialog :visible.sync="pageControl.isNewCase" title="新增用例">
      <el-form :model="pageControl.quickCreate" label-width="90px">
        <el-form-item label="标题">
          <el-input v-model="pageControl.quickCreate.name" placeholder="请输入标题" size="small" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="pageControl.quickCreate.type" size="small">
            <el-radio :label="1">接口自动化</el-radio>
            <el-radio :label="2">UI自动化</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button @click="quickCreate()" type="primary" size="small">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog v-if="pageControl.isEditCase" :visible.sync="pageControl.isEditCase" title="编辑用例" width="60%">
      <tl-detail :case-id="pageControl.selectedCaseId" :is-edit="true"></tl-detail>
    </el-dialog>
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
          this.$message.success('创建用例成功')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
