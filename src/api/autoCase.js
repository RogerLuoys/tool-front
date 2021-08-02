import api from './axios'

export function createAPI (data) {
  return api({
    url: 'autoCase/create',
    method: 'post',
    data: data
  })
}

export function removeAPI (params) {
  return api({
    url: 'autoCase/remove',
    method: 'delete',
    params: params
  })
}

export function updateAPI (data) {
  return api({
    url: 'autoCase/update',
    method: 'put',
    data: data
  })
}

export function queryDetailAPI (params) {
  return api({
    url: 'autoCase/queryDetail',
    method: 'get',
    params: params
  })
}

export function queryAPI (params) {
  return api({
    url: 'autoCase/query',
    method: 'get',
    params: params
  })
}
