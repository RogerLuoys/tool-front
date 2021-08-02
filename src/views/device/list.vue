<template>
  <div>
    <!--搜索-->
    <el-select v-model="pageControl.search.type" clearable size="mini" placeholder="请选择状态"
               style="width:110px; float:left">
      <el-option key="1" label="数据库" :value="1"></el-option>
      <el-option key="2" label="手机" :value="2"></el-option>
      <el-option key="3" label="容器" :value="3"></el-option>
    </el-select>
    <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
              style="width:200px; float:left"></el-input>
    <el-button @click="queryList()" icon="el-icon-search" type="primary" size="mini"></el-button>
    <!--新增-->
    <el-button type="primary" @click="pageControl.isNewDevice = true" size="mini" style="float:right">新增</el-button>
    <!--列表-->
    <el-table border :data="pageData.list" style="width: 100%">
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
          <el-button type="text" size="small">领用</el-button>
          <el-button @click="edit(scope.row.deviceId)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination layout="prev, pager, next" @current-change="queryList()" :current-page="pageControl.search.pageIndex"
                   :total="pageData.total" style="float: right">
    </el-pagination>
    <!--弹窗-->
    <el-dialog :visible.sync="pageControl.isNewDevice" title="新增设备或环境">
      <el-card>
        <tl-detail></tl-detail>
      </el-card>
    </el-dialog>
    <el-dialog :visible.sync="pageControl.isEditDevice" title="编辑设备或环境">
      <el-card>
        <tl-detail :device-id="pageControl.selectedDeviceId"></tl-detail>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import tlDetail from './detail'
import {queryAPI} from '@/api/resource'

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
          deviceId: 0,
          type: 0,
          title: 'title',
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
        isNewDevice: false,
        isEditDevice: false,
        selectedDeviceId: 0,
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
          return '数据库'
        case 2:
          return '手机'
        case 3:
          return '容器'
      }
      return type
    },
    edit (deviceId) {
      this.pageControl.selectedDeviceId = deviceId
      this.pageControl.isEditDevice = true
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
