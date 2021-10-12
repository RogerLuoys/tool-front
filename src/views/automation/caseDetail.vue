<template>
  <div>
<!--    <el-page-header @back="$router.push('/automation')" title="返回列表">-->
<!--      <template #content>-->
<!--        <span>{{pageData.name}}</span>-->
<!--      </template>-->
<!--    </el-page-header>-->
    <el-row style="height: 15px">
      <el-col :span="15">
        <span>编辑测试用例</span>
        <el-tooltip v-if="pageData.type === 2" content="此用例包含ui步骤，将视为ui用例">
          <el-tag size="small">ui</el-tag>
        </el-tooltip>
      </el-col>
      <el-col :span="8" style="text-align: right">
        <el-button @click="use()" type="primary" size="small">执行用例</el-button>
<!--        <el-button @click="remove()" size="small">删除用例</el-button>-->
        <el-popconfirm title="确定删除吗？" @confirm="remove">
          <template #reference>
            <el-button size="small">删除用例</el-button>
          </template>
        </el-popconfirm>
      </el-col>
    </el-row>
    <!--基本信息-->
    <el-divider content-position="right"></el-divider>
    <el-form :model="pageData" label-width="90px" size="small">
      <el-form-item label="标题">
        <el-input v-model="pageData.name" @change="update" placeholder="请输入标题" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="pageData.description" @change="update" placeholder="请描述功能和实现方法" type="textarea" maxlength="200"
                  show-word-limit></el-input>
      </el-form-item>
<!--      <el-form-item label="类型">-->
<!--        <el-radio-group v-model="pageData.type">-->
<!--          <el-radio :label="1">接口自动化</el-radio>-->
<!--          <el-radio :label="2">UI自动化</el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
      <el-form-item label="执行环境">
        <el-input v-model="pageData.environment" @change="update" placeholder="请输入默认域名或ip端口，可在步骤中通过${env}使用此参数" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="最大时间">
        <el-input-number v-model="pageData.maxTime" @change="update" :min="1" :max="60" label="用例最大执行时间(分)" size="mini"></el-input-number>
        <span>分钟</span>
      </el-form-item>
      <!--前置步骤******************************-->
      <el-divider content-position="right">
        <el-button @click="createRelatedStep(pageData.preStepList !== null ? pageData.preStepList.length + 1 : 1, 1, null)" type="text">新增</el-button>
        <el-button @click="pageControl.isNewPreStep=true" type="text">关联</el-button>
        <el-button v-if="pageData.preStepList !== null && pageData.preStepList.length !== 0" @click="deleteStep(pageData.preStepList.pop())" type="text">删除</el-button>
        <span>前置步骤</span>
        <el-tooltip class="item" effect="dark" content="前置步骤会在用例最开始执行，主要用于环境准备" placement="top-start">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </el-divider>
      <div v-if="pageControl.isNewPreStep">
        <el-input v-model="pageControl.preStepId" placeholder="请输入要关联的步骤编号"
                  maxlength="20" show-word-limit>
          <template #append>
            <el-button @click="createRelatedStep(pageData.preStepList !== null ? pageData.preStepList.length + 1 : 1, 1, pageControl.preStepId)" type="primary">确认</el-button>
            <el-button @click="pageControl.isNewPreStep=false">取消</el-button>
          </template>
        </el-input>
      </div>
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
<!--        <el-table-column label="" width="80">-->
<!--          <template slot-scope="scope">-->
<!--            <div v-if="scope.row.autoStep.isPublic">公用步骤</div>-->
<!--            <div v-else>-->
<!--              <el-button @click="edit(scope.row.autoStep)" type="text" size="mini">编辑</el-button>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
      <!--主要步骤-->
      <el-divider content-position="right">
        <el-button @click="createRelatedStep(pageData.mainStepList !== null ? pageData.mainStepList.length + 1 : 1, 2, null)" type="text">新增</el-button>
        <el-button @click="pageControl.isNewMainStep=true" type="text">关联</el-button>
        <el-button v-if="pageData.mainStepList !== null && pageData.mainStepList.length !== 0" @click="deleteStep(pageData.mainStepList.pop())" type="text">删除</el-button>
        <span>主要步骤</span>
        <el-tooltip class="item" effect="dark" content="主要步骤会前置步骤后执行，是用例主体，不可为空" placement="top-start">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </el-divider>
      <div v-if="pageControl.isNewMainStep">
        <el-input v-model="pageControl.mainStepId" placeholder="请输入要关联的步骤编号"
                  maxlength="20" show-word-limit>
          <template #append>
            <el-button @click="createRelatedStep(pageData.mainStepList !== null ? pageData.mainStepList.length + 1 : 1, 2, pageControl.mainStepId)" type="primary">确认</el-button>
            <el-button @click="pageControl.isNewMainStep=false">取消</el-button>
          </template>
        </el-input>
      </div>
      <!--列表-->
      <el-table border :data="pageData.mainStepList" @row-click="edit" :row-style="{cursor: 'pointer'}" size="mini" style="width: 100%">
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
<!--        <el-table-column label="" width="80">-->
<!--          <template slot-scope="scope">-->
<!--            <div v-if="scope.row.autoStep.isPublic">公用步骤</div>-->
<!--            <div v-else>-->
<!--              <el-button @click="edit(scope.row.autoStep)" type="text">编辑</el-button>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
      <!--收尾步骤-->
      <el-divider content-position="right">
        <el-button @click="createRelatedStep(pageData.afterStepList !== null ? pageData.afterStepList.length + 1 : 1, 3, null)" type="text">新增</el-button>
        <el-button @click="pageControl.isNewAfterStep=true" type="text">关联</el-button>
        <el-button v-if="pageData.afterStepList !== null && pageData.afterStepList.length !== 0" @click="deleteStep(pageData.afterStepList.pop())" type="text">删除</el-button>
        <span>收尾步骤</span>
        <el-tooltip class="item" effect="dark" content="收尾步骤会在主要步骤后执行，用于环境还原，若结果为fail则不执行" placement="top-start">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </el-divider>
      <div v-if="pageControl.isNewAfterStep">
        <el-input v-model="pageControl.afterStepId" placeholder="请输入要关联的步骤编号"
                  maxlength="20" show-word-limit>
          <template #append>
            <el-button @click="createRelatedStep(pageData.afterStepList !== null ? pageData.afterStepList.length + 1 : 1, 3, pageControl.afterStepId)" type="primary">确认</el-button>
            <el-button @click="pageControl.isNewAfterStep=false">取消</el-button>
          </template>
        </el-input>
      </div>
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
            <el-tag type="info" size="mini">{{ scope.row.autoStep.assertResult === -1 ? '未校验' : scope.row.autoStep.assertResult }}</el-tag>
            <span>{{scope.row.autoStep.assertActual}}</span>
          </template>
        </el-table-column>
<!--        <el-table-column label="" width="80">-->
<!--          <template slot-scope="scope">-->
<!--            <div v-if="scope.row.autoStep.isPublic">公用步骤</div>-->
<!--            <div v-else>-->
<!--              <el-button @click="edit(scope.row.autoStep)" type="text">编辑</el-button>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
    </el-form>
    <!--弹窗-->
    <el-dialog v-if="pageControl.isEditStep" :visible.sync="pageControl.isEditStep" title="编辑步骤" width="65%" append-to-body>
      <tl-step-detail :case-step="pageControl.selectedStep" :visible.sync="pageControl.isEditStep" is-case-step></tl-step-detail>
    </el-dialog>
  </div>
</template>

<script>
import {createAPI, createRelatedStepAPI, updateAPI, removeAPI, removeRelatedStepAPI, queryDetailAPI, useAPI} from '@/api/autoCase'
import tlStepDetail from './stepDetail'

export default {
  components: {tlStepDetail},
  props: {
    caseId: {
      type: String,
      default: ''
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
        environment: '',
        maxTime: 1,
        ownerId: '123',
        ownerName: 'tester',
        type: 1,
        status: 1,
        preStepList: [{
          type: 1,
          sequence: null,
          autoStep: {
            stepId: null,
            name: 'caseStep',
            description: 'caseStepdesc',
            ownerId: '12',
            ownerName: 'tester',
            isPublic: false,
            type: 1,
            assertType: -1,
            assertExpect: '',
            assertResult: false,
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
          }
        }],
        mainStepList: [{
          sequence: null,
          autoStep: {
            stepId: null,
            name: 'caseStep',
            description: 'caseStepdesc',
            ownerId: '12',
            ownerName: 'tester',
            isPublic: false,
            type: 1,
            assertType: -1,
            assertExpect: 'expct',
            assertActual: 'actual',
            assertResult: false,
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
          }
        }],
        afterStepList: []
      },
      pageControl: {
        // isEdit: false,
        isNewPreStep: false,
        isNewMainStep: false,
        isNewAfterStep: false,
        isEditStep: false,
        preStepId: '',
        mainStepId: '',
        afterStepId: '',
        selectedStep: {}
      }
    }
  },
  watch: {
    'pageControl.isEditStep': function () {
      if (!this.pageControl.isEditStep) {
        this.checkCaseType()
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
    checkCaseType () {
      console.info('自动校验用例类型，只要存在ui类型步骤，则是ui用例')
      let caseType = 1
      for (let i = 0; i < this.pageData.preStepList.length; i++) {
        console.info(this.pageData.preStepList[i].autoStep.type)
        if (this.pageData.preStepList[i].autoStep.type === 4) {
          caseType = 2
          break
        }
      }
      for (let i = 0; i < this.pageData.mainStepList.length; i++) {
        if (this.pageData.mainStepList[i].autoStep.type === 4) {
          caseType = 2
          break
        }
      }
      for (let i = 0; i < this.pageData.afterStepList.length; i++) {
        if (this.pageData.afterStepList[i].autoStep.type === 4) {
          caseType = 2
          break
        }
      }
      if (caseType !== this.pageData.type) {
        this.pageData.type = caseType
        updateAPI(this.pageData).then()
      }
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
    },
    update () {
      updateAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('编辑用例成功')
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
        }
      })
    },
    use () {
      useAPI(this.pageData, this.$store.state.slaveHost).then(response => {
        if (response.data.success === true) {
          this.pageControl.respondData = response.data.data
          this.$message.success('使用成功')
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
