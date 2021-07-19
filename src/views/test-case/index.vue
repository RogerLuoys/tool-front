<template>
  <div>
    <el-tabs v-model="pageControl.activeName" @tab-click="handleClick">
      <el-tab-pane label="步骤管理" name="caseList">步骤列表</el-tab-pane>
      <el-tab-pane label="用例管理" name="stepList">用例列表</el-tab-pane>
      <el-tab-pane label="套件管理" name="suiteList">套件列表</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
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
