<template>
  <div class='point-guide-item-wrap'>
    <div class="bb center-align between-row item">
      <div class="flex1"
           @click="onPoi">
        <div>
          <span class="mr16"
                style="vertical-align: middle;"
                :class="main ? 'bold ft36' : 'ft30'">{{info.item.name}}</span>
          <div v-if="info.item.type === '03'"
               class="tag tag-03 ft22 mt8">农产品基地</div>
          <div class="tag tag-card ft22 ml16"
               v-if="info.index === 0">打卡点</div>
        </div>
        <div class="ft26 color-666"
             :class="info.item.address && 'mt16'">{{info.item.address}}</div>
      </div>

      <div class="btn center"
           @click="onGuide">
        <svg-icon icon="icon_daohang"
                  style="color:#518CFC "
                  class="ft18"></svg-icon>
        <span class="ft26 ml8 color-666">导航</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PointGuideItem',
  methods: {
    onPoi () {
      this.$emit('onPoi', this.info)
      const { journeyPointId } = this.info.item
      if (journeyPointId) {
        uni.navigateTo({
          url: `/pages/original-travel/introduction/index?journeyPointId=${journeyPointId}`
        })
      }
    },
    onGuide () {
      this.$emit('onGuide', this.info)
    }
  },
  props: {
    info: Object,
    main: [Boolean, String]
  }
}
</script>

<style lang='scss' scoped>
.point-guide-item-wrap {
  padding: 0 16px;

  .btn {
    height: 56rpx;
    width: 120rpx;
    border: 1px solid #dcdcdc;
    border-radius: 28rpx;
  }
  .item {
    padding: 28rpx 0;
    .tag {
      display: inline-block;
      height: 36rpx;
      line-height: 36rpx;
      border-radius: 20rpx;
      padding: 0 15rpx;
      vertical-align: middle;
    }
    .tag-card {
      color: #ff9708;
      border: 1px solid #ffdfb4;
      background: #fff3e2;
    }
    .tag-03 {
      color: #0ebb06;
      border: 1px solid #b6eab4;
      background: #f0fff0;
    }
  }
}
</style>
