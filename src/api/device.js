import api from './axios'

export function createAPI (data) {
  return api({
    url: 'device/create',
    method: 'post',
    data: data
  })
}

export function quickCreateAPI (data) {
  return api({
    url: 'device/quickCreate',
    method: 'post',
    data: data
  })
}

export function removeAPI (params) {
  return api({
    url: 'device/remove',
    method: 'delete',
    params: params
  })
}

export function updateAPI (data) {
  return api({
    url: 'device/update',
    method: 'put',
    data: data
  })
}

export function queryDetailAPI (params) {
  return api({
    url: 'device/queryDetail',
    method: 'get',
    params: params
  })
}

export function queryAPI (params) {
  return api({
    url: 'device/query',
    method: 'get',
    params: params
  })
}
