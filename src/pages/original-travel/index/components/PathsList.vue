<template>
  <div class='paths-list-wrap'>
    <div class="title ft17 bold">路线推荐</div>
    <scroll-view class="path-container mt32"
                 scroll-x='true'
                 :scroll-into-view="scrollIntoView"
                 scroll-with-animation
                 :scroll-left='scrollLeft'>
      <view v-for="(item, index) in paths"
            :id="'item' + index"
            @click="onSelectPath(item, index)"
            class="path-item mr32"
            :class="[currentIndex === index ? 'item-active' : 'item-normal']"
            :key="index">
        <div class="bold ft32 tc mt16 text-hidden pl8">{{item.name}}</div>
        <div class="ft22 mt8 tc">{{item.regionsName}}</div>
        <!-- <div class="ft22 mt8 tc">{{item.scenicSpotQuantity}}个红色地标 {{item.playTimeName}}</div> -->
      </view>
    </scroll-view>

  </div>
</template>

<script>
export default {
  name: 'PathsList',
  methods: {
    scroll () {
      if (this.currentIndex === 0) return
      this.scrollIntoView = 'item' + this.currentIndex
    },
    onSelectPath (item, index) {
      this.currentIndex = index
      this.scrollIntoView = 'item' + index
      this.$emit('onSelectPath', item)
    },
    // 根据 orgId 获取路线
    getRecommendJourneyLineList () {
      this.$api.getRecommendJourneyLineList().then(res => {
        if (res.isError) return
        this.paths = res.content
        if (res.content && res.content.length > 0 && !this.journeyLineId) {
          this.$emit('onSelectPath', res.content[0])
          return
        }
        this.handleJourneyLine()
      })
    },
    handleJourneyLine () {

      if (!this.journeyLineId) return
      for (const i in this.paths) {
        const _item = this.paths[i]
        if (_item.journeyLineId === this.journeyLineId) {
          this.currentIndex = i
          this.$emit('onSelectPath', _item)
          this.$nextTick(() => {
            this.scroll()
          })
          break
        }
      }
    }
  },
  created () {
    this.getRecommendJourneyLineList()
  },
  onLoad (options) {
    this.journeyLineId = options.journeyLineId
  },
  data () {
    return {
      scrollIntoView: '',
      journeyLineId: "",
      currentIndex: 0,
      paths: []
    }
  }
}
</script>

<style lang='scss' scoped>
.paths-list-wrap {
  padding: 0rpx 32rpx 0 32rpx;
  overflow-x: hidden;
  .path-container {
    white-space: nowrap;
  }
  .path-container::-webkit-scrollbar {
    display: none;
  }

  .item-active {
    background-image: linear-gradient(90deg, #ffdb5d 21%, #ffca00 96%);
    color: #333333;
  }
  .item-normal {
    background: #eeeeee;
    color: #666666;
  }
  .ellipsis {
    width: 100%;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .path-item {
    border-radius: 8rpx;
    height: 124rpx;
    width: 272rpx;
    display: inline-block;
  }
}
</style>
