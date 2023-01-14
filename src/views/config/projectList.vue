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
      <el-button type="primary" @click="pageControl.isCreate=true" size="mini" style="float:right">新增项目</el-button>
    </div>
    <!--列表-->
    <el-table border :data="pageData.list" size="mini" height="calc(66.4vh)" style="width: 100%;">
      <el-table-column prop="name" label="名称" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="description" label="描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="110">
        <template slot-scope="scope">
          <el-link @click="edit(scope.row)" :underline="false" type="primary">编辑</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination layout="total, prev, pager, next" @current-change="queryList()" :current-page.sync="pageControl.search.pageIndex"
                   :total="pageData.total" style="float: right">
    </el-pagination>
    <!--弹出框-->
    <!--邀请弹窗-->
    <el-dialog v-if="pageControl.isCreate" :visible.sync="pageControl.isCreate" title="新增项目">
      <tl-project-detail :visible.sync="pageControl.isCreate"></tl-project-detail>
    </el-dialog>
    <!--编辑弹窗-->
    <el-dialog v-if="pageControl.isEdit" :visible.sync="pageControl.isEdit" title="编辑项目">
      <tl-project-detail :project-detail="pageControl.selectedProject" :visible.sync="pageControl.isEdit" :is-edit="true"></tl-project-detail>
    </el-dialog>
  </div>
</template>

<script>
import {queryAPI} from '@/api/project'
import tlProjectDetail from './projectDetail'

export default {
  components: {tlProjectDetail},
  props: {
    supperCaseId: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      pageData: {
        list: [{
          projectId: 1,
          name: 'name',
          description: 'desc'
        }],
        total: 1
      },
      pageControl: {
        isCreate: false,
        isEdit: false,
        selectedProject: null,
        search: {//  列表搜索入参
          pageIndex: 1,
          name: null
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
    edit (project) {
      this.pageControl.isEdit = true
      this.pageControl.selectedProject = project
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
