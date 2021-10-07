<template>
  <div>
    <!--搜索-->
    <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
              style="width:200px; float:left"></el-input>
    <el-button @click="queryList()" icon="el-icon-search" type="primary" size="mini"></el-button>
    <!--新增-->
    <el-button type="primary" @click="pageControl.isNewDataSource = true" size="mini" style="float:right">快速新增</el-button>
    <div style="height: 5px"></div>
    <!--列表-->
    <el-table @row-click="selectDataSource" :data="pageData.list" size="mini" highlight-current-row :row-style="{cursor: 'pointer'}" style="width: 100%">
      <el-table-column prop="resourceId" label="编号" width="150">
      </el-table-column>
      <el-table-column prop="name" label="标题" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="description" label="说明" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" @current-change="queryList()" :current-page.sync="pageControl.search.pageIndex"
                   :total="pageData.total" style="float: right">
    </el-pagination>
  </div>
</template>

<script>
import {queryAPI, queryDetailAPI} from '@/api/resource'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pageData: {
        list: [{
          resourceId: 1,
          name: 'name',
          description: 'desc'
        }],
        total: 1
      },
      pageControl: {
        pageIndex: 1,
        isNewDataSource: false,
        search: {
          name: null,
          pageIndex: 1,
          type: 1
        }
      }
    }
  },
  created: function () {
    this.queryList()
  },
  methods: {
    queryList () {
      queryAPI(this.pageControl.search).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
        }
      })
    },
    // create () {
    //   quickCreateAPI(this.pageControl.dataSource).then()
    // },
    selectDataSource (row) {
      // console.info(row.deviceId)
      queryDetailAPI({
        resourceId: row.resourceId
      }).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
          this.$store.state.selectedDataSource = response.data.data.dataSource
          console.info(this.$store.state.selectedDataSource)
          this.$emit('update:visible', false)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
