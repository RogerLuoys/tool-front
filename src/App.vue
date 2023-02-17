<template>
  <el-container style="background-color: whitesmoke; height: calc(97vh)">
    <el-aside style="width: 180px">
      <el-popover
        placement="bottom"
        width="180"
        trigger="click">
        <el-select v-model="pageControl.selectedProject" @change="changeProject">
          <el-option
            v-for="item in pageControl.options"
            :key="item.projectId"
            :label="item.projectName"
            :value="item.projectId">
          </el-option>
        </el-select>
        <el-row slot="reference" type="flex" justify="center" align="middle" style="cursor: pointer; height: 48px; background-color: #545c64; color: white">演示机构</el-row>
      </el-popover>
      <div style="background-color: #909399; height: 1px"></div>
      <el-menu class="el-menu-vertical-demo" default-active="1"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b" style="height: calc(88.5vh)">
        <div style="background-color: #909399; height: 1px"></div>
        <el-menu-item index="1" @click="$router.push('/')">
          <i class="el-icon-s-home"></i>
          <span slot="title">工作台</span>
        </el-menu-item>
        <el-menu-item index="2" @click="$router.push('/automation')">
          <i class="el-icon-s-management"></i>
          <span slot="title">用例管理</span>
        </el-menu-item>
        <el-menu-item index="3" @click="$router.push('/suite')">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">套件执行</span>
        </el-menu-item>
        <el-menu-item index="4" @click="$router.push('/resource')">
          <i class="el-icon-s-platform"></i>
          <span slot="title">资源管理</span>
        </el-menu-item>
        <el-menu-item index="5" @click="$router.push('/config')">
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main style="height: calc(97vh)">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import {loginAPI} from '@/api/user'
import {queryByUserAPI} from '@/api/project'

export default {
  data () {
    return {
      pageControl: {
        selectedProject: 1,
        options: [{
          projectId: 1,
          projectName: '演示项目111'
        }]
      }
    }
  },
  created: function () {
    console.info('创建实例')
    // 默认从服务器为localhost
    this.$store.state.slaveHost = 'http://localhost:9011/'
    // 如cookie中有登录信息，则换成cookie的账号
    if (this.$cookies.get('loginInfo')) {
      this.$store.state.loginInfo = this.$cookies.get('loginInfo')
    } else {
      this.$store.state.loginInfo = '03f798da9d3e6a10cfd620229fe122d4'
    }
    this.login()
    this.queryProjectByUser()
    console.info(this.$store.state.userId)
    console.info(this.$store.state.userName)
    console.info(this.$cookies.get('loginInfo'))
  },
  methods: {
    login () {
      loginAPI({
        loginInfo: this.$store.state.loginInfo
      }).then(response => {
        if (response.data.success === true) {
          this.$store.state.userId = response.data.data.userId
          this.$store.state.userName = response.data.data.userName
        } else {
          this.$store.state.userId = '-1'
          this.$store.state.userName = '演示账号'
        }
      })
    },
    queryProjectByUser () {
      if (this.$store.state.loginInfo === '03f798da9d3e6a10cfd620229fe122d4') {
        console.info('演示账户，用演示项目')
        console.info(this.pageControl.options)
        this.pageControl.options = [{projectId: -1, projectName: '演示项目'}]
        console.info(this.pageControl.options)
        return
      }
      queryByUserAPI().then(response => {
        if (response.data.success === true) {
          this.pageControl.options = response.data.data
        }
      })
    },
    changeProject (id) {
      this.$cookies.set('projectId', id)
    }
  }
}
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
