<template>
  <div>
    <!--基本信息-->
    <el-form :model="pageData" label-width="90px">
      <el-form-item label="标题">
        <el-input v-model="pageData.name" placeholder="请输入标题" size="small" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="pageData.description" placeholder="请描述步骤" type="textarea" maxlength="200"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="pageData.type" :disabled="isEdit" size="small">
          <el-radio :label="1">SQL</el-radio>
          <el-radio :label="2">HTTP</el-radio>
          <el-radio :label="3">RPC</el-radio>
          <el-radio :label="4">UI</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="预期结果">
        <el-row :gutter="5">
          <el-col :span="4">
            <el-select v-model="pageData.assertType" size="small" placeholder="校验类型"
                       style="float:left; width: 100px">
              <el-option :key="-1" label="不校验" :value="-1"></el-option>
              <el-option :key="1" label="equals" :value="1"></el-option>
              <el-option :key="2" label="contains" :value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="19">
            <el-input v-model="pageData.expectResult" size="small" placeholder="请输入预期值"
                      maxlength="200" show-word-limit>
            </el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <!--模板-->
      <el-divider content-position="right"></el-divider>
      <!--SQL类型-->
      <div v-if="pageData.type===1">
        <el-form-item label="SQL语句">
          <!--显示sql，无则返回提示，有则返回列表-->
          <div v-if="pageData.jdbc.sqlList === null || pageData.jdbc.sqlList.length===0">暂无Sql，可点+添加</div>
          <div v-else>
            <div v-for="(item, index) in pageData.jdbc.sqlList" :key="index">
              <el-input v-model="pageData.jdbc.sqlList[index].sql" placeholder="请输入单行SQL" size="small"
                        maxlength="200" show-word-limit>
                <template #append>
                  <el-button @click="deleteSQL(index)" type="primary" size="small">删除</el-button>
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
          <el-input v-model="pageData.jdbc.dataSource.url" size="small" placeholder="请输入数据库URL" maxlength="200" show-word-limit>
          </el-input>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-input v-model="pageData.jdbc.dataSource.driver" size="small" placeholder="请输入数据库驱动" maxlength="50" show-word-limit>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="pageData.jdbc.dataSource.username" size="small" placeholder="请输入数据库名" maxlength="50" show-word-limit>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="pageData.jdbc.dataSource.password" size="small" placeholder="请输入数据库密码" maxlength="50" show-word-limit>
              </el-input>
            </el-col>
            <el-col :span="3">
              <el-button @click="$store.commit('setDataSourceDialog', true)" size="small" icon="el-icon-plus" type="primary" plain>点我可快捷关联</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </div>
      <!--HTTP类型-->
      <div v-else-if="pageData.type===2">
        <el-form-item label="URL">
          <el-row :gutter="5">
            <el-col :span="4">
              <el-select v-model="pageData.httpRequest.httpType" size="small" placeholder="请求方法"
                         style="float:left; width: 100px">
                <el-option key="1" label="GET" value="GET"></el-option>
                <el-option key="2" label="POST" value="POST"></el-option>
                <el-option key="3" label="PUT" value="PUT"></el-option>
                <el-option key="4" label="DELETE" value="DELETE"></el-option>
              </el-select>
            </el-col>
            <el-col :span="19">
              <el-input v-model="pageData.httpRequest.httpURL" size="small" placeholder="请输入URL"
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
                  <el-input v-model="pageData.httpRequest.httpHeaderList[index].name" size="small" placeholder="请输入Header名"
                            maxlength="20" show-word-limit></el-input>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="pageData.httpRequest.httpHeaderList[index].value" size="small" placeholder="请输入Header值"
                            maxlength="20" show-word-limit>
                  </el-input>
                </el-col>
                <el-col :span="3">
                  <el-button @click="deleteHeader(index)" size="small">删除</el-button>
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
          <el-input v-model="pageData.rpc.url" placeholder="请输入地址(协议://ip:prod/)" size="small" maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="接口名">
          <el-input v-model="pageData.rpc.interfaceName" placeholder="请输入接口名，class name" size="small" maxlength="200" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="方法名">
          <el-input v-model="pageData.rpc.methodName" placeholder="请输入方法名" maxlength="50" size="small" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="入参类型">
          <el-input v-model="pageData.rpc.parameterType" placeholder="请输入参数类型(class name)" maxlength="100" size="small" show-word-limit></el-input>
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
                  <el-input v-model="pageData.rpc.parameterList[index].comment" placeholder="请输入rpc参数类型(class name)" maxlength="100" size="small" show-word-limit></el-input>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="pageData.rpc.parameterList[index].name" placeholder="请输入rpc参数名" maxlength="50" size="small" show-word-limit></el-input>
                </el-col>
                <el-col :span="11">
                  <el-input v-model="pageData.rpc.parameterList[index].value" placeholder="请输入rpc入参" size="small"
                            maxlength="100" show-word-limit></el-input>
                </el-col>
                <el-col :span="2">
                  <el-button @click="deleteRpcParam(index)" size="small">删除</el-button>
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
              <el-select v-model="pageData.ui.type" size="small" placeholder="操作类型"
                         style="float:left; width: 100px">
                <el-option key="1" label="openUrl" :value="1"></el-option>
                <el-option key="2" label="click" :value="2"></el-option>
                <el-option key="3" label="sendKey" :value="3"></el-option>
                <el-option key="4" label="isExist" :value="4"></el-option>
              </el-select>
            </el-col>
            <el-col :span="19">
              <el-input v-if="pageData.ui.type===1" v-model="pageData.ui.url" size="small" placeholder="请输入URL"
                        maxlength="200" show-word-limit>
              </el-input>
              <el-input v-else v-model="pageData.ui.element" size="small" placeholder="请输入元素Xpath"
                        maxlength="200" show-word-limit>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </div>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" size="small">试用</el-button>
      <el-button @click="save()" type="primary" size="small">保存</el-button>
      <el-button v-if="isEdit" @click="remove()" size="small">删除</el-button>
    </div>
  </div>
</template>

<script>
import {createAPI, updateAPI, removeAPI, queryDetailAPI} from '@/api/autoStep'
// import tlSelectDataSource from './selectDataSource'

export default {
  // components: {tlSelectDataSource},
  props: {
    stepId: {
      type: String,
      default: '0'
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pageData: {
        stepId: 1,
        name: '',
        description: '',
        ownerId: '12',
        ownerName: 'tester',
        isPublic: 1,
        type: 1,
        assertType: -1,
        expectResult: '',
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
        isContactDB: false,
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
    }
  },
  watch: {
    '$store.state.commonFactory.selectedDataSource': function (newVal, oldVal) {
      this.pageData.jdbc.dataSource = this.$store.state.selectedDataSource
    }
  },
  methods: {
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
    save () {
      if (this.isEdit) {
        this.update()
      } else {
        this.create()
      }
    },
    create () {
      switch (this.pageData.type) {
        // sql类型
        case 1:
          this.pageData.httpRequest = null
          this.pageData.rpc = null
          break
        // http类型
        case 2:
          this.pageData.jdbc = null
          this.pageData.rpc = null
          break
        // rpc类型
        case 3:
          this.pageData.jdbc = null
          this.pageData.httpRequest = null
          break
      }
      createAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('创建步骤成功')
        }
      })
    },
    update () {
      updateAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('编辑步骤成功')
        }
      })
    },
    remove () {
      removeAPI({stepId: this.pageData.stepId}).then(response => {
        if (response.data.success === true) {
          this.$message.success('删除步骤成功')
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
