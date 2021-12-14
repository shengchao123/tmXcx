import request from '../request'
import { urls } from '../urls'
export function getShowJourneyPolicyPage (params) { // 政策分页
  return request({
    url: urls.getShowJourneyPolicyPage,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
export function getShowJourneyPolicyDetail (params) { // 政策详情
  return request({
    url: urls.getShowJourneyPolicyDetail,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

export function getShowJourneyTalentsPage (params) { // 人才分页
  return request({
    url: urls.getShowJourneyTalentsPage,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
export function getShowJourneyTalentsDetail (params) { // 人才详情
  return request({
    url: urls.getShowJourneyTalentsDetail,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

export function leaveMessage (params) { // 留言
  return request({
    url: urls.leaveMessage,
    data: {
      ...params
    }
  })
}

export function getShowAgricultureRelatedProjectsPage (params) { // 涉农项目分页
  return request({
    url: urls.getShowAgricultureRelatedProjectsPage,
    data: {
      ...params
    }
  })
}

export function getShowAgricultureRelatedProjectsDetail (params) { // 涉农项目详情
  return request({
    url: urls.getShowAgricultureRelatedProjectsDetail,
    data: {
      ...params
    }
  })
}

export function getJourneyPostShowPage (params) { // 岗位分页
  return request({
    url: urls.getJourneyPostShowPage,
    data: {
      ...params
    }
  })
}

export function getJourneyPostDetail (params) { // 岗位详情
  return request({
    url: urls.getJourneyPostDetail,
    data: {
      ...params
    }
  })
}