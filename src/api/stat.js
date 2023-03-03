import api from './axios'

export function totalCaseAPI () {
  return api({
    url: 'stat/totalCase',
    method: 'get'
  })
}

export function queryByWeeklyAPI (params) {
  return api({
    url: 'task/queryByWeekly',
    method: 'get',
    params: params
  })
}
