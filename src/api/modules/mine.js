import request from '../request'
import { urls } from '../urls'

export function getMemberPersonalInfo () { // 我的信息获取 '/crm/member/getMemberPersonalInfo'
  return request({
    url: urls.getMemberPersonalInfo,
    data: {}
  })
}

export function getMyJourneyItineraryPage (params) { // 我的信息获取 '/linanJourney/journeyItinerary/getMyJourneyItineraryPage'
  return request({
    url: urls.getMyJourneyItineraryPage,
    data: {
      pageSize: 100,
      pageNumber: 1,
      ...params
    }
  })
}

export function findOrgList (params) { // 获取联盟组织列表 '/organization/orgConsumer/findOrgList'
  return request({
    url: urls.findOrgList,
    data: {
      ...params
    }
  })
}

export function verifiedRealName (params) { // 实名认证 '/crm/member/verifiedRealName'
  return request({
    url: urls.verifiedRealName,
    data: {
      ...params
    }
  })
}

export function getMyRedHeart (params) { // 获取我的红心值 '/linanJourney/journeyMemberRedHeartRecordManagement/getMyRedHeart'
  return request({
    url: urls.getMyRedHeart,
    data: {
      ...params
    }
  })
}

export function getMyRedHeartRecordPage (params) { // 获取我的红心值记录分页 '/linanJourney/journeyMemberRedHeartRecordManagement/getMyRedHeartRecordPage'
  return request({
    url: urls.getMyRedHeartRecordPage,
    data: {
      ...params
    }
  })
}

export function modifyMemberPersonalInfo (params) { // 编辑会员个人信息 '/crm/member/modifyMemberPersonalInfo'
  return request({
    url: urls.modifyMemberPersonalInfo,
    data: {
      ...params
    }
  })
}

export function getUnreadMessageQuantity (params) { // 获取未读消息数
  return request({
    url: urls.getUnreadMessageQuantity,
    data: {
      ...params
    }
  })
}

export function getCommunityNoteCommentIsNewMassage (params) { // 未读评论消息提醒
  return request({
    url: urls.getCommunityNoteCommentIsNewMassage,
    data: {
      ...params
    }
  })
}

export function getCommunityLikeIsNewMassage (params) { // 获取未读点赞
  return request({
    url: urls.getCommunityLikeIsNewMassage,
    data: {
      ...params
    }
  })
}

export function getMyJourneyAnnouncementPage (params) { // 获取我的公告分页
  return request({
    url: urls.getMyJourneyAnnouncementPage,
    data: {
      ...params
    }
  })
}

export function getJourneyAnnouncementDetail (params) { // 获取公告详情
  return request({
    url: urls.getJourneyAnnouncementDetail,
    data: {
      ...params
    }
  })
}

export function getJourneyItinerarySignInById (params) { // 根据行程单id获取行程单打卡信息
  return request({
    url: urls.getJourneyItinerarySignInById,
    data: {
      ...params
    }
  })
}

export function getJourneyItineraryPointSignIn (params) { // 获取行程单点位打卡信息
  return request({
    url: urls.getJourneyItineraryPointSignIn,
    data: {
      ...params
    }
  })
}

export function createJourneyLifeDocumentary (params) { // 创建生活纪实 '/linanJourney/journeyLifeDocumentary/createJourneyLifeDocumentary'
  return request({
    url: urls.createJourneyLifeDocumentary,
    data: {
      ...params
    }
  })
}

export function journeyItineraryPointSignIn (params) { // 获取行程单点位打卡信息
  return request({
    url: urls.journeyItineraryPointSignIn,
    data: {
      ...params
    }
  })
}

export function getJourneyLifeDocumentaryByItineraryId (params) { // 根据行程单id获取生活纪实 '/linanJourney/journeyLifeDocumentary/getJourneyLifeDocumentaryByItineraryId'
  return request({
    url: urls.getJourneyLifeDocumentaryByItineraryId,
    data: {
      ...params
    }
  })
}

export function modifyJourneyLifeDocumentary (params) { // 修改生活纪实 '/linanJourney/journeyLifeDocumentary/modifyJourneyLifeDocumentary'
  return request({
    url: urls.modifyJourneyLifeDocumentary,
    data: {
      ...params
    }
  })
}

export function removeJourneyLifeDocumentary (params) { // 删除生活纪实 '/linanJourney/journeyLifeDocumentary/removeJourneyLifeDocumentary'
  return request({
    url: urls.removeJourneyLifeDocumentary,
    data: {
      ...params
    }
  })
}
export function getMyCommunityNotePage (params) { // 分页查询我的联盟帖子
  return request({
    url: urls.getMyCommunityNotePage,
    data: {
      ...params
    }
  })
}

export function getMyJourneyTalentsMessagePage (params) { // 我的留言分页
  return request({
    url: urls.getMyJourneyTalentsMessagePage,
    data: {
      ...params
    }
  })
}

export function getMyJourneyMessagePage (params) { // 我的留言分页
  return request({
    url: urls.getMyJourneyMessagePage,
    data: {
      ...params
    }
  })
}
export function getMyJourneyResourceSharingPage (params) { // 分页查询我的共享资源
  return request({
    url: urls.getMyJourneyResourceSharingPage,
    data: {
      ...params
    }
  })
}
export function getMyJourneyMerchantBoothInfoPage (params) { // 分页我的获取商家展位
  return request({
    url: urls.getMyJourneyMerchantBoothInfoPage,
    data: {
      ...params
    }
  })
}
export function getMyItineraryEvaluationPage (params) { // 分页查询我的行程评价
  return request({
    url: urls.getMyItineraryEvaluationPage,
    data: {
      ...params
    }
  })
}

export function respondMessage (params) { // 回复留言
  return request({
    url: urls.respondMessage,
    data: {
      ...params
    }
  })
}
export function getMyJourneyPlayCustomizationInfoPage (params) { // 分页获取我的游玩定制
  return request({
    url: urls.getMyJourneyPlayCustomizationInfoPage,
    data: {
      ...params
    }
  })
}