<template>
  <view class='img-group-wrap'>
    <img v-if="showImgList.length === 1"
         class="one-img "
         :src="$sourceUrl(showImgList[0])"
         @click.stop="onShowBigImgView(0)">
    <view v-else
          class="between-row"
          style="flex-wrap: wrap;">
      <image v-for="(item, index) in showImgList"
             :key="index"
             mode="aspectFill"
             :style="imgStyle"
             :src="$sourceUrl(item)"
             @click.stop="onShowBigImgView(index)"></image>
    </view>
  </view>
</template>
<script>
export default {
  name: 'imgGroup',
  methods: {
    // onImg (imgUrl) {
    //   uni.$emit('onShowBigImgView', imgUrl)
    // },
    onShowBigImgView (index) {
      const urls = this.imgList.map(url => this.$sourceUrl(url))
      uni.previewImage({
        urls: urls, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
        current: index, // 当前显示图片的http链接，默认是第一个
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  props: {
    imgList: Array
  },
  data () {
    return {}
  },
  computed: {
    imgStyle () {
      let style = 'border-radius: 6rpx;'
      if (this.showImgList.length === 2) {
        style += 'width: 336rpx; height: 336rpx;'
      } else {
        style += 'width: 218rpx; height: 218rpx;'
      }
      return style
    },
    showImgList () {
      const cacheList = [...this.imgList]
      if (cacheList.length > 3) {
        cacheList.length = 3
      }
      return cacheList
    }
  }
}
</script>
<style lang='scss' scoped>
.img-group-wrap {
  width: 100%;
  .one-img {
    width: 100%;
    border-radius: 8rpx;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>