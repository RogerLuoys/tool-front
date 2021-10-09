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
    <el-button type="primary" @click="$router.push(`factoryDetail/0`)" size="mini" style="float:right">新增</el-button>
    <!--列表-->
    <div style="height: 5px"></div>
    <el-table border :data="pageData.list" size="mini" style="width: 100%;height: 411px">
      <el-table-column prop="toolId" label="编号" width="130">
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
      <el-table-column prop="ownerName" label="归属" width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="110">
        <template slot-scope="scope">
          <el-link @click="$router.push(`factoryDetail/${scope.row.toolId}`)" :underline="false" type="primary">编辑</el-link>
          <el-link @click="use(scope.row.toolId)" :underline="false" type="primary">使用</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination layout="total, prev, pager, next" @current-change="queryList()" :current-page.sync="pageControl.search.pageIndex"
                   :total="pageData.total" style="float: right">
    </el-pagination>
    <!--弹出框-->
    <el-dialog v-if="pageControl.isUseTool" :visible.sync="pageControl.isUseTool" title="使用数据工厂">
      <tl-use :tool-id="pageControl.selectedToolId"></tl-use>
    </el-dialog>
  </div>
</template>

<script>
import tlDetail from './detail'
import tlUse from './use'
import {queryAPI} from '@/api/factory'

export default {
  components: {tlDetail, tlUse},

  data () {
    return {
      pageData: {
        list: [{
          toolId: 12345,
          name: 'name',
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
          isTestStep: false,
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
          return 'TOOLS'
        default:
          return 'UNKNOWN'
      }
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
