/***
 * 个人设置
 */

import request from '@/utils/request'

/**
 * 获取用户个人资料
 */
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}

/**
 * 编辑用户头像
 */
export const uploadAvatar = (data) => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}
