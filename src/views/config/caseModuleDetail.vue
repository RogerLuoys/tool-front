<template>
  <div>
    <el-row style="height: 15px">
      <el-col :span="15">
        <span>编辑测试模块(超类)</span>
      </el-col>
      <el-col :span="8" style="text-align: right">
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
        <el-input v-model="pageData.name" @change="update" placeholder="请输入标题" maxlength="10" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="pageData.description" @change="update" placeholder="请描述功能和实现方法" type="textarea" maxlength="200"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="参数">
        <div v-if="pageData.parameterList === null || pageData.parameterList.length===0">暂无参数，可点+添加</div>
        <div v-else v-for="(item, index) in pageData.parameterList" :key="index">
          <el-row :gutter="2">
            <el-col :span="8">
              <el-input v-model="pageData.parameterList[index].name" @change="updateParam(pageData.parameterList[index])" size="mini" placeholder="请输入参数名"
                        maxlength="20" show-word-limit></el-input>
            </el-col>
            <el-col :span="11">
              <el-input v-model="pageData.parameterList[index].value" @change="updateParam(pageData.parameterList[index])" size="mini" placeholder="请输入参数值"
                        maxlength="30" show-word-limit>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button @click="deleteParam(index)" size="mini">删除</el-button>
              <el-tooltip class="item" effect="dark" :content="'${'+pageData.parameterList[index].name+'}'" placement="top-start">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-button @click="newParam()" type="primary" size="mini" icon="el-icon-plus" plain>新增参数</el-button>
        </div>
      </el-form-item>
      <el-form-item label="webDriver">
        <el-radio v-model="pageControl.webDriverType" :label="1">不需要</el-radio>
        <el-radio v-model="pageControl.webDriverType" :label="2">chrome</el-radio>
        <el-radio v-model="pageControl.webDriverType" :label="3">firefox</el-radio>
        <el-radio v-model="pageControl.webDriverType" :label="4">android</el-radio>
        <template v-if="pageControl.webDriverType !== 1">
          <div v-for="(item, index) in pageData.argumentList" :key="index">
            <el-row :gutter="2">
              <el-col :span="19">
                <el-input v-model="pageData.argumentList[index].value" @change="updateParam(pageData.argumentList[index])" size="mini" placeholder="请输入参数值"
                          maxlength="30" show-word-limit>
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-button @click="deleteUiParam(index)" size="mini">删除</el-button>
                <el-tooltip class="item" effect="dark" :content="pageData.argumentList[index].comment" placement="top-start">
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-button @click="newUiParam()" type="primary" size="mini" icon="el-icon-plus" plain>新增参数</el-button>
          </div>
        </template>
      </el-form-item>
      <!--前置步骤-->
      <el-divider content-position="right">
        <el-button @click="createRelatedStep(pageData.preStepList !== null ? pageData.preStepList.length + 1 : 1, 1, null)" type="text">新增</el-button>
        <el-button v-if="pageData.preStepList !== null && pageData.preStepList.length !== 0" @click="deleteStep(pageData.preStepList.pop())" type="text">删除</el-button>
        <span>前置步骤(@BeforeTest)</span>
        <el-tooltip class="item" effect="dark" content="参考Testng中的@BeforeTest，会在@Test之前执行" placement="top-start">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </el-divider>
      <div v-if="pageControl.isNewPreStep">
        <el-input v-model="pageControl.preStepId" placeholder="请输入要关联的步骤编号" size="small"
                  maxlength="20" show-word-limit>
          <template #append>
            <el-button @click="createRelatedStep(pageData.preStepList !== null ? pageData.preStepList.length + 1 : 1, 1, pageControl.preStepId)" type="primary">确认</el-button>
            <el-button @click="pageControl.isNewPreStep=false">取消</el-button>
          </template>
        </el-input>
      </div>
      <!--列表-->
      <el-table border :data="pageData.preStepList" @row-click="edit" :row-style="{cursor: 'pointer'}" size="mini" style="width: 100%">
        <el-table-column label="编号" width="130">
          <template slot-scope="scope">
            {{scope.row.autoStep.stepId}}
          </template>
        </el-table-column>
        <el-table-column label="标题" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.autoStep.name}}
          </template>
        </el-table-column>
        <el-table-column label="预期结果" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag type="info" size="mini">{{ getAssertType(scope.row.autoStep.assertType) }}</el-tag>
            <span>{{scope.row.autoStep.assertExpect}}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际结果" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag type="info" size="mini">{{ scope.row.autoStep.assertResult === null ? '未校验' : scope.row.autoStep.assertResult }}</el-tag>
            <span>{{scope.row.autoStep.assertActual}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!--后置步骤-->
      <el-divider content-position="right">
        <el-button @click="createRelatedStep(pageData.afterStepList !== null ? pageData.afterStepList.length + 1 : 1, 3, null)" type="text">新增</el-button>
        <el-button v-if="pageData.afterStepList !== null && pageData.afterStepList.length !== 0" @click="deleteStep(pageData.afterStepList.pop())" type="text">删除</el-button>
        <span>置后步骤(@AfterTest)</span>
        <el-tooltip class="item" effect="dark" content="参考Testng中的@AfterTest，会在@Test之后执行" placement="top-start">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </el-divider>
      <div v-if="pageControl.isNewAfterStep">
        <el-input v-model="pageControl.afterStepId" placeholder="请输入要关联的步骤编号" size="small"
                  maxlength="20" show-word-limit>
          <template #append>
            <el-button @click="createRelatedStep(pageData.afterStepList !== null ? pageData.afterStepList.length + 1 : 1, 1, pageControl.afterStepId)" type="primary">确认</el-button>
            <el-button @click="pageControl.isNewAfterStep=false">取消</el-button>
          </template>
        </el-input>
      </div>
      <!--列表-->
      <el-table border :data="pageData.afterStepList" @row-click="edit" :row-style="{cursor: 'pointer'}" size="mini" style="width: 100%">
        <el-table-column label="编号" width="130">
          <template slot-scope="scope">
            {{scope.row.autoStep.stepId}}
          </template>
        </el-table-column>
        <el-table-column label="标题" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.autoStep.name}}
          </template>
        </el-table-column>
        <el-table-column label="预期结果" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag type="info" size="mini">{{ getAssertType(scope.row.autoStep.assertType) }}</el-tag>
            <span>{{scope.row.autoStep.assertExpect}}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际结果" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag type="info" size="mini">{{ scope.row.autoStep.assertResult === null ? '未校验' : scope.row.autoStep.assertResult }}</el-tag>
            <span>{{scope.row.autoStep.assertActual}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!--弹窗-->
    <!--编辑步骤-->
    <el-dialog v-if="pageControl.isEditStep" :visible.sync="pageControl.isEditStep" title="编辑步骤" width="65%" append-to-body>
      <tl-step-detail :case-step="pageControl.selectedStep" :visible.sync="pageControl.isEditStep"></tl-step-detail>
    </el-dialog>
  </div>
</template>

<script>
import {createAPI, createRelatedStepAPI, quickCreateConfigAPI, updateAPI, updateConfigAPI, removeAPI, removeConfigAPI, removeRelatedStepAPI, changeUiModeAPI, changeScriptModeAPI, queryDetailAPI, useAPI} from '@/api/autoCase'
import tlStepDetail from '@/component/stepDetail'

export default {
  components: {tlStepDetail},
  props: {
    caseId: {
      type: Number,
      default: -1
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      pageData: {
        caseId: null,
        name: 'name',
        description: '',
        parameterList: null,
        argumentList: null,
        finishTime: '',
        maxTime: 1,
        ownerId: '123',
        ownerName: 'tester',
        type: 1,
        status: 1,
        preStepList: [],
        afterStepList: []
      },
      pageControl: {
        // isEdit: false,
        isNewPreStep: false,
        isNewAfterStep: false,
        isEditStep: false,
        // isWebDriver: false,
        webDriverType: 1,
        preStepId: '',
        afterStepId: '',
        selectedStep: {}
      }
    }
  },
  watch: {
    'pageControl.isEditStep': function () {
      if (!this.pageControl.isEditStep) {
        // this.checkCaseType()
      }
    }
  },
  created: function () {
    if (this.isEdit) {
      this.queryDetail()
    }
  },
  methods: {
    getAssertType (type) {
      switch (type) {
        case -1:
          return '不校验'
        case 1:
          return 'equals'
        case 2:
          return 'contains'
        default:
          return '未知类型'
      }
    },
    newParam () {
      let config = {name: 'default', value: '', type: 1, caseId: this.pageData.caseId}
      if (this.pageData.parameterList === null) {
        this.pageData.parameterList = [config]
      } else {
        this.pageData.parameterList.push(config)
      }
      // this.pageControl.paramName = ''
      // this.pageControl.isNewParam = false
      quickCreateConfigAPI(config).then(response => {
        if (response.data.success === true) {
          this.$message.success('添加配置成功')
        }
      })
    },
    deleteParam (index) {
      let configId = this.pageData.parameterList[index].configId
      removeConfigAPI({configId: configId}).then(response => {
        if (response.data.success === true) {
          this.pageData.parameterList.splice(index, 1)
          this.$message.success('删除步骤成功')
        }
      })
    },
    newUiParam () {
      let config = {name: 'default', value: '', type: this.pageControl.webDriverType, caseId: this.pageData.caseId}
      if (this.pageData.argumentList === null) {
        this.pageData.argumentList = [config]
      } else {
        this.pageData.argumentList.push(config)
      }
      // this.pageControl.paramName = ''
      // this.pageControl.isNewParam = false
      quickCreateConfigAPI(config).then(response => {
        if (response.data.success === true) {
          this.$message.success('添加配置成功')
        }
      })
    },
    deleteUiParam (index) {
      let configId = this.pageData.argumentList[index].configId
      removeConfigAPI({configId: configId}).then(response => {
        if (response.data.success === true) {
          this.pageData.argumentList.splice(index, 1)
          this.$message.success('删除步骤成功')
        }
      })
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
    updateParam (param) {
      updateConfigAPI(param).then(response => {
        if (response.data.success === true) {
          this.$message.success('编辑用例成功')
        }
      })
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
      queryDetailAPI({
        caseId: this.caseId
      }).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
          if (this.pageData.argumentList !== null) {
            this.pageControl.webDriverType = this.pageData.argumentList[0].type
          }
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
