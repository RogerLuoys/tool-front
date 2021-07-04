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
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-management"></i>
                <span>数据工厂</span>
              </template>
              <el-menu-item index="2-1" @click="$router.push('/commonFactory')">通用</el-menu-item>
              <el-menu-item index="2-2" @click="$router.push('/customFactory')">自定义</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-promotion"></i>
                <span>自动化平台</span>
              </template>
              <el-menu-item index="3-1" @click="$router.push('/commonFactory')">用例管理</el-menu-item>
              <el-menu-item index="3-2" @click="$router.push('/customFactory')">套件管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="3" @click="$router.push('/device')">
              <i class="el-icon-s-platform"></i>
              <span slot="title">设备与环境</span>
            </el-menu-item>
            <el-menu-item index="4" @click="$router.push('/config')">
              <i class="el-icon-setting"></i>
              <span slot="title">配置管理</span>
            </el-menu-item>
          </el-menu>
<!--        <el-col :span="1"  style="background-color: #545c64; height: 60px">-->
<!--          <el-dropdown @command="dropdownAction">-->
<!--            <el-avatar style="cursor: pointer">用户A</el-avatar>-->
<!--            <el-dropdown-menu slot="dropdown">-->
<!--              <el-dropdown-item command="profile">个人设置</el-dropdown-item>-->
<!--              <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--          </el-dropdown>-->
<!--        </el-col>-->
      </el-aside>
      <el-main style="background-color: whitesmoke; height: 15cm">
<!--        <el-card style="height: 15cm;">-->
<!--        </el-card>-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import {loginAPI} from '@/api/user'
// import {queryPointSummaryAPI} from '@/api/point'

export default {
  // created: function () {
  //   // 如有cookie，则自动登录
  //   if (this.$cookies.get('userId') && this.$cookies.get('loginName')) {
  //     loginAPI({
  //       loginName: this.$cookies.get('loginName'),
  //       password: this.$cookies.get('password')
  //     }).then(response => {
  //       if (response.data.success === true) {
  //         this.$store.commit('setUserName', response.data.data.userName)
  //         this.$store.commit('setIsLogin', true)
  //         this.getPointId()
  //         this.$router.push('/flag')
  //       } else {
  //         this.$message.error('账号或密码错误，请重新登录')
  //         this.$store.commit('setIsLogin', false)
  //         this.$router.push('/')
  //       }
  //     })
  //   } else {
  //     this.$message.error('登录过期，请重新登录')
  //     this.$store.commit('setIsLogin', false)
  //     this.$router.push('/')
  //   }
  // },
  // methods: {
  //   getPointId () {
  //     queryPointSummaryAPI().then(response => {
  //       if (response.data.success === true) {
  //         this.$store.commit('setPointId', response.data.data.pointId)
  //       }
  //     })
  //   },
  //   doLogin () {
  //     loginAPI({
  //       loginName: this.pageData.loginName,
  //       password: this.pageData.password
  //     }).then(response => {
  //       if (response.data.success === true) {
  //         console.info('登录成功')
  //         this.pageData = response.data.data
  //         this.setUserCookie()
  //         this.$store.commit('setUserName', this.pageData.userName)
  //         this.$router.push('/flag')
  //       } else {
  //         this.$message.error('账号或密码错误')
  //       }
  //     })
  //   },
  //   dropdownAction (command) {
  //     switch (command) {
  //       case 'profile':
  //         this.$router.push('/profile')
  //         break
  //       case 'loginOut':
  //         this.$router.push('/')
  //         break
  //     }
  //   },
  //   handleOpen (key, keyPath) {
  //     console.log(key, keyPath)
  //   },
  //   handleClose (key, keyPath) {
  //     console.log(key, keyPath)
  //   }
  // }
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
