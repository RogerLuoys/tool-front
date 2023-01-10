<template>
  <div>
    <!--基本信息-->
    <el-form :model="pageData" label-width="90px" size="small">
      <el-form-item label="标题(注释)">
        <el-input v-model="pageData.name" placeholder="请输入标题" maxlength="30" show-word-limit></el-input>
      </el-form-item>
<!--      <el-form-item v-if="!isCaseStep" label="说明">-->
<!--        <el-input v-model="pageData.description" placeholder="请描述步骤" type="textarea" maxlength="200"-->
<!--                  show-word-limit></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="模块类型">
        <el-radio-group v-model="pageData.moduleType" @change="changeType()">
          <el-radio :label="1">PO</el-radio>
          <el-radio :label="2">SQL</el-radio>
          <el-radio :label="3">RPC</el-radio>
          <el-radio :label="4">HTTP</el-radio>
          <el-radio :label="5">UI</el-radio>
          <el-radio :label="6">UTIL</el-radio>
          <el-radio :label="7">ASSERTION</el-radio>
          <el-radio :label="-1">未定义</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--模板-->
      <el-divider content-position="right"></el-divider>
      <!--PO类型-->
      <el-form-item label="方法类型">
        <el-row :gutter="5">
          <el-col :span="4">
            <template v-if="pageData.moduleType===1">
              <el-select v-model="pageData.methodType" placeholder="请求方法"
                         style="float:left; width: 100px">
                <el-option key="1" label="Normal" value="1"></el-option>
                <el-option key="2" label="Json" value="2"></el-option>
              </el-select>
            </template>
            <template v-if="pageData.moduleType===2">
              <el-select v-model="pageData.methodType" placeholder="请求方法"
                         style="float:left; width: 100px">
                <el-option key="1" label="Normal" value="1"></el-option>
                <el-option key="2" label="Json" value="2"></el-option>
              </el-select>
            </template>
            <template v-if="pageData.moduleType===3">
              <el-select v-model="pageData.methodType" placeholder="请求方法"
                         style="float:left; width: 100px">
                <el-option key="1" label="GET" value="1"></el-option>
                <el-option key="2" label="POST" value="2"></el-option>
                <el-option key="3" label="PUT" value="3"></el-option>
                <el-option key="4" label="DELETE" value="4"></el-option>
              </el-select>
            </template>
            <template v-if="pageData.moduleType===4">
              <el-select v-model="pageData.methodType" placeholder="请求方法"
                         style="float:left; width: 100px">
                <el-option key="1" label="Normal" value="1"></el-option>
                <el-option key="2" label="Json" value="2"></el-option>
              </el-select>
            </template>
            <template v-if="pageData.moduleType===5">
              <el-select v-model="pageData.methodType" placeholder="操作类型"
                         style="float:left; width: 100px">
                <el-option key="1" label="openUrl" :value="1"></el-option>
                <el-option key="2" label="click" :value="2"></el-option>
                <el-option key="3" label="sendKey" :value="3"></el-option>
                <el-option key="4" label="isExist" :value="4"></el-option>
                <el-option key="5" label="switchFrame" :value="5"></el-option>
                <el-option key="6" label="hover" :value="6"></el-option>
              </el-select>
            </template>
            <template v-if="pageData.moduleType===6">
              <el-select v-model="pageData.methodType" placeholder="操作类型"
                         style="float:left; width: 100px">
                <el-option key="1" label="openUrl" :value="1"></el-option>
                <el-option key="2" label="click" :value="2"></el-option>
                <el-option key="3" label="sendKey" :value="3"></el-option>
                <el-option key="4" label="isExist" :value="4"></el-option>
                <el-option key="5" label="switchFrame" :value="5"></el-option>
                <el-option key="6" label="hover" :value="6"></el-option>
              </el-select>
            </template>
          </el-col>
          <el-col :span="19">
            <el-tooltip class="item" effect="dark" :content="pageControl.format.description" placement="top-start">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form-item>
      <!--SQL类型-->
      <!--HTTP类型-->
      <!--RPC类型-->
      <!--UI类型-->
    </el-form>
    <div style="text-align: center">
      <el-button @click="save()" type="primary" size="small">保存</el-button>
      <el-popconfirm title="确定删除吗？" @confirm="remove">
        <template #reference>
          <el-button size="small">删除</el-button>
        </template>
      </el-popconfirm>
    </div>
    <el-dialog v-if="pageControl.isSelectDataSource" :visible.sync="pageControl.isSelectDataSource" append-to-body>
      <tl-select-data-source :visible.sync="pageControl.isSelectDataSource"></tl-select-data-source>
    </el-dialog>
  </div>
</template>

<script>
import {updateAPI, removeAPI, queryDetailAPI} from '@/api/autoStep'
import tlSelectDataSource from '@/views/factory/selectDataSource'

export default {
  components: {tlSelectDataSource},
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    stepId: {
      type: String,
      default: ''
    },
    // isEdit: {
    //   type: Boolean,
    //   default: false
    // },
    caseStep: {}
    // isCaseStep: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      pageData: {
        stepId: null,
        name: '',
        description: '',
        moduleType: 1,
        methodType: 1,
        methodName: 'methodName',
        methodId: 1,
        parameter1: 'parameter1',
        parameter2: 'parameter2',
        parameter3: 'parameter3',
        varName: 'parameter3'
      },
      pageControl: {
        isNewParam: false,
        isNewSQL: false,
        isNewHeader: false,
        isSelectDataSource: false,
        // isEdit: false,
        paramType: 'String',
        paramName: '',
        sql: '',
        httpHeader: '',
        format: {
          isFunction: true,
          parameter1: 'test',
          parameter2: null,
          parameter3: null,
          description: 'auto.po.poName(parameter1, parameter2, parameter3)'
        }
      }
    }
  },
  created: function () {
    console.info('created')
    // if (this.isEdit) {
    //   this.queryDetail()
    // } else if (this.isCaseStep) {
    //   this.pageData = this.caseStep
    // }
    // this.queryDetail()
    this.pageData = this.caseStep
  },
  watch: {
    'pageControl.isSelectDataSource': function () {
      if (this.pageControl.isSelectDataSource === false) {
        this.pageData.jdbc.dataSource = this.$store.state.selectedDataSource
      }
    }
  },
  methods: {
    changeType () {
      // switch (this.pageData.moduleType) {
      //   case 1:
      //     this.pageData.jdbc = {
      //       dataSource: {
      //         driver: '',
      //         url: '',
      //         username: '',
      //         password: ''
      //       },
      //       sqlList: null
      //     }
      //     break
      //   case 2:
      //     this.pageData.httpRequest = {
      //       httpType: 'GET',
      //       httpBody: '',
      //       httpURL: '',
      //       httpHeaderList: null
      //     }
      //     break
      //   case 3:
      //     this.pageData.rpc = {
      //       url: '',
      //       interfaceName: '',
      //       methodName: '',
      //       parameterType: '',
      //       parameterList: null
      //     }
      //     break
      //   case 4:
      //     this.pageData.ui = {
      //       type: 1,
      //       url: '',
      //       element: '',
      //       elementId: 0
      //     }
      //     break
      //   default:
      //     console.info('?????')
      // }
    },
    save () {
      this.update()
      // // 把无关类型的数据去除
      // switch (this.pageData.moduleType) {
      //   // sql类型
      //   case 1:
      //     this.pageData.httpRequest = null
      //     this.pageData.rpc = null
      //     this.pageData.ui = null
      //     break
      //   // http类型
      //   case 2:
      //     this.pageData.jdbc = null
      //     this.pageData.rpc = null
      //     this.pageData.ui = null
      //     break
      //   // rpc类型
      //   case 3:
      //     this.pageData.jdbc = null
      //     this.pageData.httpRequest = null
      //     this.pageData.ui = null
      //     break
      //   case 4:
      //     this.pageData.jdbc = null
      //     this.pageData.httpRequest = null
      //     this.pageData.rpc = null
      //     break
      // }
      // if (this.isEdit || this.isCaseStep) {
      //   this.update()
      // } else {
      //   this.create()
      // }
    },
    // create () {
    //   createAPI(this.pageData).then(response => {
    //     if (response.data.success === true) {
    //       this.$message.success('创建步骤成功')
    //       this.$emit('update:visible', false)
    //     }
    //   })
    // },
    update () {
      updateAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('编辑步骤成功')
          this.$emit('update:visible', false)
        }
      })
    },
    remove () {
      removeAPI({stepId: this.pageData.stepId}).then(response => {
        if (response.data.success === true) {
          this.$message.success('删除步骤成功')
          this.$emit('update:visible', false)
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
