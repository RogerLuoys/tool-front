import api from './axios'
import apiSlave from './axiosSlave'

export function queryDetailAPI (params) {
  return api({
    url: 'device/queryDetail',
    method: 'get',
    params: params
  })
}

export function queryDetailAPIS (params, baseURL) {
  return apiSlave({
    url: 'device/queryDetail',
    method: 'get',
    params: params,
    baseURL: baseURL
  })
}
