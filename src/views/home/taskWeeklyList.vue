<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-card style="width: 160px; height: 480px">
          <div slot="header">
            <span>周一</span>
            <el-button style="float: right" type="text">新增</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card style="width: 160px; height: 480px">
          <div slot="header">
            <span>周一</span>
            <el-button style="float: right" type="text">新增</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card style="width: 160px; height: 480px">
          <div slot="header">
            <span>周一</span>
            <el-button style="float: right" type="text">新增</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card style="width: 160px; height: 480px">
          <div slot="header">
            <span>周一</span>
            <el-button style="float: right" type="text">新增</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card style="width: 160px; height: 480px">
          <div slot="header">
            <span>周一</span>
            <el-button style="float: right" type="text">新增</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card style="width: 160px; height: 480px">
          <div slot="header">
            <span>周一</span>
            <el-button style="float: right" type="text">新增</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageData: {
        monTaskList: [],
        tueTaskList: [],
        wedTaskList: [],
        thuTaskList: [],
        friTaskList: [],
        satTaskList: [],
        sunTaskList: []
      }
    }
  }
}
</script>

<style scoped>

</style>
