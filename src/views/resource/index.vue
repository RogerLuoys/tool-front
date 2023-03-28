<template>
<!--  <div>-->
<!--    <el-tabs v-model="pageControl.activeName" type="border-card">-->
<!--            <el-tab-pane label="数据库" name="first">-->
<!--              <tl-jdbc-list></tl-jdbc-list>-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane label="执行节点" name="second">-->
<!--              <tl-slave-list></tl-slave-list>-->
<!--            </el-tab-pane>-->
<!--    </el-tabs>-->
<!--  </div>-->
  <el-card>
    <tl-case-module-list></tl-case-module-list>
  </el-card>
</template>

<script>
import tlCaseModuleList from './caseModuleList'

export default {
  components: {tlCaseModuleList},
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
