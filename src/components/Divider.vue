<template>
  <div class='divider-wrap'
       :style="{height: height + 'rpx', backgroundColor: bgColor}">

  </div>
</template>

<script>
export default {
  name: 'Divider',

  props: {
    height: {
      type: [Number, String],
      default: 16
    },
    bgColor: {
      type: String,
      default: '#f7f7f7'
    }
  }
}
</script>

<style lang='scss' scoped>
.divider-wrap {
  width: 100%;
}
</style>
