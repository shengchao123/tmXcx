import request from '../request'
import { urls } from '../urls'

export function findProductClassification (params) { // '/setting/district/findProductClassification', // 城乡融合分类
  return request({
    url: urls.findProductClassification,
    needlessToken: true
  })
}
export function getJourneyProductInfoPage (params) { // '/linanJourney/journeyProduct/getJourneyProductInfoPage', // 城乡产品列表
  return request({
    url: urls.getJourneyProductInfoPage,
    needlessToken: true,
    data: { ...params }
  })
}

export function getJourneyProductInfoById (params) { // '/linanJourney/journeyProduct/getJourneyProductInfoById', // 城乡产品详情
  return request({
    url: urls.getJourneyProductInfoById,
    needlessToken: true,
    data: { ...params }
  })
}

/**
 * @param {type} 活动类型 (01:联盟活动; 02:特色活动)
 * @param {status} 状态 (01:报名中; 02:进行中; 03:已结束)
 */
export function getJourneyActivityPage (params) { // '/linanJourney/journeyActivity/getJourneyActivityPage', // 特色活动分页
  return request({
    url: urls.getJourneyActivityPage,
    needlessToken: true,
    data: { type: '02', ...params }
  })
}
export function getJourneyMerchantBoothInfoPage (params) { // '/linanJourney/journeyMerchantBooth/getJourneyMerchantBoothInfoPage', // 分页获取商家展位
  return request({
    url: urls.getJourneyMerchantBoothInfoPage,
    needlessToken: true,
    data: { ...params }
  })
}

export function getJourneyPlayCustomizationInfoPage (params) { // 分页获取游玩定制
  return request({
    url: urls.getJourneyPlayCustomizationInfoPage,
    needlessToken: true,
    data: { ...params }
  })
}

export function getJourneyMerchantBoothInfoById (params) { // '/linanJourney/journeyMerchantBooth/getJourneyMerchantBoothInfoById', // 商家展位详情
  return request({
    url: urls.getJourneyMerchantBoothInfoById,
    needlessToken: true,
    data: { ...params }
  })
}
export function createJourneyMerchantBooth (params) { // '/linanJourney/journeyMerchantBooth/createJourneyMerchantBooth', // 创建商家展位
  return request({
    url: urls.createJourneyMerchantBooth,
    data: { ...params }
  })
}
export function createJourneyResourceSharing (params) { //  '/linanJourney/journeyResourceSharing/createJourneyResourceSharing', // 新增资源共享
  return request({
    url: urls.createJourneyResourceSharing,
    data: { ...params }
  })
}
export function getJourneyResourceSharingPage (params) { // '/linanJourney/journeyResourceSharing/getJourneyResourceSharingPage', // 资源共享列表
  return request({
    url: urls.getJourneyResourceSharingPage,
    needlessToken: true,
    data: { ...params }
  })
}

export function getJourneyResourceSharingInfoById (params) { // ' /linanJourney/journeyResourceSharing/getJourneyResourceSharingInfoById', // 资源共享详情
  return request({
    url: urls.getJourneyResourceSharingInfoById,
    needlessToken: true,
    data: { ...params }
  })
}

export function orderJourneyPlayCustomizationInfoById (params) { // 对游玩定制进行接单
  return request({
    url: urls.orderJourneyPlayCustomizationInfoById,
    data: { ...params }
  })
}

export function createJourneyPlayCustomization (params) { // 创建游玩定制
  return request({
    url: urls.createJourneyPlayCustomization,
    data: { ...params }
  })
}

export function modifyJourneyPlayCustomizationInfoById (params) { // 编辑我的定制
  return request({
    url: urls.modifyJourneyPlayCustomizationInfoById,
    data: { ...params }
  })
}

export function getJourneyPlayCustomizationInfoById (params) { // 获取游玩定制详情
  return request({
    url: urls.getJourneyPlayCustomizationInfoById,
    data: { ...params }
  })
}

export function deleteJourneyPlayCustomizationInfoById (params) { // 删除我的游玩定制
  return request({
    url: urls.deleteJourneyPlayCustomizationInfoById,
    data: { ...params }
  })
}

export function modifyJourneyPlayCustomizationInfoShowStatusById (params) { // 修改我的游玩定制展示状态
  return request({
    url: urls.modifyJourneyPlayCustomizationInfoShowStatusById,
    data: { ...params }
  })
}