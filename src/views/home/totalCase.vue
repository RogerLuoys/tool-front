<template>
  <div>
    <ve-histogram :data="pageControl.chartData" :settings="pageControl.settings"></ve-histogram>
  </div>
</template>

<script>
import {totalCaseAPI} from '@/api/stat'

export default {
  created: function () {
    totalCaseAPI().then(response => {
      if (response.data.success === true) {
        this.pageData = response.data.data
        this.pageControl.chartData.rows = []
        for (let i = 0; i < this.pageData.length; i++) {
          this.pageControl.chartData.rows.push({'模块': this.pageData[i].name, '总用例': this.pageData[i].totalCase, '今年新增': this.pageData[i].newCase})
        }
      }
    })
  },
  data: function () {
    return {
      pageData: [
        { 'name': '模块二', totalCase: 123, 'newCase': 21 },
        { 'name': '模块一', totalCase: 1223, 'newCase': 21 },
        { 'name': '模块三', totalCase: 2123, 'newCase': 21 },
        { 'name': '模块四', totalCase: 4123, 'newCase': 21 }
      ],
      pageControl: {
        chartData: {
          columns: ['模块', '总用例', '今年新增'],
          rows: [
            { '模块': 'test112233', '总用例': 32371, '今年新增': 19810 }
          ]
        },
        settings: {
          labelAlias: {
            totalCase: '用例总数',
            newCase: '21'
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
