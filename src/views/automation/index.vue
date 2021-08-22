<template>
  <div>
    <el-descriptions title="用户信息">
      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    </el-descriptions>
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
