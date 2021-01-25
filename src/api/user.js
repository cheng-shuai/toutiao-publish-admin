/*
* 用户相关请求模块
* */

// 用户登录
import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: data
  })
}
// 获取用户信息
// export const getUserInfo = () => {}

// 修改用户信息

// export const updateUser = () => {}
