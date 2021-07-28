import api from './axios'

export function createAPI (data) {
  return api({
    url: 'testCase/create',
    method: 'post',
    data: data
  })
}

export function removeAPI (params) {
  return api({
    url: 'testCase/remove',
    method: 'delete',
    params: params
  })
}

export function updateAPI (data) {
  return api({
    url: 'testCase/update',
    method: 'put',
    data: data
  })
}

export function queryDetailAPI (params) {
  return api({
    url: 'testCase/queryDetail',
    method: 'get',
    params: params
  })
}

export function queryAPI (params) {
  return api({
    url: 'testCase/query',
    method: 'get',
    params: params
  })
}
