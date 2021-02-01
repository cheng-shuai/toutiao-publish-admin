// 素材请求相关模块

import request from '@/utils/request'

/**
 * 上传图片素材
 */

export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 一般文件上传的接口都要求把请求头中的 Content-Type 设置为 multipart/form-data，但是我们使用 axios 上传文件的话不需要手动设置，你只要给 data 一个 FormData 对象即可。
    // new FormData()
    data
  })
}

/**
 * 获取图片素材
 */

export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

/**
 * 收藏图片素材
 */
export const collectImage = (id, isCollect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${id}`,
    data: {
      collect: isCollect
    }
  })
}

/**
 * 删除图片素材
 */
export const delectImage = id => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${id}`
  })
}
