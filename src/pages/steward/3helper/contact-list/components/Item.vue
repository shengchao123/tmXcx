<template>
  <view class="item-wrap pt32 pb32 ft28 flex">
    <view>
      <view class="lineh1 community-org-name">
        <text>{{itemInfo.index + 1}}.</text>
        {{unitOrgName}}
      </view>
      <view class="mt16 color-999 ft24 lineh1">
        <text>{{itemInfo.parentCommunityOrgName}} {{itemInfo.communityOrgName}}</text>
      </view>
    </view>
    <text class="text orders ">{{itemInfo.ordersNumber}}</text>
    <text class="text grab-orders">{{itemInfo.grabOrdersNumber}}</text>
    <text class="text rate">{{itemInfo.rate * 100}}%</text>
    <text class="text">{{itemInfo.point}}</text>
  </view>
</template>
<script>
export default {
  name: 'Item',
  methods: {},
  props: {
    itemInfo: Object
  },
  computed: {
    unitOrgName () {
      const { unitOrgName } = this.itemInfo
      return unitOrgName.length > 10 ? unitOrgName.substring(0, 9) + '...' : unitOrgName
    }
  }
}
</script>
<style lang='scss' scoped>
.lineh1 {
  line-height: 1;
}
.item-wrap {
  height: 132rpx;
  box-sizing: border-box;
  border-bottom: 1px solid rgba($color: #e1e1e1, $alpha: 0.5);
  .community-org-name {
    width: 248rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .text {
    display: inline-block;
    line-height: 1;
  }
  .orders {
    width: 96rpx;
    margin-left: 40rpx;
  }
  .grab-orders {
    width: 96rpx;
  }
  .rate {
    width: 128rpx;
  }
}
</style>