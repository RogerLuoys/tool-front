import api from './axios'

export function newTaskDailyAPI (data) {
  return api({
    url: 'taskDaily/newTaskDaily',
    method: 'post',
    data: data
  })
}

export function queryTaskDailyListAPI (data) {
  return api({
    url: 'taskDaily/queryTaskDailyList',
    method: 'post',
    data: data
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
