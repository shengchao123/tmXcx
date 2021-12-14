import store from '@/store'
import { api } from '@/api/index.js'
import { msg, getAppid } from './tools'

export const goLogin = function () {
  uni.navigateTo({ url: '/pages/public/Bind' })
}

export const notMember = () => {
  const res = uni.getStorageSync('memberId')
  return !res || res === '0'
}

export const login = (pass) => {
  return new Promise((resolve, reject) => {
    if (uni.getStorageSync('token') && !pass) {
      store.dispatch('user/setMemberPersonalInfo')
      resolve()
      return
    }
    uni.login({
      success: (res) => {
        const { code } = res
        const params = { code }
        api.getThirdUserIdByMiniProgram(params).then(res => {
          if (!res.content) return
          const { masterOrgId, thirdUserId, openId, orgId } = res.content || {}
          uni.setStorageSync('orgId', orgId)
          uni.setStorageSync('masterOrgId', masterOrgId)
          uni.setStorageSync('thirdUserId', thirdUserId)
          uni.setStorageSync('openId', openId)
          getMemberLoginInfo(resolve, reject)
        })
      },
      fail: (error) => {
        msg('系统异常，请关闭小程序稍后再试！')
      }
    })
  })
}


// 登录获取所有信息
function getMemberLoginInfo (resolve, reject) {
  api.getMemberLoginInfo().then(res => {
    if (!res || res.isError) return
    // 保存登录后的信息
    saveLoginInfo(res.content)
    store.dispatch('user/setMemberPersonalInfo')
    resolve(res.content)
  })
}

// 保存登录信息
const needSaveKeys = ['memberId', 'token', 'masterOrgId', 'phone', 'isTalents', 'isRealName']
export const saveLoginInfo = function (res) {
  needSaveKeys.forEach(key => {
    if (res[key]) uni.setStorageSync(key, res[key])
  })
}

// 基层治理需要社区认证
export const isAuthCommunity = !!uni.getStorageSync('isAuthCommunity')

export const slzxNavigateBack = function () {
  const pages = getCurrentPages()
  if (pages.length >= 2) {
    uni.navigateBack()
  } else {
    uni.switchTab({ url: '/pages/home/index/index' })
  }
}

export const thirdLogin = function ({ accessToken, masterOrgId }) {
  if (!accessToken) return
  api.getCityCenterUserInfo({ accessToken: accessToken }).then(res => {
    uni.setStorageSync('isThird', true)
    uni.setStorageSync('masterOrgId', masterOrgId)
    uni.setStorageSync('thirdUserId', res.content.thirdUserId)
    uni.navigateTo({ url: '/pages/public/Login' })
  })
}

export const memberLogin = (e, needBindInfo = false) => {
  const { encryptedData, iv, bindPhoneParams } = e
  if (!encryptedData) return
  const params = {
    encryptedData
  }
  if (iv) params.iv = iv
  api.getMinDecryptionData(params).then(res => {
    if (res.isError) return
    let content = JSON.parse(res.content)
    // 绑定会员手机号
    let phone = ''
    /* #ifdef MP-WEIXIN */
    phone = content.phoneNumber
    /* #endif */
    /* #ifdef MP-ALIPAY */
    phone = content.mobile
    /* #endif */
    const params = {
      phone,
      ...bindPhoneParams // 邀请拉新时需要传邀请人luckyAttendId
    }
    api.bindPhone(params).then(res => {
      const memberId = res?.content?.memberId ?? false
      if (memberId) {
        uni.setStorageSync('memberId', memberId)
      }
      if (needBindInfo) {
        uni.navigateTo({
          url: "/pages/public/bind-info/BindInfo"
        })
        return
      }
      uni.$emit('memberLogin')
    })
  })
}
