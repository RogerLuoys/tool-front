import axios from 'axios'
import {Message} from 'element-ui'

const apiSlave = axios.create({
  timeout: 10000,
  withCredentials: false,
  // 设置成简单请求，不要触发浏览器预检
  headers: {'Content-Type': 'text/plain'}
  // 前端跨域设置，设置后才能正常访问从服务器(又不行了)
// headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'DELETE,PUT,POST,GET,OPTIONS'}
  // headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST'}
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
  Message.error('执行自动化异常，请检查调用的从服务器')
  return Promise.reject(error)
})

export default apiSlave
