import api from './axios'

export function newTaskDailyAPI (data) {
  return api({
    url: 'taskDaily/newTaskDaily',
    method: 'post',
    data: data
  })
}

export function removeAPI (params) {
  return api({
    url: 'taskDaily/remove',
    method: 'delete',
    params: params
  })
}

export function modifyTaskDailyStatusAPI (params) {
  return api({
    url: 'taskDaily/modifyTaskDailyStatus',
    method: 'put',
    params: params
  })
}

export function modifyTaskDailyCommentAPI (params) {
  return api({
    url: 'taskDaily/modifyTaskDailyComment',
    method: 'put',
    params: params
  })
}

export function queryTaskDailyListAPI (params) {
  return api({
    url: 'taskDaily/queryTaskDailyList',
    method: 'get',
    params: params
  })
}

export function queryByWeeklyAPI (params) {
  return api({
    url: 'taskDaily/queryByWeekly',
    method: 'get',
    params: params
  })
}