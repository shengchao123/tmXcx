import request from '../request'
import { urls } from '../urls'



export function accumulationCallsNumber (params) {
  return request({
    url: urls.accumulationCallsNumber,
    data: {
      ...params
    }
  })
}


export function cancelLikeGoodHelperProject (params) {
  return request({
    url: urls.cancelLikeGoodHelperProject,
    data: {
      ...params
    }
  })
}

export function likeGoodHelperProject (params) {
  return request({
    url: urls.likeGoodHelperProject,
    data: {
      ...params
    }
  })
}

export function findJourneyTalentsTpyeList (params) {
  return request({
    url: urls.findJourneyTalentsTpyeList,
    data: {
      ...params
    }
  })
}

export function getCommunityTopicPage (params) {
  return request({
    url: urls.getCommunityTopicPage,
    data: {
      ...params
    }
  })
}
export function getNoteCommentDetailPage (params) {
  return request({
    url: urls.getNoteCommentDetailPage,
    data: {
      ...params
    }
  })
}
export function getJourneyCommunityMessagePage (params) {
  return request({
    url: urls.getJourneyCommunityMessagePage,
    data: {
      ...params
    }
  })
}
export function findJourneyCommunityPartyGraphicByPartyId (params) {
  return request({
    url: urls.findJourneyCommunityPartyGraphicByPartyId,
    data: {
      ...params
    }
  })
}
export function getCompletedJourneyHelperProjectPage (params) {
  return request({
    url: urls.getCompletedJourneyHelperProjectPage,
    data: {
      ...params
    }
  })
}
export function findJourneyAdvertisementList (params) {
  return request({
    url: urls.findJourneyAdvertisementList,
    data: {
      ...params
    }
  })
}
export function communityLeaveMessage (params) {
  return request({
    url: urls.communityLeaveMessage,
    data: {
      ...params
    }
  })
}
export function findJourneyCommunityPropertyInfoList (params) {
  return request({
    url: urls.findJourneyCommunityPropertyInfoList,
    data: {
      ...params
    }
  })
}

export function findJourneyCommunityPropertyAttachmentList (params) {
  return request({
    url: urls.findJourneyCommunityPropertyAttachmentList,
    data: {
      ...params
    }
  })
}

export function leaveMessage (params) {
  return request({
    url: urls.leaveMessage,
    data: {
      ...params
    }
  })
}

export function findMyJourneyCommunityWishPage (params) {
  return request({
    url: urls.findMyJourneyCommunityWishPage,
    data: {
      ...params
    }
  })
}

export function submitProblem (params) {
  return request({
    url: urls.submitProblem,
    data: {
      ...params
    }
  })
}

export function findMyJourneyCommunityProblemPage (params) {
  return request({
    url: urls.findMyJourneyCommunityProblemPage,
    data: {
      ...params
    }
  })
}

export function findCanClaimedJourneyCommunityWishPage (params) {
  return request({
    url: urls.findCanClaimedJourneyCommunityWishPage,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

export function claimedJourneyCommunityWish (params) {
  return request({
    url: urls.claimedJourneyCommunityWish,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

export function getJourneyHelperProjectShowPage (params) {
  return request({
    url: urls.getJourneyHelperProjectShowPage,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

export function findJourneyGoodHelperProjectList (params) {
  return request({
    url: urls.findJourneyGoodHelperProjectList,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
export function getJourneyHelperProjectDetail (params) {
  return request({
    url: urls.getJourneyHelperProjectDetail,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

export function findPlotOrganizationList (params) {
  return request({
    url: urls.findPlotOrganizationList,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

export function findJourneyCommunityBuildingByPlotOrgId (params) {
  return request({
    url: urls.findJourneyCommunityBuildingByPlotOrgId,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
export function findJourneyCommunityOwnerByPlotOrgId (params) {
  return request({
    url: urls.findJourneyCommunityOwnerByPlotOrgId,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
export function findJourneyGoodCommunityNeighborhoodList (params) {
  return request({
    url: urls.findJourneyGoodCommunityNeighborhoodList,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
export function findJourneyCommunityAllianceDetail (params) {
  return request({
    url: urls.findJourneyCommunityAllianceDetail,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
export function findJourneyCommunityAllianceListByCommunityOrgId (params) {
  return request({
    url: urls.findJourneyCommunityAllianceListByCommunityOrgId,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
export function findJourneyGoodCommunityStewardList (params) {
  return request({
    url: urls.findJourneyGoodCommunityStewardList,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
export function findJourneyCommunityStewardDetail (params) {
  return request({
    url: urls.findJourneyCommunityStewardDetail,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
export function findJourneyCommunityStewardListByCommunityOrgId (params) {
  return request({
    url: urls.findJourneyCommunityStewardListByCommunityOrgId,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
export function findJourneyGoodCommunityPartyList (params) { // 社区项目分页
  return request({
    url: urls.findJourneyGoodCommunityPartyList,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
export function findJourneyCommunityPartyContactByPartyId (params) { // 社区项目分页
  return request({
    url: urls.findJourneyCommunityPartyContactByPartyId,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
export function findJourneyCommunityPartyListByCommunityOrgId (params) { // 社区项目分页
  return request({
    url: urls.findJourneyCommunityPartyListByCommunityOrgId,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

export function communityCertification (params) { // 社区项目分页
  return request({
    url: urls.communityCertification,
    data: {
      ...params
    }
  })
}


export function getJourneyHelperProjectCount (params) { // 社区项目数量
  return request({
    url: urls.getJourneyHelperProjectCount,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

export function findCommunityOrganizationTree (params) { // 获取街道社区组织树
  return request({
    url: urls.findCommunityOrganizationTree,
    needlessToken: true,
    data: {

      ...params
    }
  })
}


export function getJourneyCoConstructionUnitTablePage (params) { // 共建单位联系表
  return request({
    url: urls.getJourneyCoConstructionUnitTablePage,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

export function createJourneyHelperProjectSchedule (params) { // 新增社区项目进度
  return request({
    url: urls.createJourneyHelperProjectSchedule,
    data: {
      ...params
    }
  })
}

export function modifyJourneyHelperProjectSchedule (params) { // 修改社区项目进度
  return request({
    url: urls.modifyJourneyHelperProjectSchedule,
    data: {
      ...params
    }
  })
}

export function getUnitListByCommunity (params) { // 根据社区id获取单位列表
  return request({
    url: urls.getUnitListByCommunity,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
export function findUnitOrganizationList (params) { // 获取共建单位组织列表
  return request({
    url: urls.findUnitOrganizationList,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
export function leadJourneyHelperProjectSchedule (params) { // 认领社区项目
  return request({
    url: urls.leadJourneyHelperProjectSchedule,
    data: {
      ...params
    }
  })
}