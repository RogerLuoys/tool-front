<template>
  <div>
    <el-row style="background-color: #FFFFFF; height: 35px">
      <el-col :span="20">
        <el-descriptions>
          <el-descriptions-item label="登录账号ID">{{$store.state.userId}}</el-descriptions-item>
          <el-descriptions-item label="昵称">{{$store.state.userName}}</el-descriptions-item>
        </el-descriptions>
      </el-col>
      <el-col :span="4">
        <el-link :underline="false" type="primary">更新</el-link>
        <el-link @click="$router.push('/login')" :underline="false" type="primary">切换账号</el-link>
        <el-link v-if="pageControl.isCalendarVisible" @click="pageControl.isCalendarVisible = false" :underline="false" type="primary">切换至周历</el-link>
        <el-link v-else @click="pageControl.isCalendarVisible = true" :underline="false" type="primary">切换至日历</el-link>
      </el-col>
    </el-row>
    <div style="height: 10px"></div>
    <div v-if="pageControl.isCalendarVisible">
      <tl-task-month-list></tl-task-month-list>
    </div>
    <div v-else>
      <tl-task-weekly-list></tl-task-weekly-list>
    </div>
  </div>
<!--  <el-container style="height: 100%;">-->
<!--    <el-aside width="800px">-->
<!--      <div>-->
<!--        <el-input v-model="$store.state.slaveHost"></el-input>-->
<!--        <el-button @click="test">调主服务器</el-button>-->
<!--        <el-button @click="slaveNode">调从服务器</el-button>-->
<!--      </div>-->
<!--      <div>-->
<!--        <el-button @click="isVisible=true">查看</el-button>-->
<!--      </div>-->
<!--      <div style="cursor: pointer">-->
<!--        测试-->
<!--      </div>-->
<!--    </el-aside>-->
<!--    <el-main style="background-color: lightgrey">-->
<!--      <tl-profile></tl-profile>-->
<!--    </el-main>-->
<!--  </el-container>-->
</template>

<script>

import {queryDetailAPI} from '@/api/user'
import tlTaskMonthList from './taskMonthList'
import tlTaskWeeklyList from './taskWeeklyList'

export default {
  components: {tlTaskMonthList, tlTaskWeeklyList},
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
    // mainNode () {
    //   queryDetailAPI({resourceId: '1'}).then()
    //   // this.$store.commit('setURL', 'http://118.24.117.181:9991/')
    //   // console.info(this.$store.state.commonFactory.testURL)
    // },
    // slaveNode () {
    //   console.info(this.$store.state.slaveHost)
    //   queryDetailAPIS({resourceId: '1'}, this.$store.state.slaveHost).then()
    //   // this.$store.commit('setURL', 'http://118.24.117.181:9991/')
    // },
    // test () {
    //   let users = this.$store.state.userName
    //   console.info(this.$store.state.userName)
    //   console.info(users)
    //   debugger
    // },
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
