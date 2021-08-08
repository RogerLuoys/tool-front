<template>
  <div>
    <el-input v-model="$store.state.slaveHost"></el-input>
    <el-button @click="mainNode">调主服务器</el-button>
    <el-button @click="slaveNode">调从服务器</el-button>
  </div>
</template>

<script>

import {queryDetailAPI, queryDetailAPIS} from '@/api/test'

export default {
  data () {
    return {
      customURL: ''
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
    }
  }
}
</script>

<style scoped>

</style>
