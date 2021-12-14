import request from '../request'
import { urls } from '../urls'
import { getAppid } from '@/utils/tools.js'

export function sendVerificationCode (params) {
  return request({
    url: urls.sendVerificationCode,
    needlessToken: true,
    data: {
      ...params
    }
  })
}


// 第一步：获取微信授权
export function redirectToOAuth (params) {
  return request({
    url: urls.redirectToOAuth,
    needlessToken: true,
    data: {
      scope: 'snsapi_userinfo'
    }
  })
}

// 第二步：接受微信公众号授权后的code获取thirdUserId及登陆
export function getUserInfoAndToken (params) {
  return request({
    url: urls.getUserInfoAndToken,
    needlessToken: true,
    data: {
      ...params
    }
  })
}


// 第三步：获取三方用户信息
export function getMemberLoginInfo () {
  return request({
    url: urls.getMemberLoginInfo,
    needlessToken: true,
    data: {
      thirdUserId: uni.getStorageSync('thirdUserId')
    }
  })
}


export function bindPhone (params) {
  return request({
    url: urls.bindPhone,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

// 获取微信需要的参数 /third/weChat/getJSConfig
export function getJSConfig (params) {
  return request({
    url: urls.getJSConfig,
    data: {
      ...params
    }
  })
}


// 通过 code 获取顶级组织，三方用户 id
// /third/authorization/getThirdUserIdByMiniProgram

/* #ifdef MP-WEIXIN */
const sourceType = '01'
/* #endif */

/* #ifdef MP-ALIPAY */
const sourceType = '02'
/* #endif */

/* #ifdef MP-TOUTIAO */
const sourceType = '03'
/* #endif */


export function getThirdUserIdByMiniProgram (params) {
  return request({
    url: urls.getThirdUserIdByMiniProgram,
    needlessToken: true,
    data: {
      appId: getAppid(),
      sourceType,
      ...params
    }
  })
}

export function getMinDecryptionData (params) { // 获取授权 url
  return request({
    url: urls.getMinDecryptionData,
    needlessToken: true,
    data: {
      ...params,
      thirdUserId: uni.getStorageSync('thirdUserId'),
      appId: getAppid(),
      sourceType,
    }
  })
}

export function getUserInfo (params) { // 获取第三方用户 id
  return request({
    url: urls.getUserInfo,
    needlessToken: true,
    data: {
      orgId: uni.getStorageSync('orgId'),
      ...params
    }
  })
}



