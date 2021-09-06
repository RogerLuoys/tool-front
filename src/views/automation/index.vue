<template>
  <div>
    <el-row>
      <el-col :span="14">
        <el-menu default-active="2" mode="horizontal">
          <el-menu-item @click="pageControl.activeName = 'step'" index="1">公共步骤</el-menu-item>
          <el-menu-item @click="pageControl.activeName = 'case'" index="2">用例管理</el-menu-item>
          <el-menu-item @click="pageControl.activeName = 'suite'" index="3">套件管理</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="10" style="background-color: white; height: 60px;">
        <div style="height: 30px"></div>
        <span>当前从节点：{{$store.state.slaveHost}}</span>
        <el-tooltip effect="dark" content="步骤、用例、套件的执行将由当前从节点完成，可在资源管理中切换选择" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </el-col>
    </el-row>
    <div style="height: 10px"></div>
    <tl-step-list v-show="pageControl.activeName === 'step'"></tl-step-list>
    <tl-case-list v-show="pageControl.activeName === 'case'"></tl-case-list>
    <tl-suite-list v-show="pageControl.activeName === 'suite'"></tl-suite-list>
    <!--    <el-tabs v-model="pageControl.activeName" @tab-click="handleClick">-->
<!--      <el-tab-pane label="公共步骤" name="stepList">-->
<!--        <tl-step-list></tl-step-list>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="用例管理" name="caseList">-->
<!--        <tl-case-list></tl-case-list>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="套件管理" name="suiteList">-->
<!--        <tl-suite-list></tl-suite-list>-->
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->
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
        activeName: 'case'
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
