<template>
  <div class='steward-wrap'>
    <div class="tc ft32 bold">{{detail.title}}</div>

    <div class="tc mt32 ft28 bold">人物介绍</div>
    <div class="content ft28 mt16">{{detail.introduce}}</div>

    <div class="tc mt32 ft28 bold">主要贡献</div>
    <div class="content ft28 mt16">{{detail.contribution}}</div>

    <div class="tc mt32 ft28 bold">主要评价</div>
    <div class="content ft28 mt16">
      {{detail.evaluate}}
    </div>
    <!-- TODO: 图片 -->
    <div class="mt24">
      <ImgGroup :imgList="attachments"></ImgGroup>
    </div>
  </div>
</template>

<script>
import ImgGroup from '@/pages/union/interact/components/ImgGroup'
export default {
  name: 'StewardInfo',
  props: {
    detail: Object
  },
  computed: {
    attachments () {
      if (!this.detail.attachments) return []
      return this.detail.attachments.map(item => item.url)
    }
  },
  components: {
    ImgGroup
  }
}
</script>

<style lang='scss' scoped>
.steward-wrap {
  height: calc(100vh - 194rpx);
  margin-top: 32rpx;
  overflow-y: scroll;
  padding: 40rpx 32rpx;
  background-color: #fff;
  .content {
    line-height: 48rpx;
  }
  img {
    width: 214rpx;
    height: 214rpx;
  }
}
</style>
