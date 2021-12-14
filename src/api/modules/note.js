import request from '../request'
import { urls } from '../urls'
// 根据笔记id查询笔记详细信息
export function getCommunityNoteInfoById (params) {
  return request({
    url: urls.getCommunityNoteInfoById,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
// 根据分享id查询笔记详细信息
export function getCommunityNoteInfoByShareId (params) {
  return request({
    url: urls.getCommunityNoteInfoByShareId,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
// 新增社区笔记评论
export function createCommunityNoteComment (params) {
  return request({
    url: urls.createCommunityNoteComment,
    data: {
      ...params
    }
  })
}
// 点赞笔记
export function communityLikeNote (params) {
  return request({
    url: urls.communityLikeNote,
    data: {
      ...params
    }
  })
}
// 取消点赞笔记
export function cancelCommunityLikeNote (params) {
  return request({
    url: urls.cancelCommunityLikeNote,
    data: {
      ...params
    }
  })
}
// 点赞评论
export function communityLikeNoteComment (params) {
  return request({
    url: urls.communityLikeNoteComment,
    data: {
      ...params
    }
  })
}
// 取消点赞评论
export function cancelCommunityLikeNoteComment (params) {
  return request({
    url: urls.cancelCommunityLikeNoteComment,
    data: {
      ...params
    }
  })
}
// 分享笔记
export function shareCommunityNote (params) {
  return request({
    url: urls.shareCommunityNote,
    data: {
      ...params
    }
  })
}
// 分页获取笔记评论详情
export function getNoteCommentDetailPage (params) {
  return request({
    url: urls.getNoteCommentDetailPage,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

export function getCommunityNotePage (params) {// 分页查询笔记信息 (论坛列表)
  return request({
    url: urls.getCommunityNotePage,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
