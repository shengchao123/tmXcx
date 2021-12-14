<template>
  <view class='awesome-and-collect-wrap'>
    <view class="dividing-line"></view>
    <scroll-view v-show="!$isEmpty(listData)"
                 :scroll-y="true"
                 class="list">
      <list-item v-for="(item, index) in listData"
                 :key="index"
                 type="01"
                 :itemData="item"></list-item>
    </scroll-view>
    <view v-show="$isEmpty(listData)"
          class="empty-page center-align column">
      <image style="width: 332rpx; height: 256rpx"
             :src="$imgHost + 'mine/no-message.png'"></image>
      <view class="mt20">
        <text class="ft28 color-999">暂无新的点赞</text>
      </view>
    </view>
  </view>
</template>
<script>
import ListItem from './ListItem.vue'
import listMixins from '../mixins/list'
export default {
  data () {
    return {
      listData: [],
      $imgHost: this.$imgHost,
    }
  },
  created () {
    this.getListData()
  },
  mixins: [listMixins('getCommunityLikeIsNewMassage')],
  components: { ListItem }
}
</script>
<style lang='scss' scoped>
.awesome-and-collect-wrap {
  color: #333;
  height: 100%;
  .dividing-line {
    width: 100%;
    height: 20rpx;
    background: #f7f7f7;
  }
  .list {
    box-sizing: border-box;
    height: 100%;
    padding: 0 30rpx;
  }
  .empty-page {
    text-align: center;
    padding-top: 200rpx;
  }
}
</style>
