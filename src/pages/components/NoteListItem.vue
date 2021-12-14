<template>
  <view class="column note-item bg-white">
    <view @click="onToDetail(noteItem)">
      <image class="cover-img"
             mode="widthFix"
             :src=" $fileHost + noteItem.attachment">
      </image>
      <view class="title pt14 flex pl16 pr32">
        <text class="color-333 ft28 bold flex1">
          {{noteItem.title}}
        </text>
      </view>
      <view class="user-info center-align between-row">
        <view class="center-align">
          <img class="avatar"
               :src="$avatarUrl(noteItem.avatar)"
               alt="">
          <text class="tip-text ft26 ml8">{{noteItem.nick}}</text>
        </view>
        <view class="tip-text ft20">
          <view class="center-align relative"
                @click.stop="changeLike(noteItem)">
            <svg-icon :icon="noteItem.isLike ? 'icon_shoucang' : 'icon_weishoucang'"
                      v-if="noteItem.status === 2"
                      class="ft32 color-d2d2d2"></svg-icon>
            <svg-icon :icon="noteItem.isLike ? 'icon_shoucang' : 'icon_weishoucang'"
                      v-else
                      class="ft32"
                      :class="noteItem.isLike ? 'primary-color' : 'color-999'"></svg-icon>
            <text :class="['ml8 ft26',noteItem.isLike ? 'primary-color' : '' ]">{{noteItem.likeQuantity}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  methods: {
    // 点赞/取消点赞笔记
    changeLikeStatus (communityNoteId, apiName, msg) {
      const params = {
        communityNoteId
      }
      this.$api[apiName](params).then(res => {
        if (res.isError) {
          this.$msg(res.message)
          return
        }
        this.$msg(msg)
      })
    },
    // 点赞/取消点赞
    changeLike (item) {
      // 判断是否登录逻辑
      if (this.$notMember()) return this.$goLogin();
      if (this.entrance === 'myTrends' && item.status === 2) return
      let apiName = item.isLike ? 'cancelCommunityLikeNote' : 'communityLikeNote'
      let msg = item.isLike ? '取消点赞成功' : '点赞成功'
      this.noteItem.likeQuantity = item.isLike ? this.noteItem.likeQuantity - 1 : this.noteItem.likeQuantity + 1
      this.noteItem.isLike = !item.isLike
      this.changeLikeStatus(item.communityNoteId, apiName, msg)
    },
    // 跳转到详情（笔记详情/话题详情）
    onToDetail ({ communityNoteId }) {
      uni.navigateTo({
        url: `/pages/original-travel/evaluate-detail/index?communityNoteId=${communityNoteId}&entrance=${this.entrance}`
        // url: `/pages/union/interact/note-detail/index?communityNoteId=${communityNoteId}`
      })
    },
  },
  props: {
    entrance: String,
    item: Object,
  },
  watch: {
    item: {
      handler: function (val) {
        this.noteItem = val
      },
      immediate: true
    }
  },
  data () {
    return {
      $fileHost: this.$fileHost,
      noteItem: {},
    }
  }
};
</script>
<style lang='scss' scoped>
.color-d2d2d2 {
  color: #d2d2d2;
}
.note-item {
  width: 335rpx;
  box-shadow: 3rpx 2rpx 12rpx 8rpx rgba(17, 17, 17, 0.03);
  border-radius: 6rpx;
  position: relative;
  .violation-masker {
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.5);
    border-radius: 6rpx 6rpx 0 0;
    position: absolute;
    top: 0;
    .btns {
      margin-top: 60rpx;
      view {
        width: 112rpx;
        height: 48rpx;
        line-height: 48rpx;
        text-align: center;
        border: 1px solid #ffffff;
        border-radius: 24rpx;
        &:first-child {
          background: transparent;
          color: #fff;
        }
        &:last-child {
          background: #fff;
          color: #333;
        }
      }
    }
  }
  .title {
    align-items: flex-start;
    .icon {
      width: 24rpx;
      height: 24rpx;
      background: #518cfc;
      border-radius: 50%;
      text-align: center;
      line-height: 24rpx;
    }
  }
  .cover-img {
    width: 100%;
    border-top-left-radius: 6rpx;
    border-top-right-radius: 6rpx;
  }
  .user-info {
    padding: 16rpx;
    .avatar,
    .attend-avatar {
      width: 32rpx;
      height: 32rpx;
      border-radius: 50%;
    }
    .attend-avatar {
      width: 36rpx;
      height: 36rpx;
    }
    .attend-avatar + .attend-avatar {
      margin-left: -6rpx;
      border: 2rpx solid #fff;
    }
  }
}
.modal-box {
  width: 540rpx;
  background: #ffffff;
  box-sizing: border-box;
  .title {
    text-align: center;
    color: #333333;
    font-size: 32rpx;
    font-weight: bold;
    padding-top: 40rpx;
  }
  .content {
    text-align: center;
    color: #999999;
    font-size: 26rpx;
    padding: 16rpx 62rpx 40rpx;
  }
  .btns {
    width: 100%;
    height: 86rpx;
    border-top: 2rpx solid #eaeaea;
    .confirm {
      height: 100%;
      text-align: center;
      color: #333333;
      border-right: 2rpx solid #eaeaea;
    }
    .cancel {
      height: 100%;
      text-align: center;
      color: #f44000;
    }
  }
}
</style>
