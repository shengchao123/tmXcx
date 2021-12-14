<template>
  <view>
    <u-popup class="contact-dialog tc"
             v-model="showContact"
             mode="center"
             border-radius="24"
             width="540"
             :mask-close-able="false">
      <view class="container column">
        <text class="color-999 ft28 line1">即将拨打专家电话</text>
        <text class="color-333 ft34 medium line1 mt36">{{selectItem.contactPhone}}</text>
        <!-- 专家 -->
        <view v-if="isTalents === 'true'"
              class="expert flex">
          <view class="color-333 ft32 center"
                @click="$emit('update:showContact',false)">
            取消
          </view>
          <view class="center primary-color"
                @click="onCall">
            拨通电话
          </view>
        </view>
        <!-- 普通用户 -->
        <view v-else
              class="member">
          <view v-for="(btnItem,index) in btns"
                :key="index"
                class="btn-item center ft34 color-333"
                @click="onAction(index)">
            <text>{{btnItem}}</text>
          </view>
        </view>
      </view>
    </u-popup>
    <u-popup class="contact-dialog tc"
             v-model="noTimeShow"
             mode="center"
             border-radius="24"
             width="540"
             :mask-close-able="false">
      <view class="container column">
        <view class="column center-align color-333 ft32 medium">
          <text class="line1">不在电话服务时间内</text>
          <text v-if="!isTalents === 'true'">可进行问题留言</text>
        </view>
        <!-- 专家 -->
        <view v-if="isTalents === 'true'"
              class="no-time pt16">
          <text class="line1 color-999 ft26">时间：{{noTimes}}</text>
          <view class="btn center"
                @click="$emit('update:noTimeShow',false)">
            <text class="color-666 medium">我知道了</text>
          </view>
        </view>
        <!-- 普通用户 -->
        <view v-else
              class="expert flex">
          <view class="color-333 ft32 center"
                @click="$emit('update:noTimeShow',false)">
            取消
          </view>
          <view class="center primary-color"
                @click="onMessage">
            留言
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>
<script>
export default {
  name: 'ContactPopup',
  methods: {
    onCall () {
      this.$emit('onCall')
    },
    onAction (index) {
      this.$emit('onAction', index)
    },
    onMessage () {
      this.$emit('onMessage')
    }
  },
  props: {
    showContact: Boolean,
    noTimeShow: Boolean,
    selectItem: Object,
    noTimes: String
  },
  data () {
    return {
      isTalents: uni.getStorageSync('isTalents'),
      btns: ['拨通电话', '留言', '取消'],
    }
  },
  created () { },
}
</script>
<style lang='scss' scoped>
.line1 {
  line-height: 1;
}

.contact-dialog {
  .container {
    padding-top: 58rpx;
    .expert {
      margin-top: 50rpx;
      border-top: 2rpx solid #eaeaea;
      height: 88rpx;
      view {
        width: 50%;
        &:last-child {
          color: #e32417;
          border-left: 2rpx solid #eaeaea;
        }
      }
    }
    .member {
      margin-top: 36rpx;
      .btn-item {
        height: 88rpx;
        border-top: 2rpx solid #eaeaea;
        &:first-child {
          color: #e32417;
        }
      }
    }
    .no-time {
      .btn {
        width: 240rpx;
        margin: 44rpx auto 32rpx;
        height: 70rpx;
        border: 1px solid #d2d2d2;
        border-radius: 49rpx;
      }
    }
  }
}
</style>