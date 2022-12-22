<template>
  <div>
    <el-tabs v-model="pageControl.activeName" @tab-click="handleClick" lazy>
      <el-tab-pane v-for="tab in pageData.list" :key="tab.caseId" :label="tab.name" :name="tab.name">
        <tl-case-list :supper-case-id="tab.caseId"></tl-case-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tlCaseList from './caseList'
import {queryAPI} from '@/api/autoCase'

export default {
  components: {tlCaseList},
  data () {
    return {
      pageData: {
        list: [],
        total: 1
      },
      pageControl: {
        activeName: '',
        search: {
          type: 2
        }
      }
    }
  },
  created: function () {
    // console.info('created')
    this.queryTabs()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 查项目内的所有超类列表
    queryTabs () {
      queryAPI(this.pageControl.search).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
          this.pageControl.activeName = this.pageData.list[0].name
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
