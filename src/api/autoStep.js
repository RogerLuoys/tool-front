import api from './axios'
import apiSlave from './axiosSlave'

export function createAPI (data) {
  return api({
    url: 'autoStep/create',
    method: 'post',
    data: data
  })
}

export function removeAPI (params) {
  return api({
    url: 'autoStep/remove',
    method: 'delete',
    params: params
  })
}

export function updateAPI (data) {
  return api({
    url: 'autoStep/update',
    method: 'put',
    data: data
  })
}

export function queryDetailAPI (params) {
  return api({
    url: 'autoStep/queryDetail',
    method: 'get',
    params: params
  })
}

export function queryAPI (params) {
  return api({
    url: 'autoStep/query',
    method: 'get',
    params: params
  })
}

export function useAPI (data, baseURL) {
  return apiSlave({
    url: 'autoStep/use',
    method: 'post',
    data: data,
    baseURL: baseURL
  })
}
