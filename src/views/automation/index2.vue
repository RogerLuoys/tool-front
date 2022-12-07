<template>
  <div>
<!--    <el-row style="height: 60px">-->
<!--      <el-col :span="14">-->
<!--        <el-menu default-active="1" mode="horizontal">-->
<!--          <el-menu-item @click="pageControl.activeName = 'case'" index="1">用例</el-menu-item>-->
<!--          <el-menu-item @click="pageControl.activeName = 'supper'" index="2">超类</el-menu-item>-->
<!--          <el-menu-item @click="pageControl.activeName = 'po'" index="3">PO</el-menu-item>-->
<!--        </el-menu>-->
<!--      </el-col>-->
<!--      <el-col :span="10" style="background-color: white; height: 60px;">-->
<!--        <div style="height: 30px"></div>-->
<!--        <span>当前从节点：{{$store.state.slaveHost}}</span>-->
<!--        <el-tooltip effect="dark" content="步骤、用例、套件的执行将由当前从节点完成，可在资源管理中切换选择" placement="top">-->
<!--          <i class="el-icon-info"></i>-->
<!--        </el-tooltip>-->
<!--        <el-tooltip effect="dark" placement="top">-->
<!--          <template #content>-->
<!--            <div>1、点击下载可下载服务jar包<br/>2、通过java -jar命令可启动<br/>3、执行ui用例需要配置webdriver</div>-->
<!--          </template>-->
<!--          <a href="http://8.140.8.45/resources/tool-service.jar" download="service.jar">下载</a>-->
<!--        </el-tooltip>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="flagWeb" name="first"></el-tab-pane>
      <el-tab-pane label="flagHttp" name="second"></el-tab-pane>
      <el-tab-pane label="uc" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="express" name="fourth">定时任务补偿</el-tab-pane>
      <el-tab-pane label="flagWeb" name="first"></el-tab-pane>
      <el-tab-pane label="flagHttp" name="second"></el-tab-pane>
      <el-tab-pane label="uc" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="express" name="fourth">定时任务补偿</el-tab-pane>
      <el-tab-pane label="flagWeb" name="first"></el-tab-pane>
      <el-tab-pane label="flagHttp" name="second"></el-tab-pane>
      <el-tab-pane label="uc" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="express" name="fourth">定时任务补偿</el-tab-pane>
      <el-tab-pane label="flagWeb" name="first"></el-tab-pane>
      <el-tab-pane label="flagHttp" name="second"></el-tab-pane>
      <el-tab-pane label="uc" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="express" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
    <div style="height: 1px"></div>
    <tl-case-list v-show="pageControl.activeName === 'case'"></tl-case-list>
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
