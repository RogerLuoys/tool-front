import api from './axios'

export function createAPI (data) {
  return api({
    url: 'factory/create',
    method: 'post',
    data: data
  })
}

export function removeAPI (params) {
  return api({
    url: 'factory/remove',
    method: 'delete',
    params: params
  })
}

export function updateAPI (data) {
  return api({
    url: 'factory/update',
    method: 'put',
    data: data
  })
}

export function queryAPI (params) {
  return api({
    url: 'factory/query',
    method: 'get',
    params: params
  })
}

// export function queryDetailAPI (params) {
//   return api({
//     url: `factory/queryDetail/${params}`,
//     method: 'get'
//   })
// }

export function queryDetailAPI (params) {
  return api({
    url: 'factory/queryDetail',
    method: 'get',
    params: params
  })
}

export function useAPI (data) {
  return api({
    url: 'factory/use',
    method: 'post',
    data: data
  })
}
