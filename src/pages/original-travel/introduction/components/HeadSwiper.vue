<template>
  <div class='swiper-wrap relative'
       :style="{height: swiperHeight + 'px'}">
    <div class="module-switch center-align">
      <div v-for="(item, index) in moduleList"
           :key="index"
           class="slider tc relative"
           :class="item.id === moduleType && 'slider-active'"
           @click="onModuleSwitch(item.id)">{{item.name}}</div>
      <div class="slider-bg"
           :class="moduleType === '02' && 'slider-bg-right'"></div>
    </div>

    <div class="swiper"
         v-show="moduleType === '01'">
      <swiper :style="{height: swiperHeight + 'px'}"
              @change="swiperChange">
        <swiper-item v-for="(item, index) in swiperList"
                     :key="index">
          <div class="swiper-item">
            <img v-if="item.sourceType === '01'"
                 :src="$fileHost + item.url" />
            <video-module ref="videoModule"
                          v-if="item.sourceType === '05'"
                          :videoSrc="item.url"
                          @videoStartPlayEvent="videoStartPlayEvent"></video-module>
          </div>
        </swiper-item>
      </swiper>
      <div class="pagination-1 ft24">{{activeIndex + 1}}/{{swiperList.length}}</div>
      <!-- <div class="pagination center-align">
        <div v-for="(item, index) in imagesList"
             :key="index"
             class="bullet ml24"
             :class="paginationClass(index)"></div>
      </div> -->
    </div>
    <!-- VR -->
    <div v-show="moduleType === '02'"
         class="vr relative"
         @click="onVR">
      <img v-if="imagesList[0]"
           :src="$fileHost + imagesList[0].url" />
      <div class="center vr-icon">
        <svg-icon icon="icon_VR"
                  class="ft48"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
import VideoModule from './VideoModule.vue'
export default {
  methods: {
    swiperChange (e) {
      this.activeIndex = e.detail.current
      const videoModule = this.$refs.videoModule
      videoModule && videoModule[0].pause()
    },
    // 切换模块
    onModuleSwitch (id) {
      this.moduleType = id
    },
    // 去看VR
    onVR () {
      uni.navigateTo({
        url: `/pages/webView?title=地标简介&&webUrl=${this.vrLink}`
      })
    },
    videoStartPlayEvent () {
      this.$emit('videoStartPlayEvent')
    }
  },
  props: {
    vrLink: String,
    imagesList: Array,
    videoList: Array
  },
  data () {
    return {
      swiperHeight: 0,
      activeIndex: 0, $fileHost: this.$fileHost,
      moduleType: '01',
      $fileHost: this.$fileHost,
      moduleList: [{ id: '01', name: '图片' }, { id: '02', name: 'VR' }],
    }
  },
  computed: {
    swiperList () {
      return this.videoList.concat(this.imagesList)
    },
    paginationClass () {
      return (index) => {
        let className = ''
        if (index === this.activeIndex) {
          className += 'bullet-active'
        }
        if (index === 0) {
          className += ' ml0'
        }
        return className
      }
    }
  },
  mounted () {
    const that = this
    uni.getSystemInfo({
      success: function (res) {
        that.swiperHeight = res.windowWidth * 3 / 4
      }
    });
  },
  components: { VideoModule },
}
</script>
<style lang='scss' scoped>
.swiper-wrap {
  width: 100%;
  .swiper {
    .swiper-item {
      width: 100%;
      height: 100%;
      background: #000;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pagination {
      position: absolute;
      right: 24rpx;
      bottom: 20rpx;
      background: rgba(0, 0, 0, 0.3);
      height: 36rpx;
      border-radius: 18rpx;
      z-index: 1;
      padding: 0 20rpx;
      .bullet {
        width: 12rpx;
        height: 12rpx;
        border-radius: 12rpx;
        background: #b2b2b2;
      }
      .bullet-active {
        background: #fff;
      }
    }
    .pagination-1 {
      position: absolute;
      right: 24rpx;
      bottom: 20rpx;
      height: 36rpx;
      line-height: 36rpx;
      border-radius: 18rpx;
      padding: 0 18rpx;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
    }
  }
  .vr {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
    .vr-icon {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 112rpx;
      height: 112rpx;
      border-radius: 56rpx;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
    }
  }
  .module-switch {
    position: absolute;
    z-index: 2;
    left: 24rpx;
    bottom: 16rpx;
    width: 168rpx;
    height: 44rpx;
    border-radius: 22rpx;
    background: rgba(255, 255, 255, 0.5);
    padding: 4rpx 0 4rpx 4rpx;
    box-sizing: border-box;
    .slider {
      width: 80rpx;
      height: 36rpx;
      line-height: 36rpx;
      margin-right: 4rpx;
      font-size: 20rpx;
      color: #333;
      z-index: 1;
      transition: all 0.4s;
    }
    .slider-active {
      color: #fff;
    }
    .slider-bg {
      position: absolute;
      top: 4rpx;
      left: 4rpx;
      width: 80rpx;
      height: 36rpx;
      border-radius: 18rpx;
      background: #e32417;
      transition: all 0.4s;
    }
    .slider-bg-right {
      left: 84rpx;
    }
  }
  .ml0 {
    margin-left: 0;
  }
}
</style>
