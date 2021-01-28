/*
* 文章内容请求模块
*/

import request from '@/utils/request'

// 获取文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    params: params
  })
}

// 获取频道列表
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export const deleteArticle = (articleId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 发表文章
export const publishArticle = (draft, article) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft: draft // 是否存为草稿
    },
    data: article
  })
}

// 编辑文章
export const updateArticle = (articleId, draft, data) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft: draft
    },
    data: data
  })
}

// 获取文章
export const getArticle = (articleId) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
