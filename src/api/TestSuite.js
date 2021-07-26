import api from './axios'

export function createAPI (data) {
  return api({
    url: 'testSuite/create',
    method: 'post',
    data: data
  })
}

export function deleteAPI (params) {
  return api({
    url: 'testSuite/delete',
    method: 'delete',
    params: params
  })
}

export function updateAPI (data) {
  return api({
    url: 'testSuite/update',
    method: 'put',
    data: data
  })
}

export function queryDetailAPI (params) {
  return api({
    url: 'testSuite/queryDetail',
    method: 'get',
    params: params
  })
}

export function queryAPI (params) {
  return api({
    url: 'testSuite/query',
    method: 'get',
    params: params
  })
}
