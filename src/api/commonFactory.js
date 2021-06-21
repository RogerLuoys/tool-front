import api from './axios'

export function create (data) {
  return api({
    url: 'api/commonFactory/create',
    method: 'post',
    data: data
  })
}

export function update (data) {
  return api({
    url: 'api/commonFactory/update',
    method: 'put',
    data: data
  })
}

export function query (params) {
  return api({
    url: 'api/commonFactory/query',
    method: 'get'
  })
}
