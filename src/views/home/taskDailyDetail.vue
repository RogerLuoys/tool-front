<template>
  <div>
    <el-form :model="pageData" label-width="2cm">
      <el-form-item label="任务名">
        <el-input v-model="pageData.taskDailyName" placeholder="请输入任务名" size="small" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="积分">
        <el-input-number v-model="pageData.point" placeholder="请输入积分" controls-position="right" size="small" :min="1" :max="10000"></el-input-number>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="pageData.description" placeholder="请输入描述" type="textarea" maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="关联Flag">
        <el-input v-model="pageData.flagId" placeholder="请输入要关联的flagId" size="small"></el-input>
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
    selectedDay: {
      type: String,
      default: '1970-01-01'
    }
  },
  data () {
    return {
      pageData: {
        flagId: '',
        taskDailyName: '',
        description: '',
        point: 1,
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
      let day = new Date(this.selectedDay)
      newTaskDailyAPI({
        flagId: this.pageData.flagId,
        taskDailyName: this.pageData.taskDailyName,
        description: this.pageData.description,
        point: this.pageData.point,
        startTime: day,
        endTime: this.selectedDay
      }).then(response => {
        if (response.data.success === true) {
          this.$message.success('新增任务成功')
          this.$store.commit('setTaskDailyVisible', false)
        } else {
          this.$message.success('新增任务失败')
        }
      })
    },
    restoreData () {
      this.pageData.flagId = ''
      this.pageData.taskDailyName = ''
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
