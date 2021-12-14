<template>
  <view class="call-popup-wrap">
    <u-popup class="contact-dialog tc"
             v-model="showContact"
             mode="center"
             border-radius="24"
             width="540"
             :mask-close-able="false">
      <view class="call-box column">
        <text class="color-333 ft30 line1">{{itemConfig.title}}</text>
        <view v-if="itemConfig.phoneList.length === 1"
              class="mt36">
          <text class="color-333 ft34 medium line1">{{itemConfig.phoneList[0]}}</text>
          <view class="expert flex">
            <view class="color-333 ft32 center"
                  @click="$emit('update:showContact',false)">
              取消
            </view>
            <view class="center primary-color"
                  @click="onCall(itemConfig.phoneList[0])">
              拨通电话
            </view>
          </view>
        </view>
        <view v-else
              class="multiple">
          <view v-for="(item,index) in itemConfig.phoneList"
                :key="index"
                class="multiple-item center ft36"
                @click="onCall(item)">
            <text>{{item}}</text>
          </view>
          <view class="cancel-btn center"
                @click="$emit('update:showContact',false)">
            <text class="color-333 ft32">取消</text>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>
<script>
export default {
  name: 'CallPopup',
  methods: {
    // 打电话
    onCall (phoneNumber) {
      uni.makePhoneCall({
        phoneNumber
      })
    },
  },
  data () {
    return {}
  },
  props: {
    itemConfig: Object,
    showContact: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  created () { },
}
</script>
<style lang='scss' scoped>
.call-popup-wrap {
  .call-box {
    padding-top: 48rpx;
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
    .multiple {
      .multiple-item {
        height: 120rpx;
        border-bottom: 1px solid #eaeaea;
        color: #518cfc;
      }
      .cancel-btn {
        height: 120rpx;
      }
    }
  }
}
</style>