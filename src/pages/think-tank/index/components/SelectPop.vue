<template>
  <u-popup v-model="isShow"
           border-radius="30"
           maxHeight="834"
           mode="bottom">
    <view class="popup">
      <view class="tc title">
        <text class="ft34 medium">选择补贴类型</text>
        <view @click="hide">
          <svg-icon icon="icon_cha"
                    class="color-999 ft24 close">
          </svg-icon>
        </view>
      </view>
      <scroll-view class="list pl30 pr30"
                   scroll-y>
        <!--   :class="item.id === selectedId && 'selected'" -->
        <view v-for="(item, index) in list"
              :key="index"
              class="item between-row center-align"
              @click="onItem(item)">
          <text class="ft28">{{item.name}}</text>
          <!-- <svg-icon v-if="item.id === selectedId"
                    icon="icon_duihao"
                    class="ft28 mt4"></svg-icon> -->
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
      this.$emit('update:selectedId', item.id)
      this.$emit('onRouteItem', item)
      this.hide()
    },
  },
  props: {
    selectedId: [Number, String],
  },
  data () {
    return {
      isShow: false,
      list: Object.freeze([
        {
          id: 0,
          name: '规模种粮',
        },
        {
          id: 1,
          name: '种油补贴',
        },
        {
          id: 2,
          name: '农机购置补贴',
        }
      ])
    }
  },
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