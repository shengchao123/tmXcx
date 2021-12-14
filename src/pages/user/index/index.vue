<template>
  <div class='tabbar-mine column relative'>
    <GetUserInfoButton v-if="!userInfo.avatar"></GetUserInfoButton>
    <div class="info-wrap">
      <div class="top-info row">
        <img :src="$avatarUrl(userInfo.avatar)"
             v-if="userInfo.avatar">

        <div class="name-wrap ml20 column  flex1">
          <div class="ft32 bold mb16 line-h1 between-row">
            <div>{{userInfo.nick || ''}}</div>
            <div class="flex color-666 ft40">
              <div class="relative badge ft22 mr48"
                   @click="onOtherPage('message')">
                <u-badge type="error"
                         :is-center="true"
                         v-if="userInfo.messageQuantity"
                         size="mini"
                         class="badge-count"
                         :count="userInfo.messageQuantity"></u-badge>
                <svg-icon icon="icon_dibudaohanglan-"
                          class="ft40"></svg-icon>
              </div>
              <div @click="onOtherPage('setting')"
                   style="display:inherit">
                <svg-icon icon="icon_shezhi"></svg-icon>
              </div>
            </div>
          </div>
          <div class="center-align">
            <div v-if="userInfo.isMerchant"
                 class="label ft20 bg-9974fd mb16">商家</div>
            <div v-if="userInfo.isTalents"
                 class="label ft20 ml8 bg-fd9374 mb16">专家</div>
            <div v-if="!$isEmpty(userInfo.labelList)"
                 class="label ft20 ml8 bg-74a3fd mb16">{{userInfo.labelList[0]}}</div>
          </div>
          <div class="ft24 row flex1">
            <div :class="userInfo.name ? '': 'color-999'"
                 style="min-width:80rpx">{{userInfo.name || '暂未实名'}}</div>
            <div class="color-999 ml24 ft24 flex1 text-hidden">
              <span class="mr16">{{userInfo.authAllianceOrgName || ''}}</span>
              <span>{{userInfo.authCommunityOrgName || ''}}</span>
            </div>
          </div>
        </div>

      </div>

      <div class="count-wrap between-row">
        <div class="item center column"
             @click="onOtherPage('trends')">
          <div class="count ft34 bold">{{userInfo.noteQuantity || 0}}</div>
          <div class="count ft24 color-666 mt12">动态</div>
        </div>
        <div class="item center column"
             @click="onOtherPage('hearts')">
          <div class="count ft34 bold">{{userInfo.redHeartBalance || 0}}</div>
          <div class="count ft24 color-666 mt12">红心</div>
        </div>
        <div class="item center column"
             @click="onOtherPage('activity')">
          <div class="count ft34 bold">{{userInfo.activeQuantity || 0}}</div>
          <div class="count ft24 color-666 mt12">活动</div>
        </div>
        <div class="item center column"
             @click="onOtherPage('reply')">
          <div class="count ft34 bold">{{userInfo.talentsMessageQuantity || 0}}</div>
          <div class="count ft24 color-666 mt12">留言回复</div>
        </div>
        <div class="item center column"
             @click="onOtherPage('matter')">
          <div class="count ft34 bold">{{userInfo.problemQuantity || 0}}</div>
          <div class="count ft24 color-666 mt12">我的报事</div>
        </div>
      </div>
    </div>

    <div class="my-journey flex1 column">
      <div class="ft28 bold mb24">我的行程</div>

      <scroll-view scroll-y="true"
                   v-if="!$isEmpty(journeies)"
                   class="scroll-Y flex1">
        <MyJourneyItem v-for="(item, index) in journeies"
                       :key="index"
                       :item="item"></MyJourneyItem>
        <div style="width: 100%; height: 100rpx"></div>
      </scroll-view>

      <u-empty :src="$aliImg('empty/no-journey.png')"
               v-if="showNull"
               class="mt40"
               icon-size="360"></u-empty>
    </div>
  </div>
</template>

<script>
import MyJourneyItem from '../components/MyJourneyItem'
import GetUserInfoButton from '../components/get-user-info-button/get-user-info-button.vue'
const pageUrlMap = Object.freeze(new Map([
  ['message', '/pages/mine/notification/index'],
  ['setting', '/pages/mine/personal-settings/index'],
  ['hearts', '/pages/mine/my-hearts/index'],
  ['activity', '/pages/mine/my-activity/index'],
  ['trends', '/pages/mine/my-trends/index'],
  ['reply', '/pages/mine/leave-message/index'],
  ['matter', '/pages/steward/matter/my-matter/index']
]))
export default {
  name: 'index',
  methods: {
    // 获取用户信息
    getMemberPersonalInfo () {
      this.$api.getMemberPersonalInfo().then(res => {
        if (res.isError) return
        this.userInfo = res.content
        uni.setStorageSync('isAuthCommunity', res.content.isAuthCommunity)
        uni.setTabBarBadge({
          index: 1,
          text: this.userInfo.messageQuantity
        })
      })
    },
    // 获取行程分页
    getMyJourneyItineraryPage () {
      this.$api.getMyJourneyItineraryPage().then(res => {
        if (res.isError) return this.showNull = true
        this.journeies = res.content.items
        this.showNull = this.$isEmpty(this.journeies)
      })
    },
    setTabBarBadge () {
      const messageQuantity = this.userInfo
      if (messageQuantity) {
        uni.setTabBarBadge({
          index: 3,
          text: messageQuantity
        })
      }
    },
    // 跳转其他页面
    onOtherPage (type) {
      const url = pageUrlMap.get(type)
      uni.navigateTo({ url })
    }
  },
  components: { MyJourneyItem, GetUserInfoButton },
  data () {
    return {
      $fileHost: this.$fileHost,
      userInfo: {
        nick: ''
      },
      journeies: [],
      showNull: false
    }
  },
  onShow () {
    if (this.$notMember()) return this.$goLogin()
    this.getMemberPersonalInfo()
    this.getMyJourneyItineraryPage()
  }
}
</script>
<style>
page {
  height: 100%;
}
</style>
<style lang='scss' scoped>
.line-h1 {
  line-height: 1;
}
.tabbar-mine {
  height: 100%;
  .info-wrap {
    border-bottom: 20rpx solid #f7f7f7;
    padding: 30rpx 32rpx 40rpx;
    .top-info {
      img {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50rpx;
      }
    }
  }
  .count-wrap {
    padding: 40rpx 38rpx 0;
  }
  .my-journey {
    padding: 32rpx 32rpx 0;
    height: 100%;
    overflow: hidden;
  }

  .label {
    height: 28rpx;
    padding: 0 12rpx;
    color: #fff;
    border-radius: 4rpx;
    line-height: 26rpx;
  }
  .bg-9974fd {
    background: #9974fd;
  }
  .bg-fd9374 {
    background: #fd9374;
  }
  .bg-74a3fd {
    background: #74a3fd;
  }
  .scroll-Y {
    height: 100%;
  }
}
.badge-count {
  border-radius: 50%;
}
</style>
