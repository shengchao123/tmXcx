<template>
  <view class='msg-center-wrap flex1'>
    <view class="tabs-wrap row">
      <!-- tab 栏 -->
      <view class="tab-item secondary-text"
            v-for="(item, index) in navList"
            :key="index"
            @click="tabClick(index)">
        <text class="ft28 color-666"
              :class="tabCurrentIndex === index && 'primary-color bold'">
          {{item.name}}{{item.count ? `(${item.count})` : ''}}
        </text>
      </view>
      <view class="line"
            :style="lineStyle"></view>
    </view>
    <swiper :current="tabCurrentIndex"
            class="swpier"
            @change="changeSwiper">
      <swiper-item>
        <announcement v-if="tabCurrentIndex === 0 || hasLoaded(0)"
                      :tabCurrentIndex="0"
                      @updateCount="updateCount"></announcement>
      </swiper-item>
      <swiper-item>
        <comment v-if="tabCurrentIndex === 1 || hasLoaded(1)"
                 :tabCurrentIndex="1"
                 @updateCount="updateCount"></comment>

      </swiper-item>
      <swiper-item>
        <awesome v-if="tabCurrentIndex === 2 || hasLoaded(2)"
                 :tabCurrentIndex="2"
                 @updateCount="updateCount"></awesome>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
import Awesome from './components/Awesome'
import Announcement from './components/Announcement'
import Comment from './components/Comment'
export default {
  methods: {
    changeSwiper (e) {
      this.tabCurrentIndex = e.detail.current
    },
    // 顶部tab点击
    tabClick (index) {
      this.tabCurrentIndex = index
    },
    // 更新 tab 的未读数量
    updateCount (index, count) {
      this.navList[index].count = count
    },
    getUnreadMessageQuantity () {
      this.$api.getUnreadMessageQuantity().then(res => {
        if (res.isError) return this.$msg(res.message)
        const msgCount = res.content
        const keys = ['announcementCount', 'likeFavoritesCount', 'noteCommentCount']
        const navList = this.navList
        keys.forEach((key, index) => {
          navList[index].count = msgCount[key]
        })
        this.navList = navList
      })
    }
  },
  watch: {
    tabCurrentIndex (val) {
      if (this.cacheCurrent.includes(val)) return
      this.cacheCurrent.push(val)
    }
  },
  data () {
    return {
      msgCount: {},
      tabCurrentIndex: 0,
      navList: [
        {
          name: '公告',
          count: 0
        },
        {
          name: '社区互动',
          count: 0
        },
        {
          name: '收到的赞',
          count: 0
        }
      ],
      cacheCurrent: [0]
    }
  },
  computed: {
    lineStyle () {
      const lineWidth = 32
      const itemWidth = 250
      const leftGap = (itemWidth - lineWidth) / 2
      let left = this.tabCurrentIndex * itemWidth + leftGap
      return `left: ${left}rpx`
    },
    hasLoaded () {
      return (index) => {
        return this.cacheCurrent.includes(index)
      }
    }
  },
  onLoad () {
    this.getUnreadMessageQuantity()
  },
  components: { Awesome, Announcement, Comment }
}
</script>
<style>
page {
  display: flex;
  height: 100%;
  background: #fff;
}
</style>
<style lang='scss' scoped>
.msg-center-wrap {
  .tabs-wrap {
    position: relative;
    // z-index: 5;
    // position: fixed;
    // top: var(--window-top); /* css变量 */
    // top: 0;
    // left: 0;
    // right: 0;
    justify-content: space-around;
    background: #fff;
    box-shadow: 0 10rpx 10rpx -10rpx rgba(0, 0, 0, 0.06);
    height: 88rpx;
    line-height: 88rpx;
    .tab-item {
      width: 250rpx;
      text-align: center;
    }
    .line {
      position: absolute;
      z-index: 1000;
      transition: left 0.3s;
      bottom: 6rpx;
      left: 60rpx;
      width: 28rpx;
      height: 4rpx;
      border-radius: 3rpx;
      background: $color-f54400;
    }
  }
  .dividing-line {
    width: 100%;
    height: 20rpx;
    background: #f7f7f7;
  }
  .swpier {
    height: calc(100% - 108rpx);
  }
}
</style>