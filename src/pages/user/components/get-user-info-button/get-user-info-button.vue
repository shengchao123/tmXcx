<template>
  <view class='get-phone-wrap'
        @click.stop>
    <!-- #ifdef MP-WEIXIN -->
    <button class="cover-btn"
            :hover-stop-propagation="true"
            @click="getWxUserInfo"></button>
    <!-- #endif -->
    <!-- #ifdef MP-ALIPAY -->
    <button class="cover-btn"
            :hover-stop-propagation="true"
            open-type="getAuthorize"
            scope="userInfo"
            @error="onAuthError"
            @getAuthorize="getAlUserInfo">
    </button>
    <!-- #endif -->
    <!-- #ifdef MP-TOUTIAO -->
    <button class="cover-btn"
            @click="getTTUserInfo">
    </button>
    <!-- #endif -->
  </view>
</template>

<script>

export default {
  name: 'GetPhoneButton',
  methods: {

    getWxUserInfo (e) {
      const that = this
      uni.getUserProfile({
        lang: 'zh_CN',
        desc: '登录',
        success: (res) => {
          const userWeiXinAccInfo = res.userInfo;
          const { avatarUrl, nickName, gender } = userWeiXinAccInfo
          const params = {
            avatar: avatarUrl, nick: nickName, gender
          }
          that.modifyMemberInfo(params)
        },
        fail: (res) => {
          that.$emit('getUserProfile')
          uni.setStorageSync('hiddenUserInfoBtn', true)
        }
      });
    },
    getAlUserInfo (e) {
      const that = this
      my.getOpenUserInfo({
        success: (res) => {
          let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
          const { avatar, nickName, gender } = userInfo
          const params = {
            avatar, nick: nickName, gender
          }
          that.modifyMemberInfo(params)
        }
      });
    },
    getTTUserInfo () {
      const that = this
      tt.getUserInfo({
        withCredentials: true,
        success (res) {
          const { avatarUrl, nickName, gender } = res.userInfo
          const params = {
            avatar: avatarUrl, nick: nickName, gender
          }
          that.modifyMemberInfo(params)
        }
      });
    },
    modifyMemberInfo (params) {
      this.$api.modifyMemberPersonalInfo(params).then(res => {
        if (res.isError) return
        this.$store.dispatch('user/setMemberPersonalInfo')
        this.$emit('getUserProfile')
        uni.setStorageSync('hiddenUserInfoBtn', true)
      })
    },
  }
}
</script>

<style lang='scss' scoped>
.cover-btn {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  border: none;
  z-index: 999;
  background-color: transparent;
}
</style>
