<template>
  <div class='success-wrap'>
    <div class="msg tc">
      <svg-icon icon="icon_chenggongFill"
                class="icon"></svg-icon>
      <p class="color-333 ft32 mt32 medium">行程单创建成功</p>
      <p class="color-999 ft26 mt20">可通过分享同步给活动参与人员</p>
    </div>
    <div class="btns center-align column">
      <div class="detail-btn btn tc color-666"
           @click="onDetail">查看行程单</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onShare () {
      this.$refs.shareDialog.show()
    },
    getShareData () {
      this.shareData = uni.getStorageSync('strokeCreateShare')
    },
    onDetail () {
      uni.navigateTo({
        url: `/pages/original-travel/stroke-order/detail?id=${this.id}`
      })
    }
  },
  data () {
    return {
      id: null,
      shareData: {}
    }
  },
  onShow () {
    this.getShareData()
  },
  onLoad (option) {
    this.id = option.id
  },
  beforeDestroy () {
    uni.removeStorageSync('strokeCreateShare')
  },
}
</script>
<style lang='scss' scoped>
.success-wrap {
  height: 100%;
  background: #fff;
  .msg {
    margin-top: 105rpx;
    .icon {
      font-size: 88rpx;
      color: #4cbf00;
    }
  }
  .btns {
    margin-top: 180rpx;
    .btn {
      width: 330rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      border: solid 1px #d2d2d2;
    }
    .share-btn {
      color: #e32417;
      border-color: #e32417;
    }
  }
}
</style>