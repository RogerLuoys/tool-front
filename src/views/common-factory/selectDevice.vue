<template>
  <div>
    <!--搜索-->
    <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
              style="width:200px; float:left"></el-input>
    <el-button icon="el-icon-search" type="primary" size="mini"></el-button>
    <!--新增-->
    <el-button type="primary" @click="pageControl.isNewTool = true" size="mini" style="float:right">新增</el-button>
    <!--列表-->
    <el-table border :data="pageData" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180">
      </el-table-column>
      <el-table-column prop="description" label="说明" width="180">
      </el-table-column>
      <el-table-column prop="owner" label="归属人">
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="pageControl.isNewTool" title="新增数据库">
      <el-card>
        <!--        <tl-detail></tl-detail>-->
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
// import tlDetail from './detail'

export default {
  // components: {tlDetail},

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
        status: '--',
        permission: ''
      }],
      pageControl: {
        totalCount: 1,
        pageIndex: 1,
        visible: false,
        isNewTool: false,
        isUseTool: false,
        search: {
          status: '',
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
  }
}
</script>

<style scoped>

</style>
