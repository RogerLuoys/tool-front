<template>
  <div>
    <!--基本信息-->
    <el-form :model="pageData" label-width="90px" size="small">
      <el-form-item label="标题(注释)">
        <el-input v-model="pageData.name" placeholder="请输入标题" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="模块类型">
        <el-radio-group v-model="pageData.moduleType" @change="changeModuleType">
          <el-radio :label="1">PO</el-radio>
          <el-radio :label="2">SQL</el-radio>
          <el-radio :label="3">RPC</el-radio>
          <el-radio :label="4">HTTP</el-radio>
          <el-radio :label="5">UI</el-radio>
          <el-radio :label="6">UTIL</el-radio>
          <el-radio :label="7">ASSERTION</el-radio>
          <el-radio :label="-1">未定义</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--模板-->
      <el-divider content-position="right"></el-divider>
      <el-form-item label="方法类型">
        <el-row :gutter="5">
          <el-col :span="4">
            <!--PO类型-->
            <template v-if="pageData.moduleType===1">
              <el-select v-model="pageData.methodType" @change="changeMethodType" placeholder="请求方法"
                         style="float:left; width: 100px">
                <el-option key="1" label="Normal" :value="1"></el-option>
                <el-option key="2" label="Json" :value="2"></el-option>
              </el-select>
            </template>
            <!--SQL类型-->
            <template v-if="pageData.moduleType===2">
              <el-select v-model="pageData.methodType" @change="changeMethodType" placeholder="请求方法"
                         style="float:left; width: 100px">
                <el-option key="1" label="Normal" :value="1"></el-option>
                <el-option key="2" label="Json" :value="2"></el-option>
              </el-select>
            </template>
            <!--RPC类型-->
            <template v-if="pageData.moduleType===3">
              <el-select v-model="pageData.methodType" @change="changeMethodType" placeholder="请求方法"
                         style="float:left; width: 100px">
                <el-option key="1" label="Normal" :value="1"></el-option>
                <el-option key="2" label="Json" :value="2"></el-option>
              </el-select>
            </template>
            <!--HTTP类型-->
            <template v-if="pageData.moduleType===4">
              <el-select v-model="pageData.methodType" @change="changeMethodType" placeholder="请求方法"
                         style="float:left; width: 100px">
                <el-option key="1" label="get" :value="1"></el-option>
                <el-option key="2" label="post" :value="2"></el-option>
                <el-option key="3" label="put" :value="3"></el-option>
                <el-option key="4" label="delete" :value="4"></el-option>
              </el-select>
            </template>
            <!--UI类型-->
            <template v-if="pageData.moduleType===5">
              <el-select v-model="pageData.methodType" @change="changeMethodType" placeholder="操作类型"
                         style="float:left; width: 100px">
                <el-option key="1" label="openUrl" :value="1"></el-option>
                <el-option key="2" label="click" :value="2"></el-option>
                <el-option key="3" label="clickByJs" :value="3"></el-option>
                <el-option key="4" label="clickByMove" :value="4"></el-option>
                <el-option key="5" label="sendKey" :value="5"></el-option>
                <el-option key="6" label="sendKeyByEnter" :value="6"></el-option>
                <el-option key="7" label="move" :value="7"></el-option>
                <el-option key="8" label="drag" :value="8"></el-option>
                <el-option key="9" label="executeJs" :value="9"></el-option>
                <el-option key="10" label="switchTab" :value="10"></el-option>
                <el-option key="11" label="clearCookies" :value="11"></el-option>
              </el-select>
            </template>
            <!--UTIL类型-->
            <template v-if="pageData.moduleType===6">
              <el-select v-model="pageData.methodType" @change="changeMethodType" placeholder="操作类型"
                         style="float:left; width: 100px">
                <el-option key="1" label="sleep" :value="1"></el-option>
                <el-option key="2" label="getJson" :value="2"></el-option>
                <el-option key="3" label="getJsonAny" :value="3"></el-option>
                <el-option key="4" label="random" :value="4"></el-option>
                <el-option key="5" label="getTime" :value="5"></el-option>
              </el-select>
            </template>
            <!--ASSERTION类型-->
            <template v-if="pageData.moduleType===7">
              <el-select v-model="pageData.methodType" @change="changeMethodType" placeholder="操作类型"
                         style="float:left; width: 100px">
                <el-option key="1" label="isEquals" :value="1"></el-option>
                <el-option key="2" label="isContains" :value="2"></el-option>
                <el-option key="3" label="isBeContains" :value="3"></el-option>
                <el-option key="4" label="isDeleted" :value="4"></el-option>
                <el-option key="5" label="isNotDeleted" :value="5"></el-option>
                <el-option key="6" label="isGreater" :value="6"></el-option>
                <el-option key="7" label="isSmaller" :value="7"></el-option>
                <el-option key="8" label="isXpathExist" :value="8"></el-option>
                <el-option key="9" label="isXpathNotExist" :value="9"></el-option>
              </el-select>
            </template>
          </el-col>
          <el-col :span="19">
            <el-tooltip class="item" effect="dark" :content="pageControl.format.description" placement="top-start">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-if="pageControl.format.functionName !== null" :label="pageControl.format.functionName">
<!--        <el-input v-model="pageData.methodName" placeholder="请选择引用的方法名"-->
<!--                  maxlength="30" show-word-limit></el-input>-->
<!--        <el-input v-model="pageData.methodId" placeholder="请选择引用的方法名"-->
<!--                  maxlength="30" show-word-limit></el-input>-->
        <el-select v-model="pageData.methodId" @change="changeMethodId" filterable placeholder="请选择引用的方法名">
          <el-option
            v-for="item in pageControl.options"
            :key="item.methodId"
            :label="item.methodName"
            :value="item.methodId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="pageControl.format.paramName1 !== null" :label="pageControl.format.paramName1">
        <el-input v-model="pageData.parameter1" :autosize="{ minRows: 1, maxRows: 6}" placeholder="请输入参数1" type="textarea"
                  maxlength="5000" show-word-limit></el-input>
      </el-form-item>
      <el-form-item v-if="pageControl.format.paramName2 !== null" :label="pageControl.format.paramName2">
        <el-input v-model="pageData.parameter2" :autosize="{ minRows: 1, maxRows: 6}" placeholder="请输入参数2" type="textarea"
                  maxlength="5000" show-word-limit></el-input>
      </el-form-item>
      <el-form-item v-if="pageControl.format.paramName3 !== null" :label="pageControl.format.paramName3">
        <el-input v-model="pageData.parameter3" :autosize="{ minRows: 1, maxRows: 6}" placeholder="请输入参数3" type="textarea"
                  maxlength="5000" show-word-limit></el-input>
      </el-form-item>
      <el-form-item v-if="pageData.moduleType == null || pageData.moduleType !== -1" label="结果赋值">
        <el-input v-model="pageData.varName" placeholder="不赋值则空置"
                  maxlength="20" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button @click="update()" type="primary" size="small">保存</el-button>
      <el-popconfirm title="确定删除吗？" @confirm="remove">
        <template #reference>
          <el-button size="small">删除</el-button>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
import {updateAPI, removeAPI, queryDetailAPI} from '@/api/autoStep'

export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    stepId: {
      type: String,
      default: ''
    },
    caseStep: {}
  },
  data () {
    return {
      pageData: {
        stepId: null,
        name: null,
        description: null,
        moduleType: null,
        methodType: null,
        methodName: null,
        methodId: null,
        parameter1: null,
        parameter2: null,
        parameter3: null,
        varName: null
      },
      pageControl: {
        options: [{
          methodId: 1,
          methodName: 'test'
        }, {
          methodId: 2,
          methodName: 'test2'
        }],
        format: {
          functionName: null,
          paramName1: null,
          paramName2: null,
          paramName3: null,
          description: '未定义'
        }
      }
    }
  },
  created: function () {
    this.pageData = this.caseStep
    this.changeMethodType()
  },
  watch: {
    // 'pageControl.isSelectDataSource': function () {
    //   if (this.pageControl.isSelectDataSource === false) {
    //     this.pageData.jdbc.dataSource = this.$store.state.selectedDataSource
    //   }
    // }
  },
  methods: {
    changeMethodId (id) {
      for (let i = 0; i < this.pageControl.options.length; i++) {
        if (this.pageControl.options[i].methodId === id) {
          this.pageData.methodName = this.pageControl.options[i].methodName
          break
        }
      }
    },
    changeModuleType () {
      this.pageData.methodType = 1
      this.changeMethodType()
    },
    changeMethodType () {
      switch (this.pageData.moduleType) {
        case 1: // PO
          switch (this.pageData.methodType) {
            case 1: // normal
              this.pageControl.options = this.$store.state.poList
              this.pageControl.format = {
                functionName: 'PO名',
                paramName1: 'PO入参1',
                paramName2: 'PO入参2',
                paramName3: 'PO入参3',
                description: 'auto.po.poName(parameter1, parameter2, parameter3)'
              }
              break
            case 2: // json
              this.pageControl.format = {
                functionName: null,
                paramName1: 'PO入参1',
                paramName2: null,
                paramName3: null,
                description: 'auto.po.execute(parameter1)'
              }
              break
          }
          break
        case 2:
          switch (this.pageData.methodType) {
            case 1: // normal
              this.pageControl.options = this.$store.state.dbList
              this.pageControl.format = {
                functionName: '数据库名',
                paramName1: 'SQL',
                paramName2: null,
                paramName3: null,
                description: 'auto.sql.dbName(sql)'
              }
              break
            case 2: // json
              this.pageControl.format = {
                functionName: null,
                paramName1: 'Json入参',
                paramName2: null,
                paramName3: null,
                description: 'auto.sql.execute(json)'
              }
              break
          }
          break
        case 3:
          switch (this.pageData.methodType) {
            case 1: // normal
              this.pageControl.format = {
                functionName: null,
                paramName1: 'URL',
                paramName2: 'Type',
                paramName3: 'param',
                description: 'auto.rpc.invoke(url, type, param)'
              }
              break
            case 2: // json
              this.pageControl.format = {
                functionName: null,
                paramName1: 'Json入参',
                paramName2: null,
                paramName3: null,
                description: 'auto.rpc.execute(json)'
              }
              break
          }
          break
        case 4:
          switch (this.pageData.methodType) {
            case 1: // get
              this.pageControl.format = {
                functionName: null,
                paramName1: 'url',
                paramName2: 'header',
                paramName3: null,
                description: 'auto.http.get(url, header)'
              }
              break
            case 2: // post
              this.pageControl.format = {
                functionName: null,
                paramName1: 'url',
                paramName2: 'body',
                paramName3: 'header',
                description: 'auto.http.post(url, body, header)'
              }
              break
            case 3: // put
              this.pageControl.format = {
                functionName: null,
                paramName1: 'url',
                paramName2: 'body',
                paramName3: 'header',
                description: 'auto.http.put(url, body, header)'
              }
              break
            case 4: // delete
              this.pageControl.format = {
                functionName: null,
                paramName1: 'url',
                paramName2: 'body',
                paramName3: 'header',
                description: 'auto.http.delete(url, body, header)'
              }
              break
          }
          break
        case 5:
          switch (this.pageData.methodType) {
            case 1: // openUrl
              this.pageControl.format = {
                functionName: null,
                paramName1: 'url',
                paramName2: null,
                paramName3: null,
                description: 'auto.ui.openUrl(url)'
              }
              break
            case 2: // click
              this.pageControl.format = {
                functionName: null,
                paramName1: 'xpath',
                paramName2: 'index',
                paramName3: null,
                description: 'auto.ui.click(xpath, index)'
              }
              break
            case 3: // clickByJs
              this.pageControl.format = {
                functionName: null,
                paramName1: 'xpath',
                paramName2: null,
                paramName3: null,
                description: 'auto.ui.clickByJs(xpath)'
              }
              break
            case 4: // clickByMove
              this.pageControl.format = {
                functionName: null,
                paramName1: 'xpath',
                paramName2: null,
                paramName3: null,
                description: 'auto.ui.clickByMove(xpath)'
              }
              break
            case 5: // sendKey
              this.pageControl.format = {
                functionName: null,
                paramName1: 'xpath',
                paramName2: 'key',
                paramName3: 'index',
                description: 'auto.ui.sendKey(xpath, key, index)'
              }
              break
            case 6: // sendKeyByEnter
              this.pageControl.format = {
                functionName: null,
                paramName1: 'xpath',
                paramName2: 'key',
                paramName3: null,
                description: 'auto.ui.sendKeyByEnter(xpath, key)'
              }
              break
            case 7: // move
              this.pageControl.format = {
                functionName: null,
                paramName1: 'xpath',
                paramName2: null,
                paramName3: null,
                description: 'auto.ui.move(xpath)'
              }
              break
            case 8: // drag
              this.pageControl.format = {
                functionName: null,
                paramName1: 'fromXpath',
                paramName2: 'toXpath',
                paramName3: null,
                description: 'auto.ui.drag(fromXpath, toXpath)'
              }
              break
            case 9: // executeJs
              this.pageControl.format = {
                functionName: null,
                paramName1: 'javascript',
                paramName2: 'xpath',
                paramName3: null,
                description: 'auto.ui.executeJs(javascript, xpath)'
              }
              break
            case 10: // switchTab
              this.pageControl.format = {
                functionName: null,
                paramName1: null,
                paramName2: null,
                paramName3: null,
                description: 'auto.ui.switchTab()'
              }
              break
            case 11: // clearCookies
              this.pageControl.format = {
                functionName: null,
                paramName1: null,
                paramName2: null,
                paramName3: null,
                description: 'auto.ui.clearCookies()'
              }
              break
          }
          break
        case 6:
          switch (this.pageData.methodType) {
            case 1: // sleep
              this.pageControl.format = {
                functionName: null,
                paramName1: 'second',
                paramName2: null,
                paramName3: null,
                description: 'auto.util.sleep(second)'
              }
              break
            case 2: // getJson
              this.pageControl.format = {
                functionName: null,
                paramName1: 'key',
                paramName2: 'json',
                paramName3: null,
                description: 'auto.util.getJson(key, json)'
              }
              break
            case 3: // getJsonAny
              this.pageControl.format = {
                functionName: null,
                paramName1: 'key',
                paramName2: 'json',
                paramName3: null,
                description: 'auto.util.getJsonAny(key, json)'
              }
              break
            case 4: // random
              this.pageControl.format = {
                functionName: null,
                paramName1: 'start',
                paramName2: 'end',
                paramName3: null,
                description: 'auto.util.random(start, end)'
              }
              break
            case 5: // getTime
              this.pageControl.format = {
                functionName: null,
                paramName1: null,
                paramName2: null,
                paramName3: null,
                description: 'auto.util.getTime()'
              }
              break
          }
          break
        case 7:
          switch (this.pageData.methodType) {
            case 1: // isEquals
              this.pageControl.format = {
                functionName: null,
                paramName1: 'actual',
                paramName2: 'expect',
                paramName3: null,
                description: 'auto.assertion.isEquals(actual, expect)'
              }
              break
            case 2: // isContains
              this.pageControl.format = {
                functionName: null,
                paramName1: 'actual',
                paramName2: 'expect',
                paramName3: null,
                description: 'auto.assertion.isContains(actual, expect)'
              }
              break
            case 3: // isBeContains
              this.pageControl.format = {
                functionName: null,
                paramName1: 'actual',
                paramName2: 'expect',
                paramName3: null,
                description: 'auto.assertion.isBeContains(actual, expect)'
              }
              break
            case 4: // isDeleted
              this.pageControl.format = {
                functionName: null,
                paramName1: 'actual',
                paramName2: null,
                paramName3: null,
                description: 'auto.assertion.isDeleted(actual)'
              }
              break
            case 5: // isNotDeleted
              this.pageControl.format = {
                functionName: null,
                paramName1: 'actual',
                paramName2: null,
                paramName3: null,
                description: 'auto.assertion.isNotDeleted(actual)'
              }
              break
            case 6: // isGreater
              this.pageControl.format = {
                functionName: null,
                paramName1: 'actual',
                paramName2: 'expect',
                paramName3: null,
                description: 'auto.assertion.isGreater(actual, expect)'
              }
              break
            case 7: // isSmaller
              this.pageControl.format = {
                functionName: null,
                paramName1: 'actual',
                paramName2: 'expect',
                paramName3: null,
                description: 'auto.assertion.isSmaller(actual, expect)'
              }
              break
            case 8: // isXpathExist
              this.pageControl.format = {
                functionName: null,
                paramName1: 'xpath',
                paramName2: null,
                paramName3: null,
                description: 'auto.assertion.isXpathExist(xpath)'
              }
              break
            case 9: // isXpathNotExist
              this.pageControl.format = {
                functionName: null,
                paramName1: 'xpath',
                paramName2: null,
                paramName3: null,
                description: 'auto.assertion.isXpathNotExist(xpath)'
              }
              break
          }
          break
        default:
          this.pageControl.format = {
            functionName: null,
            paramName1: null,
            paramName2: null,
            paramName3: null,
            description: '未定义类型'
          }
          console.info('?????')
      }
    },
    update () {
      updateAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('编辑步骤成功')
          this.$emit('update:visible', false)
        }
      })
    },
    remove () {
      removeAPI({stepId: this.pageData.stepId}).then(response => {
        if (response.data.success === true) {
          this.$message.success('删除步骤成功')
          this.$emit('update:visible', false)
        }
      })
    },
    queryDetail () {
      queryDetailAPI({
        stepId: this.stepId
      }).then(response => {
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
