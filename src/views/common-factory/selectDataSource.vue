<template>
  <div>
    <el-dialog :visible.sync="isVisible" title="请关联数据库">
      <!--搜索-->
      <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
                style="width:200px; float:left"></el-input>
      <el-button icon="el-icon-search" type="primary" size="mini"></el-button>
      <!--新增-->
      <el-button type="primary" @click="pageControl.isNewDataSource = true" size="mini" style="float:right">快速新增</el-button>
      <!--列表-->
      <el-table border :data="pageData" style="width: 100%">
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="description" label="说明" width="180">
        </el-table-column>
        <el-table-column prop="detail" label="数据源">
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="pageControl.isNewDataSource" title="新增数据库" append-to-body>
        <el-form label-width="80px">
          <el-form-item label="URL">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <el-button @click="create()" type="primary" size="small">保存</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import {quickCreateAPI} from '../../api/device'

export default {
  // components: {tlDetail},

  props: {
    // pointId: {
    //   type: String,
    //   default: '0'
    // },
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pageData: [{
        deviceId: 1,
        title: 'title',
        description: 'desc',
        detail: 'detail'
      }],
      pageControl: {
        totalCount: 1,
        pageIndex: 1,
        visible: false,
        isNewDataSource: false,
        dataSource: {
          url: '',
          userName: '',
          password: ''
        },
        search: {
          name: null
        }
      }
    }
  },
  created: function () {
    // this.queryPointLogList()
  },
  watch: {
    // '$store.state.point.expendPointCount': function (newVal, oldVal) {
    //   if (this.type === 2) {
    //     this.queryPointLogList()
    //   }
    // }
  },
  methods: {
    // queryPointLogList () {
    //   queryPointLogListAPI({
    //     pointId: this.$store.state.point.pointId,
    //     type: this.type
    //   }).then(response => {
    //     if (response.data.success === true) {
    //       this.pageData = response.data.data
    //     }
    //   })
    // }
    create () {
      quickCreateAPI(this.pageControl.dataSource).then()
    }
  }
}
</script>

<style scoped>

</style>
