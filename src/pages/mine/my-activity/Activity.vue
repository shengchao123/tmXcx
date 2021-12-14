<template>
  <div class='activity-wrap'>
    <mescroll-uni ref="mescrollRef"
                  top="80rpx"
                  @init="mescrollInit"
                  @down="downCallback"
                  :up="upOption"
                  @up="upCallback">
      <empty v-if="$isEmpty(this.dataList)"></empty>
      <view class="pt20"
            v-else>
        <view v-for="(item,index) in dataList"
              :key="index"
              @click="onToDetail(item)">

          <SpecalItem :item="item"
                      v-if="current === 1"></SpecalItem>
          <WishItem :item="item"
                    v-else-if="current === 4"></WishItem>
          <ActivityItem :item="item"
                        v-else></ActivityItem>
        </view>
      </view>
    </mescroll-uni>
  </div>
</template>
<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import pageEmpty from 'pages/components/PageEmpty'
import ActivityItem from './ActivityItem.vue'
import WishItem from './WishItem.vue'
import SpecalItem from '@/pages/mine/my-activity/SpecalItem'
export default {
  name: 'Activity',
  methods: {
    upCallback (page) {
      this.$emit('getListData', page)
    },
    // 下拉刷新
    downCallback () {
      this.mescroll.resetUpScroll(); // 重置列表为第一页
    },
    onToDetail (item) {
      if (this.current === 4) {
        uni.navigateTo({
          url: `/pages/steward/wish/wish-detail/index?item=${encodeURIComponent(JSON.stringify(item))}`
        })
        return
      }
      uni.navigateTo({
        url: `/pages/union/interact/detail/index?id=${item.id}`
      })
    },
    tabChange (index) {
      this.$emit('update:current', index)
      this.$emit('getListData')
    }
  },
  props: {
    isEmpty: Boolean,
    dataList: Array,
    current: {
      type: Number,
      default: (() => {
        return 0
      })
    },
    height: {
      type: Number,
      default: (() => {
        return 88
      })
    },
    top: {
      type: Number,
      default: (() => {
        return 0
      })
    },
    bottom: [String, Number],
    delHeight: {
      type: Number,
      default: (() => {
        return 44
      })
    }
  },
  data () {
    return {
      upOption: {
        empty: {
          use: false
        },
        textNoMore: "没有更多数据",
        noMoreSize: 10, // 配置列表的总数量要大于等于10条才显示'-- END --'的提示
      },
      tab: {
        list: [{
          name: '全部'
        }, {
          name: '报名中'
        }, {
          name: '进行中',
        }, {
          name: '已结束'
        }]
      },
    }
  },
  components: {
    ActivityItem,
    WishItem,
    pageEmpty,
    MescrollUni,
    SpecalItem
  },
  mixins: [MescrollMixin],
}
</script>
<style lang="scss" scoped>
.activity-wrap {
  .box {
    width: 100%;
    position: fixed;
    z-index: 8;
  }
}
</style>