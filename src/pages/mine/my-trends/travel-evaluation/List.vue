<template>
  <view class="find-wrap pl30">
    <view class="note-list">
      <view class="empty-wrap"
            v-if="isEmpty">
        <page-empty :imgUrl="$imgHost + 'discover/icon-attention.png'"
                    message="暂无行程评价"></page-empty>
      </view>
      <Waterfall v-show="!isEmpty"
                 ref="waterfall"
                 :waterfallData="waterfallData"
                 top="20"
                 @getListData="getListData">
      </Waterfall>
    </view>
  </view>
</template>
<script>
import PageEmpty from 'pages/components/PageEmpty'
import Waterfall from './slzx_waterfall/index'
export default {
  methods: {
    onScrollTop () {
      this.$refs.waterfall.onScrollTop(0, 100)
    },
    getListData (page, callback) {
      const params = {
        pageNumber: page && page.num || 1,
        pageSize: page && page.size || 10,
      }
      this.$api.getMyItineraryEvaluationPage(params).then(res => {
        callback && callback()
        if (res.isError) return this.$refs.waterfall.mescroll.endErr()
        const { items, count } = res.content
        if (this.$isEmpty(items)) {
          this.$refs.waterfall.mescroll.endBySize(0, 0)
          this.waterfallData = []
          return
        }
        this.$refs.waterfall.mescroll.endBySize(items.length, count);
        this.waterfallData = params.pageNumber === 1 ? items : this.waterfallData.concat(items)
      })
    },
  },
  data () {
    return {
      $imgHost: this.$imgHost,
      waterfallData: [],
    }
  },
  computed: {
    isEmpty () {
      return this.waterfallData.length <= 0
    },
  },
  components: {
    Waterfall,
    PageEmpty
  },
};
</script>
<style lang='scss' scoped>
.find-wrap {
  height: 100%;
  .swiper-tab {
    height: 56rpx;
    .swiper-tab-item {
      width: 120rpx;
      height: 56rpx;
      border-radius: 33rpx;
      background: rgba($color: #a6a6a6, $alpha: 0.1);
    }
    .active {
      color: $color-f54400;
      background: rgba($color: $color-f54400, $alpha: 0.1);
    }
  }
  .note-list {
    width: 100%;
  }
}
</style>
