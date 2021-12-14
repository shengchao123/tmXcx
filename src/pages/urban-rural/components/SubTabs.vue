<template>

  <scroll-view scroll-x="true"
               class="c-tabs">
    <block v-for="(item, index) in tabs"
           :key="index">
      <div class="tab-item center mr24"
           :style="{width: item.width ? item.width + 'rpx' : '160rpx'}"
           @click="onTab(index, item)"
           :class="index === current && 'active'">{{item.text}}</div>
    </block>
  </scroll-view>
</template>

<script>
export default {
  name: 'SubTabs',
  methods: {
    onTab (index, item) {
      this.$emit('change', item)
      if (item.disabled) return
      this.current = index
    },
  },
  data () {
    return {
      current: 0
    }
  },
  props: {
    tabs: Array
  }
}
</script>

<style lang='scss' scoped>
.c-tabs {
  width: 100vw;
  overflow: hidden;
  white-space: nowrap;
  height: 105rpx;
  line-height: 105rpx;
  padding: 0 16rpx;
  background: #ffffff;
  .tab-item {
    display: inline-block;
    line-height: 60rpx;
    text-align: center;
    height: 60rpx;
    width: 160rpx;
    font-size: 26rpx;
    border-radius: 28rpx;
    background: #a6a6a610;
    color: #666666;
  }
  .active {
    background: #f5440010;
    color: #e32417;
  }
}
</style>
