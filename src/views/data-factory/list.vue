<template>
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
        <el-button type="text" size="small">使用</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import {queryPointLogListAPI} from '@/api/point'

export default {
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
      }]
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
