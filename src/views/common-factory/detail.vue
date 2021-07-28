<template>
  <div>
    <el-page-header @back="$router.push('/commonFactory')" title="返回列表">
      <template #content>
        <span>{{pageData.title}}</span>
      </template>
    </el-page-header>
    <!--基本信息-->
    <el-divider content-position="right"></el-divider>
    <el-form :model="pageData" label-width="90px">
      <el-form-item label="标题">
        <el-input v-model="pageData.title" placeholder="请输入标题" size="small" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="pageData.description" placeholder="请描述功能和实现方法" type="textarea" maxlength="200"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="pageData.type" :disabled="pageControl.isEdit" size="small">
          <el-radio :label="1">SQL</el-radio>
          <el-radio :label="2">HTTP</el-radio>
          <el-radio :label="3">RPC</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限">
        <el-radio-group v-model="pageData.permission" size="small">
          <el-radio :label="1">公开</el-radio>
          <el-radio :label="2">自己可见</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--参数设置-->
      <el-divider content-position="right"></el-divider>
      <el-form-item label="参数">
        <div v-if="pageData.paramList === null || pageData.paramList.length===0">暂无参数，可点+添加</div>
        <div v-else>
          <div v-for="(item, index) in pageData.paramList" :key="index">
            <el-row :gutter="5">
              <el-col :span="10">
                <el-input v-model="pageData.paramList[index].name" size="small" placeholder="请输入参数名"
                          maxlength="20" show-word-limit></el-input>
              </el-col>
              <el-col :span="10">
                <el-input v-model="pageData.paramList[index].value" size="small" placeholder="请输入参数值"
                          maxlength="20" show-word-limit>
                </el-input>
              </el-col>
              <el-col :span="3">
                <el-button @click="deleteParam(index)" size="small">删除</el-button>
                <el-tooltip class="item" effect="dark" :content="'$$${'+pageData.paramList[index].name+'}'" placement="top-start">
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div v-if="pageControl.isNewParam">
          <el-input v-if="pageControl.isNewParam" v-model="pageControl.paramName" size="small" placeholder="请输入新的参数名"
                    maxlength="20" show-word-limit>
            <template #append>
              <el-button @click="newParam()" type="primary" size="small">确认</el-button>
              <el-button @click="pageControl.isNewParam=false" size="small">取消</el-button>
            </template>
          </el-input>
        </div>
        <div v-else>
          <el-button @click="pageControl.isNewParam=true" type="primary" size="mini" icon="el-icon-plus" plain>新增参数</el-button>
        </div>
      </el-form-item>
      <!--模板-->
      <el-divider content-position="right"></el-divider>
      <!--SQL模板-->
      <div v-if="pageData.type===1">
        <el-form-item label="SQL语句">
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
        </el-form-item>
        <el-form-item>
          <div v-if="pageControl.isNewSQL">
            <el-input v-model="pageControl.sql" size="small" placeholder="请输入新的单行SQL模板"
                      maxlength="200" show-word-limit>
              <template #append>
                <el-button @click="newSQL()" type="primary" size="small">确认</el-button>
                <el-button @click="pageControl.isNewSQL=false" size="small">取消</el-button>
              </template>
            </el-input>
          </div>
          <div v-else>
            <el-button @click="pageControl.isNewSQL=true" type="primary" size="mini" icon="el-icon-plus" plain>新增SQL</el-button>
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
              <el-input v-model="pageData.jdbc.dataSource.userName" size="small" placeholder="请输入数据库名" maxlength="50" show-word-limit>
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
      <!--HTTP模板-->
      <div v-else-if="pageData.type===2">
        <el-form-item label="URL">
          <el-input v-model="pageData.httpRequest.httpURL" size="small" placeholder="请输入URL"
                    maxlength="200" show-word-limit>
            <template #prepend>
              <el-select v-model="pageData.httpRequest.httpType" size="small" placeholder="请求方法"
                         style="float:left; width: 100px">
                <el-option key="1" label="GET" value="GET"></el-option>
                <el-option key="2" label="POST" value="POST"></el-option>
                <el-option key="3" label="PUT" value="PUT"></el-option>
                <el-option key="4" label="DELETE" value="DELETE"></el-option>
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <!--请求头-->
        <el-form-item label="Header">
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
        </el-form-item>
        <el-form-item>
          <div v-if="pageControl.isNewHeader">
            <el-input v-if="pageControl.isNewHeader" v-model="pageControl.httpHeader" size="small" placeholder="请输入新的参数名"
                      maxlength="20" show-word-limit>
              <template #append>
                <el-button @click="newHeader()" type="primary" size="small">确认</el-button>
                <el-button @click="pageControl.isNewHeader=false" size="small">取消</el-button>
              </template>
            </el-input>
          </div>
          <div v-else>
            <el-button @click="pageControl.isNewHeader=true" type="primary" size="mini" icon="el-icon-plus" plain>新增Header</el-button>
          </div>
        </el-form-item>
        <el-form-item label="Body">
          <el-input v-model="pageData.httpRequest.httpBody" :autosize="{ minRows: 4, maxRows: 9}" placeholder="请输入Body" type="textarea"
                    maxlength="500" show-word-limit></el-input>
        </el-form-item>
      </div>
      <!--RPC模板-->
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
        <!--Rpc入参列表-->
        <el-form-item label="Rpc入参">
          <div v-if="pageData.rpc.paramList===null || pageData.rpc.paramList.length===0">
            暂无入参，可点+添加
          </div>
          <div v-else>
            <div v-for="(item, index) in pageData.rpc.paramList" :key="index">
              <el-row :gutter="5">
                <el-col :span="17">
                  <el-input v-model="pageData.rpc.paramList[index].value" :autosize="{ minRows: 1, maxRows: 5}" placeholder="请输入模板" type="textarea"
                            maxlength="500" show-word-limit></el-input>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="pageData.rpc.paramList[index].comment" placeholder="请输入rpc参数类型(class name)" maxlength="200" size="small" show-word-limit></el-input>
                  <el-button @click="deleteRpcParam(index)" size="small">删除</el-button>
<!--                  <el-tooltip class="item" effect="dark" :content="'入参类型:'+pageData.rpc.paramList[index].comment" placement="top-start">-->
<!--                    <i class="el-icon-info"></i>-->
<!--                  </el-tooltip>-->
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div v-if="pageControl.isNewRpcParam">
            <el-input v-model="pageControl.rpcType" size="small" placeholder="请输入rpc参数类型(class name)"
                      maxlength="200" show-word-limit>
              <template #append>
                <el-button @click="newRpcParam()" type="primary" size="small">确认</el-button>
                <el-button @click="pageControl.isNewRpcParam=false" size="small">取消</el-button>
              </template>
            </el-input>
          </div>
          <div v-else>
            <el-button @click="pageControl.isNewRpcParam=true" type="primary" size="mini" icon="el-icon-plus" plain>新增rpc入参</el-button>
          </div>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="未知类型">
          <el-input :autosize="{ minRows: 4, maxRows: 9}" placeholder="请输入模板" type="textarea"
                    maxlength="500" show-word-limit></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" size="small">试用</el-button>
      <el-button @click="save()" type="primary" size="small">保存</el-button>
      <el-button v-if="pageControl.isEdit" @click="remove()" size="small">删除</el-button>
    </div>
<!--    <el-dialog :visible.sync="pageControl.isContactDB" title="请关联数据库">-->
<!--      <select-device></select-device>-->
<!--    </el-dialog>-->
    <tl-select-data-source :is-visible="pageControl.isContactDB"></tl-select-data-source>
  </div>
</template>

<script>
import {createAPI, updateAPI, removeAPI, queryDetailAPI} from '@/api/commonFactory'
import tlSelectDataSource from './selectDataSource'

export default {
  components: {tlSelectDataSource},
  data () {
    return {
      pageData: {
        toolId: '0',
        title: '',
        description: '',
        owner: 'tester',
        permission: 2,
        type: 1,
        isTestStep: false,
        paramList: null,
        // paramList: [{
        //   name: 'name',
        //   value: 'value'
        // }],
        jdbc: {
          dataSource: {
            driver: 'com.mysql.cj.jdbc.Driver',
            url: 'jdbc:mysql://118.24.117.181:3306/onepiece?useUnicode=true&characterEncoding=UTF-8&userSSL=false',
            userName: 'testerone',
            password: 'testerone'
          },
          sqlList: null
          // sqlList: [{
          //   type: 'UNKNOWN',
          //   sql: ''
          // }]
        },
        httpRequest: {
          httpType: 'GET',
          httpURL: 'URL',
          httpHeaderList: null,
          // httpHeaderList: [{
          //   name: 'header1',
          //   value: 'value1'
          // }],
          httpBody: 'BODY'
        },
        rpc: {
          url: '',
          interfaceName: '',
          methodName: '',
          paramList: [{
            value: '',
            comment: ''
          }]
        }
      },
      pageControl: {
        isNewParam: false,
        isNewSQL: false,
        isNewHeader: false,
        isNewRpcParam: false,
        isContactDB: false,
        isEdit: false,
        paramType: 'String',
        paramName: '',
        sql: '',
        httpHeader: '',
        rpcParam: '',
        rpcType: ''
      }
    }
  },
  created: function () {
    if (this.$route.params.id !== '0') {
      this.pageControl.isEdit = true
      this.queryDetail()
    }
  },
  watch: {
    '$store.state.commonFactory.selectedDataSource': function (newVal, oldVal) {
      this.pageData.jdbc.dataSource = this.$store.state.commonFactory.selectedDataSource
    }
  },
  methods: {
    newParam () {
      if (this.pageData.paramList === null) {
        this.pageData.paramList = [{name: this.pageControl.paramName, value: null}]
      } else {
        this.pageData.paramList.push({name: this.pageControl.paramName, value: ''})
      }
      this.pageControl.paramName = ''
      this.pageControl.isNewParam = false
    },
    deleteParam (index) {
      this.pageData.paramList.splice(index, 1)
    },
    newSQL () {
      if (this.pageData.jdbc.sqlList === null) {
        this.pageData.jdbc.sqlList = [{type: 'UNKNOWN', sql: this.pageControl.sql}]
      } else {
        this.pageData.jdbc.sqlList.push({type: 'UNKNOWN', sql: this.pageControl.sql})
      }
      this.pageControl.sql = ''
      this.pageControl.isNewSQL = false
    },
    deleteSQL (index) {
      this.pageData.jdbc.sqlList.splice(index, 1)
    },
    newHeader () {
      if (this.pageData.httpRequest.httpHeaderList === null) {
        this.pageData.httpRequest.httpHeaderList = [{name: this.pageControl.httpHeader, value: ''}]
      } else {
        this.pageData.httpRequest.httpHeaderList.push({name: this.pageControl.httpHeader, value: ''})
      }
      this.pageControl.httpHeader = ''
      this.pageControl.isNewHeader = false
    },
    deleteHeader (index) {
      this.pageData.httpRequest.httpHeaderList.splice(index, 1)
      debugger
    },
    newRpcParam () {
      if (this.pageData.rpc.paramList === null) {
        this.pageData.rpc.paramList = [{value: '', comment: this.pageControl.rpcType}]
      } else {
        this.pageData.rpc.paramList.push({value: '', comment: this.pageControl.rpcType})
      }
      this.pageControl.rpcType = ''
      this.pageControl.isNewRpcParam = false
    },
    deleteRpcParam (index) {
      this.pageData.rpc.paramList.splice(index, 1)
    },
    save () {
      if (this.pageControl.isEdit) {
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
          this.$message.success('创建工具成功')
          this.$router.push('/commonFactory')
        }
      })
    },
    update () {
      updateAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('编辑工具成功')
          this.$router.push('/commonFactory')
        }
      })
    },
    remove () {
      removeAPI({toolId: this.pageData.toolId}).then(response => {
        if (response.data.success === true) {
          this.$message.success('删除工具成功')
          this.$router.push('/commonFactory')
        }
      })
    },
    queryDetail () {
      queryDetailAPI({
        toolId: this.$route.params.id
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
