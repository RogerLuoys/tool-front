import api from './axios'
import apiSlave from './axiosSlave'

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

export function createRelatedSlaveAPI (params) {
  return api({
    url: 'autoSuite/createRelatedSlave',
    method: 'get',
    params: params
  })
}

export function batchRelatedCaseAPI (params) {
  return api({
    url: 'autoSuite/batchRelatedCase',
    method: 'get',
    params: params
  })
}

export function removeAPI (params) {
  return api({
    url: 'autoSuite/remove',
    method: 'delete',
    params: params
  })
}

export function removeRelatedCaseAPI (params) {
  return api({
    url: 'autoSuite/removeRelatedCase',
    method: 'delete',
    params: params
  })
}

export function removeRelatedSlaveAPI (params) {
  return api({
    url: 'autoSuite/removeRelatedSlave',
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

export function updateRelatedCaseAPI (data) {
  return api({
    url: 'autoSuite/updateRelatedCase',
    method: 'put',
    data: data
  })
}

export function resetAPI (params) {
  return api({
    url: 'autoSuite/reset',
    method: 'put',
    params: params
  })
}

export function queryDetailAPI (params) {
  return api({
    url: 'autoSuite/queryDetail',
    method: 'get',
    params: params
  })
}

export function queryAPI (data) {
  return api({
    url: 'autoSuite/query',
    method: 'post',
    data: data
  })
}

export function queryRelateCaseAPI (data) {
  return api({
    url: 'autoSuite/queryRelateCase',
    method: 'post',
    data: data
  })
}

export function executeByScheduleAPI (data) {
  return api({
    url: 'autoSuite/executeBySchedule',
    method: 'post',
    data: data
  })
}

export function executeByLocalAPI (params, baseURL) {
  return apiSlave({
    url: 'autoSuite/executeByLocal',
    method: 'get',
    params: params,
    baseURL: baseURL
  })
}

export function useSingleAPI (data, baseURL) {
  return apiSlave({
    url: 'autoSuite/useSingle',
    method: 'post',
    data: data,
    baseURL: baseURL
  })
}
