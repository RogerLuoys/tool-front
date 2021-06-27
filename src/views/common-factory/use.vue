<template>
  <div>
    <el-form :model="pageData" label-width="2cm">
      <el-form-item label="标题">
        <span>{{pageData.title}}</span>
      </el-form-item>
      <el-form-item label="说明">
        <span>{{pageData.description}}</span>
      </el-form-item>
      <div v-for="(item, index) in pageData.params" :key="index">
        <el-form-item>
          <template #label>
            <div>{{ pageData.params[index].paramName }}</div>
          </template>
          <el-input v-model="pageData.params[index].paramValue" placeholder="请输入参数" size="small" maxlength="30"
                    show-word-limit></el-input>
        </el-form-item>
      </div>
      <el-form-item v-if="pageControl.isViewTemplate">
        <template #label>
          <el-button type="text" size="small" @click="pageControl.isViewTemplate=false">收起模板</el-button>
        </template>
        <span>{{pageData.template}}</span>
      </el-form-item>
      <el-form-item v-else>
        <template #label>
          <el-button type="text" size="small" @click="pageControl.isViewTemplate=true">查看模板</el-button>
        </template>
      </el-form-item>
      <el-form-item label="使用结果">
        <div>{{pageControl.respondBody}}</div>
      </el-form-item>
    </el-form>
    <el-input v-model="toolId"></el-input>
    <div style="text-align: center">
      <el-button @click="use()" type="primary" size="small">确认使用</el-button>
    </div>
  </div>
</template>

<script>
import {useAPI} from '@/api/commonFactory'

export default {
  props: {
    toolId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      pageData: {
        toolId: 0,
        title: '标题啊啊啊啊',
        description: '说明啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
        template: 'select * from dzb_company_wechat_groupchat_member order by create_date desc;\n' +
          'select * from dzb_company_wechat_groupchat_member where chat_id=\'wrxdFgCgAAqeHL6BTxtzTBl9vHRFkD5w\' and company_id = \'21823116544984\';',
        type: 2,
        status: 1,
        params: [{
          paramName: 'name',
          paramValue: 'value'
        }]
      },
      pageControl: {
        isViewTemplate: false,
        respondBody: '--'
      }
    }
  },
  methods: {
    newParam () {
      this.pageData.params.push({paramName: this.pageControl.paramName, paramValue: ''})
      this.pageControl.paramName = ''
      this.pageControl.isNewParam = false
    },
    use () {
      useAPI({toolId: this.toolId}).then(response => {
        if (response.data.success === true) {
          this.pageControl.respondBody = response.data
          this.$message.success('创建工具成功')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
