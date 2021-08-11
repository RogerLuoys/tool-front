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
      <!--配置项-->
      <el-divider content-position="right">配置项</el-divider>
      <el-form-item label="执行环境">
        <div v-if="pageData.configList === null || pageData.configList.length===0">暂无环境，可点+添加</div>
        <div v-else>
          <div v-for="(item, index) in pageData.configList" :key="index">
            <el-row :gutter="5">
              <el-col :span="10">
                <el-input v-model="pageData.configList[index].name" size="small" placeholder="请输入环境名"
                          maxlength="20" show-word-limit></el-input>
              </el-col>
              <el-col :span="10">
                <el-input v-model="pageData.configList[index].value" size="small"  placeholder="请输入环境URL"
                          maxlength="20" show-word-limit>
                </el-input>
              </el-col>
              <el-col :span="3">
                <el-button @click="deleteConfig(index)" size="small">删除</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div v-if="pageControl.isNewConfig">
          <el-input v-model="pageControl.configValue" size="small" placeholder="请输入要关联的步骤编号"
                    maxlength="20" show-word-limit>
            <template #append>
              <el-button @click="newConfig()" type="primary" size="small">确认</el-button>
              <el-button @click="pageControl.isNewConfig=false" size="small">取消</el-button>
            </template>
          </el-input>
        </div>
        <div v-else>
          <el-button @click="pageControl.isNewConfig=true" size="mini" icon="el-icon-plus" type="primary" plain>新增配置</el-button>
        </div>
      </el-form-item>
      <!--用例列表-->
      <el-divider content-position="right">用例列表</el-divider>
      <el-form-item label="用例列表">
        <div v-if="pageData.caseList === null || pageData.caseList.length===0">暂无配置，可点+添加</div>
        <div v-else>
          <div v-for="(item, index) in pageData.caseList" :key="index">
            <el-row :gutter="5">
              <el-col :span="10">
                <el-input v-model="pageData.caseList[index].name" size="small" placeholder="请输入用例名"
                          maxlength="20" show-word-limit></el-input>
              </el-col>
              <el-col :span="10">
                <el-input v-model="pageData.caseList[index].value" size="small" show-word-limit disabled>
                </el-input>
              </el-col>
              <el-col :span="3">
                <el-button @click="deleteCase(index)" size="small">删除</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div v-if="pageControl.isNewCaseManual">
          <el-input v-model="pageControl.caseValue" size="small" placeholder="请输入要关联的用例编号"
                    maxlength="20" show-word-limit>
            <template #append>
              <el-button @click="newCase()" type="primary" size="small">确认</el-button>
              <el-button @click="pageControl.isNewCaseManual=false" size="small">取消</el-button>
            </template>
          </el-input>
        </div>
        <div v-else>
          <el-button @click="pageControl.isNewCaseAuto=true" size="mini" icon="el-icon-link" type="primary" plain disabled>自动关联</el-button>
          <el-button @click="pageControl.isNewCaseManual=true" size="mini" icon="el-icon-plus" type="primary" plain>手动添加</el-button>
        </div>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" size="small">试用</el-button>
      <el-button @click="save()" type="primary" size="small">保存</el-button>
      <el-button v-if="isEdit" @click="remove()" size="small">删除</el-button>
    </div>
    <el-dialog :visible.sync="pageControl.isNewCase" title="关联用例" append-to-body>
    </el-dialog>
  </div>
</template>

<script>
import {createAPI, updateAPI, removeAPI, queryDetailAPI} from '@/api/autoSuite'
// import tlSelectDataSource from './selectDataSource'

export default {
  // components: {tlSelectDataSource},
  props: {
    suiteId: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pageData: {
        suiteId: 0,
        title: '',
        description: '',
        passed: 0,
        failed: 0,
        configList: [{
          name: 'name',
          value: 'value'
        }],
        caseList: [{
          name: 'name',
          value: 'value'
        }]
      },
      pageControl: {
        isNewConfig: false,
        isNewCaseAuto: false,
        isNewCaseManual: false,
        configValue: '',
        caseValue: ''
      }
    }
  },
  watch: {
    suiteId: function (newVal, oldVal) {
      if (this.isEdit) {
        this.queryDetail()
      }
    }
  },
  created: function () {
    console.info('created')
    if (this.isEdit) {
      this.queryDetail()
    }
  },
  methods: {
    newConfig () {
      if (this.pageData.configList === null) {
        this.pageData.configList = [{name: '', value: this.pageControl.configValue}]
      } else {
        this.pageData.configList.push({name: '', value: this.pageControl.configValue})
      }
      this.pageControl.configValue = ''
      this.pageControl.isNewConfig = false
    },
    deleteConfig (index) {
      this.pageData.paramList.splice(index, 1)
    },
    newCase () {
      if (this.pageData.caseList === null) {
        this.pageData.caseList = [{name: '', value: this.pageControl.caseValue}]
      } else {
        this.pageData.caseList.push({name: '', value: this.pageControl.caseValue})
      }
      this.pageControl.caseValue = ''
      this.pageControl.isNewCaseManual = false
    },
    deleteCase (index) {
      this.pageData.caseList.splice(index, 1)
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
    update () {
      updateAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('编辑用例成功')
        }
      })
    },
    remove () {
      removeAPI({toolId: this.pageData.toolId}).then(response => {
        if (response.data.success === true) {
          this.$message.success('删除用例成功')
        }
      })
    },
    queryDetail () {
      queryDetailAPI({
        suiteId: this.suiteId
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
