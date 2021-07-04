import axios from 'axios'
import VueCookies from 'vue-cookies'
import {Message} from 'element-ui'

const api = axios.create({
  // 我的电脑
  // baseURL: 'http://192.168.10.106:9001/',
  // 办公电脑
  // baseURL: 'http://10.201.10.183:9001/',
  // 我的云主机
  // baseURL: 'http://118.24.117.181:9001/',
  // 本地
  baseURL: 'http://localhost:9011/',
  timeout: 10000,
  withCredentials: false
})

// 添加请求拦截器
api.interceptors.request.use(function (config) {
  // 在发送请之前检查cookie，有cookie使用cookie，无cookie使用访客Id
  let userId = VueCookies.get('userId')
  if (userId) {
    config.headers.userId = userId
  } else {
    config.headers.userId = '101'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
api.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.success === false) {
    Message.error(response.data.message)
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  Message.error('未知系统错误，请联系管理员')
  return Promise.reject(error)
})

export default api
