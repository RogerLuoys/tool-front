<template>
  <div>
    <el-calendar>
      <template #dateCell="{data}">
        <!--先判断是否当前选中月份-->
        <div v-if="data.type === 'current-month'">
          <!--判断当前日是否有任务-->
          <div v-if="getAllDates().indexOf(data.day) !== -1">
            <!--按日期展示任务-->
            <el-tooltip  placement="left-start" effect="light">
              <template #content>
                <div v-for="(item, index) in pageData" :key="index">
                  <div v-if="item.startTime === data.day">
                    {{item.taskDailyName}}
                  </div>
                </div>
              </template>
              <div>
                <!--判断日期是否晚于大前天，是则不能加临时任务-->
                <div v-if="checkIsPastDate(data.day) === false">
                  <el-link @click="newTaskDaily(data.day)">
                    {{ data.day.split('-').slice(2).join('-') }}
                  </el-link>
                </div>
                <div v-else>
                  {{ data.day.split('-').slice(2).join('-') }}
                </div>
                <br/>
                <el-link type="primary" @click="callDialog(data.day)">今日有任务</el-link>
              </div>
            </el-tooltip>
          </div>
          <div v-else>
            <!--判断日期是否晚于大前天-->
            <div v-if="checkIsPastDate(data.day) === false">
              <el-tooltip content="点我新增临时任务" placement="right" effect="light">
                <el-link @click="newTaskDaily(data.day)">
                  {{ data.day.split('-').slice(2).join('-') }}
                </el-link>
              </el-tooltip>
            </div>
            <div v-else>
              {{ data.day.split('-').slice(2).join('-') }}
            </div>
          </div>
        </div>
        <div v-else>
          {{ data.day.split('-').slice(2).join('-') }}
        </div>
      </template>
    </el-calendar>
    <!--单日任务列表弹窗-->
    <el-dialog title="今日任务" :visible.sync="pageControl.listDialogVisible">
      <el-collapse accordion>
        <div v-for="(item, index) in pageData" :key="index">
          <div v-if="item.startTime === pageControl.selectedDay">
            <el-collapse-item>
              <template #title>
                <div>
                  <span>{{item.taskDailyName}}</span>
                  <el-tag size="small" :type="getTagType(item.status)">{{getStatus(item.status)}}</el-tag>
                </div>
              </template>
              <el-row>
                <el-col :span="2" style="text-align: right">简介：</el-col>
                <el-col :span="22">{{item.description}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="2" style="text-align: right">备注：</el-col>
                <el-col :span="22">
                  <el-input
                    v-if="pageControl.isCommentInputVisible"
                    v-model="pageControl.selectedComment"
                    ref="saveTagInput"
                    type="textarea"
                    placeholder="请输入备注"
                    @keyup.enter.native="changeComment(item.taskDailyId)"
                    @blur="changeComment(item.taskDailyId)">
                  </el-input>
                  <span v-else>{{item.comment}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2" style="text-align: right">积分：</el-col>
                <el-col :span="22">{{item.point}}</el-col>
              </el-row>
              <div v-if="item.status === 2" style="text-align: center">
                <el-button type="primary" size="mini" @click="selectComment(item.comment)" plain>更改备注</el-button>
              </div>
              <div v-else-if="item.status === 1 && item.bindType === 1" style="text-align: center">
                <el-button type="primary" size="mini" @click="completeTaskDaily(item.taskDailyId)" plain>完成</el-button>
                <el-button type="primary" size="mini" @click="selectComment(item.comment)" plain>更改备注</el-button>
              </div>
              <div v-else-if="item.status === 1 && item.bindType === 2" style="text-align: center">
                <el-button type="primary" size="mini" plain>提醒</el-button>
              </div>
              <div v-else>异常状态</div>
            </el-collapse-item>
          </div>
        </div>
      </el-collapse>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pageControl.listDialogVisible = false" type="primary" plain>知道了</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增临时任务" :visible.sync="$store.state.taskDaily.isTaskDailyVisible">
      <task-daily-detail :selectedDay="pageControl.selectedDay"></task-daily-detail>
    </el-dialog>
  </div>
</template>

<script>
import taskDailyDetail from './task-daily-detail'
import {queryTaskDailyListAPI, modifyTaskDailyStatusAPI, modifyTaskDailyCommentAPI} from '@/api/taskDaily'

export default {
  components: {taskDailyDetail},
  data () {
    return {
      pageData: [],
      pageControl: {
        selectedComment: '',
        isCommentInputVisible: false,
        listDialogVisible: false,
        disable: false,
        selectedDay: '',
        activeName: '-1'
      }
    }
  },
  watch: {
    '$store.state.taskDaily.isTaskDailyVisible': function (newVal, oldVal) {
      if (newVal === false) {
        this.queryTaskDailyList()
      }
    }
  },
  created: function () {
    this.queryTaskDailyList()
  },
  methods: {
    changeComment (taskDailyId) {
      modifyTaskDailyCommentAPI({
        comment: this.pageControl.selectedComment,
        taskDailyId: taskDailyId
      }).then(response => {
        if (response.data.success === true) {
          this.queryTaskDailyList()
          this.$message.success('更新备注成功')
        } else {
          this.$message.error('更新备注失败')
        }
      })
      this.pageControl.isCommentInputVisible = false
    },
    selectComment (comment) {
      if (this.pageControl.isCommentInputVisible === false) {
        this.pageControl.isCommentInputVisible = true
        this.pageControl.selectedComment = comment
      } else {
        this.changeComment()
        this.pageControl.isCommentInputVisible = false
      }
    },
    getStatus (status) {
      let flagStatus = ''
      switch (status) {
        case 1:
          flagStatus = '进行中'
          break
        case 2:
          flagStatus = '已完成'
          break
        case 3:
          flagStatus = '撤销'
          break
        case 4:
          flagStatus = '暂停'
          break
      }
      return flagStatus
    },
    getTagType (status) {
      let tagType = ''
      switch (status) {
        case 1:
          // 进行中
          tagType = '-'
          break
        case 2:
          // 已完成
          tagType = 'success'
          break
        case 3:
          // 撤销
          tagType = 'info'
          break
        case 4:
          // 暂时
          tagType = 'warning'
          break
      }
      return tagType
    },
    checkIsPastDate (day) {
      let today = new Date()
      let yesterday = today.setTime(today.getTime() - 24 * 60 * 60 * 1000 * 3)
      let dateCellDay = new Date(day)
      if (dateCellDay < yesterday) {
        return true
      } else {
        return false
      }
    },
    completeTaskDaily (taskDailyId) {
      modifyTaskDailyStatusAPI({
        taskDailyId: taskDailyId,
        pointId: this.$store.state.point.pointId,
        status: 2
      }).then(response => {
        if (response.data.success === true) {
          this.queryTaskDailyList()
        }
      })
    },
    queryTaskDailyList () {
      let today = new Date()
      queryTaskDailyListAPI({
        currentYear: today.getFullYear()
      }).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
        }
      })
    },
    getAllDates () {
      let startTimes = ''
      let myTask = this.pageData
      for (let i = 0; i < myTask.length; i++) {
        startTimes = startTimes + ' ' + myTask[i].startTime
      }
      return startTimes
    },
    callDialog (selectedDay) {
      this.pageControl.listDialogVisible = true
      this.pageControl.selectedDay = selectedDay
    },
    newTaskDaily (selectedDay) {
      this.pageControl.selectedDay = selectedDay
      this.$store.commit('setTaskDailyVisible', true)
    }
  }
}
</script>

<style scoped>

</style>
