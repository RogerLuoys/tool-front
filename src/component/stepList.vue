<template>
  <div>
    <!--coding模式-->
    <div v-if="isCoding">
      <el-divider content-position="right">
        <span>{{name}}</span>
        <el-tooltip class="item" effect="dark" :content="pageControl.desc" placement="top-start">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </el-divider>
      <el-input @change="updateScript" type="textarea" :autosize="{minRows: 13, maxRows: 200}" placeholder="请输入脚本" v-model="pageData.script"></el-input>
    </div>
    <!--ui模式-->
    <div v-else>
      <el-divider content-position="right">
        <span>{{name}}</span>
        <el-tooltip class="item" effect="dark" :content="pageControl.desc" placement="top-start">
          <i class="el-icon-info"></i>
        </el-tooltip>
        <el-divider direction="vertical"></el-divider>
        <el-button @click="createRelatedStep" type="text">新增</el-button>
        <el-button v-if="pageData.stepList !== null && pageData.stepList.length !== 0" @click="deleteStep" type="text">删除</el-button>
      </el-divider>
      <!--列表-->
      <el-table border :data="pageData.stepList" @row-click="edit" :row-style="{cursor: 'pointer'}" size="mini" style="width: 100%">
        <el-table-column label="步骤简介" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            {{getStepDesc(scope.row.autoStep)}}
          </template>
        </el-table-column>
        <el-table-column label="注释" width="100">
          <template slot-scope="scope">
            {{scope.row.autoStep.name}}
          </template>
        </el-table-column>
        <el-table-column label="预期结果" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{getExpect(scope.row.autoStep)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际结果" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.autoStep.result}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--弹窗-->
    <el-dialog v-if="pageControl.isEditStep" :visible.sync="pageControl.isEditStep" title="编辑步骤" width="65%" append-to-body>
      <tl-step-detail :case-step="pageControl.selectedStep" :visible.sync="pageControl.isEditStep" is-case-step></tl-step-detail>
    </el-dialog>
  </div>
</template>

<script>
import {createRelatedStepAPI, updateScriptAPI, removeRelatedStepAPI} from '@/api/autoCase'
import tlStepDetail from '@/component/stepDetail'

export default {
  components: {tlStepDetail},
  props: {
    name: {
      type: String
    },
    // isCoding: {
    //   type: Boolean,
    //   default: false
    // },
    autoCase: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageData: {
        caseId: 0,
        supperCaseId: 0,
        type: 0,
        script: '',
        stepList: [],
        projectId: 0
      },
      pageControl: {
        isEditStep: false,
        isCoding: this.$store.state.isCoding,
        desc: null,
        script: '',
        // relationType: 0,
        selectedStep: {}
      }
    }
  },
  computed: {
    isCoding () {
      return this.$store.state.isCoding
    }
  },
  watch: {
    '$store.state.isCoding': function (val) {
      this.pageControl.isCoding = this.$store.state.isCoding
      console.info('watch')
    }
  },
  created: function () {
    this.pageData.caseId = this.autoCase.caseId
    this.pageData.supperCaseId = this.autoCase.supperCaseId
    this.pageData.projectId = this.autoCase.projectId
    if (this.name === '@Test') {
      this.pageControl.desc = '用例主体，相当于@Test，步骤会按列表显示的顺序执行'
      this.pageData.type = 2
      this.pageData.script = this.autoCase.test
      this.pageData.stepList = this.autoCase.testList
    } else if (this.name === '@BeforeClass') {
      this.pageControl.desc = '前置步骤，相当于@BeforeTest，在@Test前执行'
      this.pageData.type = 1
      this.pageData.script = this.autoCase.beforeClass
      this.pageData.stepList = this.autoCase.beforeClassList
    } else if (this.name === '@AfterClass') {
      this.pageControl.desc = '收尾步骤，相当于@AfterTest，在@Test后执行'
      this.pageData.type = 3
      this.pageData.script = this.autoCase.afterClass
      this.pageData.stepList = this.autoCase.afterClassList
    } else if (this.name === '@BeforeSuite') {
      this.pageControl.desc = '套件总前置步骤，相当于@BeforeSuite，在@BeforeTest前执行'
      this.pageData.type = 4
      this.pageData.script = this.autoCase.beforeSuite
      this.pageData.stepList = this.autoCase.beforeSuiteList
    } else if (this.name === '@AfterSuite') {
      this.pageControl.desc = '套件总收尾步骤，相当于@AfterSuite，在@AfterTest后执行'
      this.pageData.type = 5
      this.pageData.script = this.autoCase.afterSuite
      this.pageData.stepList = this.autoCase.afterSuiteList
    } else {
      this.$message.error('未知步骤类型')
    }
    console.info('this.autoCase2')
    console.info(this.autoCase)
    console.info(this.autoCase.caseId)
    console.info(this.autoCase.testList)
  },
  methods: {
    getExpect (step) {
      if (step.moduleType === 7) {
        return step.parameter2
      } else {
        return '--'
      }
    },
    getStepDesc (step) {
      console.info(step)
      switch (step.moduleType) {
        case 1: // PO
          switch (step.methodType) {
            case 1: // poName
              return '调用PO方法：' + step.methodName
            case 2: // json
              return '执行PO方法，Json格式'
            default:
              return '未知步骤'
          }
        case 2: // SQL
          switch (step.methodType) {
            case 1: // dbName
              return '在' + step.methodName + '中执行SQL'
            case 2: // json
              return '执行SQL，Json格式'
            default:
              return '未知步骤'
          }
        case 3: // RPC
          switch (step.methodType) {
            case 1: // invoke
              return '调用RPC接口'
            case 2: // json
              return '调用RPC接口，Json格式'
            default:
              return '未知步骤'
          }
        case 4: // HTTP
          switch (step.methodType) {
            case 1: // get
              return '调用GET接口'
            case 2: // post
              return '调用POST接口'
            case 3: // put
              return '调用PUT接口'
            case 4: // delete
              return '调用DELETE接口'
            default:
              return '未知步骤'
          }
        case 5: // UI
          switch (step.methodType) {
            case 1: // openUrl
              return '访问指定网址'
            case 2: // click
              return '点击指定XPATH'
            case 3: // clickByJs
              return '点击指定XPATH，通过JS'
            case 4: // clickByMove
              return '先移动到指定XPATH，再点击'
            case 5: // sendKey
              return '输入指定字符串'
            case 6: // sendKeyByEnter
              return '输入指定字符串，再按ENTER键'
            case 7: // move
              return '移动到指定XPATH'
            case 8: // drag
              return '鼠标拖拽'
            case 9: // executeJs
              return '执行JS'
            case 10: // switchTab
              return '先切换到最新标签页，然后关闭其它'
            case 11: // clearCookies
              return '删除COOKIES'
            default:
              return '未知步骤'
          }
        case 6: // UTIL
          switch (step.methodType) {
            case 1: // sleep
              return '强制等待' + step.parameter1 + '秒'
            case 2: // getJson
              return '获取JSON中指定KEY的值'
            case 3: // getJsonAny
              return '获取JSON或子JSON中指定KEY的值'
            case 4: // random
              return '获取随机数'
            case 5: // getTime
              return '获取当前系统时间'
            default:
              return '未知步骤'
          }
        case 7: // ASSERTION
          switch (step.methodType) {
            case 1: // isEquals
              return '校验实际值是否等于预期值'
            case 2: // isContains
              return '校验实际值是否包含预期值'
            case 3: // isBeContains
              return '校验预期值是否包含实际值'
            case 4: // isDeleted
              return '校验实际值是否逻辑删除'
            case 5: // isNotDeleted
              return '校验实际值是否未逻辑删除'
            case 6: // isGreater
              return '校验实际值是否大于预期值'
            case 7: // isSmaller
              return '校验实际值是否小于预期值'
            case 8: // isXpathExist
              return '校验指定XPATH是否在页面中存在'
            case 9: // isXpathNotExist
              return '校验指定XPATH是否在页面中不存在'
            default:
              return '未知步骤'
          }
        default:
          return '未知步骤'
      }
    },
    deleteStep () {
      removeRelatedStepAPI(this.pageData.stepList.pop()).then(response => {
        if (response.data.success === true) {
          this.$message.success('删除步骤成功')
        }
      })
    },
    createRelatedStep () {
      createRelatedStepAPI({
        caseId: this.pageData.caseId,
        sequence: this.pageData.stepList !== null ? this.pageData.stepList.length + 1 : 1,
        type: this.pageData.type
      }).then(response => {
        if (response.data.success === true) {
          if (this.pageData.stepList == null) {
            this.pageData.stepList = [response.data.data]
          } else {
            this.pageData.stepList.push(response.data.data)
          }
          this.$message.success('创建关联步骤成功，请自行编辑')
        }
      })
    },
    updateScript () {
      updateScriptAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
          this.$message.success('脚本已更新')
        }
      })
    },
    edit (row, event, column) {
      console.info(row.autoStep)
      this.pageControl.selectedStep = row.autoStep
      this.pageControl.isEditStep = true
    }
  }
}
</script>

<style scoped>

</style>
