import api from './axios'

export function inviteAPI (data) {
  return api({
    url: 'member/invite',
    method: 'post',
    data: data
  })
}

export function removeAPI (params) {
  return api({
    url: 'member/remove',
    method: 'delete',
    params: params
  })
}

export function updateAPI (data) {
  return api({
    url: 'member/update',
    method: 'put',
    data: data
  })
}

export function queryAPI (params) {
  return api({
    url: 'member/query',
    method: 'get',
    params: params
  })
}
