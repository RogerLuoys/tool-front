<template>
  <div>
    <!--基本信息-->
    <el-form :model="pageData" label-width="90px" size="small">
      <el-form-item label="标题">
        <el-input v-model="pageData.name" placeholder="请输入标题" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="pageData.description" placeholder="请描述功能和实现方法" type="textarea" maxlength="200"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-radio-group v-model="pageData.permission">
          <el-radio :label="1">全局共用</el-radio>
          <el-radio :label="2">项目共用</el-radio>
          <el-radio :label="3">个人专用</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--模板-->
      <el-divider content-position="right"></el-divider>
      <!--数据源模板-->
      <el-form-item label="URL">
        <el-input v-model="pageData.slave.ip" placeholder="请输入URL"
                  maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="端口">
        <el-input v-model="pageData.slave.port" placeholder="请输入端口"
                  maxlength="5" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="最大线程数">
        <el-input v-model="pageData.slave.thread" placeholder="请输入最大线程数"
                  maxlength="1" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button @click="save()" type="primary" size="small">保存</el-button>
      <el-button v-if="isEdit" @click="remove()" size="small">删除</el-button>
    </div>
  </div>
</template>

<script>
import {createAPI, updateAPI, removeAPI, queryDetailAPI} from '@/api/resource'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    resourceId: {
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
        resourceId: null,
        name: '',
        description: '',
        owner: null,
        permission: 2,
        type: 2,
        slave: {
          url: null,
          port: null,
          thread: null
        }
      }
    }
  },
  created: function () {
    if (this.isEdit) {
      this.queryDetail()
    }
  },
  methods: {
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
          this.$message.success('创建成功')
          this.$emit('update:visible', false)
        }
      })
    },
    update () {
      updateAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('编辑成功')
          this.$emit('update:visible', false)
        }
      })
    },
    remove () {
      removeAPI({resourceId: this.pageData.resourceId}).then(response => {
        if (response.data.success === true) {
          this.$message.success('删除成功')
          this.$emit('update:visible', false)
        }
      })
    },
    queryDetail () {
      queryDetailAPI({
        resourceId: this.resourceId
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
