import api from './axios'

export function createAPI (data) {
  return api({
    url: 'task/create',
    method: 'post',
    data: data
  })
}

export function removeAPI (params) {
  return api({
    url: 'task/remove',
    method: 'delete',
    params: params
  })
}

export function updateAPI (data) {
  return api({
    url: 'task/update',
    method: 'put',
    data: data
  })
}

export function updateStatusAPI (params) {
  return api({
    url: 'task/updateStatus',
    method: 'put',
    params: params
  })
}

export function updateCommentAPI (params) {
  return api({
    url: 'task/updateComment',
    method: 'put',
    params: params
  })
}

export function queryAPI (params) {
  return api({
    url: 'task/query',
    method: 'get',
    params: params
  })
}

export function queryByWeeklyAPI (params) {
  return api({
    url: 'task/queryByWeekly',
    method: 'get',
    params: params
  })
}
