<template>
  <div class='detail-wrap'
       v-if="baseInfo.orgId">
    <video v-if="baseInfo.contentType === '04'"
           class="video"
           id="video"
           :src="baseInfo.videoLinkUrl"
           :enable-progress-gesture="true"
           :auto-pause-if-navigate="true"
           :page-gesture="true"
           controls></video>
    <div class="title pt28 pl30 pr30">
      <div class="ft36 mb20 bold">{{baseInfo.title}}</div>
      <div class="ft26 color-666">
        <span class="mr40">{{$moment(baseInfo.createTime).format('YYYY-MM-DD')}}</span>
        <span>{{baseInfo.orgName}}</span>
      </div>
    </div>
    <div class="content mt30 pl30 pr30 pb30">
      <div v-if="baseInfo.contentType === '03' || baseInfo.contentType === '04'"
           class="ft30 mb20">{{baseInfo.digest}}</div>
      <div v-if="baseInfo.contentType === '01'"
           class="type-01"
           v-html="baseInfo.content"></div>
      <div v-if="baseInfo.contentType === '03'"
           class="type-03">
        <div class="img-list between-row">
          <div v-for="(item, index) in baseInfo.photoWallList"
               :key="index"
               class="mb20"
               @click.stop="onShowBigImgView(index)">
            <image mode="aspectFill"
                   class="img-item"
                   :src="$fileHost + item.imageUrl"></image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'name',
  methods: {
    onShowBigImgView (index) {
      const urls = this.baseInfo.photoWallList.map(el => this.$fileHost + el.imageUrl)
      uni.previewImage({
        urls: urls,
        current: index,
      })
    },
    getGraphicInfoById () {
      const params = {
        id: this.id
      }
      this.$api.getGraphicInfoById(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.baseInfo = res.content
      })
    }
  },
  data () {
    return {
      baseInfo: {}, $fileHost: this.$fileHost,
    }
  },
  onLoad (option) {
    this.id = option.id
    this.getGraphicInfoById()
  }
}
</script>
<style>
page {
  height: 100%;
  background: #fff;
}
</style>
<style lang='scss' scoped>
.detail-wrap {
  color: #333;
  .video {
    width: 100%;
    height: 560rpx;
  }
  .type-01 {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .type-03 {
    .img-list {
      flex-wrap: wrap;
      .img-item {
        width: 336rpx;
        height: 336rpx;
        border-radius: 8rpx;
      }
    }
  }
}
</style>