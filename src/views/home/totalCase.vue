<template>
  <div>
    <ve-histogram :data="chartData"></ve-histogram>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      chartData: {
        columns: ['日期', '总用例数', '本年新增'],
        rows: [
          { '日期': '模块二', '总用例数': 123, '本年新增': 21 },
          { '日期': '模块一', '总用例数': 1223, '本年新增': 21 },
          { '日期': '模块三', '总用例数': 2123, '本年新增': 21 },
          { '日期': '模块四', '总用例数': 4123, '本年新增': 21 }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
