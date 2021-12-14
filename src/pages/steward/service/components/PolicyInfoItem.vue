
<template>
  <view class="item-wrap bg-white pl30 pr30 pt24 pb32"
        @click="onPreview">
    <text class="ft34 medium color-333">{{item.name}}</text>
  </view>
</template>
<script>
import { openDocument } from '@/utils/tools'

export default {
  name: 'Item',
  methods: {
    // 跳转预览文件页面
    onPreview () {
      openDocument(this.item.url)
    },
  },
  props: {
    item: Object
  },
  data () {
    return {}
  },
  created () { },
}
</script>
<style lang='scss' scoped>
.item-wrap {
  width: 100%;
  box-shadow: 3rpx 2rpx 12rpx 8rpx rgba(17, 17, 17, 0.03);
  border-radius: 8rpx;
  .time {
    margin-right: 56rpx;
  }
}
</style>