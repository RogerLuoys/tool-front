<template>
  <div>
    <!--搜索-->
    <el-select v-model="pageControl.search.type" clearable size="mini" placeholder="请选择状态"
               style="width:110px; float:left">
      <el-option key="1" label="数据库" :value="1"></el-option>
      <el-option key="2" label="设备" :value="2"></el-option>
      <el-option key="3" label="测试环境" :value="3"></el-option>
      <el-option key="4" label="从节点" :value="4"></el-option>
    </el-select>
    <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
              style="width:200px; float:left"></el-input>
    <el-button @click="queryList()" icon="el-icon-search" type="primary" size="mini"></el-button>
    <!--新增-->
    <el-button type="primary" @click="pageControl.isNewResource = true" size="mini" style="float:right">新增</el-button>
    <!--列表-->
    <div style="height: 5px"></div>
    <el-table border :data="pageData.list" size="mini" style="width: 100%;height: 411px">
      <el-table-column prop="resourceId" label="编号" width="130">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="90">
        <template #default="scope">
          <div>{{ getType(scope.row.type) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="标题" width="180">
      </el-table-column>
      <el-table-column prop="description" label="说明">
      </el-table-column>
      <el-table-column prop="ownerName" label="保管人" width="150">
      </el-table-column>
      <el-table-column prop="userName" label="借用人" width="150">
      </el-table-column>
      <el-table-column label="操作" width="110">
        <template slot-scope="scope">
          <el-link @click="edit(scope.row.resourceId)" :underline="false" type="primary">编辑</el-link>
          <el-link v-if="scope.row.type===2 || scope.row.type===3" :underline="false" type="primary">领用</el-link>
          <el-link v-if="scope.row.type===4" @click="use(scope.row.resourceId)" :underline="false" type="primary">领用</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination layout="total, prev, pager, next" @current-change="queryList()" :current-page.sync="pageControl.search.pageIndex"
                   :total="pageData.total" style="float: right">
    </el-pagination>
    <!--弹窗-->
    <el-dialog v-if="pageControl.isNewResource" :visible.sync="pageControl.isNewResource" title="新增资源">
      <tl-detail :visible.sync="pageControl.isNewResource"></tl-detail>
    </el-dialog>
    <el-dialog v-if="pageControl.isEditResource" :visible.sync="pageControl.isEditResource" title="编辑资源">
      <tl-detail :resource-id="pageControl.selectedResourceId" :visible.sync="pageControl.isEditResource" :is-edit="true"></tl-detail>
    </el-dialog>
  </div>
</template>

<script>
import tlDetail from './detail'
import {queryAPI, queryDetailAPI} from '@/api/resource'

export default {
  components: {tlDetail},

  props: {
    // pointId: {
    //   type: String,
    //   default: '0'
    // },
    // type: {
    //   type: Number,
    //   default: 0
    // }
  },
  data () {
    return {
      pageData: {
        list: [{
          resourceId: null,
          type: 0,
          name: 'title',
          description: 'desc',
          ownerId: '',
          ownerName: '',
          permission: 0
        }],
        total: 0
      },
      pageControl: {
        totalCount: 1,
        visible: false,
        isNewResource: false,
        isEditResource: false,
        selectedResourceId: 0,
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
    getType (type) {
      switch (type) {
        case 1:
          return '数据库'
        case 2:
          return '设备'
        case 3:
          return '测试环境'
        case 4:
          return '从节点'
      }
      return type
    },
    edit (resourceId) {
      this.pageControl.selectedResourceId = resourceId
      this.pageControl.isEditResource = true
    },
    queryList () {
      queryAPI(this.pageControl.search).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
        }
      })
    },
    use (resourceId) {
      queryDetailAPI({
        resourceId: resourceId
      }).then(response => {
        if (response.data.success === true) {
          this.$store.state.slaveHost = response.data.data.slaveUrl
          this.$message.success('从节点切换成功')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
