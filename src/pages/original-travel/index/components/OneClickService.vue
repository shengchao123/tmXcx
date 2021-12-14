<template>
  <view class="one-click-service-wrap mt24 center-align">
    <view class="service-container bg-white">
      <view class="bold ft34">一键服务</view>
      <view class="service-list mt24">
        <view v-for="(item,index) in serviceList"
              :key="index"
              class="list-item center-align pl20 ft28 color-333"
              :style="{background: item.bgColor}"
              @click="onToRoute(item)">
          <svg-icon :icon="item.icon"
                    class="ft34"
                    :style="{color: item.iconColor}"></svg-icon>
          <text class="ml16">{{item.name}}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'OneClickService',
  methods: {
    onToRoute (item) {
      const { name, url } = item
      if (name === '临安实时公交') {
        uni.navigateTo({
          url: `/pages/webView?title=临安实时公交&webUrl=${url}`
        })
        return
      }
      if (name === '初心之旅·共富巴士') {
        this.$emit('onShowContact')
        return
      }
      uni.navigateTo({
        url
      })
    }
  },
  data () {
    return {
      serviceList: Object.freeze([
        { name: '临安实时公交', icon: 'icon_shishigongjiao', bgColor: '#EDF3FE', iconColor: "#5392FF", url: 'http://zhjtwxpt.blueapps.cn/weixin/list.aspx?s=104217' },
        { name: '初心之旅·共富巴士', icon: 'icon_gongfubashi', bgColor: '#F4ECFB', iconColor: "#9241DB", url: '' },
        { name: '临安星级旅行社', icon: 'icon_lvhangshe', bgColor: '#FDF5E9', iconColor: "#F4A42A", url: '/pages/original-travel/travel-list/index' },
        { name: '体验特色农村生活', icon: 'icon_tesenongcun', bgColor: '#FFEFE5', iconColor: "#FF6800", url: '/pages/urban-rural/index/index?current=2' }
      ]),
    }
  },
  created () { },
}
</script>
<style lang='scss' scoped>
.one-click-service-wrap {
  height: 360rpx;
  .service-container {
    width: 100%;
    border-top: 24rpx solid #f7f7f7;
    border-bottom: 24rpx solid #f7f7f7;
    padding: 32rpx;
    .service-list {
      display: grid;
      grid-gap: 16rpx;
      grid-template-columns: repeat(2, 1fr);
      .list-item {
        height: 88rpx;
        border-radius: 6rpx;
      }
    }
  }
}
</style>