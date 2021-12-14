<template>
  <div class='active-item-wrap mb20 relative'
       @click="onGoDetail">
    <image :src="fileHost + item.picUrl"
           :style="{width: '100%', height: ($windowWidth * (9 / 16)) + 'px'}"
           mode="aspectFill">
    </image>

    <div class="info mb16">
      <div class="center-align">
        <div class="name ft40 bold mr16 text-hidden"
             style="max-width:500rpx">{{item.name}}</div>
        <div class="status-info ft20"
             v-if="getStatusInfo"
             :style="{color: getStatusInfo.color, borderColor: getStatusInfo.color}">{{getStatusInfo.text}}</div>
      </div>

      <div class="center-align mt16 ft26">
        <svg-icon icon="icon_shijian"
                  class="color-999"></svg-icon>
        <text class="ml16 color-999">时间：</text>
        <text>{{getTime}}</text>
      </div>

      <div class="mt16 row ft26 center-align">
        <svg-icon icon="icon_dingwei"
                  class="color-999"></svg-icon>
        <div class="ml16 color-999">地址：</div>
        <div style="width: 380rpx">{{item.address}}</div>
      </div>

      <div class="center-align mt16 ft26">
        <svg-icon icon="icon_renshu"
                  class="color-999"></svg-icon>
        <text class="ml16 color-999">报名：</text>
        <text>{{item.signUpQuantity}}人</text>
      </div>
    </div>

    <div class="join column">
      <view class="btn cancel-btn ft24 "
            v-if="item.isSignUp && item.status !== '03'">
        已报名
      </view>
      <view class="btn"
            v-if="!item.isSignUp && item.status === '01'"
            @click.stop="onToRoute(item)">
        我要报名
      </view>
      <div class="deadline ft20 mt16 color-999 tr"
           v-if="item.status !== '03'">{{deadline ? deadline + '后截止' : '时间'}}</div>
    </div>

  </div>
</template>

<script>
import { dateCount } from '@/utils/date.js'
import { statusMap } from '@/utils/enum.js'
import { subStringWithStrlen } from '@/utils/tools'

let TIMER = null
export default {
  name: 'ActiveItem',
  methods: {
    onGoDetail () {
      uni.navigateTo({ url: `/pages/union/interact/detail/index?id=${this.item.id}` })
    },
    onToRoute (item) {
      const url = item.status === '01' ? `/pages/original-travel/stroke-order/signUp?id=${item.id}&type=activity` : ''
      uni.navigateTo({
        url
      })
    },
    countDown () {
      const _endTime = this.item.endTime
      TIMER = setInterval(() => {
        this.deadline = dateCount(_endTime)
      }, 1000);
    }
  },
  data () {
    return {
      deadline: 0
    }
  },
  created () {
    this.countDown()
  },
  props: {
    item: Object
  },
  computed: {
    getStatusInfo () {
      return statusMap.get(this.item.status)
    },
    getTime () {
      const moment = this.$moment
      const { startTime, endTime } = this.item
      const sDay = moment(startTime).format('YYYY-MM-DD')
      const eDay = moment(endTime).format('YYYY-MM-DD')
      const eTime = moment(endTime).format('HH:mm')
      const newStartTime = moment(startTime).format('YYYY-MM-DD HH:mm')
      const newEndTime = moment(endTime).format('YYYY-MM-DD HH:mm')
      if (sDay === eDay) {
        return newStartTime + '~' + eTime
      }
      return newStartTime + '~' + newEndTime
    },
    name () {
      return subStringWithStrlen(this.item.name, 36)
    },
    fileHost () {
      return this.$fileHost
    }
  }
}
</script>

<style lang='scss' scoped>
.active-item-wrap {
  background: #ffffff;
  border-radius: 8rpx;
  overflow: hidden;
  box-shadow: 3rpx 2rpx 12rpx 8rpx rgba(17, 17, 17, 0.03);
  .info {
    padding: 16rpx 30rpx;
  }
  .status-info {
    border: 1px solid transparent;
    border-radius: 0 16rpx 0 16rpx;
    height: 32rpx;
    line-height: 32rpx;
    text-align: center;
    width: 88rpx;
  }
  .join {
    position: absolute;
    right: 30rpx;
    bottom: 20rpx;
    align-items: flex-end;
    .btn {
      padding: 0 24rpx;
      height: 56rpx;
      border: 1px solid #e32417;
      border-radius: 28rpx;
      color: #e32417;
      line-height: 56rpx;
    }
    .cancel-btn {
      border: none;
      color: #999;
    }
    .deadline {
    }
  }
}
</style>
