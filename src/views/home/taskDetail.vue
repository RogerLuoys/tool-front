<template>
  <div>
    <el-form :model="pageData" size="small" label-width="2cm">
      <el-form-item label="任务名">
        <el-input v-model="pageData.name" placeholder="请输入任务名" maxlength="8" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="pageData.description" placeholder="请输入描述" type="textarea" maxlength="200" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="save"  size="small">保存</el-button>
      <el-button v-if="isEdit" @click="complete" size="small">完成</el-button>
      <el-button v-if="isEdit" @click="remove" size="small">删除</el-button>
    </div>
  </div>
</template>

<script>
import {createAPI, removeAPI, updateStatusAPI} from '@/api/task'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    selectedDay: {
      type: String,
      default: '1970-01-01'
    },
    taskDetail: {}
  },
  data () {
    return {
      pageData: {
        taskDailyId: '',
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
  created: function () {
    if (this.isEdit) {
      this.pageData = this.taskDetail
    }
  },
  methods: {
    save () {
      if (this.isEdit) {
        this.update()
      } else {
        this.create()
      }
    },
    create () {
      this.pageData.startTime = new Date(this.selectedDay)
      createAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('新增任务成功')
          this.$emit('update:visible', false)
        } else {
          this.$message.success('新增任务失败')
        }
      })
    },
    update () {
      console.info('update')
    },
    complete () {
      updateStatusAPI({
        taskDailyId: this.pageData.taskDailyId,
        status: 2
      }).then(response => {
        if (response.data.success === true) {
          this.queryTaskDailyList()
        }
      })
    },
    remove () {
      removeAPI({taskDailyId: this.pageData.taskDailyId}).then(response => {
        if (response.data.success === true) {
          this.$message.success('删除任务成功')
          this.$emit('update:visible', false)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
