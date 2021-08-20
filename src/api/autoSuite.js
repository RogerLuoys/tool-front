import api from './axios'

export function createAPI (data) {
  return api({
    url: 'autoSuite/create',
    method: 'post',
    data: data
  })
}

export function quickCreateAPI (data) {
  return api({
    url: 'autoSuite/quickCreate',
    method: 'post',
    data: data
  })
}

export function createRelatedCaseAPI (data) {
  return api({
    url: 'autoSuite/createRelatedCase',
    method: 'post',
    data: data
  })
}

export function removeAPI (params) {
  return api({
    url: 'autoSuite/remove',
    method: 'delete',
    params: params
  })
}

export function updateAPI (data) {
  return api({
    url: 'autoSuite/update',
    method: 'put',
    data: data
  })
}

export function queryDetailAPI (params) {
  return api({
    url: 'autoSuite/queryDetail',
    method: 'get',
    params: params
  })
}

export function queryAPI (params) {
  return api({
    url: 'autoSuite/query',
    method: 'get',
    params: params
  })
}

export function useAPI (params) {
  return api({
    url: 'autoSuite/use',
    method: 'get',
    params: params
  })
}
