<template>
  <div id="app">
    <el-container style="background-color: whitesmoke">
      <el-header v-if="$store.state.user.isLogin === true" height="60px" style="background-color: whitesmoke">
        <el-col :span="23">
          <el-menu class="el-menu-vertical-demo" mode="horizontal" default-active="1" @open="handleOpen" @close="handleClose"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b">
            <el-menu-item index="1" @click="$router.push('/flag')">
              <i class="el-icon-s-flag"></i>
              <span slot="title">Flag</span>
            </el-menu-item>
            <el-menu-item index="2" @click="$router.push('/taskDaily')">
              <i class="el-icon-date"></i>
              <span slot="title">每日任务</span>
            </el-menu-item>
            <el-menu-item index="3" @click="$router.push('/report')">
              <i class="el-icon-notebook-1"></i>
              <span slot="title">成长轨迹</span>
            </el-menu-item>
            <el-menu-item index="4" @click="$router.push('/point')">
              <i class="el-icon-present"></i>
              <span slot="title">积分</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="1"  style="background-color: #545c64; height: 60px">
          <el-dropdown @command="dropdownAction">
            <el-avatar style="cursor: pointer">{{$store.state.user.userName}}</el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">个人设置</el-dropdown-item>
              <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-header>
      <el-header v-else height="60px" style="background-color: whitesmoke">
        <el-image src="http://118.24.117.181/images/header.png" fit="fill">欢迎使用，有问题请联系作者</el-image>
      </el-header>
      <el-main style="height: 13cm; background-color: whitesmoke">
        <el-card style="min-height: 99%">
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {loginAPI} from '@/api/user'
import {queryPointSummaryAPI} from '@/api/point'

export default {
  created: function () {
    // 如有cookie，则自动登录
    if (this.$cookies.get('userId') && this.$cookies.get('loginName')) {
      loginAPI({
        loginName: this.$cookies.get('loginName'),
        password: this.$cookies.get('password')
      }).then(response => {
        if (response.data.success === true) {
          this.$store.commit('setUserName', response.data.data.userName)
          this.$store.commit('setIsLogin', true)
          this.getPointId()
          this.$router.push('/flag')
        } else {
          this.$message.error('账号或密码错误，请重新登录')
          this.$store.commit('setIsLogin', false)
          this.$router.push('/')
        }
      })
    } else {
      this.$message.error('登录过期，请重新登录')
      this.$store.commit('setIsLogin', false)
      this.$router.push('/')
    }
  },
  methods: {
    getPointId () {
      queryPointSummaryAPI().then(response => {
        if (response.data.success === true) {
          this.$store.commit('setPointId', response.data.data.pointId)
        }
      })
    },
    doLogin () {
      loginAPI({
        loginName: this.pageData.loginName,
        password: this.pageData.password
      }).then(response => {
        if (response.data.success === true) {
          console.info('登录成功')
          this.pageData = response.data.data
          this.setUserCookie()
          this.$store.commit('setUserName', this.pageData.userName)
          this.$router.push('/flag')
        } else {
          this.$message.error('账号或密码错误')
        }
      })
    },
    dropdownAction (command) {
      switch (command) {
        case 'profile':
          this.$router.push('/profile')
          break
        case 'loginOut':
          this.$router.push('/')
          break
      }
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
#app {
  color: #2c3e50;
}
.el-header {
  background-color: #FFFFFF;
}
</style>
