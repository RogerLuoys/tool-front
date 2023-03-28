<template>
  <div style="height: calc(85vh)">
    <!--标签页-->
    <el-tabs v-model="pageControl.activeName" type="border-card">
      <el-tab-pane label="数据库" name="first">
        <tl-jdbc-list></tl-jdbc-list>
      </el-tab-pane>
      <el-tab-pane label="执行节点" name="second">
        <tl-slave-list></tl-slave-list>
      </el-tab-pane>
<!--      <el-tab-pane label="测试模块" name="third">-->
<!--        <tl-case-module-list></tl-case-module-list>-->
<!--      </el-tab-pane>-->
      <el-tab-pane label="角色管理" name="third">
        <tl-member-list></tl-member-list>
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
import tlMemberList from './memberList'
import tlJdbcList from './jdbcList'
import tlSlaveList from './slaveList'

export default {
  components: {tlCaseModuleList, tlProjectList, tlMemberList, tlJdbcList, tlSlaveList},
  data () {
    return {
      pageControl: {
        activeName: 'first'
      }
    }
  }
}
</script>

<style scoped>

</style>
