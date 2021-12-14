<template>
  <view class="item-wrap bg-white relative">
    <view class="center-align">
      <view class="mr16 user-img"
            :style="{backgroundImage: `url(${avatarUrl(item.photo)})`}"></view>
      <view class="ml16 column flex1">
        <text class="ft28 color-333 medium">{{item.name}}</text>
        <text class="ft22 color-999 pt12 skilled"
              :class="isDetail ? '' : 'list-skilled'">{{titleList}}</text>
      </view>
    </view>
    <view class="ft26">
      <view class="mt24 flex line1">
        <text class="color-999 lineh1-5">擅长：</text>
        <text class="color-333 flex1 lineh1-5">{{item.specialty}}</text>
      </view>
      <view class="mt24 line1">
        <text class="color-999">服务：</text>
        <text class="color-333">{{item.serviceTypeName}}</text>
      </view>
    </view>
    <view @click.stop="onContact"
          class="contact-btn center">
      <text class="ft24 color-666">联系TA</text>
    </view>
    <view class="label center">
      <text class="ft22">{{item.type}}</text>
    </view>
  </view>
</template>
<script>
import { avatarUrl } from '@/utils/tools'
export default {
  name: 'Item',
  methods: {
    onContact () {
      this.$emit('onContact')
    },
    avatarUrl,
  },
  props: {
    itemInfo: Object,
    isDetail: {
      type: Boolean,
      default: (() => {
        return false
      })
    }
  },
  data () {
    return {
      item: {},
    }
  },
  watch: {
    itemInfo: {
      handler: function (val) {
        const { isLeaveComments, isVisit, isTelephoneCommunication } = val
        const serviceType = []
        if (isLeaveComments) {
          serviceType.push('留言回复')
        }
        if (isVisit) {
          serviceType.push('实地走访')
        }
        if (isTelephoneCommunication) {
          serviceType.push('电话沟通')
        }
        this.item = {
          ...val,
          serviceType,
          serviceTypeName: serviceType.join('、'),
        }
      },
      immediate: true
    }
  },
  computed: {
    titleList () {
      const { item } = this
      if (this.$isEmpty(item.titleList)) return ''
      return item.titleList.join('、')
    },
  }
}
</script>
<style lang='scss' scoped>
.lineh1-5 {
  line-height: 1.5;
}
.line1 {
  line-height: 1;
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
.item-wrap {
  width: 100%;
  padding: 24rpx;
  padding-bottom: 40rpx;
  box-shadow: 3rpx 2rpx 12rpx 8rpx rgba(17, 17, 17, 0.03);
  border-radius: 8rpx;
  .user-img {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    background-size: cover;
    background-position: 50% 50%; /*图片上下左右居中*/
    background-repeat: no-repeat;
  }
  .list-skilled {
    width: 500rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .skilled {
    text-align: justify;
    text-align-last: left;
  }
  .contact-btn {
    right: 24rpx;
    bottom: 32rpx;
    position: absolute;
    border: 2rpx solid #dedede;
    border-radius: 26rpx;
    width: 128rpx;
    height: 52rpx;
  }
  .label {
    right: 0;
    top: 20rpx;
    position: absolute;
    padding: 0 16rpx;
    height: 40rpx;
    border-radius: 6rpx 0 0 6rpx;
    background: #ddf9d7;
    color: #51ac3d;
  }
}
</style>