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
        <el-radio-group v-model="pageData.type" :disabled="deviceId!==0" size="small">
          <el-radio :label="1">数据库</el-radio>
          <el-radio :label="2">手机</el-radio>
          <el-radio :label="3">容器</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限">
        <el-radio-group v-model="pageData.status" size="small">
          <el-radio :label="1">公开</el-radio>
          <el-radio :label="2">自己可见</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--模板-->
      <el-divider content-position="right"></el-divider>
      <!--数据源模板-->
      <div v-if="pageData.type===1">
        <el-form-item label="驱动">
          <el-input v-model="pageData.dataBase.driver" size="small" placeholder="请输入驱动"
                    maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="pageData.dataBase.url" size="small" placeholder="请输入URL"
                    maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="pageData.dataBase.userName" size="small" placeholder="请输入用户名"
                    maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="pageData.dataBase.password" size="small" placeholder="请输入密码"
                    maxlength="50" show-word-limit></el-input>
        </el-form-item>
      </div>
      <!--手机模板-->
      <div v-else-if="pageData.type===2">
        <el-form-item label="型号">
          <el-input v-model="pageData.mobilePhone.model" size="small" placeholder="请输入型号"
                    maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="屏幕尺寸">
          <el-input v-model="pageData.mobilePhone.size" size="small" placeholder="请输入屏幕尺寸"
                    maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="分辨率">
          <el-input v-model="pageData.mobilePhone.dpi" size="small" placeholder="请输入分辨率"
                    maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="操作系统">
          <el-input v-model="pageData.mobilePhone.os" size="small" placeholder="请输入操作系统类型"
                    maxlength="10" show-word-limit></el-input>
        </el-form-item>
      </div>
      <div v-else-if="pageData.type===3">
        <el-form-item label="域名">
          <el-input v-model="pageData.container.ip" size="small" placeholder="请输入IP或域名"
                    maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="端口">
          <el-input v-model="pageData.container.port" size="small" placeholder="请输入端口"
                    maxlength="10" show-word-limit></el-input>
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
      <el-button @click="save()" type="primary" size="small">保存</el-button>
      <el-button v-if="deviceId !== 0" @click="remove()" size="small">删除</el-button>
    </div>
  </div>
</template>

<script>
import {createAPI, updateAPI, deleteAPI} from '@/api/device'
// import SelectDevice from '../../components/selectDevice'

export default {
  // components: {SelectDevice},
  props: {
    deviceId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      pageData: {
        deviceId: 0,
        title: '',
        description: '',
        owner: 'tester',
        permission: 2,
        type: 1,
        dataBase: {
          driver: '',
          url: '',
          userName: '',
          password: ''
        },
        mobilePhone: {
          model: '',
          size: '',
          cpu: '',
          os: ''
        },
        container: {
          ip: '',
          port: ''
        }
      },
      pageControl: {
        isNewParam: false,
        isNewTool: false,
        isNewSQL: false,
        isNewHeader: false,
        isContactDB: false,
        paramType: 'String',
        paramName: '',
        sql: '',
        httpHeader: ''
      }
    }
  },
  methods: {
    newParam () {
      this.pageData.paramList.push({name: this.pageControl.paramName, value: ''})
      this.pageControl.paramName = ''
      this.pageControl.isNewParam = false
    },
    deleteParam (index) {
      this.pageData.paramList.splice(index, 1)
    },
    newSQL () {
      this.pageData.sqlList.push(this.pageControl.sql)
      this.pageControl.sql = ''
      this.pageControl.isNewSQL = false
    },
    deleteSQL (index) {
      this.pageData.sqlList.splice(index, 1)
    },
    newHeader () {
      this.pageData.httpHeaderList.push({name: this.pageControl.httpHeader, value: ''})
      this.pageControl.httpHeader = ''
      this.pageControl.isNewHeader = false
    },
    deleteHeader (index) {
      this.pageData.httpHeaderList.splice(index, 1)
      debugger
    },
    save () {
      if (this.deviceId === 0) {
        this.create()
      } else {
        this.update()
      }
    },
    create () {
      createAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('创建成功')
        }
      })
    },
    update () {
      updateAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('编辑成功')
        }
      })
    },
    remove () {
      deleteAPI({deviceId: this.pageData.deviceId}).then(response => {
        if (response.data.success === true) {
          this.$message.success('删除成功')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
