<template>
  <div class='empty-wrap center column'>
    <img :src="$aliImg('empty/no_data.png')">
    <div class="color-999 ft28 mt16">暂无内容</div>
  </div>
</template>

<script>
export default {
  name: 'empty',
}
</script>

<style lang='scss' scoped>
.empty-wrap {
  box-sizing: border-box;
  width: 100%;
  padding: 70px 25px;
  text-align: center;
  img {
    width: 332rpx;
    height: 256rpx;
  }
}
</style>
