<template>
  <div class='product-item-wrap'
       @click="onGoDetail">
    <img :src="fileHost + item.image"
         :style="{width: '334rpx', height: '274rpx'}" />

    <div class="content">
      <div class="name ft28 bold">{{name}}</div>
      <div class="ft24 color-999">{{item.publishingDepartment}}</div>
    </div>
  </div>
</template>

<script>
import { subStringWithStrlen } from '@/utils/tools.js'

export default {
  name: 'ProductItem',
  methods: {
    onGoDetail () {
      uni.navigateTo({ url: '/pages/urban-rural/optimization/Detail?id=' + this.item.journeyProductId })
    }
  },
  props: {
    item: Object
  },
  data () {
    return {
      fileHost: this.$fileHost
    }
  },
  computed: {
    name () {
      return subStringWithStrlen(this.item.name, 36)
    },

  }
}
</script>

<style lang='scss' scoped>
.product-item-wrap {
  box-shadow: 3rpx 2rpx 12rpx 8rpx rgba(17, 17, 17, 0.03);
  margin-bottom: 20rpx;
  border-radius: 6rpx;
  .content {
    padding: 16rpx;
    width: 302rpx;
    .name {
      height: 80rpx;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
