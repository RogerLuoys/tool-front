<template>
  <div>
    <!--搜索-->
    <el-select v-model="pageControl.search.type" clearable size="mini" placeholder="请选择状态"
               style="width:110px; float:left">
      <el-option key="1" label="数据库" value="1"></el-option>
      <el-option key="2" label="手机" value="2"></el-option>
      <el-option key="3" label="容器" value="3"></el-option>
    </el-select>
    <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
              style="width:200px; float:left"></el-input>
    <el-button @click="query()" icon="el-icon-search" type="primary" size="mini"></el-button>
    <!--新增-->
    <el-button type="primary" @click="pageControl.isNewTool = true" size="mini" style="float:right">新增</el-button>
    <!--列表-->
    <el-table border :data="pageData" style="width: 100%">
      <el-table-column prop="type" label="类型" width="180">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180">
      </el-table-column>
      <el-table-column prop="description" label="说明" width="180">
      </el-table-column>
      <el-table-column prop="owner" label="归属">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="pageControl.isUseTool=true" type="text" size="small">领用</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="pageControl.isNewTool" title="新增设备或环境">
      <el-card>
        <tl-detail></tl-detail>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import tlDetail from './detail'
import {queryAPI} from '@/api/device'

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
      pageData: [{
        type: '--',
        title: 'title',
        description: 'desc',
        owner: '',
        permission: ''
      }],
      pageControl: {
        totalCount: 1,
        pageIndex: 1,
        visible: false,
        isNewTool: false,
        isUseTool: false,
        search: {
          type: '1',
          name: null
        }
      }
    }
  },
  created: function () {
    this.query()
  },
  watch: {
    // '$store.state.point.expendPointCount': function (newVal, oldVal) {
    //   if (this.type === 2) {
    //     this.queryPointLogList()
    //   }
    // }
  },
  methods: {
    query () {
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
