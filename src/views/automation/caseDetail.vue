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
      <el-form-item label="前置步骤">
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
      <el-form-item>
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
          <el-button @click="pageControl.isNewPreStep=true" size="mini" icon="el-icon-link" type="primary" plain>手动关联</el-button>
          <el-button @click="pageControl.isNewStep=true" size="mini" icon="el-icon-plus" disabled>快速新增</el-button>
        </div>
      </el-form-item>
      <!--调用步骤-->
      <el-divider content-position="right">接口调用</el-divider>
      <el-form-item label="调用步骤">
        <div v-if="pageData.mainStepList === null || pageData.mainStepList.length===0">暂无前置步骤，可点+添加</div>
        <div v-else>
          <div v-for="(item, index) in pageData.mainStepList" :key="index">
            <el-row :gutter="5">
              <el-col :span="10">
                <el-input v-model="pageData.mainStepList[index].name" size="small" placeholder="请输入步骤名"
                          maxlength="20" show-word-limit></el-input>
              </el-col>
              <el-col :span="10">
                <el-input v-model="pageData.mainStepList[index].value" size="small" show-word-limit disabled>
                </el-input>
              </el-col>
              <el-col :span="3">
                <el-button @click="deleteMainStep(index)" size="small">删除</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div v-if="pageControl.isNewMainStep">
          <el-input v-model="pageControl.mainStepValue" size="small" placeholder="请输入要关联的步骤编号"
                    maxlength="20" show-word-limit>
            <template #append>
              <el-button @click="newMainStep()" type="primary" size="small">确认</el-button>
              <el-button @click="pageControl.isNewMainStep=false" size="small">取消</el-button>
            </template>
          </el-input>
        </div>
        <div v-else>
          <el-button @click="pageControl.isNewMainStep=true" size="mini" icon="el-icon-link" type="primary" plain>手动关联</el-button>
          <el-button @click="pageControl.isNewStep=true" size="mini" icon="el-icon-plus" disabled>快速新增</el-button>
        </div>
      </el-form-item>
      <!--收尾步骤-->
      <el-divider content-position="right">数据还原</el-divider>
      <el-form-item label="收尾步骤">
        <div v-if="pageData.afterStepList === null || pageData.afterStepList.length===0">暂无前置步骤，可点+添加</div>
        <div v-else>
          <div v-for="(item, index) in pageData.afterStepList" :key="index">
            <el-row :gutter="5">
              <el-col :span="10">
                <el-input v-model="pageData.afterStepList[index].name" size="small" placeholder="请输入步骤名"
                          maxlength="20" show-word-limit></el-input>
              </el-col>
              <el-col :span="10">
                <el-input v-model="pageData.afterStepList[index].value" size="small" show-word-limit disabled>
                </el-input>
              </el-col>
              <el-col :span="3">
                <el-button @click="deleteAfterStep(index)" size="small">删除</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div v-if="pageControl.isNewAfterStep">
          <el-input v-model="pageControl.afterStepValue" size="small" placeholder="请输入要关联的步骤编号"
                    maxlength="20" show-word-limit>
            <template #append>
              <el-button @click="newAfterStep()" type="primary" size="small">确认</el-button>
              <el-button @click="pageControl.isNewAfterStep=false" size="small">取消</el-button>
            </template>
          </el-input>
        </div>
        <div v-else>
          <el-button @click="pageControl.isNewAfterStep=true" size="mini" icon="el-icon-link" type="primary" plain>手动关联</el-button>
          <el-button @click="pageControl.isNewStep=true" size="mini" icon="el-icon-plus" disabled>快速新增</el-button>
        </div>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" size="small">试用</el-button>
      <el-button @click="save()" type="primary" size="small">保存</el-button>
      <el-button v-if="pageControl.isEdit" @click="remove()" size="small">删除</el-button>
    </div>
  </div>
</template>

<script>
import {createAPI, updateAPI, removeAPI, queryDetailAPI} from '@/api/autoCase'
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
        isNewMainStep: false,
        isNewAfterStep: false,
        preStepValue: '',
        mainStepValue: '',
        afterStepValue: ''
      }
    }
  },
  watch: {
    testSuiteId: function (newVal, oldVal) {
      if (this.testCaseId !== 0) {
        this.queryDetail()
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
      this.pageData.preStepList.splice(index, 1)
    },
    newMainStep () {
      if (this.pageData.mainStepList === null) {
        this.pageData.mainStepList = [{name: '', value: this.pageControl.mainStepValue}]
      } else {
        this.pageData.mainStepList.push({name: '', value: this.pageControl.mainStepValue})
      }
      this.pageControl.mainStepValue = ''
      this.pageControl.isNewMainStep = false
    },
    deleteMainStep (index) {
      this.pageData.mainStepList.splice(index, 1)
    },
    newAfterStep () {
      if (this.pageData.afterStepList === null) {
        this.pageData.afterStepList = [{name: '', value: this.pageControl.afterStepValue}]
      } else {
        this.pageData.afterStepList.push({name: '', value: this.pageControl.afterStepValue})
      }
      this.pageControl.afterStepValue = ''
      this.pageControl.isNewAfterStep = false
    },
    deleteAfterStep (index) {
      this.pageData.afterStepList.splice(index, 1)
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
      removeAPI({toolId: this.pageData.toolId}).then(response => {
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
