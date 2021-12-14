<template>
  <view>
    <view :class="['publish white-color bold center tc', isScroll ? 'is-scroll' : '']"
          @click="onPublish"
          v-if="!show">
      <svg-icon icon="icon_fabu"
                class="ft32"></svg-icon>
    </view>
    <view>
      <u-mask :show="show">
        <view class="btn-list">
          <view class="evaluates tc comment-position">
            <view class="evaluate-btn comment-style"
                  @click="onEvaluate">
              <svg-icon icon="icon_fabupinglun"
                        class="ft32 evaluate-icon"></svg-icon>
            </view>
            <view style="white-space: nowrap;"
                  class="white-color ft22 mt12">发布评价</view>
          </view>
          <view class="evaluates tc evaluate-position">
            <view class="evaluate-btn evaluate-style"
                  @click="onTrip">
              <svg-icon icon="icon_chuangjianhangcheng"
                        class="ft36 evaluate-icon"></svg-icon>
            </view>
            <view style="white-space: nowrap;"
                  class="white-color ft22 mt12">创建行程</view>
          </view>
          <view class="evaluate-btn white-color tc close-style"
                @click="hiddenIcon">
            <svg-icon icon="icon_fabuguanbi"
                      class="ft28"></svg-icon>
          </view>
        </view>
      </u-mask>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    isScroll: Boolean
  },
  data () {
    return {
      show: false,
    };
  },
  methods: {
    // 发布按钮
    onPublish () {
      if (this.$notMember()) return this.$goLogin();
      this.show = true;
      // this.isScroll = true;
    },
    // 关闭发布背景
    hiddenIcon () {
      this.show = false;
      // this.isScroll = false;
    },
    // 跳转评价
    onEvaluate () {
      if (this.$notMember()) return this.$goLogin();
      uni.navigateTo({ url: "/pages/original-travel/evaluation/index" });
    },
    // 跳转行程
    onTrip () {
      if (this.$notMember()) return this.$goLogin();
      uni.navigateTo({ url: "/pages/original-travel/stroke-order/index" });
    },
  },
  // onLoad () {
  //   uni.$on("discoverBtn", (res) => {
  //     console.log(res);
  //     this.isScroll = !res;
  //     console.log(this.isScroll);
  //   });
  // },
  // beforeDestroy () {
  //   uni.$off("discoverBtn");
  // },
};
</script>
<style lang="scss" scoped>
.publish {
  position: absolute;
  right: 0rpx;
  width: 105rpx;
  height: 105rpx;
  border-radius: 50%;
  background: rgba($color: #ffffff, $alpha: 0.9);
  box-shadow: 4rpx 6rpx 8rpx 0 rgba(14, 2, 2, 0.25);
  z-index: 100;
  background: #e32417;
  // background-image: linear-gradient(98deg, #f54400 0%, #ff6630 72%);
  bottom: calc(var(--safe-bottom) + 50rpx);
  font-size: 56rpx;
  right: 14rpx;
  transition: all 0.5s ease-in-out;
  opacity: 1;
}
.is-scroll {
  transition: all 0.5s ease-in-out;
  right: -80rpx !important;
  opacity: 0.4 !important;
}
.btn-list {
  position: fixed;
  right: 8rpx;
  bottom: -16rpx;
}
.evaluates {
  position: absolute;
  right: 72rpx;
  bottom: 137rpx;
}
.evaluate-btn {
  width: 105rpx;
  height: 105rpx;
  line-height: 105rpx;
  text-align: center;
  color: #ffffff;
  border-radius: 50%;
}
.comment-style {
  background-image: linear-gradient(98deg, #0083f5 0%, #3093ff 72%);
}
.comment-position {
  position: absolute;
  right: 72rpx;
  bottom: 290rpx;
}
.evaluate-position {
  position: absolute;
  right: 170rpx;
  bottom: 124rpx;
}
.evaluate-style {
  background-image: linear-gradient(98deg, #f54400 0%, #ff6630 72%);
}
.close-style {
  background: rgba($color: #333333, $alpha: 0.93);
  position: absolute;
  right: 8rpx;
  bottom: 165rpx;
  z-index: 0;
}
</style>
