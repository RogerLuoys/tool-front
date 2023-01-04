import axios from 'axios'
import VueCookies from 'vue-cookies'
import {Message} from 'element-ui'

const api = axios.create({
  // 我的云主机
  // baseURL: 'http://8.140.8.45:9011/',
  // 本地
  baseURL: 'http://localhost:9011/',
  timeout: 30000,
  withCredentials: false
})

// 添加请求拦截器
api.interceptors.request.use(function (config) {
  // 在发送请之前检查cookie，有cookie使用cookie，无cookie使用访客Id
  let loginInfo = VueCookies.get('loginInfo')
  let projectId = VueCookies.get('projectId')
  if (loginInfo) {
    config.headers.loginInfo = loginInfo
    config.headers.projectId = projectId
  } else {
    config.headers.loginInfo = '03f798da9d3e6a10cfd620229fe122d4'
    config.headers.projectId = 1
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
api.interceptors.response.use(function (response) {
  // 当code为-1或1时，将接口返回的message直接提示
  if (response.data.success === false && response.data.code === -1 && response.data.message !== null) {
    Message.warning(response.data.message)
  } else if (response.data.success === true && response.data.code === 1 && response.data.message !== null) {
    Message.success(response.data.message)
  }
  return response
}, function (error) {
  // 接口返回异常时，统一错误提示
  Message.error('未知系统错误，请联系管理员')
  return Promise.reject(error)
})

export default api
