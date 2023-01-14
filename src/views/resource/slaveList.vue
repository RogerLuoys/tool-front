<template>
  <div>
    <div style="height: 33px;">
<!--      <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"-->
<!--                style="width:200px; float:left"></el-input>-->
<!--      <el-button @click="queryList()" icon="el-icon-search" type="primary" size="mini"></el-button>-->
      <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
                style="width:200px; float:left">
        <template #append>
          <el-button @click="queryList()" icon="el-icon-search" size="mini"></el-button>
        </template>
      </el-input>
      <!--新增-->
      <el-button type="primary" @click="pageControl.isNewResource = true" size="mini" style="float:right">新增节点</el-button>
    </div>
    <!--列表-->
<!--    <div style="height: 5px"></div>-->
    <el-table border :data="pageData.list" @row-click="edit" :row-style="{cursor: 'pointer'}" size="mini" height="calc(66.4vh)" style="width: 100%;">
      <el-table-column prop="resourceId" label="编号" width="90">
      </el-table-column>
      <el-table-column label="使用范围" width="100">
        <template #default="scope">
          <span>{{getPermission(scope.row.permission)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="标题" width="180">
      </el-table-column>
      <el-table-column prop="description" label="说明">
      </el-table-column>
      <el-table-column label="地址" width="150">
        <template #default="scope">
          <span>{{scope.row.slave.ip}}:{{scope.row.slave.port}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最大线程数" width="150">
        <template #default="scope">
          <span>{{scope.row.slave.thread}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination layout="total, prev, pager, next" @current-change="queryList()" :current-page.sync="pageControl.search.pageIndex"
                   :total="pageData.total" style="float: right">
    </el-pagination>
    <!--弹窗-->
    <el-dialog v-if="pageControl.isNewResource" :visible.sync="pageControl.isNewResource" title="新增资源">
      <tl-slave-detail :visible.sync="pageControl.isNewResource"></tl-slave-detail>
    </el-dialog>
    <el-dialog v-if="pageControl.isEditResource" :visible.sync="pageControl.isEditResource" title="编辑资源">
      <tl-slave-detail :resource-id="pageControl.selectedResourceId" :visible.sync="pageControl.isEditResource" :is-edit="true"></tl-slave-detail>
    </el-dialog>
  </div>
</template>

<script>
import tlSlaveDetail from './slaveDetail'
import {queryAPI, queryDetailAPI, updateUserAPI} from '@/api/resource'

export default {
  components: {tlSlaveDetail},
  data () {
    return {
      pageData: null,
      pageControl: {
        totalCount: 1,
        visible: false,
        isNewResource: false,
        isEditResource: false,
        selectedResourceId: 0,
        search: {
          pageIndex: 1,
          type: 2,
          // permission: 2,
          name: null
        }
      }
    }
  },
  created: function () {
    this.queryList()
  },
  watch: {
    'pageControl.isNewResource': function () {
      if (this.pageControl.isNewResource === false) {
        this.queryList()
      }
    },
    'pageControl.isEditResource': function () {
      if (this.pageControl.isEditResource === false) {
        this.queryList()
      }
    }
  },
  methods: {
    getPermission (type) {
      switch (type) {
        case 1:
          return '全局共用'
        case 2:
          return '项目共用'
        case 3:
          return '个人专用'
      }
      return type
    },
    edit (row, event, column) {
      console.info(row.resourceId)
      this.pageControl.selectedResourceId = row.resourceId
      this.pageControl.isEditResource = true
    },
    // edit (resourceId) {
    //   this.pageControl.selectedResourceId = resourceId
    //   this.pageControl.isEditResource = true
    // },
    queryList () {
      queryAPI(this.pageControl.search).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
        }
      })
    },
    use (resourceId, type) {
      updateUserAPI({
        resourceId: resourceId,
        userId: this.$store.state.userId,
        userName: this.$store.state.userName
      }).then(response => {
        if (response.data.success === true) {
          // 从服务器资源领用，还需要切换自动化服务器
          if (type === 4) {
            queryDetailAPI({
              resourceId: resourceId
            }).then(response => {
              if (response.data.success === true) {
                this.$store.state.slaveHost = response.data.data.slaveUrl
                this.$message.success('领用和从节点切换成功')
              }
            })
          } else {
            this.$message.success('资源领用成功')
          }
          this.queryList()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
