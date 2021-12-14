<template>
  <div class="publish-btn-wrap white-color center tc"
       :class="isScroll ? 'is-scroll' : ''"
       @click="onAdd"
       :style="{right,bottom}">
    <div v-if="text"
         class="ft24 white-color center column">
      <span>{{text.slice(0, 2)}}</span>
      <span>{{text.slice(2, 4)}}</span>
    </div>
    <svg-icon v-else
              icon="icon_fabu"
              class="ft32 bold"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'PublishBtn',
  methods: {
    onAdd () {
      // 判断是否登录逻辑
      // if (this.$notMember()) return this.$goLogin();
      this.$emit('onPublish')
    }
  },
  props: {
    text: String,
    isScroll: Boolean,
    right: {
      type: String,
      default: (() => {
        return '32rpx'
      })
    },
    bottom: {
      type: [Number, String]
    },
  }
}
</script>

<style lang='scss' scoped>
.publish-btn-wrap {
  position: fixed;
  right: 32rpx;
  bottom: calc(var(--safe-bottom) + 90rpx);
  width: 98rpx;
  height: 98rpx;
  border-radius: 50%;
  box-shadow: 4rpx 6rpx 8rpx 0 rgba(14, 2, 2, 0.25);
  z-index: 100;
  background: #e32417;
  font-size: 56rpx;
  transition: all 0.5s ease-in-out;
  opacity: 1;
}
.is-scroll {
  transition: all 0.5s ease-in-out;
  right: -80rpx !important;
  opacity: 0.4 !important;
}
</style>
