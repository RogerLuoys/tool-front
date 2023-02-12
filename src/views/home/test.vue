<template>
  <div id="app">
    <ve-line :data="chartData"></ve-line>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      chartData: {
        columns: ['日期', '测试模块一', '测试模块二'],
        rows: [
          { '日期': '1月1日', '测试模块一': 123, '测试模块二': 21 },
          { '日期': '1月2日', '测试模块一': 1223, '测试模块二': 21 },
          { '日期': '1月3日', '测试模块一': 2123, '测试模块二': 21 },
          { '日期': '2月4日', '测试模块一': 4123, '测试模块二': 21 },
          { '日期': '10月5日', '测试模块一': 3123, '测试模块二': 21 },
          { '日期': '12月6日', '测试模块一': 7123, '测试模块二': 21 }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
