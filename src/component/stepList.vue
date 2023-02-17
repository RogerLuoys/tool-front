<template>
  <div>
    <!--coding模式-->
    <div v-if="isCoding">
      <el-divider content-position="right">
        <el-button @click="changeUiMode" type="text">检查并同步</el-button>
        <span>主要步骤@Test</span>
        <el-tooltip class="item" effect="dark" content="用例主体，相当于@Test，步骤会按列表显示的顺序执行" placement="top-start">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </el-divider>
      <el-input @change="update" type="textarea" :autosize="{minRows: 13, maxRows: 200}" placeholder="请输入脚本" v-model="pageData.mainSteps"></el-input>
    </div>
    <!--ui模式-->
    <div v-else>
      <el-divider content-position="right">
        <span>主要步骤</span>
        <el-tooltip class="item" effect="dark" content="用例主体，相当于@Test，步骤会按列表显示的顺序执行" placement="top-start">
          <i class="el-icon-info"></i>
        </el-tooltip>
        <el-divider direction="vertical"></el-divider>
        <el-button @click="createRelatedStep(stepList !== null ? stepList.length + 1 : 1, 2, null)" type="text">新增</el-button>
        <el-button v-if="stepList !== null && stepList.length !== 0" @click="deleteStep(stepList.pop())" type="text">删除</el-button>
      </el-divider>
      <!--列表-->
      <el-table border :data="stepList" @row-click="edit" :row-style="{cursor: 'pointer'}" size="mini" style="width: 100%">
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
import {createRelatedStepAPI, removeRelatedStepAPI, changeUiModeAPI, changeScriptModeAPI} from '@/api/autoCase'
import tlStepDetail from '@/component/stepDetail'

export default {
  components: {tlStepDetail},
  props: {
    caseId: {
      type: Number,
      default: 0
    },
    stepList: {},
    isCoding: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      pageData: {},
      pageControl: {
        isNewPreStep: false,
        isNewMainStep: false,
        isNewAfterStep: false,
        isEditStep: false,
        isCoding: false,
        preStepId: '',
        mainStepId: '',
        afterStepId: '',
        selectedStep: {}
      }
    }
  },
  watch: {
    'pageControl.isEditStep': function () {
      if (!this.pageControl.isEditStep) {
        // this.checkCaseType()
      }
    }
  },
  created: function () {
    if (this.isEdit) {
      // this.queryDetail()
    }
  },
  methods: {
    getExpect (step) {
      if (step.moduleType === 7) {
        return step.parameter2
      } else {
        return '不校验'
      }
    },
    getStepDesc (step) {
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
    deleteStep (data) {
      removeRelatedStepAPI(data).then(response => {
        if (response.data.success === true) {
          this.$message.success('删除步骤成功')
        }
      })
    },
    createRelatedStep (sequence, type, stepId) {
      createRelatedStepAPI({
        caseId: this.caseId,
        sequence: sequence,
        type: type,
        stepId: stepId
      }).then(response => {
        if (response.data.success === true) {
          // this.queryDetail()
          this.$message.success('创建关联步骤成功，请自行编辑')
        }
      })
      this.pageControl.isNewPreStep = false
      this.pageControl.isNewMainStep = false
      this.pageControl.isNewAfterStep = false
      this.pageControl.preStepId = ''
      this.pageControl.mainStepId = ''
      this.pageControl.afterStepId = ''
    },
    changeUiMode () {
      changeUiModeAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          // this.queryDetail()
          this.$message.success('检查通过')
        }
      })
    },
    changeScriptMode () {
      changeScriptModeAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('同步成功')
        }
      })
    },
    update () {
      console.info('update')
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