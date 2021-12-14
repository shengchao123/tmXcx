<template>
  <mescroll-uni :top="top"
                @init="mescrollInit"
                @down="downCallback"
                :up="upOption"
                @up="upCallback">
    <template>
      <view class="pl30">
        <view class="left"
              v-for="(el,i) in newWaterfallData"
              :key="i">
          <view v-for="(item,index) in el"
                :key="index"
                class="relative">
            <!-- 审核状态 (1:已发布; 2:待审核) -->
            <view v-if="item.status === 2"
                  class="wait-check white-color ft22 tc"
                  :style="{right:i === 0 && '20rpx' }">
              待审核
            </view>
            <view class="mb20"
                  :class="i === 0 && 'mr20'">
              <note-list-item :item="item"
                              entrance="myTrends">
              </note-list-item>
            </view>
          </view>
        </view>
      </view>
    </template>
  </mescroll-uni>
</template>
<script>
import NoteListItem from '@/pages/components/NoteListItem.vue'
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
export default {
  methods: {
    // 回到顶部
    onScrollTop () {
      this.mescroll.scrollTo(0, 100)
    },
    downCallback () {
      this.mescroll.resetUpScroll()
    },
    upCallback (page) {
      this.$emit('getListData', page)
    },
    initData () {
      let [...waterfallData] = this.waterfallData
      let [...newWaterfallData] = [[], []]
      waterfallData.forEach((el, i) => {
        switch (i % 2) {
          case 0: newWaterfallData[0].push(el)
            break
          case 1: newWaterfallData[1].push(el)
            break
        }
      });
      this.newWaterfallData = newWaterfallData
    }
  },
  data () {
    return {
      upOption: {
        textNoMore: "没有更多数据",
        noMoreSize: 5,
      },
      mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
      newWaterfallData: '',
      waterfallDataNumber: ''
    }
  },
  watch: {
    waterfallData: {
      handler: function (n) {
        if (n) {
          this.initData()
        }
      },
      immediate: true,
    }
  },
  props: ['waterfallData', 'columns', 'top'],
  components: {
    NoteListItem,
    MescrollUni
  },
  mixins: [MescrollMixin]
}
</script>
<style lang="scss">
.left {
  float: left;
}
.wait-check {
  position: absolute;
  right: 0rpx;
  width: 96rpx;
  height: 42rpx;
  line-height: 42rpx;
  background: #ff8800;
  border-radius: 0 6rpx 0 6rpx;
  z-index: 9;
}
</style>
