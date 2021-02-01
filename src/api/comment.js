/**
 * 评论管理相关
 */
import request from '@/utils/request'

/**
 * 获取评论或者评论回复
 */
export const getComment = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

/**
 * 修改文章评论状态
 */
export const commentChange = (articleId, allowComment) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}
