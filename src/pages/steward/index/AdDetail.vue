<template>
  <div class='announcement-detail-wrap'
       v-if="baseInfo">
    <img :src="$fileHost + baseInfo.imgUrl" />
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
    }
  },
  data () {
    return {
      baseInfo: null, $fileHost: this.$fileHost,
      activeIndex: 0
    }
  },
  onLoad () {
    this.baseInfo = JSON.parse(uni.getStorageSync('detail'))
  }
}
</script>
<style lang='scss' scoped>
.announcement-detail-wrap {
  color: #333;
  img {
    width: 100vw;
    height: 370rpx;
  }
  .content {
    line-height: 48rpx;
  }
}
</style>