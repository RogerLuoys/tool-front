import api from './axios'

export function createAPI (data) {
  return api({
    url: 'commonFactory/create',
    method: 'post',
    data: data
  })
}

export function removeAPI (params) {
  return api({
    url: 'commonFactory/remove',
    method: 'delete',
    params: params
  })
}

export function updateAPI (data) {
  return api({
    url: 'commonFactory/update',
    method: 'put',
    data: data
  })
}

export function queryAPI (params) {
  return api({
    url: 'commonFactory/query',
    method: 'get',
    params: params
  })
}

// export function queryDetailAPI (params) {
//   return api({
//     url: `commonFactory/queryDetail/${params}`,
//     method: 'get'
//   })
// }

export function queryDetailAPI (params) {
  return api({
    url: 'commonFactory/queryDetail',
    method: 'get',
    params: params
  })
}

export function useAPI (data) {
  return api({
    url: 'commonFactory/use',
    method: 'post',
    data: data
  })
}
