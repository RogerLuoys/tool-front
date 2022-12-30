<template>
  <div>
    <!--基本信息-->
    <el-form :model="pageData" label-width="90px" size="small">
      <el-form-item label="名称">
        <el-input v-model="pageData.name" placeholder="请输入标题" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="pageData.description" placeholder="请输入描述"
                  maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model="pageData.ownerId" placeholder="请输入项目负责人账号"
                  maxlength="200" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button @click="save()" type="primary" size="small">保存</el-button>
      <el-button v-if="isEdit" @click="remove()" size="small">删除</el-button>
    </div>
  </div>
</template>

<script>
import {createAPI, updateAPI, removeAPI} from '@/api/project'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    // resourceId: {
    //   type: String,
    //   default: ''
    // },
    isEdit: {
      type: Boolean,
      default: false
    },
    projectDetail: {}
  },
  data () {
    return {
      pageData: {
        projectId: null,
        name: null,
        description: null,
        ownerId: null
      }
    }
  },
  created: function () {
    if (this.isEdit) {
      // this.queryDetail()
      this.pageData = this.projectDetail
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
    }
    // queryDetail () {
    //   queryDetailAPI({
    //     resourceId: this.resourceId
    //   }).then(response => {
    //     if (response.data.success === true) {
    //       this.pageData = response.data.data
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>

</style>
