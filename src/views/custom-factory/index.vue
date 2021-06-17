<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="示例1" name="1">
        <el-demo></el-demo>
      </el-collapse-item>
      <el-collapse-item title="示例2" name="2">
        <el-demo></el-demo>
      </el-collapse-item>
      <el-collapse-item title="示例3" name="3">
        <el-demo></el-demo>
      </el-collapse-item>
      <el-collapse-item title="示例4" name="4">
        <el-demo></el-demo>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import elDemo from './demo'
export default {
  components: {elDemo}
}
</script>

<style scoped>

</style>
