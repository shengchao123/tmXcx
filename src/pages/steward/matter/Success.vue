<template>
  <div class='success-wrap column center-align'>
    <svg-icon icon="icon_yiwancheng"
              class="icon"></svg-icon>

    <div class="mt32 ft32 meidum">提交成功，感谢您的关注</div>

    <div class="btn ft28 medium color-666 center"
         @click="onViewMyMatter">查看【我的报事】</div>
  </div>
</template>

<script>
export default {
  name: 'Success',
  methods: {
    onViewMyMatter () {
      uni.redirectTo({ url: '/pages/steward/matter/my-matter/index' })
    }
  }
}
</script>

<style lang='scss' scoped>
.success-wrap {
  .icon {
    margin-top: 100rpx;
    font-size: 88rpx;
    color: #40b705;
  }
  .btn {
    border: 1px solid #d2d2d2;
    border-radius: 44rpx;
    height: 88rpx;
    width: 330rpx;
    margin-top: 100rpx;
  }
}
</style>
