<template>
  <div>
    <el-tabs value="second" @tab-click="handleClick">
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
