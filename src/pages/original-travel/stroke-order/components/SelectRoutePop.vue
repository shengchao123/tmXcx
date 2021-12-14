<template>
  <u-popup v-model="isShow"
           border-radius="30"
           maxHeight="834"
           mode="bottom">
    <view class="popup">
      <view class="tc title">
        <text class="ft34 medium">选择行程线路</text>
        <view @click="hide">
          <svg-icon icon="icon_cha"
                    class="color-999 ft24 close">
          </svg-icon>
        </view>
      </view>
      <scroll-view class="list pl30 pr30"
                   scroll-y>
        <view v-for="(item, index) in list"
              :key="index"
              class="item between-row center-align"
              :class="item.journeyLineId === selectedId && 'selected'"
              @click="onItem(item)">
          <text class="ft28">{{item.name}}</text>
          <svg-icon v-if="item.journeyLineId === selectedId"
                    icon="icon_duihao"
                    class="ft28 mt4"></svg-icon>
        </view>
      </scroll-view>
    </view>
  </u-popup>
</template>
<script>

export default {
  methods: {
    show () {
      this.isShow = true
    },
    hide () {
      this.isShow = false
    },
    onItem (item) {
      this.$emit('update:selectedId', item.journeyLineId)
      this.$emit('onRouteItem', item)
      this.hide()
    },
    emitFirstSelectItem () {
      const selectedId = this.selectedId
      const list = this.list
      if (this.selectedId) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].journeyLineId === selectedId) {
            this.$emit('onRouteItem', list[i])
            return
          }
        }
      }
    },
    getRecommendJourneyLineList () {
      this.$api.getRecommendJourneyLineList().then(res => {
        if (res.isError) return this.$msg(res.message)
        const list = res.content
        if (this.needCustomize) {
          list.push({
            journeyLineId: null,
            playTime: '01',
            name: '自定义',
          })
        }
        this.list = list
        this.emitFirstSelectItem()
      })
    }
  },
  props: {
    selectedId: String,
    needCustomize: Boolean,
    isDetail: Boolean,
  },
  data () {
    return {
      isShow: false,
      list: []
    }
  },
  created () {
    if (!this.isDetail) {
      this.getRecommendJourneyLineList()
    }
  }
}
</script>
<style lang='scss' scoped>
.popup {
  .title {
    position: relative;
    line-height: 84rpx;
    border-bottom: solid 1px #ddd;
    .close {
      position: absolute;
      top: 32rpx;
      right: 32rpx;
      color: #c7c7c7;
    }
  }
  .list {
    max-height: 680rpx;
    overflow: scroll;
    .item {
      height: 99rpx;
      border-bottom: solid 3rpx #eaeaea;
    }
    .selected {
      color: #e32417;
    }
  }
}
</style>