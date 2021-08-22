<template>
  <div>
    <el-tabs v-model="pageControl.activeName" @tab-click="handleClick">
      <el-tab-pane label="公共步骤" name="stepList">
        <tl-step-list></tl-step-list>
      </el-tab-pane>
      <el-tab-pane label="用例管理" name="caseList">
        <tl-case-list></tl-case-list>
      </el-tab-pane>
      <el-tab-pane label="套件管理" name="suiteList">
        <tl-suite-list></tl-suite-list>
      </el-tab-pane>
    </el-tabs>
    <el-descriptions>
      <el-descriptions-item label="当前从节点">kriookami</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import tlStepList from './stepList'
import tlCaseList from './caseList'
import tlSuiteList from './suiteList'

export default {
  components: {tlStepList, tlCaseList, tlSuiteList},
  data () {
    return {
      pageControl: {
        activeName: 'caseList'
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>

</style>
