<template>
  <div class='activity-wrap'>
    <div class="box"
         :style="{top: top + 'rpx'}">
      <u-tabs :list="tab.list"
              :is-scroll="false"
              :height="height"
              font-size="28"
              :current="current"
              :bar-style="{width: '32rpx', height:'4rpx', bottom: '10rpx'}"
              active-color="#E32417"
              inactive-color="#666666"
              @change="tabChange"></u-tabs>
    </div>
    <view v-if="isEmpty"
          :style="{
            height: ($windowHeight - delHeight) + 'px',
            top: (top + height) + 'rpx'
          }"
          class="bg-white relative">
      <page-empty :imgUrl="$aliImg('empty/no_data.png')"
                  message="暂无内容"></page-empty>
    </view>
    <mescroll-uni v-else
                  ref="mescrollRef"
                  :top="top + height"
                  :bottom="bottom || 0"
                  @init="mescrollInit"
                  @down="downCallback"
                  :up="upOption"
                  @up="upCallback">
      <view class="pt20">
        <view v-for="(item,index) in dataList"
              :key="index"
              @click="onToDetail(item)">
          <activity-item :item="item"></activity-item>
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
    pageEmpty,
    MescrollUni,
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