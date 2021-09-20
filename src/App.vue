<template>
  <div id="app">
    <el-container style="background-color: whitesmoke">
      <el-aside style="background-color: whitesmoke; width: 200px; height: 16cm">
          <el-menu class="el-menu-vertical-demo" default-active="1"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b" style="height: 16cm;">
            <el-menu-item index="1" @click="$router.push('/')">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2" @click="$router.push('/factory')">
              <i class="el-icon-s-management"></i>
              <span slot="title">数据工厂</span>
            </el-menu-item>
            <el-menu-item index="3" @click="$router.push('/automation')">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">自动化测试</span>
            </el-menu-item>
            <el-menu-item index="4" @click="$router.push('/resource')">
              <i class="el-icon-s-platform"></i>
              <span slot="title">资源管理</span>
            </el-menu-item>
<!--            <el-menu-item index="5" @click="$router.push('/config')">-->
<!--              <i class="el-icon-setting"></i>-->
<!--              <span slot="title">配置管理</span>-->
<!--            </el-menu-item>-->
          </el-menu>
      </el-aside>
      <el-main style="background-color: whitesmoke; height: 15cm">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {loginAPI} from '@/api/user'

export default {
  created: function () {
    console.info('创建实例')
    // 默认从服务器为localhost
    this.$store.state.slaveHost = 'http://localhost:9011/'
    // 如有cookie，则自动登录
    if (this.$cookies.get('userId') && this.$cookies.get('loginName')) {
      console.info('登录')
      loginAPI({
        loginName: this.$cookies.get('loginName'),
        password: this.$cookies.get('password')
      }).then(response => {
        if (response.data.success === true) {
          // this.$store.commit('setUserName', response.data.data.userName)
          // this.$store.commit('setUserId', response.data.data.userId)
          this.$store.state.userId = response.data.data.userId
          this.$store.state.userName = response.data.data.userName
        } else {
          // this.$store.commit('setUserName', '默认用户')
          // this.$store.commit('setUserId', '101')
          this.$store.state.userId = '101'
          this.$store.state.userName = '默认用户'
        }
      })
    } else {
      console.info('默认用户')
      // this.$store.commit('setUserName', '默认用户')
      // this.$store.commit('setUserId', '101')
      this.$store.state.userId = '101'
      this.$store.state.userName = '默认用户'
    }
    console.info(this.$store.state.userId)
    console.info(this.$store.state.userName)
    console.info(this.$store.state.slaveHost)
  },
  methods: {
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
    setUserCookie () {
      this.$cookies.set('loginName', this.pageData.loginName)
      this.$cookies.set('password', this.pageData.password)
      this.$cookies.set('userId', this.pageData.userId)
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
