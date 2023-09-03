<template>
  <div>
    <el-row style="height: 15px">
      <el-col :span="15">
        <span>编辑测试用例</span>
        <el-button v-if="pageControl.isCoding===true" @click="changeCodeMode(false)" type="text">当前模式:code</el-button>
        <el-button v-else @click="changeCodeMode(true)" type="text">当前模式:ui</el-button>
<!--        <el-radio-group v-model="pageControl.isCoding" @change="$store.state.isCoding=pageControl.isCoding" size="mini">-->
<!--          <el-radio :label="false">ui</el-radio>-->
<!--          <el-radio :label="true">code</el-radio>-->
<!--        </el-radio-group>-->
      </el-col>
      <el-col :span="8" style="text-align: right">
        <el-button @click="use" type="primary" size="small">执行</el-button>
        <el-popconfirm title="用例将被删除，确定吗？" @confirm="remove">
          <template #reference>
            <el-button size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </el-col>
    </el-row>
    <!--基本信息-->
    <el-divider content-position="right"></el-divider>
    <el-form :model="pageData" label-width="90px" size="small">
      <el-form-item label="标题">
        <el-input v-model="pageData.name" @change="update" placeholder="请输入标题" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="pageData.description" @change="update" placeholder="请描述功能和实现方法" type="textarea" maxlength="200"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="所属目录">
        <el-select v-model="pageData.folderId" @change="update" clearable placeholder="请选择目录"
                   style="width:200px">
          <el-option v-for="item in folderList" :key="item.configId" :label="item.name" :value="item.configId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计划完成">
        <el-date-picker type="date" placeholder="计划完成日期" v-model="pageData.finishTime"
                        @change="update" value-format="yyyy-MM-dd" size="small"
                        style="width: 200px"></el-date-picker>
      </el-form-item>
      <!--步骤主体-->
      <tl-step-list name="@Test" :autoCase="pageData" :is-coding="pageControl.isCoding"></tl-step-list>
    </el-form>
  </div>
</template>

<script>
import {createAPI, createRelatedStepAPI, updateAPI, removeAPI, removeRelatedStepAPI, changeUiModeAPI, changeScriptModeAPI, queryDetailAPI, useAPI} from '@/api/autoCase'
import tlStepList from '@/component/stepList'

export default {
  components: {tlStepList},
  props: {
    caseId: {
      type: Number,
      default: 0
    },
    visible: {
      type: Boolean,
      default: true
    },
    folderList: []
  },
  data () {
    return {
      pageData: {
        caseId: null,
        name: 'name',
        folderId: -1,
        description: '',
        environment: '',
        finishTime: '',
        maxTime: 1,
        ownerId: '123',
        ownerName: 'tester',
        type: 1,
        status: 1,
        beforeClassList: [],
        test: '',
        testList: [{
          sequence: null,
          autoStep: {}
        }],
        afterClassList: []
      },
      pageControl: {
        isNewPreStep: false,
        isNewMainStep: false,
        isNewAfterStep: false,
        isEditStep: false,
        isCoding: false,
        preStepId: '',
        mainStepId: '',
        afterStepId: '',
        folderList: [],
        selectedStep: {}
      }
    }
  },
  // watch: {
  //   '$store.state.isQueryCase': function (newVal, oldVal) {
  //     console.info('isQueryCase')
  //     if (newVal === true) {
  //       this.queryDetail()
  //     }
  //   }
  // },
  created: function () {
    this.pageControl.isCoding = this.$store.state.isCoding
    this.queryDetail()
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
    save () {
      if (this.isEdit) {
        this.update()
      } else {
        this.create()
      }
    },
    create () {
      createAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('创建用例成功')
        }
      })
    },
    createRelatedStep (sequence, type, stepId) {
      createRelatedStepAPI({
        caseId: this.pageData.caseId,
        sequence: sequence,
        type: type,
        stepId: stepId
      }).then(response => {
        if (response.data.success === true) {
          this.queryDetail()
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
    update () {
      updateAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('编辑用例成功')
        }
      })
    },
    changeCodeMode (mode) {
      this.pageControl.isCoding = mode
      this.$store.state.isCoding = mode
    },
    changeUiMode () {
      changeUiModeAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.queryDetail()
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
    remove () {
      removeAPI({caseId: this.pageData.caseId}).then(response => {
        if (response.data.success === true) {
          this.$message.success('删除用例成功')
          this.$emit('update:visible', false)
        }
      })
    },
    queryDetail () {
      this.$store.state.isQueryCase = false
      queryDetailAPI({
        caseId: this.caseId
      }).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
          console.info('detail2')
          console.info(this.pageData.toString())
          console.info(this.pageData.caseId)
          console.info(this.pageData.testList)
        }
      })
    },
    use () {
      useAPI(this.pageData, this.$store.state.slaveHost).then(response => {
        if (response.data.success === true) {
          this.pageControl.respondData = response.data.data
          this.$message.success('用例开始执行')
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
