<template>
  <div>
    <!--基本信息-->
    <el-form :model="pageData" label-width="2cm">
      <el-form-item label="标题">
        <el-input v-model="pageData.title" placeholder="请输入标题" size="small" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="pageData.description" placeholder="请描述功能和实现方法" type="textarea" maxlength="200"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="pageData.type" size="small">
          <el-radio :label="1">SQL</el-radio>
          <el-radio :label="2">HTTP</el-radio>
          <el-radio :label="3">DUBBO</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限">
        <el-radio-group v-model="pageData.status" size="small">
          <el-radio :label="1">公开</el-radio>
          <el-radio :label="2">自己可见</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--参数-->
      <el-divider content-position="right"></el-divider>
      <div v-for="(item, index) in pageData.params" :key="index">
        <el-form-item>
          <template #label>
            <div>{{ pageData.params[index].paramName }}</div>
          </template>
          <el-input v-model="pageData.params[index].paramValue" placeholder="请输入参数" size="small" maxlength="30"
                    show-word-limit>
            <template #append>
              <el-button @click="deleteParam(index)" type="primary" size="mini">删除参数</el-button>
            </template>
          </el-input>
        </el-form-item>
      </div>
      <el-form-item v-if="pageControl.isNewParam" label="请设置">
        <el-input v-model="pageControl.paramName" placeholder="请输入参数名" size="small" maxlength="20" show-word-limit>
          <template #prepend>
            <el-select v-model="pageControl.paramType" size="mini" placeholder="参数类型"
                       style="float:left; width: 100px">
              <el-option key="1" label="String" value="String"></el-option>
            </el-select>
          </template>
          <template #append>
            <el-button @click="newParam()" type="primary" size="mini" icon="el-icon-check"></el-button>
            <el-button @click="pageControl.isNewParam=false" size="mini" icon="el-icon-close"></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-else>
        <template #label>
          <el-button type="text" size="mini" @click="pageControl.isNewParam=true">+新增参数</el-button>
        </template>
      </el-form-item>
      <!--模板-->
      <el-divider content-position="right"></el-divider>
      <template v-if="pageData.type===1">
        <el-form-item label="SQL模板">
          <div v-for="(item, index) in pageControl.sqlTemplateList" :key="index">
            <el-input v-model="pageControl.sqlTemplateList[index]" placeholder="请输入单行SQL" size="mini"
                      maxlength="200" show-word-limit>
              <template #append>
                <el-button @click="deleteSQL(index)" type="primary" size="mini">删除SQL</el-button>
              </template>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-button type="text" size="mini" @click="pageControl.isNewSQL=true">+新增SQL</el-button>
          </template>
          <el-input v-if="pageControl.isNewSQL" v-model="pageControl.sqlTemplate" size="mini" placeholder="请输入新的单行SQL模板"
                    maxlength="200" show-word-limit>
            <template #append>
              <el-button @click="newSQL()" type="primary" size="mini" icon="el-icon-check"></el-button>
              <el-button @click="pageControl.isNewSQL=false" size="mini" icon="el-icon-close"></el-button>
            </template>
          </el-input>
        </el-form-item>
      </template>
      <template v-else-if="pageData.type===2">
        <el-form-item label="URL">
          <el-input v-model="pageControl.httpTemplateList[0]" size="small" placeholder="请输入URL"
                    maxlength="200" show-word-limit>
            <template #prepend>
              <el-select v-model="pageControl.httpType" size="mini" placeholder="请求方法"
                         style="float:left; width: 100px">
                <el-option key="1" label="GET" value="GET"></el-option>
                <el-option key="1" label="POST" value="POST"></el-option>
                <el-option key="1" label="PUT" value="PUT"></el-option>
                <el-option key="1" label="DELETE" value="DELETE"></el-option>
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="Header">
          <el-input v-model="pageControl.httpTemplateList[1]" size="small" placeholder="请输入Header"
                    maxlength="200" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="Body">
          <el-input v-model="pageControl.httpTemplateList[2]" :autosize="{ minRows: 4, maxRows: 9}" placeholder="请输入Body" type="textarea"
                    maxlength="500" show-word-limit></el-input>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="未知类型">
          <el-input v-model="pageData.templateList[0]" :autosize="{ minRows: 4, maxRows: 9}" placeholder="请输入模板" type="textarea"
                    maxlength="500" show-word-limit></el-input>
        </el-form-item>
      </template>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" size="small">保存</el-button>
      <el-button type="primary" size="small">删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toolId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      pageData: {
        toolId: 0,
        title: '',
        description: '',
        templateList: [],
        type: 1,
        status: 1,
        params: [{
          paramName: 'name',
          paramValue: 'value'
        }]
      },
      pageControl: {
        isNewParam: false,
        isNewTool: false,
        isNewSQL: false,
        paramType: 'String',
        paramName: '',
        sqlTemplate: '',
        httpType: 'GET',
        httpURL: '',
        httpHeader: '',
        httpBody: '',
        sqlTemplateList: ['sql1', 'sql2'],
        httpTemplateList: ['url', 'header', 'body']
      }
    }
  },
  methods: {
    newParam () {
      this.pageData.params.push({paramName: this.pageControl.paramName, paramValue: ''})
      this.pageControl.paramName = ''
      this.pageControl.isNewParam = false
    },
    deleteParam (index) {
      this.pageData.params.splice(index, 1)
    },
    newSQL () {
      this.pageControl.sqlTemplateList.push(this.pageControl.sqlTemplate)
      this.pageControl.sqlTemplate = ''
      this.pageControl.isNewSQL = false
    },
    deleteSQL (index) {
      this.pageControl.sqlTemplateList.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
