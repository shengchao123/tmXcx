<template>
  <view>
    <view class="hearts-info">
      <view class="center-align end-justify pt24 pr20 opacity-6">
        <view @click="onPopup">
          <svg-icon icon="icon_wenhao"
                    class="ft24"></svg-icon>
          <text class="ft22 ml8">红心获取规则</text>
        </view>
      </view>
      <view class="column center-align mt20">
        <text class="ft60 bold">{{heartsData.redHeartBalance}}</text>
        <text class="ft24 opacity-6">当前红心值</text>
      </view>
      <view class="ft28 mt24 relative">
        <view class="flex heart-accumulation">
          <text class="opacity-6">获取</text>
          <text>{{heartsData.redHeartAccumulation>0 ? '+' : ''}}{{heartsData.redHeartAccumulation}}</text>
        </view>
        <view class="flex heart-consume">
          <text class="opacity-6">使用</text>
          <text>{{heartsData.redHeartConsume > 0 ? '-' : ''}}{{heartsData.redHeartConsume}}</text>
        </view>
      </view>
    </view>
    <view class="h144 center-align exchange-wrap between-row pl30 pr30 bb"
          @click="onMall">
      <view class="center-align">
        <img :src="$aliImg('hearts/exchange-logo.png')"
             alt=""
             class="logo-img">
        <view class="column ml24">
          <text class="ft30 color-333 mb20 line-h1 bold">红心商城兑换福利</text>
          <text class="ft24 color-999 line-h1">兑换更多礼品</text>
        </view>
      </view>
      <view class="color-e32417 center-align">
        <text class="ft26">去兑换</text>
        <svg-icon icon="icon_xiangyoujiantou"
                  class="ft24 ml8"></svg-icon>
      </view>
    </view>
    <view class="pt4 pb4">
      <u-tabs :list="tabsList"
              :is-scroll="false"
              font-size="28"
              active-color="#E32417"
              inactive-color="#666666"
              bar-width="32"
              bar-height="4"
              :bar-style=tabsBarStyle
              :current="tabsCurrent"
              @change="changeTabs"></u-tabs>
    </view>
    <record :tabsCurrent="tabsCurrent"
            ref="record"></record>
    <access-rules ref="accessRules"></access-rules>
  </view>
</template>

<script>
import AccessRules from './AccessRules.vue'
import Record from './Record.vue'
export default {
  components: { AccessRules, Record },
  name: 'index',
  methods: {
    // 切换tab
    changeTabs (index) {
      this.tabsCurrent = index
      this.$nextTick(() => {
        this.$refs.record.resetGetList()
      })
    },
    // 红心获取规则弹窗
    onPopup () {
      this.$refs.accessRules.show()
    },
    // 红心商城
    onMall () {
      uni.navigateTo({ url: '/pages/mine/my-hearts/Mall' })
    },
    // 获取我的红心值
    getMyRedHeart () {
      this.$api.getMyRedHeart().then(res => {
        if (res.isError) return this.$msg(res.message)
        this.heartsData = res?.content ?? {}
      })
    }
  },
  data () {
    return {
      heartsData: {},
      tabsList: [
        {
          name: '全部明细'
        },
        {
          name: '获取'
        },
        {
          name: '使用'
        }
      ],
      tabsCurrent: 0
    }
  },
  onShow () {
    this.getMyRedHeart()
  },
  computed: {
    tabsBarStyle () {
      const temStyle = {
        bottom: '6rpx'
      }
      return temStyle
    }
  }
}
</script>

<style lang='scss' scoped>
.opacity-6 {
  opacity: 0.6;
}
.line-h1 {
  line-height: 1;
}
.ft60 {
  font-size: 60rpx;
  line-height: 60rpx;
}
.h144 {
  height: 144rpx;
}
.end-justify {
  justify-content: flex-end;
}
.hearts-info {
  height: 262rpx;
  width: 100%;
  background: url("https://hzslzx.oss-cn-hangzhou.aliyuncs.com/system/tianmu/images/top-bg.png")
    no-repeat;
  background-size: 100% 100%;
  color: #fff;
  .heart-consume {
    position: absolute;
    left: calc(50% + 50rpx);
  }
  .heart-accumulation {
    position: absolute;
    right: calc(50% + 50rpx);
  }
}
.exchange-wrap {
  .logo-img {
    width: 104rpx;
    height: 86rpx;
  }
}
.color-e32417 {
  color: #e32417;
}
</style>
