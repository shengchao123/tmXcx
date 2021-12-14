<template>
  <web-view :src="webUrl"></web-view>
</template>
<script>
export default {
  name: 'name',
  data () {
    return {
      webUrl: ''
    }
  },
  onLoad ({ title, webUrl }) {
    this.webUrl = webUrl
    uni.setNavigationBarTitle({
      title
    })
  },
}
</script>
<style lang='scss' scoped>
.web-view-wrap {
}
</style>