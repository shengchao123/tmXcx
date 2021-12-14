<template>
  <view class="item-wrap bg-white relative">
    <view class="top center-align between-row">
      <view class="center-align">
        <span class="title ft32 color-333 medium pr16">{{item.name}}</span>
        <div class="status-info ft20"
             :style="{color: getStatusInfo.color, borderColor: getStatusInfo.color}">{{getStatusInfo.text}}</div>
      </view>
      <view>
        <svg-icon class="ft20 color-999"
                  icon="icon_xiangyoujiantou"></svg-icon>
      </view>
    </view>
    <view class="form-list mt32">
      <view v-for="(formItem,index) in formList"
            :key="index"
            class="form-item ft26 center-align">
        <svg-icon :icon="formItem.icon"
                  class="ft24 color-999"></svg-icon>
        <text class="pl8 color-999">{{formItem.name}}</text>
        <view v-if="formItem.keyName === 'time'">
          <text>{{getTime}}</text>
        </view>
        <text v-else
              class="color-333">{{item[formItem.keyName]}}{{formItem.keyName === 'signUpQuantity' ? '人' : ''}}</text>
      </view>
    </view>
    <view v-if="item.status === '01'"
          class="btn-box">
      <view v-if="item.isSignUp"
            class="btn center cancel-btn ft24">已报名</view>
      <div v-else>
        <view class="btn center"
              @click.stop="onToRoute(item)">我要报名</view>
        <div class="ft20 color-999 mt4">
          <u-count-down separator='zh'
                        font-size="20"
                        separator-size="20"
                        separator-color="#999"
                        color="#999"
                        :show-seconds="false"
                        :timestamp="timestamp"></u-count-down>
          <span>后截止</span>
        </div>
      </div>
    </view>
  </view>
</template>
<script>
import moment from "moment"
import { statusMap } from '@/utils/enum.js'
export default {
  name: 'item',
  methods: {
    onToRoute (item) {
      if (this.$notMember()) return this.$goLogin();
      const url = item.status === '01' ? `/pages/original-travel/stroke-order/signUp?id=${item.id}&type=activity` : ''
      uni.navigateTo({
        url
      })
    }
  },
  props: {
    item: Object,
    isMay: Boolean
  },
  data () {
    return {
      // 状态 (01:报名中; 02:进行中; 03:已结束)
      statusMap,
      formList: Object.freeze([
        {
          icon: 'icon_shijian',
          name: '时间：',
          keyName: 'time',
        },
        {
          icon: 'icon_lianmeng',
          name: '组织：',
          keyName: 'orgName'
        },
        {
          icon: 'icon_renshu',
          name: '报名：',
          keyName: 'signUpQuantity'
        }
      ]),
    }
  },
  computed: {
    getTime () {
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
    getStatusInfo () {
      return this.statusMap.get(this.item.status) || {}
    },
    timestamp () {
      return Math.floor((this.item.endTime - new Date().getTime()) / 1000)
    }
  },
}
</script>
<style lang='scss' scoped>
.item-wrap {
  width: calc(100% - 60rpx);
  margin: 0 auto 20rpx;
  box-shadow: 3rpx 2rpx 12rpx 8rpx rgba(17, 17, 17, 0.03);
  border-radius: 8rpx;
  padding: 30rpx;
  .top {
    height: 32rpx;
    line-height: 1.5;
    .title {
      max-width: 482rpx;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status-info {
      border: 1px solid transparent;
      border-radius: 0 16rpx 0 16rpx;
      height: 32rpx;
      line-height: 32rpx;
      text-align: center;
      width: 88rpx;
    }
  }
  .form-list {
    line-height: 1;
    .form-item + .form-item {
      margin-top: 24rpx;
    }
  }
  .btn-box {
    position: absolute;
    right: 30rpx;
    bottom: 20rpx;
    text-align: right;
  }
  .btn {
    display: inline-block;
    width: 144rpx;
    height: 56rpx;
    border: 1px solid #e32417;
    border-radius: 28rpx;
    color: #e32417;
    text-align: center;
    line-height: 55rpx;
  }
  .cancel-btn {
    border: none;
    color: #999;
  }
}
</style>