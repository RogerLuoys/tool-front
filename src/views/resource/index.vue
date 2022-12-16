<template>
  <div>
<!--    <tl-list></tl-list>-->
    <el-tabs v-model="pageControl.activeName">
            <el-tab-pane label="数据库" name="first">
              <tl-jdbc-list></tl-jdbc-list>
            </el-tab-pane>
            <el-tab-pane label="执行节点" name="second"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tlJdbcList from './jdbcList'
export default {
  components: {tlJdbcList},
  data () {
    return {
      pageControl: {
        activeName: 'first'
      }
    }
  }
}
</script>

<style scoped>

</style>
