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
<!--      <el-form-item label="类型">-->
<!--        <el-radio-group v-model="pageData.type" :disabled="pageControl.isEdit" size="small">-->
<!--          <el-radio :label="1">接口自动化</el-radio>-->
<!--          <el-radio :label="2">UI自动化</el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
      <!--前置步骤-->
      <el-divider content-position="right">数据准备</el-divider>
      <el-form-item label="步骤">
        <div v-if="pageData.preStepList === null || pageData.preStepList.length===0">暂无前置步骤，可点+添加</div>
        <div v-else>
          <div v-for="(item, index) in pageData.preStepList" :key="index">
            <el-row :gutter="5">
              <el-col :span="10">
                <el-input v-model="pageData.preStepList[index].name" size="small" placeholder="请输入步骤名"
                          maxlength="20" show-word-limit></el-input>
              </el-col>
              <el-col :span="10">
                <el-input v-model="pageData.preStepList[index].value" size="small" show-word-limit disabled>
                </el-input>
              </el-col>
              <el-col :span="3">
                <el-button @click="deletePreStep(index)" size="small">删除</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="新增步骤">
        <div v-if="pageControl.isNewPreStep">
          <el-input v-model="pageControl.preStepValue" size="small" placeholder="请输入要关联的步骤编号"
                    maxlength="20" show-word-limit>
            <template #append>
              <el-button @click="newPreStep()" type="primary" size="small">确认</el-button>
              <el-button @click="pageControl.isNewPreStep=false" size="small">取消</el-button>
            </template>
          </el-input>
        </div>
        <div v-else>
          <el-button @click="pageControl.isNewPreStep=true" size="mini" icon="el-icon-link">关联步骤</el-button>
          <el-button @click="pageControl.isNewStep=true" size="mini" icon="el-icon-plus" disabled>直接新增</el-button>
        </div>
      </el-form-item>
      <!--前置步骤-->
      <el-divider content-position="right">接口调用</el-divider>
      <!--前置步骤-->
      <el-divider content-position="right">数据还原</el-divider>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" size="small">试用</el-button>
      <el-button @click="save()" type="primary" size="small">保存</el-button>
      <el-button v-if="pageControl.isEdit" @click="remove()" size="small">删除</el-button>
    </div>
  </div>
</template>

<script>
import {createAPI, updateAPI, deleteAPI, queryDetailAPI} from '@/api/testCase'
// import tlSelectDataSource from './selectDataSource'

export default {
  // components: {tlSelectDataSource},
  props: {
    testCaseId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      pageData: {
        testCaseId: 0,
        title: '',
        description: '',
        ownerId: '123',
        ownerName: 'tester',
        status: 1,
        preStepList: [{
          name: 'name',
          value: 'value'
        }],
        mainStepList: [{
          name: 'name',
          value: 'value'
        }],
        afterStepList: [{
          name: 'name',
          value: 'value'
        }]
      },
      pageControl: {
        isEdit: false,
        isNewPreStep: false,
        preStepValue: ''
      }
    }
  },
  created: function () {
    if (this.testCaseId !== 0) {
      this.pageControl.isEdit = true
      this.queryDetail()
    }
  },
  methods: {
    newPreStep () {
      if (this.pageData.preStepList === null) {
        this.pageData.preStepList = [{name: '', value: this.pageControl.preStepValue}]
      } else {
        this.pageData.preStepList.push({name: '', value: this.pageControl.preStepValue})
      }
      this.pageControl.preStepValue = ''
      this.pageControl.isNewPreStep = false
    },
    deletePreStep (index) {
      this.pageData.paramList.splice(index, 1)
    },
    save () {
      if (this.pageControl.isEdit) {
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
      deleteAPI({toolId: this.pageData.toolId}).then(response => {
        if (response.data.success === true) {
          this.$message.success('删除用例成功')
        }
      })
    },
    queryDetail () {
      queryDetailAPI({
        testCaseId: this.testCaseId
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
