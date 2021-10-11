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
