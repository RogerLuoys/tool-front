<template>
  <div>
<!--    <el-row style="background-color: #FFFFFF; height: 35px">-->
<!--      <el-col :span="20">-->
<!--        <el-descriptions>-->
<!--          <el-descriptions-item label="当前模块">111</el-descriptions-item>-->
<!--        </el-descriptions>-->
<!--      </el-col>-->
<!--      <el-col :span="4">-->
<!--        <el-link @click="$router.push('/login')" :underline="false" type="primary">新增</el-link>-->
<!--        <el-link :underline="false" type="primary">编辑</el-link>-->
<!--        <el-link :underline="false" type="primary">删除</el-link>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row :gutter="30">-->
<!--      <el-col :span="11">-->
<!--        <el-card @click="handleClick">-->
<!--          <div slot="header" class="clearfix">-->
<!--            <span>flag ui</span>-->
<!--            <el-button @click="handleClick" style="float: right; padding: 3px 0" type="text">编辑</el-button>-->
<!--          </div>-->
<!--          <div style="margin-bottom: 10px">flag 前端自动化</div>-->
<!--          <div style="margin-bottom: 10px">总用例数：27</div>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="11">-->
<!--        <el-card @click="handleClick">-->
<!--          <div slot="header" class="clearfix">-->
<!--            <span>flag http</span>-->
<!--            <el-button @click="handleClick" style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
<!--          </div>-->
<!--          <div style="margin-bottom: 10px">flag 前端自动化</div>-->
<!--          <div style="margin-bottom: 10px">总用例数：27</div>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <el-tabs @tab-click="handleClick">
      <el-tab-pane label="测试模块" name="second">
        <tl-case-module-list></tl-case-module-list>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">
        <tl-project-user-list></tl-project-user-list>
      </el-tab-pane>
      <el-tab-pane label="项目管理" name="fourth">
        <tl-project-list></tl-project-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tlCaseModuleList from './caseModuleList'
import tlProjectList from './projectList'
import tlProjectUserList from './projectUserList'

export default {
  components: {tlCaseModuleList, tlProjectList, tlProjectUserList},
  methods: {
    handleClick () {
      console.log('test')
    }
  }
}
</script>

<style scoped>

</style>
