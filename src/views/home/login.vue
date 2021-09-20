<template>
  <div>
    <div style="display: flex;justify-content: center">
      <el-card style="width: 400px;">
        <template #header>
          <span>请先登录</span>
          <span style="float: right"><el-button type="text" @click="pageControl.registerDialogVisible = true">注册</el-button></span>
        </template>
        <div>
          <el-row>
            <el-input v-model="pageData.loginName" placeholder="请输入登录账号"></el-input>
          </el-row>
          <el-row>
            <el-input v-model="pageData.passWord" type="password" placeholder="请输入登录密码" @keydown.enter.native="doLogin"></el-input>
          </el-row>
          <el-row>
            <el-button style="width: 360px" type="primary" @click="doLogin">登录</el-button>
          </el-row>
          <el-row>
            <el-button style="width: 360px" @click="$router.push('/')">取消</el-button>
          </el-row>
        </div>
      </el-card>
    </div>
    <el-dialog title="注册新用户" :visible.sync="pageControl.registerDialogVisible">
      <el-form :model="pageData" label-width="2cm" size="small">
        <el-form-item label="昵称">
          <el-input v-model="pageData.userName" placeholder="请输入昵称" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="登录账号">
          <el-input v-model="pageData.loginName" placeholder="请输入数字或字母" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="pageData.passWord" placeholder="请输入数字或字母" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" @click="registerUser">注册</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {loginAPI, registerAPI} from '@/api/user'

export default {
  data () {
    return {
      pageData: {
        userId: '',
        userName: '',
        loginName: 'guest',
        passWord: '123456'
      },
      pageControl: {
        remember: true,
        registerDialogVisible: false,
        testValue: 0
      }
    }
  },
  // created: function () {
  //   this.$store.commit('setIsLogin', false)
  // },
  // destroyed: function () {
  //   if (this.$cookies.get('userId')) {
  //     this.$store.commit('setIsLogin', true)
  //   }
  // },
  methods: {
    registerUser () {
      registerAPI({
        userName: this.pageData.userName,
        loginName: this.pageData.loginName,
        passWord: this.pageData.passWord
      }).then(response => {
        if (response.data.success === true) {
          this.$message.success('注册成功')
          this.pageControl.registerDialogVisible = false
        } else {
          this.$message.error('注册失败')
        }
      })
    },
    setUserCookie () {
      this.$cookies.set('loginName', this.pageData.loginName)
      this.$cookies.set('passWord', this.pageData.passWord)
      this.$cookies.set('userId', this.pageData.userId)
    },
    doLogin () {
      loginAPI({
        loginName: this.pageData.loginName,
        passWord: this.pageData.passWord
      }).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
          this.setUserCookie()
          this.$store.commit('setUserName', this.pageData.userName)
          this.$store.commit('setUserId', this.pageData.userId)
          this.$router.push('/')
        } else {
          this.$message.error('账号或密码错误')
        }
      })
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
&:last-child {
   margin-bottom: 0;
 }
}
</style>
