import axios from 'axios'
import {Message} from 'element-ui'

const apiSlave = axios.create({
  timeout: 10000,
  withCredentials: false,
  // 前端跨域设置，设置后才能正常访问从服务器
  headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'DELETE,PUT,POST,GET,OPTIONS'}
})

// 添加请求拦截器
apiSlave.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
apiSlave.interceptors.response.use(function (response) {
  // 当code为-1或1时，将接口返回的message直接提示
  if (response.data.success === false && response.data.code === -1 && response.data.message !== null) {
    Message.warning(response.data.message)
  } else if (response.data.success === true && response.data.code === 1 && response.data.message !== null) {
    Message.success(response.data.message)
  }
  return response
}, function (error) {
  // 接口返回异常时，统一错误提示
  Message.error('执行自动化脚本异常，请检查自动化服务器')
  return Promise.reject(error)
})

export default apiSlave
