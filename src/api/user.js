import api from './axios'

export function loginAPI (params) {
  return api({
    url: 'user/login',
    method: 'get',
    headers: {
      'loginName': params.loginName,
      'password': params.password
    }
  })
}

export function queryDetailAPI () {
  return api({
    url: 'user/queryDetail',
    method: 'get'
  })
}

export function registerAPI (data) {
  return api({
    url: 'user/register',
    method: 'post',
    data: data
  })
}

export function modifyUserAPI (data) {
  return api({
    url: 'user/modifyUser',
    method: 'put',
    data: data
  })
}

export function queryUserInfoAPI (params) {
  return api({
    url: 'user/queryUserInfo',
    method: 'get',
    params: params
  })
}
