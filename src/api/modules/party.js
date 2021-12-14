import request from '../request'
import { urls } from '../urls'

export function getJourneyAllianceInfoList () { // 获取联盟列表
  return request({
    url: urls.getJourneyAllianceInfoList,
    needlessToken: true,
    data: {}
  })
}

export function getJourneyAllianceDetailList (params) { // 获取联盟及详情列表
  return request({
    url: urls.getJourneyAllianceDetailList,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

export function getGraphicInfoPage (params) { // 分页获取风采图文信息
  return request({
    url: urls.getGraphicInfoPage,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

export function getGraphicInfoById (params) { // 获取风采图文详情
  return request({
    url: urls.getGraphicInfoById,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

export function findOrgTreeByOrgId (params) { // 根据组织id获取组织树
  return request({
    url: urls.findOrgTreeByOrgId,
    needlessToken: true,
    data: {
      ...params
    }
  })
}
