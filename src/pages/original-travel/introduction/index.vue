<template>
  <div class='introduction-wrap pb30'
       v-if="baseInfo">
    <head-swiper :vrLink="vrLink"
                 :imagesList="imagesList"
                 :videoList="videoList"
                 @videoStartPlayEvent="videoStartPlayEvent"></head-swiper>
    <div class="title">
      <div class="between-row">
        <span class="ft40 bold flex1 color-333">{{baseInfo.name}}</span>
        <div class="ml24 center-align"
             style="color: #F87F00; height: 52rpx"
             @click="onPeriphery">
          <svg-icon icon="icon_dingwei"
                    class="ft24"></svg-icon>
          <span class="ft24 ml8">周边</span>
        </div>
      </div>
      <div class="between-row mt24">
        <span class="ft28 color-666 flex1">{{baseInfo.address}}</span>
        <div class="ml24 center-align"
             style="color: #0084F6; height: 36rpx"
             @click="onSelectGuide">
          <svg-icon icon="icon_ditu"
                    class="ft24"></svg-icon>
          <span class="ft24 ml8">导航</span>
        </div>
      </div>
      <div v-if="openDayText"
           class="mt24 ft28">
        <span class="label color-999">开放时间：</span>
        <span class="color-666">{{openDayText}}</span>
      </div>
      <div v-if="baseInfo.contactPerson"
           class="mt24 ft28">
        <span class="label color-999">联系人：</span>
        <span class="color-666">{{baseInfo.contactPerson}}</span>
      </div>
      <div v-if="baseInfo.phone"
           class="mt24 center-align">
        <span class="label color-999">联系电话：</span>
        <div class="center-align">
          <span class="ft28 color-666">{{baseInfo.phone}}</span>
          <div class="ml8 center-align"
               style="color: #0084F6"
               @click="onCall">
            <svg-icon icon="icon_dianhua"
                      class="ft32"></svg-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="between-row pl30 pr30 pb30"
         v-if="baseInfo.type === '01'">
      <div class="center-align">
        <!-- <div class="join-user relative mr16 center-align">
          <div v-for="(item, index) in users"
               :key="index"
               class="user-img relative">
            <img :src="item" />
          </div>
        </div> -->
        <span class="ft24">{{baseInfo.accessCount}}人已访问</span>
      </div>
      <div class="center-align">
        <svg-icon icon="icon_dakaline"
                  class="ft24"></svg-icon>
        <span class="ft24">{{baseInfo.signCount}}人已打卡</span>
      </div>
    </div>
    <div class="pl30 pr30 pb24">
      <audio-module v-if="audio"
                    ref='audioModule'></audio-module>
    </div>
    <div v-if="!$isEmpty(goodsList)"
         class="pl30">
      <p class="medium ft32 mb24">优质产品</p>
      <div class="flex goods-list">
        <div v-for="(item, index) in goodsList"
             :key="index"
             class="goods mr24 mb24">
          <image mode="aspectFill"
                 class="img"
                 :src="$fileHost + item.journeyProductImages[0].url"
                 @click="onGoodsDetail(item)">
          </image>
          <div class="name ellipsis ft28">{{item.journeyProductName}}</div>
        </div>
      </div>
    </div>
    <div class="color-333 pr30 pl30">
      <p class="medium ft32 mb24">简介</p>
      <div class="ft28 content">{{baseInfo.introduction}}</div>
    </div>
  </div>
</template>
<script>
import AudioModule from './components/AudioModule.vue'
import HeadSwiper from './components/HeadSwiper.vue'
import { beginGuide } from '@/utils/map.js'
import { filterContinuousDate } from '@/utils/date.js'
export default {
  name: 'introduction',
  methods: {
    onPeriphery () {
      uni.setStorageSync('pointData', JSON.stringify(this.baseInfo))
      uni.navigateTo({ url: '/pages/original-travel/point-guide/index' })
    },
    // 选择地图导航回调
    onSelectGuide () {
      beginGuide(this.baseInfo)
    },
    onCall () {
      const { phone } = this.baseInfo
      uni.showModal({
        title: '即将拨打电话',
        content: phone,
        success: function (res) {
          if (res.confirm) {
            uni.makePhoneCall({
              phoneNumber: phone
            })
          }
        }
      })
    },
    onGoodsDetail ({ journeyProductId }) {
      uni.navigateTo({
        url: `/pages/urban-rural/optimization/Detail?id=${journeyProductId}`
      })
    },
    // 视频开始播放事件
    videoStartPlayEvent () {
      // 暂停音频播放
      this.$refs.audioModule.pause()
    },
    getJourneyPointInfoById (journeyPointId) {
      const params = {
        journeyPointId,
      }
      this.$api.getJourneyPointInfoById(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.baseInfo = res.content
        const { journeyScenicSpotAttachmentImagesList, journeyScenicSpotAttachmentVR, journeyScenicSpotAttachmentVideo, journeyScenicSpotAttachmentVoice, journeyProductList } = res.content
        this.vrLink = journeyScenicSpotAttachmentVR ? journeyScenicSpotAttachmentVR.url : ''
        this.videoList = journeyScenicSpotAttachmentVideo || []
        this.imagesList = journeyScenicSpotAttachmentImagesList || []
        this.audio = journeyScenicSpotAttachmentVoice ? this.$sourceUrl(journeyScenicSpotAttachmentVoice.url) : null
        this.goodsList = journeyProductList || []
        // 初始化音频
        this.$nextTick(() => {
          this.audio && this.$refs.audioModule.initAudio(this.audio)
        })
      })
    },
  },
  data () {
    return {
      journeyPointId: null,
      baseInfo: {}, $fileHost: this.$fileHost,
      vrLink: '',
      imagesList: [],
      videoList: [],
      audio: null,
      users: [],
      goodsList: [],
      showGuide: false,
      actions: Object.freeze([{ text: '高德地图' }, { text: '腾讯地图' }]),
    }
  },
  computed: {
    openDayText () {
      const { openDay, startTime, endTime } = this.baseInfo
      if (this.$isEmpty(openDay)) return ''
      const week = filterContinuousDate(openDay)
      if (startTime === '00:00' && endTime === '23:59') {
        return `整天(${week})，对外开放`
      }
      return `${startTime}-${endTime}(${week})，对外开放`
    }
  },
  onLoad (option) {
    const journeyPointId = option.journeyPointId
    this.journeyPointId = journeyPointId
    this.getJourneyPointInfoById(journeyPointId)
  },
  components: { HeadSwiper, AudioModule }
}
</script>
<style lang='scss' scoped>
.introduction-wrap {
  color: #333;
  .join-user {
    .user-img {
      width: 32rpx;
      height: 32rpx;
      border-radius: 16rpx;
      border: solid 1px #fff;
      overflow: hidden;
      margin-left: -8rpx;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .goods-list {
    flex-wrap: wrap;
    .goods {
      width: 214rpx;
      border-radius: 6rpx;
      background: #ffffff;
      box-shadow: 3px 2px 12px 8px rgba(17, 17, 17, 0.03);
      .name {
        width: 100%;
        padding: 0 5rpx 0 12rpx;
        height: 52rpx;
        line-height: 52rpx;
      }
      .img {
        width: 214rpx;
        height: 214rpx;
        border-radius: 6rpx;
      }
    }
  }
  .title {
    padding: 30rpx;
    .label {
      display: inline-block;
      width: 140rpx;
    }
  }
  .content {
    line-height: 42rpx;
  }
  .ellipsis {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
