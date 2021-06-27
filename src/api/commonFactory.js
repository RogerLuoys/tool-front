import api from './axios'

export function createAPI (data) {
  return api({
    url: 'api/commonFactory/create',
    method: 'post',
    data: data
  })
}

export function deleteAPI (params) {
  return api({
    url: 'api/commonFactory/delete',
    method: 'delete',
    params: params
  })
}

export function updateAPI (data) {
  return api({
    url: 'api/commonFactory/update',
    method: 'put',
    data: data
  })
}

export function queryAPI (params) {
  return api({
    url: 'api/commonFactory/query',
    method: 'get',
    params: params
  })
}

export function useAPI (data) {
  return api({
    url: 'api/commonFactory/use',
    method: 'post',
    data: data
  })
}
