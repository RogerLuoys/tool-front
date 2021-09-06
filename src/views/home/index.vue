<template>
  <el-container style="height: 100%;">
    <el-aside width="800px">
      <div>
        <el-input v-model="$store.state.slaveHost"></el-input>
        <el-button @click="test">调主服务器</el-button>
        <el-button @click="slaveNode">调从服务器</el-button>
      </div>
      <div>
        <el-button @click="isVisible=true">查看</el-button>
      </div>
      <div style="cursor: pointer">
        测试
      </div>
    </el-aside>
    <el-main style="background-color: lightgrey">
      <el-form ref="pageData" label-width="3cm" style="max-width: 800px">
        <el-form-item label="当前登录">
          <div>
            {{$store.state.userName}}
          </div>
        </el-form-item>
        <el-form-item label="当前从节点">
          <div>
            {{$store.state.slaveHost}}
          </div>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>

import {queryDetailAPI, queryDetailAPIS} from '@/api/test'

export default {
  data () {
    return {
      customURL: '',
      isVisible: false
    }
  },
  methods: {
    mainNode () {
      queryDetailAPI({resourceId: '1'}).then()
      // this.$store.commit('setURL', 'http://118.24.117.181:9991/')
      // console.info(this.$store.state.commonFactory.testURL)
    },
    slaveNode () {
      console.info(this.$store.state.slaveHost)
      queryDetailAPIS({resourceId: '1'}, this.$store.state.slaveHost).then()
      // this.$store.commit('setURL', 'http://118.24.117.181:9991/')
    },
    test () {
      let users = this.$store.state.userName
      console.info(this.$store.state.userName)
      console.info(users)
      debugger
    }
  }
}
</script>

<style scoped>

</style>
