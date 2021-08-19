<template>
  <div>
    <!--搜索-->
    <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
              style="width:200px; float:left"></el-input>
    <el-button @click="queryList()" icon="el-icon-search" type="primary" size="mini"></el-button>
    <!--新增-->
    <el-button type="primary" @click="pageControl.isNewSuite=true" size="mini" style="float:right">新增</el-button>
    <!--列表-->
    <el-table border :data="pageData.list" size="mini" style="width: 100%">
      <el-table-column prop="name" label="标题" width="180">
      </el-table-column>
      <el-table-column prop="description" label="说明">
      </el-table-column>
      <el-table-column prop="total" label="用例总数" width="100">
      </el-table-column>
      <el-table-column prop="passed" label="通过" width="100">
      </el-table-column>
      <el-table-column prop="failed" label="失败" width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="use(scope.row.suiteId)" type="text" size="small">执行</el-button>
          <el-button @click="edit(scope.row.suiteId)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination layout="prev, pager, next" @current-change="queryList()" :current-page="pageControl.search.pageIndex"
                   :total="pageData.total" style="float: right">
    </el-pagination>
    <!--弹出框-->
    <el-dialog :visible.sync="pageControl.isNewSuite" title="新增测试集">
      <el-form :model="pageControl.quickCreate" label-width="90px">
        <el-form-item label="标题">
          <el-input v-model="pageControl.quickCreate.name" placeholder="请输入标题" size="small" maxlength="30" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button @click="quickCreate()" type="primary" size="small">确认</el-button>
      </div>
    </el-dialog>
    <el-drawer v-if="pageControl.isEditSuite" :visible.sync="pageControl.isEditSuite" title="编辑测试集" :with-header="false" size="55%">
      <template #title>
        <el-row :gutter="5" style="height: 10px">
          <el-col :span="19">
            <span>编辑测试集</span>
          </el-col>
          <el-col :span="4">
            <el-button size="small">test</el-button>
          </el-col>
        </el-row>
      </template>
      <el-card>
        <tl-detail :suite-id="pageControl.selectedSuiteId" :is-edit="true"></tl-detail>
      </el-card>
    </el-drawer>
    <el-dialog :visible.sync="pageControl.isUseSuite" title="执行测试">
      <el-card>
        <tl-use :tool-id="pageControl.selectedSuiteId"></tl-use>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import tlDetail from './suiteDetail'
import tlUse from './suiteUse'
import {quickCreateAPI, queryAPI} from '@/api/autoSuite'

export default {
  components: {tlDetail, tlUse},

  data () {
    return {
      pageData: {
        list: [{
          suiteId: 12345,
          name: 'name',
          description: 'desc',
          passed: 0,
          failed: 0
        }],
        total: 0
      },
      pageControl: {
        isNewSuite: false,
        isEditSuite: false,
        isUseSuite: false,
        selectedSuiteId: '0',
        search: {
          pageIndex: 1,
          name: null
        },
        quickCreate: {
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
    use (suiteId) {
      this.pageControl.selectedSuiteId = suiteId
      this.pageControl.isUseSuite = true
    },
    edit (suiteId) {
      this.pageControl.selectedSuiteId = suiteId
      this.pageControl.isEditSuite = true
    },
    queryList () {
      queryAPI(this.pageControl.search).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
        }
      })
    },
    quickCreate () {
      quickCreateAPI(this.pageControl.quickCreate).then(response => {
        if (response.data.success === true) {
          this.$message.success('创建用例成功')
          this.pageControl.isNewSuite = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
