<template>
  <div>
    <!--搜索-->
    <el-select v-model="pageControl.search.type" clearable size="mini" placeholder="请选择类型"
               style="width:110px; float:left">
      <el-option key="1" label="SQL" :value="1"></el-option>
      <el-option key="2" label="HTTP" :value="2"></el-option>
      <el-option key="3" label="RPC" :value="3"></el-option>
      <el-option key="4" label="UI" :value="4"></el-option>
      <el-option key="5" label="STEPS" :value="5"></el-option>
    </el-select>
    <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
              style="width:200px; float:left"></el-input>
    <el-button @click="queryList()" icon="el-icon-search" type="primary" size="mini"></el-button>
    <!--新增-->
    <el-button type="primary" @click="pageControl.isNewStep=true" size="mini" style="float:right">新增</el-button>
    <!--列表-->
    <div style="height: 5px"></div>
    <el-table border :data="pageData.list" size="mini" style="width: 100%;height: 411px">
      <el-table-column prop="stepId" label="编号" width="120">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="90">
        <template #default="scope">
          <div>{{ getType(scope.row.type) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="标题" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="description" label="说明" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="expectResult" label="预期结果" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="110">
        <template slot-scope="scope">
<!--          <el-button @click="use(scope.row.stepId)" type="text" size="small">试用</el-button>-->
          <el-link @click="edit(scope.row.stepId)" :underline="false" type="primary">编辑</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination layout="total, prev, pager, next" @current-change="queryList()" :current-page.sync="pageControl.search.pageIndex"
                   :total="pageData.total" style="float: right">
    </el-pagination>
    <!--弹出框-->
    <el-dialog v-if="pageControl.isNewStep" :visible.sync="pageControl.isNewStep" width="65%" title="新增公共步骤">
      <tl-detail :visible.sync="pageControl.isNewStep"></tl-detail>
    </el-dialog>
    <el-dialog v-if="pageControl.isEditStep" :visible.sync="pageControl.isEditStep" width="65%" title="编辑步骤">
      <tl-detail :step-id="pageControl.selectedStepId" :is-edit="true" :visible.sync="pageControl.isEditStep"></tl-detail>
    </el-dialog>
<!--    <el-dialog v-if="pageControl.isUseStep" :visible.sync="pageControl.isUseStep" title="使用数据工厂">-->
<!--        <tl-use :step-id="pageControl.selectedStepId"></tl-use>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
import tlDetail from './stepDetail'
import tlUse from './stepUse'
import {queryAPI} from '@/api/autoStep'

export default {
  components: {tlDetail, tlUse},

  data () {
    return {
      pageData: {
        list: [{
          stepId: null,
          name: 'title',
          description: 'desc',
          type: 1,
          status: 1,
          expectResult: '',
          ownerId: 'tester',
          ownerName: ''
        }],
        total: 1
      },
      pageControl: {
        totalCount: 1,
        selectIndex: 0,
        visible: false,
        isNewStep: false,
        isEditStep: false,
        isUseStep: false,
        selectedStepId: '0',
        search: {
          pageIndex: 1,
          isPublic: true,
          type: null,
          name: null
        }
      }
    }
  },
  created: function () {
    this.queryList()
  },
  watch: {
    'pageControl.isNewStep': function () {
      if (this.pageControl.isNewStep === false) {
        this.queryList()
      }
    },
    'pageControl.isEditStep': function () {
      if (this.pageControl.isEditStep === false) {
        this.queryList()
      }
    }
  },
  methods: {
    getType (type) {
      switch (type) {
        case 1:
          return 'SQL'
        case 2:
          return 'HTTP'
        case 3:
          return 'RPC'
        case 4:
          return 'UI'
        case 5:
          return 'STEPS'
        default:
          return 'UNKNOWN'
      }
    },
    // use (stepId) {
    //   this.pageControl.selectedStepId = stepId
    //   this.pageControl.isUseStep = true
    // },
    edit (stepId) {
      this.pageControl.selectedStepId = stepId
      this.pageControl.isEditStep = true
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
