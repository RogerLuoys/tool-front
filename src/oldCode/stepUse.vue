<template>
  <div>
    <el-form :model="pageData" label-width="2cm">
      <el-form-item label="标题">
        <span>{{pageData.name}}</span>
      </el-form-item>
      <el-form-item label="说明">
        <span>{{pageData.description}}</span>
      </el-form-item>
      <div v-for="(item, index) in pageData.params" :key="index">
        <el-form-item>
          <template #label>
            <div>{{ pageData.params[index].name }}</div>
          </template>
          <el-input v-model="pageData.params[index].value" placeholder="请输入参数" size="small" maxlength="30"
                    show-word-limit></el-input>
        </el-form-item>
      </div>
      <!--      <el-form-item v-if="pageControl.isViewTemplate">-->
      <!--        <template #label>-->
      <!--          <el-button type="text" size="small" @click="pageControl.isViewTemplate=false">收起模板</el-button>-->
      <!--        </template>-->
      <!--        <span>{{pageData.template}}</span>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item v-else>-->
      <!--        <template #label>-->
      <!--          <el-button type="text" size="small" @click="pageControl.isViewTemplate=true">查看模板</el-button>-->
      <!--        </template>-->
      <!--      </el-form-item>-->
      <el-form-item label="使用结果">
        <div>{{pageControl.respondData}}</div>
      </el-form-item>
    </el-form>
    <el-input v-model="stepId"></el-input>
    <div style="text-align: center">
      <el-button @click="use()" type="primary" size="small">确认使用</el-button>
    </div>
  </div>
</template>

<script>
import {useAPI, queryDetailAPI} from '@/api/autoStep'

export default {
  props: {
    stepId: {
      type: String,
      default: '0'
    }
  },
  created: function () {
    this.queryDetail()
  },
  data () {
    return {
      pageData: {
        stepId: '0',
        name: '123',
        description: '',
        owner: 'tester',
        permission: 2,
        type: 1,
        paramList: [{
          name: 'name',
          value: 'value'
        }],
        jdbc: {
          dataSource: {
            driver: 'test driver',
            url: 'test url',
            userName: 'test user name',
            password: 'test password'
          },
          sqlList: [{
            type: '',
            sql: ''
          }]
        },
        httpRequest: {
          httpType: 'GET',
          httpURL: 'URL',
          httpHeaderList: [{
            name: 'header1',
            value: 'value1'
          }],
          httpBody: 'BODY'
        },
        rpc: {
          provide: ''
        }
      },
      pageControl: {
        isViewTemplate: false,
        respondData: '--'
      }
    }
  },
  methods: {
    use () {
      useAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.pageControl.respondData = response.data.data
          this.$message.success('使用成功')
        }
      })
    },
    queryDetail () {
      queryDetailAPI({
        'stepId': this.stepId
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
