import api from './axios'

export function createAPI (data) {
  return api({
    url: 'device/create',
    method: 'post',
    data: data
  })
}

export function deleteAPI (params) {
  return api({
    url: 'device/delete',
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

export function queryAPI (params) {
  return api({
    url: 'device/query',
    method: 'get',
    params: params
  })
}
