<template>
  <el-row>
    <el-col :span="20">
      <el-descriptions>
        <el-descriptions-item label="登录账号ID">{{pageData.userId}}</el-descriptions-item>
        <el-descriptions-item label="昵称">{{pageData.userName}}</el-descriptions-item>
      </el-descriptions>
    </el-col>
    <el-col :span="4">
      <el-link :underline="false" type="primary">更新</el-link>
      <el-link @click="$router.push('/login')" :underline="false" type="primary">切换账号</el-link>
    </el-col>
  </el-row>

<!--  <el-form ref="pageData" :model="pageData" label-width="3cm" style="max-width: 800px">-->
<!--    <el-form-item label="用户ID">-->
<!--      <el-input v-model="pageData.userId" size="small" :disabled="true"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="登录名">-->
<!--      <el-input v-model="pageData.loginName" size="small" maxlength="10" show-word-limit></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="密码">-->
<!--      <el-input v-model="pageData.password" size="small" maxlength="10" show-word-limit></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="姓名">-->
<!--      <el-input v-model="pageData.userName" size="small" maxlength="10" show-word-limit></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="手机号">-->
<!--      <el-input v-model="pageData.phone" size="small" maxlength="11"></el-input>-->
<!--    </el-form-item>-->
<!--    <div style="text-align: center">-->
<!--      <el-button type="primary" disabled>更新</el-button>-->
<!--      <el-button @click="$router.push('/login')" type="primary">切换账号</el-button>-->
<!--    </div>-->
<!--  </el-form>-->
</template>

<script>
import {queryUserProfileAPI} from '@/api/user'

export default {
  data () {
    return {
      pageData: {
        userId: '--',
        loginName: '--',
        password: '',
        userName: '--',
        phone: '',
        type: ''
      }
    }
  },
  created: function () {
    this.queryUserProfile()
  },
  methods: {
    queryUserProfile () {
      queryUserProfileAPI().then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
        }
      })
      console.info('profile')
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 200px;
}
</style>
