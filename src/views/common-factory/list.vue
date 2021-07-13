<template>
  <div>
    <!--搜索-->
    <el-select v-model="pageControl.search.type" clearable size="mini" placeholder="请选择类型"
               style="width:110px; float:left">
      <el-option key="1" label="SQL" value=1></el-option>
      <el-option key="2" label="HTTP" value="2"></el-option>
      <el-option key="3" label="DUBBO" value="3"></el-option>
    </el-select>
    <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
              style="width:200px; float:left"></el-input>
    <el-button @click="queryList()" icon="el-icon-search" type="primary" size="mini"></el-button>
    <!--新增-->
<!--    <el-button type="primary" @click="pageControl.isNewTool = true" size="mini" style="float:right">新增</el-button>-->
    <el-button type="primary" @click="$router.push(`commonFactoryDetail/0`)" size="mini" style="float:right">新增</el-button>
    <!--列表-->
    <el-table border :data="pageData.list" size="mini" style="width: 100%">
      <el-table-column prop="type" label="类型" width="180">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180">
      </el-table-column>
      <el-table-column prop="description" label="说明" width="180">
      </el-table-column>
      <el-table-column prop="ownerName" label="归属">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="pageControl.isUseTool=true" type="text" size="small">使用</el-button>
          <el-button @click="$router.push(`commonFactoryDetail/${scope.row.toolId}`)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--弹出框-->
<!--    <el-dialog :visible.sync="pageControl.isNewTool" title="新增数据工厂">-->
<!--      <el-card>-->
<!--        <tl-detail></tl-detail>-->
<!--      </el-card>-->
<!--    </el-dialog>-->
<!--    <el-dialog :visible.sync="pageControl.isEditTool" title="编辑数据工厂">-->
<!--      <el-card>-->
<!--        <tl-detail :tool-id="pageData[pageControl.selectIndex].toolId"></tl-detail>-->
<!--      </el-card>-->
<!--    </el-dialog>-->
    <el-dialog :visible.sync="pageControl.isUseTool" title="使用数据工厂">
      <el-card>
        <tl-use :tool-id="pageData.list[pageControl.selectIndex].toolId"></tl-use>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import tlDetail from './detail'
import tlUse from './use'
import {queryAPI} from '@/api/commonFactory'

export default {
  components: {tlDetail, tlUse},

  data () {
    return {
      pageData: {
        list: [{
          toolId: 12345,
          title: 'title',
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
        pageIndex: 1,
        selectIndex: 0,
        visible: false,
        isNewTool: false,
        isEditTool: false,
        isUseTool: false,
        search: {
          type: 1,
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
    queryList () {
      queryAPI({
        name: this.pageControl.search.name,
        type: this.pageControl.search.type,
        startIndex: 1
      }).then(response => {
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
