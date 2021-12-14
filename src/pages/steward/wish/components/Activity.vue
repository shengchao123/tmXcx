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
      this.getListData(page)
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
    getListData (page) {
      const params = {
        status: '01',
        pageNumber: page && page.num || 1,
        pageSize: page && page.size || 10,
        type: '04'
      }
      this.$api.getJourneyActivityPage(params).then(res => {
        if (res.isError || !res.content) {
          this.mescroll.endBySize(0, 0)
          this.dataList = []
          return
        }
        const { items, count } = res.content
        this.mescroll.endBySize(items.length, count)
        if (params.pageNumber === 1) this.dataList = []
        this.dataList = this.dataList.concat(items)
      })
    }
  },
  created () {
    uni.$on('claimSuccess', (data) => {
      this.handleListStatus(data)
    })
  },
  data () {
    return {
      dataList: [],
      upOption: {
        empty: {
          use: false
        },
        textNoMore: "没有更多数据",
        noMoreSize: 10, // 配置列表的总数量要大于等于10条才显示'-- END --'的提示
      }
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
page {
  height: 100%;
}
.activity-wrap {
  .box {
    width: 100%;
    position: fixed;
    z-index: 8;
  }
}
</style>