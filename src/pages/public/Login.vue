
<template>
  <div class='login-wrap'>

  </div>
</template>

<script>
import { saveLoginInfo, slzxNavigateBack } from '@/utils/login'

export default {
  name: 'Login',
  methods: {
    /**
     * 1. 如果有 thridUserId，证明登录过，直接去获取用户信息之类的
     * 2. 如果没有 thirdUserId，走微信授权获取id，然后换取用户信息
     * 3. 用户信息状态 status  (1:未找到该用户; 2:未成为会员; 3:未完善资料; 4:已完善资料; 5:登录失败; 6:冻结)
     */
    h5Login (option) {
      // 微信授权登录
      if (option.code) {
        this.getUserInfoAndToken(option)
      } else {
        this.redirectToOAuth()
      }
    },
    // 第一步：获取微信授权地址
    redirectToOAuth () {
      this.$api.redirectToOAuth().then(res => {
        if (res.isError) return
        location.replace(res.content.redirectUrl)
      })
    },

    // 第二步：使用微信返回 code 换取登录所需信息
    getUserInfoAndToken (option) {
      let params = {
        code: option.code,
        appid: option.appid
      }
      this.$api.getUserInfoAndToken(params).then(res => {
        if (res.isError) return
        const { openId, thirdUserId } = res.content
        uni.setStorageSync('thirdUserId', thirdUserId)
        this.getMemberLoginInfo()
      })
    },

    // 第三部获取用户信息
    getMemberLoginInfo () {
      this.$api.getMemberLoginInfo().then(res => {
        if (res.isError) return
        saveLoginInfo(res.content)
        const { status } = res.content

        // 不是会员，需要绑定手机号
        if (status === 1 || status === 2) {
          uni.redirectTo({ url: '/pages/public/Bind' })
          return
        }
        this.$store.dispatch('user/setMemberPersonalInfo')
        // 是会员直接成功
        if (status === 3 || status === 4) {
          slzxNavigateBack()
          return
        }

        // 登录报错的
        if (status === 5 || status === 6) {
          uni.removeStorageSync('thirdUserId')
          this.redirectToOAuth()
        }
      })
    }
  },

  onLoad (option) {
    if (process.env.NODE_ENV === 'development') {
      if (option.masterOrgId) {
        uni.clearStorageSync()
        uni.setStorageSync('masterOrgId', option.masterOrgId)
        uni.setStorageSync('thirdUserId', option.thirdUserId)
      }
      this.getMemberLoginInfo()
      return
    }
    if (option.masterOrgId) {
      uni.clearStorageSync()
      uni.setStorageSync('masterOrgId', option.masterOrgId)
    }
    this.h5Login(option)
  },
}
</script>

<style lang='scss' scoped>
.login-wrap {
}
</style>
