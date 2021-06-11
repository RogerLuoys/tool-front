<template>
  <div>
    <el-form :model="pageData" label-width="2cm">
      <div v-for="(item, index) in pageData.params" :key="index">
        <el-form-item label="test">
          <el-input v-model="pageData.params[index].paramValue" placeholder="请输入参数" size="small" maxlength="30" show-word-limit></el-input>
        </el-form-item>
      </div>
      <el-form-item label="标题">
        <el-input v-model="pageData.title" placeholder="请输入任务名" size="small" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="pageData.description" placeholder="请描述你的任务" type="textarea" maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="pageData.type"  size="small">
          <el-radio :label="2">SQL</el-radio>
          <el-radio :label="3" disabled>HTTP</el-radio>
          <el-radio :label="4" disabled>DUBBO</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限">
        <el-radio-group v-model="pageData.status"  size="small">
          <el-radio :label="1">公开</el-radio>
          <el-radio :label="2">自己可见</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" size="small">保存</el-button>
      <el-button type="primary" size="small">删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageData: {
        toolId: '',
        title: '',
        description: '',
        template: 1,
        type: 2,
        params: [{
          paramName: '',
          paramValue: ''
        }]
      },
      pageControl: {
        isCreateDailyTask: false
      }
    }
  }
}
</script>

<style scoped>

</style>
