<template>
  <div>
    <!--基本信息-->
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
      <!--模板-->
      <el-divider content-position="right"></el-divider>
      <!--SQL模板-->
      <div v-if="pageData.type===1">
        <el-form-item label="SQL模板">
          <div v-if="pageData.jdbc!==null">
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
            <el-button @click="pageControl.isNewSQL=true" size="mini" icon="el-icon-plus" type="primary" plain>新增SQL</el-button>
          </div>
        </el-form-item>
        <el-form-item label="关联数据源">
          <el-row :gutter="5">
            <el-col :span="13">
              <el-input v-model="pageData.jdbc.dataSource.driver" size="small" placeholder="请输入数据库驱动" maxlength="50" show-word-limit>
              </el-input>
            </el-col>
            <el-col :span="10">
              <el-button @click="$store.commit('setDataSourceDialog', true)" size="small" icon="el-icon-plus">点我可快捷关联</el-button>
            </el-col>
          </el-row>
          <el-input v-model="pageData.jdbc.dataSource.url" size="small" placeholder="请输入数据库URL" maxlength="200" show-word-limit>
          </el-input>
          <el-row :gutter="5">
            <el-col :span="11">
              <el-input v-model="pageData.jdbc.dataSource.userName" size="small" placeholder="请输入数据库名" maxlength="50" show-word-limit>
              </el-input>
            </el-col>
            <el-col :span="11">
              <el-input v-model="pageData.jdbc.dataSource.password" size="small" placeholder="请输入数据库密码" maxlength="50" show-word-limit>
              </el-input>
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
        <el-form-item label="新增Header">
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
            <el-button @click="pageControl.isNewHeader=true" type="primary" size="mini" icon="el-icon-plus" circle></el-button>
          </div>
        </el-form-item>
        <el-form-item label="Body">
          <el-input v-model="pageData.httpRequest.httpBody" :autosize="{ minRows: 4, maxRows: 9}" placeholder="请输入Body" type="textarea"
                    maxlength="500" show-word-limit></el-input>
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
<!--    <tl-select-data-source :is-visible="pageControl.isContactDB"></tl-select-data-source>-->
  </div>
</template>

<script>
import {createAPI, updateAPI, removeAPI, queryDetailAPI} from '@/api/commonFactory'
// import tlSelectDataSource from './selectDataSource'

export default {
  // components: {tlSelectDataSource},
  props: {
    toolId: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      pageData: {
        toolId: '0',
        title: '',
        description: '',
        owner: 'tester',
        permission: 2,
        type: 1,
        paramList: null,
        isTestStep: true,
        jdbc: {
          dataSource: {
            driver: 'com.mysql.cj.jdbc.Driver',
            url: 'jdbc:mysql://118.24.117.181:3306/onepiece?useUnicode=true&characterEncoding=UTF-8&userSSL=false',
            userName: 'testerone',
            password: 'testerone'
          },
          sqlList: [{
            type: 'UNKNOWN',
            sql: ''
          }]
        },
        httpRequest: {
          httpType: 'GET',
          httpURL: 'URL',
          httpHeaderList: [{
            name: 'header1',
            value: 'value1'
          }],
          httpBody: 'BODY'
        },
        rpc: {
          provide: ''
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
    if (this.toolId !== '0') {
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
      this.pageData.jdbc.sqlList.push({type: 'UNKNOWN', sql: this.pageControl.sql})
      this.pageControl.sql = ''
      this.pageControl.isNewSQL = false
    },
    deleteSQL (index) {
      this.pageData.jdbc.sqlList.splice(index, 1)
    },
    newHeader () {
      this.pageData.httpRequest.httpHeaderList.push({name: this.pageControl.httpHeader, value: ''})
      this.pageControl.httpHeader = ''
      this.pageControl.isNewHeader = false
    },
    deleteHeader (index) {
      this.pageData.httpRequest.httpHeaderList.splice(index, 1)
      debugger
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
        }
      })
    },
    update () {
      updateAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('编辑工具成功')
        }
      })
    },
    remove () {
      removeAPI({toolId: this.pageData.toolId}).then(response => {
        if (response.data.success === true) {
          this.$message.success('删除工具成功')
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
