<template>
  <div class='announcement-detail-wrap'
       v-if="baseInfo">
    <div v-if="!$isEmpty(baseInfo.attachmentList)"
         class="swiper"
         :style="{height: swiperHeight + 'px'}">
      <swiper :style="{height: swiperHeight + 'px'}"
              @change="swiperChange">
        <swiper-item v-for="(item, index) in baseInfo.attachmentList"
                     :key="index">
          <div class="swiper-item"
               @click.stop="onShowBigImgView(index)">
            <img :src="$fileHost + item.url" />
          </div>
        </swiper-item>
      </swiper>
      <div class="pagination ft24">{{activeIndex + 1}}/{{baseInfo.attachmentList.length}}</div>
    </div>
    <div class="pt28 pl30 pr30">
      <div class="ft36 mb20 bold">{{baseInfo.title}}</div>
      <div class="ft26 color-666">
        <span class="mr40">{{$moment(baseInfo.createTime).format('YYYY-MM-DD')}}</span>
        <span>{{baseInfo.orgName}}</span>
      </div>
    </div>
    <div class="content ft30 pl30 pr30 mt28">{{baseInfo.content}}</div>
  </div>
</template>
<script>
export default {
  methods: {
    swiperChange (e) {
      this.activeIndex = e.detail.current
    },
    onShowBigImgView (index) {
      const urls = this.baseInfo.attachmentList.map(({ url }) => this.$fileHost + url)
      uni.previewImage({
        urls: urls,
        current: index,
      })
    },
    getJourneyAnnouncementDetail (id) {
      const params = {
        id
      }
      this.$api.getJourneyAnnouncementDetail(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.baseInfo = res.content
      })
    }
  },
  data () {
    return {
      $fileHost: this.$fileHost,
      baseInfo: null,
      activeIndex: 0
    }
  },
  computed: {
    swiperHeight () {
      uni.getSystemInfo({
        success: function (res) {
          return res.windowWidth * 3 / 4
        }
      });
    }
  },
  onLoad (option) {
    this.getJourneyAnnouncementDetail(option.id)
  }
}
</script>
<style lang='scss' scoped>
.announcement-detail-wrap {
  color: #333;
  .swiper {
    position: relative;
    width: 100%;
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
      height: 36rpx;
      line-height: 36rpx;
      border-radius: 18rpx;
      padding: 0 18rpx;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
    }
  }
  .content {
    line-height: 48rpx;
  }
}
</style>