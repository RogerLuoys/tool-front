<template>
  <div>
    <codemirror
      ref="cm"
      v-model="values"
      :options="options"
    ></codemirror>
  </div>
</template>

<script>
// 全局引入vue-codemirror
import { codemirror } from 'vue-codemirror'
// 引入css文件
import 'codemirror/lib/codemirror.css'
// 引入主题 可多个
import 'codemirror/theme/ayu-mirage.css'
// 引入语言模式 可多个
import 'codemirror/mode/sql/sql.js'
export default {
  components: { codemirror },
  props: {
    value: {
      default: ''
    }
  },
  data () {
    return {
      values: '',
      options: {
        // 语言及语法模式
        mode: 'text/x-sql',
        // 主题
        theme: 'ayu-mirage',
        // 显示函数
        line: true,
        lineNumbers: true,
        // 软换行
        lineWrapping: true,
        // tab宽度
        tabSize: 4
      }
    }
  },
  methods: {
    inputChange (content) {
      this.$nextTick(() => {
        console.log('content:' + content)
      })
    }
  }
}
</script>
