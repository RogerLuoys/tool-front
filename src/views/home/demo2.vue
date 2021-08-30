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
        <el-input placeholder="请输入名称" suffix-icon="el-icon-search" size="mini" style="width:200px; float:left"></el-input>
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
        <el-input placeholder="请输入名称" suffix-icon="el-icon-search" size="mini" style="width:200px; float:left"></el-input>
        <el-checkbox>仅看自己</el-checkbox>
        <el-button type="warning" size="mini" style="float:right">更新数据</el-button>
        <el-tabs>
          <el-tab-pane label="群聊">
            <el-table border :data="backup.group" @row-click="backup.isVisible=true" size="mini" style="width: 100%">
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
          <el-tab-pane label="单聊">
            <el-table border :data="backup.person" @row-click="backup.isVisible=true" size="mini" style="width: 100%">
              <el-table-column prop="name" label="客户昵称/备份">
              </el-table-column>
              <el-table-column prop="customer" label="关联客户">
              </el-table-column>
              <el-table-column prop="owner" label="备份账号">
              </el-table-column>
              <el-table-column prop="time" label="创建时间">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <el-pagination layout="prev, pager, next, jumper" :total="100" style="float: right"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="群发机器人">
        <el-input placeholder="请输入名称" clearable size="mini" suffix-icon="el-icon-search" style="width:200px; float:left"></el-input>
        <el-dropdown split-button type="warning" @click="message.isTemplate=true" size="mini" style="float:right">
          模板设置
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>推送速度设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button @click="message.isNew=true" type="warning" plain size="mini" style="float:right">新建群发</el-button>
        <el-table border :data="message.list" size="mini" style="width: 100%">
          <el-table-column prop="name" label="群发名称">
          </el-table-column>
          <el-table-column prop="operator" label="操作人">
          </el-table-column>
          <el-table-column prop="data" label="内容预览" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="time" label="发送时间">
          </el-table-column>
          <el-table-column prop="group" label="已选择群聊">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="message.isView=true" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next, jumper" :total="100" style="float: right"></el-pagination>
      </el-tab-pane>
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
    <el-drawer :visible.sync="backup.isVisible" title="备份" append-to-body size="40%">
      <el-card>
        <el-form label-width="110px" size="small">
          <el-form-item label="会话名称">
            <div>某某某群/某某某客户</div>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>2021-08-27</span>
          </el-form-item>
          <el-form-item label="关联客户">
            <span>某某某公司的代表</span>
          </el-form-item>
          <el-form-item label="会话成员">
            <span>10</span>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <template #header>
          <span>会话消息备份</span>
          <el-date-picker type="date" placeholder="选择日期" size="mini" style="width: 150px; float: right"></el-date-picker>
          <el-input placeholder="请输入" clearable size="mini" style="width:150px; float:right"></el-input>
        </template>
        <el-tabs>
          <el-tab-pane label="全部">
            <el-row>
              <el-col :span="3">头像···</el-col>
              <el-col :span="13">昵称···<br/>正文···</el-col>
              <el-col :span="8">2021-08-27 10:00:00</el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="文本"></el-tab-pane>
          <el-tab-pane label="图片"></el-tab-pane>
          <el-tab-pane label="文件"></el-tab-pane>
          <el-tab-pane label="视频"></el-tab-pane>
          <el-tab-pane label="语音"></el-tab-pane>
        </el-tabs>
      </el-card>
    </el-drawer>
    <el-dialog :visible.sync="message.isView" title="发消息到客户群" append-to-body>
      <el-form label-width="110px" size="small">
        <el-form-item label="群发名称">
          <div>清卡提醒</div>
        </el-form-item>
        <el-form-item label="发送时间">
          <span>2021-06-24 21:21</span>
        </el-form-item>
        <el-form-item label="操作人">
          <span>机构内的某员工昵称</span>
        </el-form-item>
        <el-form-item label="发送客户">
          <span>单客户/多客户</span>
        </el-form-item>
        <el-form-item label="消息1">
          <span>「客户尊称」，您的企业「企业全称」：请确保完成本月的清卡工作，如已清卡请忽略本消息。感谢您的配合！</span>
        </el-form-item>
        <el-form-item label="消息2">
          <span>这是个图片（如果为空则不线上）</span>
        </el-form-item>
      </el-form>
      <el-button type="text" size="small">清空关联客户</el-button>
    </el-dialog>
    <el-dialog :visible.sync="message.isNew" title="群发消息模版" append-to-body>
      <div>按模板推送</div>
      <div>
        <el-row :gutter="5">
          <el-col span="6">
            <el-card style="width: 130px">清卡提醒</el-card>
          </el-col>
          <el-col span="6">
            <el-card style="width: 130px">社保变更核对</el-card>
          </el-col>
          <el-col span="6">
            <el-card style="width: 130px">个税变更核对</el-card>
          </el-col>
          <el-col span="5">
            <el-card style="width: 130px">交票提醒</el-card>
          </el-col>
        </el-row>
        <el-card style="width: 130px">抄税提醒</el-card>
      </div>
      <div>其它</div>
      <span @click="message.isNewMessage=true">
        <el-card style="width: 130px">自定义推送</el-card>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="message.isTemplate" title="模板设置" append-to-body style="height: 800px">
      <el-tabs type="border-card" tab-position="left">
        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
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
        isVisible: false,
        group: [{
          name: '与代表沟通的客户群',
          customer: '某某某公司的代表',
          owner: '某会计',
          member: '10',
          time: '2021-08-08'
        }],
        person: [{
          name: '对应的外部客户',
          customer: '某某某公司的代表',
          owner: '可备份的内部成员',
          time: '2021-08-08'
        }]
      },
      message: {
        isNew: false,
        isNewMessage: false,
        isTemplate: false,
        isSpeed: false,
        isView: false,
        list: [{
          name: '清卡提醒',
          operator: '机构内部员工某某',
          data: '尊敬的老板，您的企业「企业全称」：请确保完成本月的清卡工作，如已清卡请忽略本消息。感谢您的配合！',
          time: '2021-08-30 12:00:00',
          group: '100'
        }]
      }
    }
  }
}
</script>

<style scoped>

</style>
