
<template>
  <view class="item-wrap bg-white pl30 pr30 pt24 pb32">
    <text class="ft34 medium color-333">{{itemInfo.title}}</text>
    <view class="color-999 ft24 pt24">
      <text class="time">{{$moment(itemInfo.createTime).format('YYYY-MM-DD')}}</text>
      <text>{{itemInfo.publishingDepartment}}</text>
    </view>
  </view>
</template>
<script>
export default {
  name: 'Item',
  methods: {},
  props: {
    itemInfo: Object
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