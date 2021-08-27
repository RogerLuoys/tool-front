<template>
  <div>
    <el-tabs tab-position="left" style="height: 200px;">
      <el-tab-pane label="聊天侧边栏">
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">这是大背景图···</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            <span>企业微信扫码 一键安装微企服</span><el-tag>已安装</el-tag><el-button type="warning" plain>更新客户数据</el-button>
            <div>这是应用二维码···</div>
            <div>请用管理员身份扫码</div>
            <div>将应用的【 开启范围 】设置到最大 查阅安装教程></div>
            <div>
              <span>如需开通群消息备份，请开启</span><el-switch v-model="isTrue"></el-switch>
            </div>
            <el-steps :active="3" align-center>
              <el-step status="success">
                <template #description>
                  <el-button @click="config.isStep1=true">创建应用</el-button>
                </template>
              </el-step>
              <el-step status="success">
                <template #description>
                  <el-button @click="config.isStep2=true">配置回调</el-button>
                </template>
              </el-step>
              <el-step status="success">
                <template #description>
                  <el-button @click="config.isStep3=true">配置密钥</el-button>
                </template>
              </el-step>
            </el-steps>
          </div></el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="客户群管理">
        <el-select clearable size="mini" placeholder="筛选"
                   style="width:110px; float:left">
        </el-select>
        <el-input placeholder="请输入名称" clearable size="mini" style="width:200px; float:left"></el-input>
        <el-button icon="el-icon-search" type="primary" size="mini"></el-button>
        <el-button type="primary" size="mini" style="float:right">一键关联</el-button>
        <el-table border :data="customer.data" size="mini" style="width: 100%">
          <el-table-column prop="name" label="客户简称">
          </el-table-column>
          <el-table-column prop="counselor" label="服务顾问">
          </el-table-column>
          <el-table-column prop="manager" label="客户经理">
          </el-table-column>
          <el-table-column prop="type" label="客户类型">
          </el-table-column>
          <el-table-column prop="customer" label="对应联系人">
          </el-table-column>
          <el-table-column prop="group" label="关联群"></el-table-column>
          <el-table-column prop="alias" label="客户尊称"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="customer.isVisible=true" type="text" size="small">设置关联</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next, jumper" :total="100" style="float: right"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="群消息备份">
        <el-input placeholder="请输入名称" clearable size="mini" style="width:200px; float:left"></el-input>
        <el-button icon="el-icon-search" type="primary" size="mini"></el-button>
        <el-checkbox>仅看自己</el-checkbox>
        <el-button type="warning" size="mini" style="float:right">更新数据</el-button>
        <el-tabs>
          <el-tab-pane label="群聊">
            <el-table border :data="backup.group" size="mini" style="width: 100%">
              <el-table-column prop="name" label="群名称">
              </el-table-column>
              <el-table-column prop="customer" label="关联客户">
              </el-table-column>
              <el-table-column prop="owner" label="群主">
              </el-table-column>
              <el-table-column prop="member" label="群成员">
              </el-table-column>
              <el-table-column prop="time" label="创建时间">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="单聊">定时任务补偿</el-tab-pane>
        </el-tabs>
        <el-pagination layout="prev, pager, next, jumper" :total="100" style="float: right"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="群发机器人">定时任务补偿</el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="config.isStep1" title="开启群消息备份-1" append-to-body>
      <el-tag type="info" style="width: 100%">企业微信后台-创建自建应用，粘贴Secret字段</el-tag>
      <el-form label-width="90px">
        <el-form-item label="CorpID">
          <el-input placeholder="wwc412c56af76e9438" size="small"></el-input>
        </el-form-item>
        <el-form-item label="Secret">
          <el-input placeholder="AZfRDPXW7IzvPMs7AigH75wy3XsRXJThbSVFRy5v1kY" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="warning" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="config.isStep2" title="开启群消息备份-2" append-to-body>
      <el-tag type="info" style="width: 100%">
        1、客户回调：在企业微信后台【客户联系-客户-API-接收事件服务器】<br/>
        注：请确保【接收事件服务器】下方的“可调用应用”勾选了「微企服」<br/>
        2、成员回调：在企业微信后台【管理工具-通讯录同步-设置接收事件服务器】
      </el-tag>
      <div>https://www.17dz.com/xaiwork/wechat/549613863897/event/callback</div>
      <el-button type="text">复制URL</el-button>
      <el-form label-width="90px" size="small">
        <el-form-item label="CorpID">
          <el-input placeholder="wwc412c56af76e9438"></el-input>
        </el-form-item>
        <el-form-item label="Secret">
          <el-input placeholder="AZfRDPXW7IzvPMs7AigH75wy3XsRXJThbSVFRy5v1kY"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="warning" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="config.isStep3" title="开启群消息备份-3" append-to-body width="30%">
      <div>
        1开启群消息备份，请先确保您的企业微信已使用“会话消息存档”功能，并完成了存档的配置。
      </div>
      <el-input placeholder="AZfRDPXW7IzvPMs7AigH75wy3XsRXJThbSVFRy5v1kY"></el-input>
      <div style="text-align: center">
        <el-button type="warning" size="small">保存</el-button>
        <el-button size="small">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="customer.isVisible" title="变更" append-to-body>
      <el-form label-width="110px" size="small">
        <el-form-item label="客户">
          <div>广州菱惠穗贸易有限责任公司</div>
        </el-form-item>
        <el-form-item label="客户尊称">
          <span>尊贵的客人</span>
          <el-button type="text" style="float: right">绑定</el-button>
        </el-form-item>
        <el-form-item label="关联联系人：">
          <span>某某某公司的代表</span>
          <el-button type="text" style="float: right">绑定</el-button>
        </el-form-item>
        <el-form-item label="绑定群聊：">
          <span>与代表沟通的客户群</span>
          <el-button type="text" style="float: right">绑定</el-button>
        </el-form-item>
      </el-form>
      <el-button type="text" size="small">清空关联客户</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isTrue: true,
      isFalse: false,
      config: {
        isStep1: false,
        isStep2: false,
        isStep3: false
      },
      customer: {
        isVisible: false,
        data: [{
          name: '某某某公司',
          counselor: '某高级顾问',
          manager: '某专职经理',
          type: '代账/非代账',
          customer: '某某某公司的代表',
          group: '与代表沟通的客户群',
          alias: '尊贵的客人'
        }]
      },
      backup: {
        group: [{
          name: '与代表沟通的客户群',
          customer: '某某某公司的代表',
          owner: '某会计',
          member: '10',
          time: '2021-08-08'
        }],
        person: []
      }
    }
  }
}
</script>

<style scoped>

</style>
