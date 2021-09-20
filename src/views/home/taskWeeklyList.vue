<template>
  <div>
    <el-row>
      <el-col v-for="(item, index) in pageData" :key="index" :span="4">
        <el-card style="width: 160px; height: 480px">
          <template #header>
            <span>{{item.weekName}}</span>
            <el-tooltip x-placement="top">
              <template #content>
                <span>{{item.weekDate}}</span>
              </template>
              <i class="el-icon-info"></i>
            </el-tooltip>
          </template>
          <div v-for="(sonItem, sonIndex) in item.taskList" :key="sonIndex">
            <el-link @click="openDetail(sonItem)" type="primary">{{sonItem.name}}</el-link>
          </div>
          <el-button v-if="item.taskList.length <= 15" @click="newTask(item.weekDate)" type="text" icon="el-icon-plus"></el-button>
        </el-card>
      </el-col>
    </el-row>
    <!--弹出框-->
    <el-dialog v-if="pageControl.isNewTask" :visible.sync="pageControl.isNewTask" width="65%" title="新增公共步骤">
      <tl-task-detail :selected-day="pageControl.selectedDay" :visible.sync="pageControl.isNewTask"></tl-task-detail>
    </el-dialog>
    <el-dialog v-if="pageControl.isEditTask" :visible.sync="pageControl.isEditTask" width="65%" title="编辑步骤">
      <tl-task-detail :task-detail="pageControl.selectTask" :is-edit="true" :visible.sync="pageControl.isEditTask"></tl-task-detail>
    </el-dialog>
  </div>
</template>

<script>
import {queryByWeeklyAPI} from '@/api/task'
import tlTaskDetail from './taskDetail'

export default {
  components: {tlTaskDetail},
  data () {
    return {
      pageData: [{
        weekName: '周一',
        weekDate: '2021-09-13',
        taskList: [{
          taskId: '',
          name: 'taskName1'
        }]
      }],
      pageControl: {
        isNewTask: false,
        isEditTask: false,
        selectedDay: '',
        selectTask: {}
      }
    }
  },
  watch: {
    'pageControl.isNewTask': function () {
      if (!this.pageControl.isNewTask) {
        this.query()
      }
    },
    'pageControl.isEditTask': function () {
      if (!this.pageControl.isEditTask) {
        this.query()
      }
    }
  },
  created () {
    this.query()
  },
  methods: {
    openDetail (task) {
      this.pageControl.selectTask = task
      this.pageControl.isEditTask = true
    },
    newTask (day) {
      this.pageControl.isNewTask = true
      this.pageControl.selectedDay = day
    },
    query () {
      queryByWeeklyAPI().then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
        }
      })
    }
  }

}
</script>

<style scoped>

</style>
