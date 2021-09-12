<template>
  <div>
    <el-form :model="pageData" size="small" label-width="2cm">
      <el-form-item label="任务名">
        <el-input v-model="pageData.name" placeholder="请输入任务名" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="pageData.description" placeholder="请输入描述" type="textarea" maxlength="200" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="onSubmit"  size="small">保存</el-button>
    </div>
  </div>
</template>

<script>
import {newTaskDailyAPI} from '@/api/taskDaily'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    selectedDay: {
      type: String,
      default: '1970-01-01'
    }
  },
  data () {
    return {
      pageData: {
        name: '',
        description: '',
        status: 1,
        startTime: Date,
        endTime: null
      },
      pageControl: {
        isCreateDailyTask: false
      }
    }
  },
  mounted: function () {
    this.restoreData()
  },
  methods: {
    onSubmit () {
      this.pageData.startTime = new Date(this.selectedDay)
      newTaskDailyAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('新增任务成功')
          this.$emit('update:visible', false)
        } else {
          this.$message.success('新增任务失败')
        }
      })
    },
    restoreData () {
      this.pageData.flagId = ''
      this.pageData.name = ''
      this.pageData.description = ''
      this.pageData.point = 1
      this.pageData.startTime = ''
      this.pageData.endTime = ''
    }
  }
}
</script>

<style scoped>

</style>
