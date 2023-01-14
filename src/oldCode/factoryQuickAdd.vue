<template>
  <div>
    <el-form>
      <el-form-item label="驱动">
        <el-input v-model="pageData.dataSource.driver" disabled></el-input>
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="pageData.dataSource.url"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="pageData.dataSource.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="pageData.dataSource.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {createAPI} from '@/api/device'
export default {
  data () {
    return {
      pageData: {
        title: '',
        permission: 2,
        type: 1,
        dataSource: {
          driver: 'com.mysql.cj.jdbc.Driver',
          url: '',
          userName: '',
          password: ''
        }
      },
      pageControl: {
        isNewParam: false
      }
    }
  },
  methods: {
    create () {
      this.pageData.title = '临时配置' + this.pageData.dataSource.userName
      createAPI(this.pageData).then()
    }
  }
}
</script>

<style scoped>

</style>
