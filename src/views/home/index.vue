<template>
  <el-card>
    <el-row style="background-color: #FFFFFF; height: 35px">
      <el-col :span="20">
        <el-descriptions>
          <el-descriptions-item label="当前账号">{{$store.state.userName}}</el-descriptions-item>
<!--          <el-descriptions-item label="当前项目">{{$store.state.userId}}</el-descriptions-item>-->
        </el-descriptions>
      </el-col>
      <el-col :span="4">
        <el-link @click="$router.push('/login')" :underline="false" type="primary">切换账号</el-link>
        <el-link v-if="pageControl.isCalendarVisible" @click="pageControl.isCalendarVisible = false" :underline="false" type="primary">任务日历</el-link>
        <el-link v-else @click="pageControl.isCalendarVisible = true" :underline="false" type="primary">统计数据</el-link>
      </el-col>
    </el-row>
    <div style="height: 10px"></div>
    <div v-if="pageControl.isCalendarVisible">
      <tl-task-month-list></tl-task-month-list>
    </div>
    <div v-else>
      <div>用例总数</div>
      <tl-total-case></tl-total-case>
    </div>
<!--    <tl-test></tl-test>-->
  </el-card>
</template>

<script>

import {queryDetailAPI} from '@/api/user'
import tlTaskMonthList from './taskMonthList'
import tlTest from './test'
import tlTotalCase from './totalCase'

export default {
  components: {tlTaskMonthList, tlTest, tlTotalCase},
  data () {
    return {
      pageData: {
        userId: '--',
        loginName: '--',
        password: '',
        userName: '--',
        phone: '',
        type: ''
      },
      pageControl: {
        isCalendarVisible: false
      }
    }
  },
  created: function () {
    this.queryDetail()
  },
  methods: {
    queryDetail () {
      queryDetailAPI().then(response => {
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
