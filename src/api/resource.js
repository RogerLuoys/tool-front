import api from './axios'

export function createAPI (data) {
  return api({
    url: 'resource/create',
    method: 'post',
    data: data
  })
}

export function removeAPI (params) {
  return api({
    url: 'resource/remove',
    method: 'delete',
    params: params
  })
}

export function updateAPI (data) {
  return api({
    url: 'resource/update',
    method: 'put',
    data: data
  })
}

export function updateUserAPI (data) {
  return api({
    url: 'resource/updateUser',
    method: 'put',
    data: data
  })
}

export function queryDetailAPI (params) {
  return api({
    url: 'resource/queryDetail',
    method: 'get',
    params: params
  })
}

export function queryAPI (data) {
  return api({
    url: 'resource/query',
    method: 'post',
    data: data
  })
}
