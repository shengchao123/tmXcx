<template>
  <view class="carousel-wrap"
        :style="{height: firstImgHeight + 'px'}">
    <swiper class="swiper-box"
            :indicator-dots="false"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration"
            @change="changeSwiper">
      <block v-for="(item,index) in imgList"
             :key="index">
        <swiper-item>
          <view class="swiper-item center">
            <image mode="widthFix"
                   class="swiper-item-img"
                   :src="$sourceUrl(item)"
                   @click="onShowBigImg(index)">
            </image>
          </view>
        </swiper-item>
      </block>
    </swiper>
    <view v-if="imgList.length > 1"
          class="swiper-dots pl20 pr20 center-align white-color ft24">
      <text>{{currentIndex + 1}}</text>/<text>{{imgList.length}}</text>
      <!-- <view v-for="(item,index) in imgList"
            :key="index"
            :class="[index === currentIndex ? 'swiper-dots-active' : '' ,'swiper-dots-item']"></view> -->
    </view>
  </view>
</template>
<script>
export default {
  methods: {
    onShowBigImg (index) {
      const urls = this.imgList.map(item => this.$sourceUrl(item))
      uni.previewImage({
        urls: urls, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
        current: index // 当前显示图片的http链接，默认是第一个
      })
    },
    // 获取轮播图的第一张高度
    getImgInfo () {
      uni.getImageInfo({
        src: this.$sourceUrl(this.imgList[0]),
        success: ((image) => {
          const { width, height } = image
          const imgHeight = height / (width / this.$windowWidth)
          this.firstImgHeight = Math.round(imgHeight);
        })
      });
    },
    // 切换轮播
    changeSwiper (event) {
      this.currentIndex = event.detail.current
    },
  },
  props: ['imgList', 'indicatorDots'],
  watch: {
    imgList: {
      handler: function (val) {
        if (this.$isEmpty(val)) return
        this.$nextTick(() => {
          this.getImgInfo()
        })
      },
      immediate: true
    }
  },
  data () {
    return {
      firstImgHeight: 0,
      currentIndex: 0,
      carouselList: [],
      autoplay: false, // 是否自动切换
      interval: 2000, // 自动切换时间间隔
      duration: 500 // 滑动动画时长
    }
  },
};
</script>
<style lang='scss' scoped>
.carousel-wrap {
  width: 100%;
  min-height: 400rpx;
  max-height: 920rpx;
  position: relative;
  background: #000;
  .swiper-box,
  .swiper-item,
  .swiper-item-img {
    width: 100%;
    height: 100%;
  }
  .swiper-dots {
    width: 80rpx;
    position: absolute;
    bottom: 16rpx;
    right: 24rpx;
    height: 36rpx;
    border-radius: 18rpx;
    background: rgba($color: #000000, $alpha: 0.8);
    // .swiper-dots-item + .swiper-dots-item {
    //   margin-left: 24rpx;
    // }
    // .swiper-dots-item {
    //   width: 12rpx;
    //   height: 12rpx;
    //   background: #484848;
    //   border-radius: 50%;
    // }
    // .swiper-dots-active {
    //   background: #ffffff;
    // }
  }
}
</style>
