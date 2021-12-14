import store from '@/store'
import { getFullUrl } from '@/utils/tools.js'
const loginErrorSubCode = ['TOKEN_EXPIRED', 'TOKEN_NULL', 'SESSION_KEY_FAIL', 'NOT_LOGIN']
const loginErrorCode = [40001, 40002]
// 报错锁
let LOGIN_LOCK = false

export default function (obj) {
  return new Promise((resolve, reject) => {
    // 无效请求
    if (!obj.url) return reject('无效请求，没有 url')
    // 没有 token，并且不在白名单，不允许请求
    if (!uni.getStorageSync('token') && !obj.needlessToken) {
      if (LOGIN_LOCK) return
      LOGIN_LOCK = true
      uni.navigateTo({ url: '/pages/public/login' })
      return
    }

    LOGIN_LOCK = false

    let headers = {
      'authToken': uni.getStorageSync('token') || '',
      'masterOrgId': uni.getStorageSync('masterOrgId') || ''
    }
    if (obj.formData) {
      headers['Content-type'] = "application/x-www-form-urlencoded"
    }
    // 发起请求
    uni.request({
      url: getFullUrl(obj.url),
      data: obj.data,
      method: obj.method || 'POST',
      header: headers,
      success: (response) => {
        if (obj.method === 'GET') {
          resolve(response.data)
          return
        }

        const res = response.data
        if (loginErrorCode.includes(res.code) || loginErrorSubCode.includes(res.subCode)) {
          if (LOGIN_LOCK) return
          LOGIN_LOCK = true
          uni.navigateTo({ url: '/pages/public/Login' })
          return
        }

        LOGIN_LOCK = false

        if (res.code === 10000) {
          resolve(res)
        } else {
          resolve({
            isError: true,
            message: res.message,
            subCode: res.subCode
          })
        }
      },
      fail: (e) => {
        uni.showToast({
          title: '系统报错，请稍后再试！',
          mask: false
        })
        if (loginErrorCode.includes(e.data.code) && loginErrorSubCode.includes(e.data.subCode)) {
          if (LOGIN_LOCK) return
          LOGIN_LOCK = true
          uni.navigateTo({ url: '/pages/public/Login' })
          return
        }
        console.log(" fail:" + JSON.stringify(e.data));
      },
      complete: () => { }
    })
  })
}
