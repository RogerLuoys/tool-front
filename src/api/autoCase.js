import api from './axios'
import apiSlave from './axiosSlave'

export function createAPI (data) {
  return api({
    url: 'autoCase/create',
    method: 'post',
    data: data
  })
}

export function quickCreateAPI (data) {
  return api({
    url: 'autoCase/quickCreate',
    method: 'post',
    data: data
  })
}

export function quickCreateConfigAPI (data) {
  return api({
    url: 'autoCase/quickCreateConfig',
    method: 'post',
    data: data
  })
}

export function createRelatedStepAPI (data) {
  return api({
    url: 'autoCase/createRelatedStep',
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

export function removeConfigAPI (params) {
  return api({
    url: 'autoCase/removeConfig',
    method: 'delete',
    params: params
  })
}

export function removeRelatedStepAPI (data) {
  return api({
    url: 'autoCase/removeRelatedStep',
    method: 'delete',
    data: data
  })
}

export function updateAPI (data) {
  return api({
    url: 'autoCase/update',
    method: 'put',
    data: data
  })
}

export function updateConfigAPI (data) {
  return api({
    url: 'autoCase/updateConfig',
    method: 'put',
    data: data
  })
}

export function updateScriptAPI (data) {
  return api({
    url: 'autoCase/updateScript',
    method: 'put',
    data: data
  })
}

export function changeUiModeAPI (data) {
  return api({
    url: 'autoCase/changeUiMode',
    method: 'put',
    data: data
  })
}

export function changeScriptModeAPI (data) {
  return api({
    url: 'autoCase/changeScriptMode',
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

export function queryConfigAPI (params) {
  return api({
    url: 'autoCase/queryConfig',
    method: 'get',
    params: params
  })
}

export function queryAPI (data) {
  return api({
    url: 'autoCase/query',
    method: 'post',
    data: data
  })
}

export function useAPI (data, baseURL) {
  return apiSlave({
    url: 'autoCase/use',
    method: 'post',
    data: data,
    baseURL: baseURL
  })
}

export function testAPI (params, baseURL) {
  return apiSlave({
    url: 'autoCase/test',
    method: 'get',
    params: params,
    headers: {'userId': '001'},
    baseURL: baseURL
  })
}
