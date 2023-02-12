<template>
  <div>
    <div style="height: 33px">
      <!--搜索-->
      <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
                style="width:200px; float:left">
        <template #append>
          <el-button @click="queryList()" icon="el-icon-search" size="mini"></el-button>
        </template>
      </el-input>
      <!--邀请-->
      <el-button type="primary" @click="pageControl.isInviteMember=true" size="mini" style="float:right">邀请成员</el-button>
    </div>
    <!--列表-->
    <el-table border :data="pageData.list" size="mini" height="calc(66.4vh)" style="width: 100%;">
      <el-table-column prop="username" label="账号" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="type" label="角色" width="130" show-overflow-tooltip>
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
    <!--邀请弹窗-->
    <el-dialog v-if="pageControl.isInviteMember" :visible.sync="pageControl.isInviteMember" title="邀请成员">
      <tl-member-detail :visible.sync="pageControl.isInviteMember"></tl-member-detail>
    </el-dialog>
    <!--编辑弹窗-->
    <el-dialog v-if="pageControl.isEditMember" :visible.sync="pageControl.isEditMember" title="编辑成员">
      <tl-member-detail :resource-id="pageControl.selectedMemberId" :visible.sync="pageControl.isEditMember" :is-edit="true"></tl-member-detail>
    </el-dialog>
  </div>
</template>

<script>
import {queryAPI} from '@/api/member'
import tlMemberDetail from './memberDetail'

export default {
  components: {tlMemberDetail},
  props: {
    supperCaseId: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      pageData: {
        list: [],
        total: 0
      },
      pageControl: {
        isInviteMember: false,
        isEditMember: false,
        selectedMemberId: null,
        search: {//  列表搜索入参
          pageIndex: 1,
          nickname: null
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
    }
  }
}
</script>

<style scoped>

</style>
