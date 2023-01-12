<template>
  <div>
    <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
              style="width:200px; float:left"></el-input>
    <el-button @click="queryList()" icon="el-icon-search" type="primary" size="mini"></el-button>
    <!--新增-->
    <el-button type="primary" @click="pageControl.isNewResource = true" size="mini" style="float:right">新增</el-button>
    <!--列表-->
    <div style="height: 5px"></div>
    <el-table border :data="pageData.list" @row-click="edit" :row-style="{cursor: 'pointer'}" size="mini" style="width: 100%;height: 411px">
      <el-table-column prop="resourceId" label="编号" width="90">
      </el-table-column>
<!--      <el-table-column prop="type" label="类型" width="90">-->
<!--        <template #default="scope">-->
<!--          <div>{{ getType(scope.row.type) }}</div>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column prop="name" label="标题" width="180">
      </el-table-column>
      <el-table-column prop="description" label="说明">
      </el-table-column>
      <el-table-column label="链接" width="150">
        <template #default="scope">
          <span>{{scope.row.dataSource.url}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column prop="jdbcDriver" label="驱动" width="150">-->
<!--      </el-table-column>-->
      <el-table-column label="账号名" width="150">
        <template #default="scope">
          <span>{{scope.row.dataSource.username}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column prop="jdbcPassword" label="密码" width="150">-->
<!--      </el-table-column>-->
<!--      <el-table-column label="操作" width="110">-->
<!--        <template slot-scope="scope">-->
<!--          <el-link @click="edit(scope.row.resourceId)" :underline="false" type="primary">编辑</el-link>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <!--分页-->
    <el-pagination layout="total, prev, pager, next" @current-change="queryList()" :current-page.sync="pageControl.search.pageIndex"
                   :total="pageData.total" style="float: right">
    </el-pagination>
    <!--弹窗-->
    <el-dialog v-if="pageControl.isNewResource" :visible.sync="pageControl.isNewResource" title="新增资源">
      <tl-jdbc-detail :visible.sync="pageControl.isNewResource"></tl-jdbc-detail>
    </el-dialog>
    <el-dialog v-if="pageControl.isEditResource" :visible.sync="pageControl.isEditResource" title="编辑资源">
      <tl-jdbc-detail :resource-id="pageControl.selectedResourceId" :visible.sync="pageControl.isEditResource" :is-edit="true"></tl-jdbc-detail>
    </el-dialog>
  </div>
</template>

<script>
import tlJdbcDetail from './jdbcDetail'
import {queryAPI, queryDetailAPI, updateUserAPI} from '@/api/resource'

export default {
  components: {tlJdbcDetail},
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
          type: 1,
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
    // getType (type) {
    //   switch (type) {
    //     case 1:
    //       return '数据库'
    //     case 2:
    //       return '设备'
    //     case 3:
    //       return '测试环境'
    //     case 4:
    //       return '从节点'
    //   }
    //   return type
    // },
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
