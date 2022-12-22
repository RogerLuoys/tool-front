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
<!--      <el-form-item label="类型">-->
<!--        <el-radio-group v-model="pageData.type" :disabled="isEdit">-->
<!--          <el-radio :label="1">数据库</el-radio>-->
<!--          <el-radio :label="2">设备</el-radio>-->
<!--          <el-radio :label="3">测试环境</el-radio>-->
<!--          <el-radio :label="4">从节点</el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="权限">-->
<!--        <el-radio-group v-model="pageData.permission">-->
<!--          <el-radio :label="1">公开</el-radio>-->
<!--          <el-radio :label="2">自己可见</el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
      <!--模板-->
      <el-divider content-position="right"></el-divider>
      <!--数据源模板-->
      <div v-if="pageData.type===1">
        <el-form-item label="驱动">
          <el-input v-model="pageData.dataSource.driver" placeholder="请输入驱动"
                    maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="pageData.dataSource.url" placeholder="请输入URL"
                    maxlength="200" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="pageData.dataSource.username" placeholder="请输入用户名"
                    maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="pageData.dataSource.password" placeholder="请输入密码"
                    maxlength="50" show-word-limit></el-input>
        </el-form-item>
      </div>
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
  // components: {SelectDevice},
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
        type: 1,
        dataSource: {
          driver: '',
          url: '',
          username: '',
          password: ''
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
