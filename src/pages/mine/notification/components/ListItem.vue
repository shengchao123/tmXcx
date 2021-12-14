<template>
  <view class='list-item-wrap between-row center-align pt28 pb28'
        @click="onNoteDetail">
    <view class="flex flex1 mr24">
      <view class="head-img mr24 mt4">
        <image style="width: 100%; height: 100%"
               :src="$avatarUrl(itemData.avatar)"></image>
      </view>
      <view>
        <view>
          <text class="ft28 mr24 medium">{{itemData.nick}}</text>
          <text v-if="type === '03'"
                class="ft26 color-999">评论了你</text>
        </view>
        <view v-if="type === '03'"
              class="ft26 column">
          <text class="mt8 mb8">{{itemData.desc}}</text>
          <text class="color-999">{{itemData.time}}</text>
        </view>
        <view v-else
              class="ft26 color-999 mt12"
              :class="type === '03' && 'color-333 column'">
          <text class="mr24">{{itemData.desc}}</text>
          <text class="color-999">{{itemData.time}}</text>
        </view>
      </view>
    </view>
    <view v-if="type === '01' || type === '03'"
          class="cover-img">
      <image mode="aspectFill"
             style="width: 100%; height: 100%"
             :src="$fileHost + itemData.firstUrl"></image>
    </view>
  </view>
</template>
<script>

export default {
  methods: {
    onNoteDetail () {
      const { communityNoteId } = this.itemData
      uni.navigateTo({
        url: `/pages/union/interact/note-detail/index?communityNoteId=${communityNoteId}`
      })
    },
  },
  data () {
    return {
      $fileHost: this.$fileHost,
    }
  },
  props: {
    type: String,
    itemData: {
      type: Object,
      default: () => ({})
    },
    itemIndex: Number
  }
}
</script>
<style lang='scss' scoped>
.list-item-wrap {
  width: 100%;
  border-bottom: solid 1px #f0eff0;
  color: #333;
  .head-img {
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    overflow: hidden;
  }
  .cover-img {
    width: 80rpx;
    height: 80rpx;
    border-radius: 8rpx;
    overflow: hidden;
  }
  .follow-btn {
    .primary-btn {
      width: 112rpx;
      height: 48rpx;
      line-height: 48rpx;
      border-radius: 24rpx;
      background: $color-f54400;
    }
    .cancel-btn {
      width: 140rpx;
      height: 48rpx;
      line-height: 48rpx;
      border-radius: 24rpx;
      border: 1px solid #d1d1d1;
    }
  }
}
</style>