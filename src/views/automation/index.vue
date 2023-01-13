<template>
  <div>
    <el-tabs v-model="pageControl.activeName" lazy type="border-card">
      <el-tab-pane v-for="tab in pageData.list" :key="tab.caseId" :label="tab.name" :name="tab.name">
        <tl-case-list :supper-case-id="tab.caseId"></tl-case-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tlCaseList from './caseList'
import {queryAPI as queryCaseAPI} from '@/api/autoCase'
import {queryAPI as queryResourceAPI} from '@/api/resource'

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
    this.queryDb()
    this.queryPo()
  },
  methods: {
    // 查项目内的所有超类列表
    queryTabs () {
      // 这块数据很少改变，所以缓存到store中，刷新页面会重新请求数据
      if (this.$store.state.supperCaseList === undefined) {
        queryCaseAPI(this.pageControl.search).then(response => {
          if (response.data.success === true) {
            this.pageData = response.data.data
            this.pageControl.activeName = this.pageData.list[0].name
            this.$store.state.supperCaseList = response.data.data.list
          }
        })
      } else {
        this.pageData.list = this.$store.state.supperCaseList
        this.pageData.total = this.pageData.list.length
        this.pageControl.activeName = this.pageData.list[0].name
      }
    },
    queryDb () {
      queryResourceAPI({type: 1}).then(response => {
        if (response.data.success === true) {
          let list = []
          response.data.data.list.map(item => {
            list.push({methodId: item.resourceId, methodName: item.name})
          })
          this.$store.state.dbList = list
          // console.info(this.$store.state.dbList)
          // console.info(list)
        }
      })
    },
    queryPo () {
      queryCaseAPI({type: 3}).then(response => {
        if (response.data.success === true) {
          let list = []
          response.data.data.list.map(item => {
            list.push({methodId: item.caseId, methodName: item.name})
          })
          this.$store.state.poList = list
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
