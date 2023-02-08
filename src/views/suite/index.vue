<template>
  <el-card>
    <suite-list></suite-list>
  </el-card>
</template>

<script>
import suiteList from './suiteList'
import {queryAPI as queryResourceAPI} from '@/api/resource'

export default {
  components: {suiteList},
  created: function () {
    this.querySlave()
  },
  methods: {
    querySlave () { // todo 还有别的条件
      queryResourceAPI({type: 2}).then(response => {
        if (response.data.success === true) {
          let list = []
          response.data.data.list.map(item => {
            list.push({resourceId: item.resourceId, name: item.name, ip: item.slave.url, thread: item.slave.thread})
          })
          this.$store.state.slaveList = list
          // console.info(this.$store.state.dbList)
          // console.info(list)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
