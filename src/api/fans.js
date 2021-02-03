/**
 * 粉丝相关请求
 */

import request from '@/utils/request'

/**
 * 获取粉丝列表
 */
export const getFansList = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers',
    params
  })
}
