<template>
  <div>
    <!--搜索-->
    <el-select v-model="pageControl.search.type" clearable size="mini" placeholder="请选择类型"
               style="width:110px; float:left">
      <el-option key="1" label="SQL" :value="1"></el-option>
      <el-option key="2" label="HTTP" :value="2"></el-option>
      <el-option key="3" label="RPC" :value="3"></el-option>
    </el-select>
    <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
              style="width:200px; float:left"></el-input>
    <el-button @click="queryList()" icon="el-icon-search" type="primary" size="mini"></el-button>
    <!--新增-->
    <el-button type="primary" @click="$router.push(`commonFactoryDetail/0`)" size="mini" style="float:right">新增</el-button>
    <!--列表-->
    <el-table border :data="pageData.list" size="mini" style="width: 100%">
      <el-table-column prop="type" label="类型" width="180">
        <template #default="scope">
          <div>{{ getType(scope.row.type) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180">
      </el-table-column>
      <el-table-column prop="description" label="说明" width="180">
      </el-table-column>
      <el-table-column prop="ownerName" label="归属">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="use(scope.row.toolId)" type="text" size="small">使用</el-button>
          <el-button @click="$router.push(`commonFactoryDetail/${scope.row.toolId}`)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination layout="prev, pager, next" @current-change="queryList()" :current-page="pageControl.search.pageIndex"
                   :total="pageData.total" style="float: right">
    </el-pagination>
    <!--弹出框-->
    <el-dialog :visible.sync="pageControl.isUseTool" title="使用数据工厂">
      <el-card>
        <tl-use :tool-id="pageControl.selectedToolId"></tl-use>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import tlDetail from './detail'
import tlUse from './use'
import {queryAPI} from '@/api/commonFactory'

export default {
  components: {tlDetail, tlUse},

  data () {
    return {
      pageData: {
        list: [{
          toolId: 12345,
          title: 'title',
          description: 'desc',
          ownerId: 'tester',
          ownerName: '',
          permission: 2,
          type: 1
        }],
        total: 1
      },
      pageControl: {
        totalCount: 1,
        selectIndex: 0,
        visible: false,
        isNewTool: false,
        isEditTool: false,
        isUseTool: false,
        selectedToolId: '0',
        search: {
          pageIndex: 1,
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
    // '$store.state.point.expendPointCount': function (newVal, oldVal) {
    //   if (this.type === 2) {
    //     this.queryPointLogList()
    //   }
    // }
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
          return 'UNKNOWN'
      }
      return type
    },
    use (toolId) {
      this.pageControl.selectedToolId = toolId
      this.pageControl.isUseTool = true
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
