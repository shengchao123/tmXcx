<template>
  <div class='blocks-wrap '>
    <div class="blocks between-row">
      <div v-for="(item, index) in blocks"
           class="relative item center column"
           :key="index">
        <img :src="item.bg"
             class="bg">
        <svg-icon :icon="item.icon"
                  class="ft40 icon"></svg-icon>
        <div class="ft26 mt16">{{item.text}}</div>
      </div>
    </div>

    <div class="message center-align mt32 between-row">
      <div style="color:#fff">
        <div class="ft26 center-align"
             @click="onCall">
          社区服务热线：{{memberPersonalInfo.authCommunityOrgServiceHotline || '--'}}

          <svg-icon icon="icon_dianhuahover"
                    class="ft28 ml8 white-color"
                    style="color:#fff"></svg-icon>
        </div>
        <div class="ft24"
             style="opacity:0.8">您的贴心社区管家</div>
      </div>
      <div class="right-btn ft24 center"
           @click="onLeaveMessage">点击留言</div>
    </div>

    <div class="tr ft26 color-999 mt24">{{orgName}}</div>
  </div>
</template>

<script>
export default {
  name: 'Blocks',
  methods: {
    onLeaveMessage () {
      uni.navigateTo({ url: '/pages/steward/service/LeaveMessage?communityOrgId=' + this.communityOrgId })
    },
    onCall () {
      uni.makePhoneCall({
        phoneNumber: this.memberPersonalInfo.authCommunityOrgServiceHotline
      })
    }
  },
  created () {
    // 获取用户信息
    this.$api.getMemberPersonalInfo().then(res => {
      if (res.isError) return

      uni.setStorageSync('isAuthCommunity', res.content.isAuthCommunity)
      const { communityOrgId, authCommunityOrgName } = res.content
      this.communityOrgId = communityOrgId
      this.orgName = authCommunityOrgName
    })
  },
  computed: {
    memberPersonalInfo () {
      return this.$store.state.user.memberPersonalInfo
    }
  },
  data () {
    return {
      orgName: '',
      communityOrgId: '',
      blocks: Object.freeze([
        {
          bg: this.$aliImg('steward/service/block1.png'),
          icon: 'icon_jiuxuebuzhu',
          text: '就学补助'
        },
        {
          bg: this.$aliImg('steward/service/block2.png'),
          icon: 'icon_chunfenghangdong',
          text: '春风行动'
        },
        {
          bg: this.$aliImg('steward/service/block3.png'),
          icon: 'icon_hongshizihuijiuzhu',
          text: '红十字救助'
        },
        {
          bg: this.$aliImg('steward/service/block4.png'),
          icon: 'icon_fuxubuzhu',
          text: '抚恤补助'
        }
      ])
    }
  }
}
</script>

<style lang='scss' scoped>
.blocks-wrap {
  padding: 32rpx;
  border-bottom: 24rpx solid #f7f7f7;
  border-top: 24rpx solid #f7f7f7;
  background: #fff;
  .item {
    width: 160rpx;
    height: 160rpx;
    color: #fff;
    .bg {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .icon {
      z-index: 1;
    }
    div {
      z-index: 1;
    }
  }
  .message {
    box-sizing: border-box;
    height: 100rpx;
    background-image: url("https://hzslzx.oss-cn-hangzhou.aliyuncs.com/system/tianmu/images/steward/service/bg.png");
    background-size: 100% 100%;
    padding: 20rpx 20rpx 20rpx 40rpx;
    .right-btn {
      width: 120rpx;
      height: 56rpx;
      background: #fff;
      border-radius: 28rpx;
      color: #fb8414;
    }
  }
}
</style>
