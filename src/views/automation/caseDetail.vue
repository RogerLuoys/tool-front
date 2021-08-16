<template>
  <div>
    <el-page-header @back="$router.push('/automation')" title="返回列表">
      <template #content>
        <span>{{pageData.name}}</span>
      </template>
    </el-page-header>
    <!--基本信息-->
    <el-divider content-position="right">基本信息</el-divider>
    <el-form :model="pageData" label-width="90px">
      <el-form-item label="标题">
        <el-input v-model="pageData.name" placeholder="请输入标题" size="small" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="pageData.description" placeholder="请描述功能和实现方法" type="textarea" maxlength="200"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="pageData.type" size="small">
          <el-radio :label="1">接口自动化</el-radio>
          <el-radio :label="2">UI自动化</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="最大时间">
        <el-input-number v-model="pageData.maxTime" :min="1" :max="60" label="用例最大执行时间(分)" size="small"></el-input-number>
      </el-form-item>
      <!--前置步骤******************************-->
      <el-divider content-position="right">
        <span>前置步骤</span>
        <el-tooltip class="item" effect="dark" content="前置步骤会在用例最开始执行，主要用于环境准备" placement="top-start">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </el-divider>
      <el-table border :data="pageData.preStepList" size="mini" style="width: 100%">
        <el-table-column label="编号" width="130">
          <template slot-scope="scope">
            {{scope.row.autoStep.stepId}}
          </template>
        </el-table-column>
        <el-table-column label="标题" width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.autoStep.name}}
          </template>
        </el-table-column>
        <el-table-column label="预期结果" width="300" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag size="small">{{ getAssertType(scope.row.autoStep.assertType) }}</el-tag>
            <span>{{scope.row.autoStep.expectResult}}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际结果" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.autoStep.actualResult}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.autoStep.isPublic">公用步骤</div>
            <div v-else>
              <el-button @click="edit(scope.row.autoStep)" type="text" size="small">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="pageControl.isNewPreStep">
        <el-input v-model="pageControl.preStepId" size="small" placeholder="请输入要关联的步骤编号"
                  maxlength="20" show-word-limit>
          <template #append>
            <el-button @click="createRelatedStep(pageData.preStepList.length, 1, pageControl.preStepId)" type="primary" size="small">确认</el-button>
            <el-button @click="pageControl.isNewPreStep=false" size="small">取消</el-button>
          </template>
        </el-input>
      </div>
      <div v-else>
        <el-button @click="createRelatedStep(pageData.preStepList !== null ? pageData.preStepList.length + 1 : 1, 1)" size="mini" type="primary" plain>快速新增</el-button>
        <el-button @click="pageControl.isNewPreStep=true" size="mini" plain>关联步骤</el-button>
        <el-button @click="deleteStep(pageData.preStepList.pop())" size="small">删除步骤</el-button>
      </div>
      <!--主要步骤-->
      <el-divider content-position="right">
        <span>主要步骤</span>
        <el-tooltip class="item" effect="dark" content="主要步骤会前置步骤后执行，是用例主体，不可为空" placement="top-start">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </el-divider>
      <!--列表-->
      <el-table border :data="pageData.mainStepList" size="mini" style="width: 100%">
        <el-table-column label="编号" width="130">
          <template slot-scope="scope">
            {{scope.row.autoStep.stepId}}
          </template>
        </el-table-column>
        <el-table-column label="标题" width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.autoStep.name}}
          </template>
        </el-table-column>
        <el-table-column label="预期结果" width="300" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag size="small">{{ getAssertType(scope.row.autoStep.assertType) }}</el-tag>
            <span>{{scope.row.autoStep.expectResult}}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际结果" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.autoStep.actualResult}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.autoStep.isPublic">公用步骤</div>
            <div v-else>
              <el-button @click="edit(scope.row.autoStep)" type="text" size="small">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="pageControl.isNewMainStep">
        <el-input v-model="pageControl.mainStepId" size="small" placeholder="请输入要关联的步骤编号"
                  maxlength="20" show-word-limit>
          <template #append>
            <el-button @click="createRelatedStep(pageData.mainStepList.length, 2, pageControl.mainStepId)" type="primary" size="small">确认</el-button>
            <el-button @click="pageControl.isNewMainStep=false" size="small">取消</el-button>
          </template>
        </el-input>
      </div>
      <div v-else>
        <el-button @click="createRelatedStep(pageData.mainStepList !== null ? pageData.mainStepList.length + 1 : 1, 2)" size="mini" type="primary" plain>快速新增</el-button>
        <el-button @click="pageControl.mainStepId=true" size="mini" plain>关联步骤</el-button>
        <el-button @click="deleteStep(pageData.mainStepList.pop())" size="small">删除步骤</el-button>
      </div>
      <!--收尾步骤-->
      <el-divider content-position="right">
        <span>收尾步骤</span>
        <el-tooltip class="item" effect="dark" content="收尾步骤会在主要步骤后执行，用于环境还原，若结果为fail则不执行" placement="top-start">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </el-divider>
      <el-table border :data="pageData.afterStepList" size="mini" style="width: 100%">
        <el-table-column label="编号" width="130">
          <template slot-scope="scope">
            {{scope.row.autoStep.stepId}}
          </template>
        </el-table-column>
        <el-table-column label="标题" width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.autoStep.name}}
          </template>
        </el-table-column>
        <el-table-column label="预期结果" width="300" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag size="small">{{ getAssertType(scope.row.autoStep.assertType) }}</el-tag>
            <span>{{scope.row.autoStep.expectResult}}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际结果" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.autoStep.actualResult}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.autoStep.isPublic">公用步骤</div>
            <div v-else>
              <el-button @click="edit(scope.row.autoStep)" type="text" size="small">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="pageControl.isNewAfterStep">
        <el-input v-model="pageControl.afterStepId" size="small" placeholder="请输入要关联的步骤编号"
                  maxlength="20" show-word-limit>
          <template #append>
            <el-button @click="createRelatedStep(pageData.afterStepList.length, 3, pageControl.afterStepId)" type="primary" size="small">确认</el-button>
            <el-button @click="pageControl.isNewMainStep=false" size="small">取消</el-button>
          </template>
        </el-input>
      </div>
      <div v-else>
        <el-button @click="createRelatedStep(pageData.mainStepList !== null ? pageData.mainStepList.length + 1 : 1, 3)" size="mini" type="primary" plain>快速新增</el-button>
        <el-button @click="pageControl.mainStepId=true" size="mini" plain>关联步骤</el-button>
        <el-button @click="deleteStep(pageData.mainStepList.pop())" size="small">删除步骤</el-button>
      </div>
    </el-form>
    <div style="text-align: center">
      <el-button @click="use()" type="primary" size="small">执行用例</el-button>
      <el-button @click="remove()" size="small">删除用例</el-button>
    </div>
    <el-dialog :visible.sync="pageControl.isEditStep" title="编辑步骤" width="65%">
      <tl-step-detail :case-step="pageControl.selectedStep" is-case-step></tl-step-detail>
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
    }
  },
  data () {
    return {
      pageData: {
        caseId: null,
        name: 'name',
        description: '',
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
            expectResult: 'expct',
            actualResult: 'actual',
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
        afterStepList: [{
          name: 'name',
          stepId: '1',
          sequence: null
        }]
      },
      pageControl: {
        isEdit: false,
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
  // watch: {
  //   testSuiteId: function (newVal, oldVal) {
  //     if (this.caseId !== 0) {
  //       this.queryDetail()
  //     }
  //   }
  // },
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
    // newPreStep () {
    //   if (this.pageData.preStepList === null) {
    //     this.pageData.preStepList = [{name: '', stepId: this.pageControl.preStepId}]
    //   } else {
    //     this.pageData.preStepList.push({name: '', stepId: this.pageControl.preStepId})
    //   }
    //   this.pageControl.preStepId = ''
    //   this.pageControl.isNewPreStep = false
    // },
    // deletePreStep (index) {
    //   this.pageData.preStepList.splice(index, 1)
    // },
    // newMainStep () {
    //   if (this.pageData.mainStepList === null) {
    //     this.pageData.mainStepList = [{name: '', stepId: this.pageControl.mainStepId}]
    //   } else {
    //     this.pageData.mainStepList.push({name: '', stepId: this.pageControl.mainStepId})
    //   }
    //   this.pageControl.mainStepId = ''
    //   this.pageControl.isNewMainStep = false
    // },
    // deleteMainStep (index) {
    //   this.pageData.mainStepList.splice(index, 1)
    // },
    // newAfterStep () {
    //   if (this.pageData.afterStepList === null) {
    //     this.pageData.afterStepList = [{name: '', stepId: this.pageControl.afterStepId}]
    //   } else {
    //     this.pageData.afterStepList.push({name: '', stepId: this.pageControl.afterStepId})
    //   }
    //   this.pageControl.afterStepId = ''
    //   this.pageControl.isNewAfterStep = false
    // },
    // deleteAfterStep (index) {
    //   this.pageData.afterStepList.splice(index, 1)
    // },
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
        }
      })
    },
    queryDetail () {
      queryDetailAPI({
        caseId: this.$route.params.id
      }).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
        }
      })
    },
    use () {
      useAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.pageControl.respondData = response.data.data
          this.$message.success('使用成功')
        }
      })
    },
    edit (autoStep) {
      this.pageControl.selectedStep = autoStep
      this.pageControl.isEditStep = true
    }
  }
}
</script>

<style scoped>

</style>
