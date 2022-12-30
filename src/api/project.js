import api from './axios'

export function createAPI (data) {
  return api({
    url: 'project/create',
    method: 'post',
    data: data
  })
}

export function removeAPI (params) {
  return api({
    url: 'project/remove',
    method: 'delete',
    params: params
  })
}

export function updateAPI (data) {
  return api({
    url: 'project/update',
    method: 'put',
    data: data
  })
}

export function queryAPI (params) {
  return api({
    url: 'project/query',
    method: 'get',
    params: params
  })
}
