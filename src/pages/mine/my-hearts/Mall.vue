<template>
  <view class='mall-wrap'
        @click="onDevelop">
    <!-- <img :src="$aliImg('hearts/hearts-mall.png')"> -->
  </view>
</template>

<script>
export default {
  name: 'Mall',
  methods: {
    onDevelop () {
      this.$msg('功能开发中')
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang='scss' scoped>
.mall-wrap {
  img {
    width: 100vw;
  }
}
</style>
