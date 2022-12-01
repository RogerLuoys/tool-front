<template>
  <div>
    <!--基本信息-->
    <el-form :model="pageData" label-width="90px" size="small">
      <el-form-item label="标题">
        <el-input v-model="pageData.name" placeholder="请输入标题" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item v-if="!isCaseStep" label="说明">
        <el-input v-model="pageData.description" placeholder="请描述步骤" type="textarea" maxlength="200"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="pageData.type" @change="changeType()" :disabled="isEdit">
          <el-radio :label="-1">未知</el-radio>
          <el-radio :label="1">PO</el-radio>
          <el-radio :label="2">SQL</el-radio>
          <el-radio :label="3">RPC</el-radio>
          <el-radio :label="4">HTTP</el-radio>
          <el-radio :label="5">UI</el-radio>
          <el-radio :label="6">UTIL</el-radio>
          <el-radio :label="7">ASSERTION</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--模板-->
      <el-divider content-position="right"></el-divider>
      <el-form-item v-show="pageData.type!==5" label="预期结果">
        <el-row :gutter="5">
          <el-col :span="4">
            <el-select v-model="pageData.assertType" placeholder="校验类型"
                       style="float:left; width: 100px">
              <el-option :key="-1" label="不校验" :value="-1"></el-option>
              <el-option :key="1" label="equals" :value="1"></el-option>
              <el-option :key="2" label="contains" :value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="19">
            <el-input v-model="pageData.assertExpect" placeholder="请输入预期值"
                      maxlength="200" show-word-limit>
            </el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-if="pageData.type === 4" label="等待时间">
        <el-input-number v-model="pageData.afterSleep" :min="0" :max="30" size="mini"></el-input-number>
        <span>步骤执行完成后的等待时间(单位：秒)</span>
      </el-form-item>
      <!--SQL类型-->
      <div v-if="pageData.type===1">
        <el-form-item label="SQL语句">
          <!--显示sql，无则返回提示，有则返回列表-->
          <div v-if="pageData.jdbc.sqlList === null || pageData.jdbc.sqlList.length===0">暂无Sql，可点+添加</div>
          <div v-else>
            <div v-for="(item, index) in pageData.jdbc.sqlList" :key="index">
              <el-input v-model="pageData.jdbc.sqlList[index].sql" placeholder="请输入单行SQL"
                        maxlength="200" show-word-limit>
                <template #append>
                  <el-button @click="deleteSQL(index)" type="primary">删除</el-button>
                </template>
              </el-input>
            </div>
          </div>
          <!--增加sql控件-->
          <div>
            <el-button @click="newSQL()" type="primary" size="mini" icon="el-icon-plus" plain>新增SQL</el-button>
          </div>
        </el-form-item>
        <el-form-item label="数据源">
          <el-input v-model="pageData.jdbc.dataSource.url" placeholder="请输入数据库URL" maxlength="200" show-word-limit>
          </el-input>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-input v-model="pageData.jdbc.dataSource.driver" placeholder="请输入数据库驱动" maxlength="50" show-word-limit>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="pageData.jdbc.dataSource.username" placeholder="请输入数据库名" maxlength="50" show-word-limit>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="pageData.jdbc.dataSource.password" placeholder="请输入数据库密码" maxlength="50" show-word-limit>
              </el-input>
            </el-col>
            <el-col :span="3">
              <el-button @click="pageControl.isSelectDataSource=true" icon="el-icon-plus" type="primary" plain>点我可快捷关联</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </div>
      <!--HTTP类型-->
      <div v-else-if="pageData.type===2">
        <el-form-item label="URL">
          <el-row :gutter="5">
            <el-col :span="4">
              <el-select v-model="pageData.httpRequest.httpType" placeholder="请求方法"
                         style="float:left; width: 100px">
                <el-option key="1" label="GET" value="GET"></el-option>
                <el-option key="2" label="POST" value="POST"></el-option>
                <el-option key="3" label="PUT" value="PUT"></el-option>
                <el-option key="4" label="DELETE" value="DELETE"></el-option>
              </el-select>
            </el-col>
            <el-col :span="19">
              <el-input v-model="pageData.httpRequest.httpURL" placeholder="请输入URL(可使用${env}参数)"
                        maxlength="200" show-word-limit>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="Header">
          <!--请求头显示，无返回提示，有显示列表-->
          <div v-if="pageData.httpRequest.httpHeaderList===null || pageData.httpRequest.httpHeaderList.length===0">
            暂无自定义请求头，可点+添加
          </div>
          <div v-else>
            <div v-for="(item, index) in pageData.httpRequest.httpHeaderList" :key="index">
              <el-row :gutter="5">
                <el-col :span="10">
                  <el-input v-model="pageData.httpRequest.httpHeaderList[index].name" placeholder="请输入Header名"
                            maxlength="20" show-word-limit></el-input>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="pageData.httpRequest.httpHeaderList[index].value" placeholder="请输入Header值"
                            maxlength="20" show-word-limit>
                  </el-input>
                </el-col>
                <el-col :span="3">
                  <el-button @click="deleteHeader(index)">删除</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
          <div>
            <el-button @click="newHeader()" type="primary" size="mini" icon="el-icon-plus" plain>新增Header</el-button>
          </div>
        </el-form-item>
        <el-form-item label="Body">
          <el-input v-model="pageData.httpRequest.httpBody" :autosize="{ minRows: 4, maxRows: 9}" placeholder="请输入Body" type="textarea"
                    maxlength="500" show-word-limit></el-input>
        </el-form-item>
      </div>
      <!--RPC类型-->
      <div v-else-if="pageData.type===3">
        <el-form-item label="RPC地址">
          <el-input v-model="pageData.rpc.url" placeholder="请输入地址(协议://ip:prod/)(可使用${env}参数)" size="small" maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="接口名">
          <el-input v-model="pageData.rpc.interfaceName" placeholder="请输入接口名，class name" maxlength="200" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="方法名">
          <el-input v-model="pageData.rpc.methodName" placeholder="请输入方法名" maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="入参类型">
          <el-input v-model="pageData.rpc.parameterType" placeholder="请输入参数类型(class name)" maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="入参值">
          <!--Rpc入参显示，无Rpc入参提示，有显示列表-->
          <div v-if="pageData.rpc.parameterList===null || pageData.rpc.parameterList.length===0">
            暂无入参，可点+添加
          </div>
          <div v-else>
            <div v-for="(item, index) in pageData.rpc.parameterList" :key="index">
              <el-row :gutter="5">
                <el-col :span="5">
                  <el-select v-model="pageData.rpc.parameterList[index].comment" clearable size="small" placeholder="请选择类型"
                             style="width:110px; float:left">
                    <el-option key="1" label="String" value="java.lang.String"></el-option>
                    <el-option key="2" label="Integer" value="java.lang.Integer"></el-option>
                    <el-option key="3" label="Date" value="java.util.Date"></el-option>
                    <el-option key="4" label="Long" value="java.lang.Long"></el-option>
                  </el-select>
                  <el-tooltip placement="top-start">
                    <template #content>
                      <span>{{pageData.rpc.parameterList[index].comment}}</span>
                    </template>
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="pageData.rpc.parameterList[index].name" placeholder="请输入rpc参数名" maxlength="50" show-word-limit></el-input>
                </el-col>
                <el-col :span="11">
                  <el-input v-model="pageData.rpc.parameterList[index].value" placeholder="请输入rpc入参"
                            maxlength="100" show-word-limit></el-input>
                </el-col>
                <el-col :span="2">
                  <el-button @click="deleteRpcParam(index)">删除</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
          <!--新增rpc入参-->
          <div>
            <el-button @click="newRpcParam()" type="primary" size="mini" icon="el-icon-plus" plain>新增rpc入参</el-button>
          </div>
        </el-form-item>
      </div>
      <!--UI类型-->
      <div v-else-if="pageData.type===4">
        <el-form-item label="UI操作">
          <el-row :gutter="5">
            <el-col :span="4">
              <el-select v-model="pageData.ui.type" placeholder="操作类型"
                         style="float:left; width: 100px">
                <el-option key="1" label="openUrl" :value="1"></el-option>
                <el-option key="2" label="click" :value="2"></el-option>
                <el-option key="3" label="sendKey" :value="3"></el-option>
                <el-option key="4" label="isExist" :value="4"></el-option>
                <el-option key="5" label="switchFrame" :value="5"></el-option>
                <el-option key="6" label="hover" :value="6"></el-option>
              </el-select>
            </el-col>
            <template v-if="pageData.ui.type===1">
              <el-col :span="19">
                <el-input v-model="pageData.ui.url" placeholder="请输入URL(可使用${env}参数)" maxlength="200" show-word-limit>
                </el-input>
              </el-col>
            </template>
            <template v-else-if="pageData.ui.type===2 || pageData.ui.type===4">
              <el-col :span="14">
                <el-input v-model="pageData.ui.element" placeholder="请输入元素Xpath"
                          maxlength="200" show-word-limit>
                </el-input>
              </el-col>
              <el-col :span="5">
                <el-input-number v-model="pageData.ui.elementId" :min="1" :max="20"></el-input-number>
                <el-tooltip content="如xpath查到多个元素，通过此序号定位，默认为1">
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </el-col>
            </template>
            <template v-else-if="pageData.ui.type===2 || pageData.ui.type===3">
              <el-col :span="7">
                <el-input v-model="pageData.ui.element" placeholder="请输入元素Xpath"
                          maxlength="200" show-word-limit>
                </el-input>
              </el-col>
              <el-col :span="7">
                <el-input v-model="pageData.ui.key" placeholder="请输入要发送的值"
                          maxlength="500" show-word-limit>
                </el-input>
              </el-col>
              <el-col :span="5">
                <el-input-number v-model="pageData.ui.elementId" controls-position="right" :min="1" :max="20"></el-input-number>
                <el-tooltip content="如xpath查到多个元素，通过此序号定位，默认为1">
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </el-col>
            </template>
            <template v-if="pageData.ui.type===5">
              <el-col :span="19">
                <el-input v-model="pageData.ui.element" placeholder="请输入iframe的id、name或xpath" maxlength="200" show-word-limit>
                </el-input>
              </el-col>
            </template>
            <template v-if="pageData.ui.type===6">
              <el-col :span="19">
                <el-input v-model="pageData.ui.element" placeholder="请输入xpath" maxlength="200" show-word-limit>
                </el-input>
              </el-col>
            </template>
          </el-row>
        </el-form-item>
      </div>
      <!--STEPS类型，聚合步骤-->
      <div v-else-if="pageData.type===5">
        <el-form-item label="IF">
          <!--IF列表-->
          <div v-if="pageData.ifStepList===null || pageData.ifStepList.length===0">
            暂无步骤，可点+添加，此模块为空，会跳过then，直接执行else
          </div>
          <div v-else>
            <div v-for="(item, index) in pageData.ifStepList" :key="index">
              <el-row :gutter="5">
                <el-col :span="10">
                  <el-input v-model="pageData.ifStepList[index].stepId" placeholder="步骤编号" maxlength="30" show-word-limit></el-input>
                </el-col>
                <el-col :span="11">
                  <el-input-number v-model="pageData.ifStepList[index].sequence" :min="1" :max="10"></el-input-number>
                </el-col>
                <el-col :span="2">
                  <el-button @click="deleteIfStep(index)">删除</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
          <!--新增步骤-->
          <div>
            <el-button @click="newIfStep()" type="primary" size="mini" icon="el-icon-plus" plain>新增IF步骤</el-button>
            <el-tooltip content="此模块是if语句中判断部分，所有步骤校验为true则判断为true，需输入步骤编号与执行顺序">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </div>
        </el-form-item>
        <el-form-item label="THEN">
          <!--THEN列表-->
          <div v-if="pageData.thenStepList===null || pageData.thenStepList.length===0">
            暂无步骤，可点+添加，if模块步骤全部执行成功才会执行此模块步骤
          </div>
          <div v-else>
            <div v-for="(item, index) in pageData.thenStepList" :key="index">
              <el-row :gutter="5">
                <el-col :span="10">
                  <el-input v-model="pageData.thenStepList[index].stepId" placeholder="步骤编号" maxlength="30" show-word-limit></el-input>
                </el-col>
                <el-col :span="11">
                  <el-input-number v-model="pageData.thenStepList[index].sequence" :min="1" :max="10"></el-input-number>
                </el-col>
                <el-col :span="2">
                  <el-button @click="deleteThenStep(index)">删除</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
          <!--新增步骤-->
          <div>
            <el-button @click="newThenStep()" type="primary" size="mini" icon="el-icon-plus" plain>新增THEN步骤</el-button>
            <el-tooltip content="if模块不为空且判断成功才会执行此模块的步骤，需输入步骤编号与执行顺序">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </div>
        </el-form-item>
        <el-form-item label="ELSE">
          <!--ELSE列表-->
          <div v-if="pageData.elseStepList===null || pageData.elseStepList.length===0">
            暂无步骤，可点+添加，if模块步骤为空，或有执行失败会执行此模块步骤
          </div>
          <div v-else>
            <div v-for="(item, index) in pageData.elseStepList" :key="index">
              <el-row :gutter="5">
                <el-col :span="10">
                  <el-input v-model="pageData.elseStepList[index].stepId" placeholder="步骤编号" maxlength="30" show-word-limit></el-input>
                </el-col>
                <el-col :span="11">
                  <el-input-number v-model="pageData.elseStepList[index].sequence" :min="1" :max="10"></el-input-number>
                </el-col>
                <el-col :span="2">
                  <el-button @click="deleteElseStep(index)">删除</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
          <!--新增步骤-->
          <div>
            <el-button @click="newElseStep()" type="primary" size="mini" icon="el-icon-plus" plain>新增ELSE步骤</el-button>
            <el-tooltip content="if模块为空或判断失败会执行此模块的步骤，需输入步骤编号与执行顺序">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </div>
        </el-form-item>
      </div>
    </el-form>
    <div style="text-align: center">
      <el-button @click="save()" type="primary" size="small">保存</el-button>
      <el-popconfirm v-if="isEdit" title="确定删除吗？" @confirm="remove">
        <template #reference>
          <el-button size="small">删除</el-button>
        </template>
      </el-popconfirm>
    </div>
    <el-dialog v-if="pageControl.isSelectDataSource" :visible.sync="pageControl.isSelectDataSource" append-to-body>
      <tl-select-data-source :visible.sync="pageControl.isSelectDataSource"></tl-select-data-source>
    </el-dialog>
  </div>
</template>

<script>
import {createAPI, updateAPI, removeAPI, queryDetailAPI} from '@/api/autoStep'
import tlSelectDataSource from '../factory/selectDataSource'

export default {
  components: {tlSelectDataSource},
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    stepId: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    caseStep: {},
    isCaseStep: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pageData: {
        stepId: null,
        name: '',
        description: '',
        ownerId: '12',
        ownerName: 'tester',
        isPublic: true,
        type: 1,
        afterSleep: 0,
        assertType: -1,
        assertExpect: '',
        ifStepList: [{area: 'IF', stepId: '123321', sequence: 1}],
        thenStepList: [{area: 'THEN', stepId: '123321', sequence: 1}],
        elseStepList: [{area: 'ELSE', stepId: '123321', sequence: 1}],
        jdbc: {
          dataSource: {
            driver: 'com.mysql.cj.jdbc.Driver',
            url: 'jdbc:mysql://118.24.117.181:3306/onepiece?useUnicode=true&characterEncoding=UTF-8&userSSL=false',
            username: 'testerone',
            password: 'testerone'
          },
          sqlList: null
        },
        httpRequest: {
          httpType: 'GET',
          httpURL: null,
          httpHeaderList: null,
          httpBody: null
        },
        rpc: {
          url: '',
          interfaceName: '',
          methodName: '',
          parameterType: '',
          parameterList: [{
            name: '',
            value: '',
            comment: ''
          }]
        },
        ui: {
          type: 1,
          url: 'url',
          element: 'element',
          elementId: 1
        }
      },
      pageControl: {
        isNewParam: false,
        isNewSQL: false,
        isNewHeader: false,
        isSelectDataSource: false,
        isEdit: false,
        paramType: 'String',
        paramName: '',
        sql: '',
        httpHeader: ''
      }
    }
  },
  created: function () {
    console.info('created')
    if (this.isEdit) {
      this.queryDetail()
    } else if (this.isCaseStep) {
      this.pageData = this.caseStep
    }
  },
  watch: {
    'pageControl.isSelectDataSource': function () {
      if (this.pageControl.isSelectDataSource === false) {
        this.pageData.jdbc.dataSource = this.$store.state.selectedDataSource
      }
    }
  },
  methods: {
    changeType () {
      switch (this.pageData.type) {
        case 1:
          this.pageData.jdbc = {
            dataSource: {
              driver: '',
              url: '',
              username: '',
              password: ''
            },
            sqlList: null
          }
          break
        case 2:
          this.pageData.httpRequest = {
            httpType: 'GET',
            httpBody: '',
            httpURL: '',
            httpHeaderList: null
          }
          break
        case 3:
          this.pageData.rpc = {
            url: '',
            interfaceName: '',
            methodName: '',
            parameterType: '',
            parameterList: null
          }
          break
        case 4:
          this.pageData.ui = {
            type: 1,
            url: '',
            element: '',
            elementId: 0
          }
          break
        default:
          console.info('?????')
      }
    },
    newSQL () {
      if (this.pageData.jdbc.sqlList === null) {
        this.pageData.jdbc.sqlList = [{type: 'UNKNOWN', sql: ''}]
      } else {
        this.pageData.jdbc.sqlList.push({type: 'UNKNOWN', sql: ''})
      }
    },
    deleteSQL (index) {
      this.pageData.jdbc.sqlList.splice(index, 1)
    },
    newHeader () {
      if (this.pageData.httpRequest.httpHeaderList === null) {
        this.pageData.httpRequest.httpHeaderList = [{name: '', value: ''}]
      } else {
        this.pageData.httpRequest.httpHeaderList.push({name: '', value: ''})
      }
    },
    deleteHeader (index) {
      this.pageData.httpRequest.httpHeaderList.splice(index, 1)
    },
    newRpcParam () {
      if (this.pageData.rpc.parameterList === null) {
        this.pageData.rpc.parameterList = [{name: '', value: '', comment: ''}]
      } else {
        this.pageData.rpc.parameterList.push({name: '', value: '', comment: ''})
      }
    },
    deleteRpcParam (index) {
      this.pageData.rpc.parameterList.splice(index, 1)
    },
    newIfStep () {
      if (this.pageData.ifStepList === null) {
        this.pageData.ifStepList = [{area: 'IF', stepId: '', sequence: 1}]
      } else {
        this.pageData.ifStepList.push({area: 'IF', stepId: '', sequence: this.pageData.ifStepList.length + 1})
      }
    },
    deleteIfStep (index) {
      this.pageData.ifStepList.splice(index, 1)
    },
    newThenStep () {
      if (this.pageData.thenStepList === null) {
        this.pageData.thenStepList = [{area: 'THEN', stepId: '', sequence: 1}]
      } else {
        this.pageData.thenStepList.push({area: 'THEN', stepId: '', sequence: this.pageData.thenStepList.length + 1})
      }
    },
    deleteThenStep (index) {
      this.pageData.thenStepList.splice(index, 1)
    },
    newElseStep () {
      if (this.pageData.elseStepList === null) {
        this.pageData.elseStepList = [{area: 'ELSE', stepId: '', sequence: 1}]
      } else {
        this.pageData.elseStepList.push({area: 'ELSE', stepId: '', sequence: this.pageData.elseStepList.length + 1})
      }
    },
    deleteElseStep (index) {
      this.pageData.elseStepList.splice(index, 1)
    },
    save () {
      // 把无关类型的数据去除
      switch (this.pageData.type) {
        // sql类型
        case 1:
          this.pageData.httpRequest = null
          this.pageData.rpc = null
          this.pageData.ui = null
          break
        // http类型
        case 2:
          this.pageData.jdbc = null
          this.pageData.rpc = null
          this.pageData.ui = null
          break
        // rpc类型
        case 3:
          this.pageData.jdbc = null
          this.pageData.httpRequest = null
          this.pageData.ui = null
          break
        case 4:
          this.pageData.jdbc = null
          this.pageData.httpRequest = null
          this.pageData.rpc = null
          break
      }
      if (this.isEdit || this.isCaseStep) {
        this.update()
      } else {
        this.create()
      }
    },
    create () {
      createAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('创建步骤成功')
          this.$emit('update:visible', false)
        }
      })
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
