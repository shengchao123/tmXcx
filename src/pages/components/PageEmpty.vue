<template>
  <div class="empty center-flex">
    <div class="box">
      <img class="image"
           :src="imgUrl" />
      <p class="message mt20 ft28 tip-text"
         v-if="message">{{message}}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PageEmpty',
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    }
  },
}
</script>

<style lang='scss' scoped>
.empty {
  width: 100%;
  height: 100%;
  .box {
    padding-top: 100rpx;
    .image {
      width: 306rpx;
      height: 256rpx;
      display: block;
      margin: 0 auto;
    }
    text-align: center;
  }
}
</style>
