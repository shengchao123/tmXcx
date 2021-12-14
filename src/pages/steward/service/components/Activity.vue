<template>
  <div class='activity-wrap'>
    <mescroll-uni ref="mescrollRef"
                  top="80rpx"
                  @scroll="listScroll"
                  @init="mescrollInit"
                  @down="downCallback"
                  :up="upOption"
                  @up="upCallback">
      <Blocks ref="blocks"
              class="block"></Blocks>
      <div :class="isFixed && 'fixd_wrap'">
        <SubTabs :tabs="subTabs"
                 @change="changeSubTab"></SubTabs>
      </div>

      <empty v-if="$isEmpty(this.dataList)"></empty>
      <view class="pt20"
            v-else>
        <view v-for="(item,index) in dataList"
              :key="index"
              @click="onToDetail(item)">
          <ActivityItem :item="item"></ActivityItem>
        </view>
      </view>
    </mescroll-uni>
  </div>
</template>
<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import pageEmpty from 'pages/components/PageEmpty'
import SubTabs from '@/pages/urban-rural/components/SubTabs'
import ActivityItem from './ActivityItem.vue'
import Blocks from '../components/Blocks'
export default {
  name: 'Activity',
  methods: {
    changeSubTab (e) {
      this.currentSubTab = e.id
      this.getListData()
    },
    async listScroll (e) {
      const boxHeight = await this.$getOffHeight('.block', this)
      this.isFixed = e.scrollTop >= boxHeight
    },
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
        status: this.currentSubTab,
        pageNumber: page && page.num || 1,
        pageSize: page && page.size || 10,
        type: '03'
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
  data () {
    return {
      scrollTop: 0,
      dataList: Array,
      isFixed: false,
      upOption: {
        onScroll: true,
        empty: {
          use: false
        },
        textNoMore: "没有更多数据",
        noMoreSize: 10, // 配置列表的总数量要大于等于10条才显示'-- END --'的提示
      },
      subTabs: [
        {
          id: '',
          text: '全部'
        },
        {
          id: '01',
          text: '报名中'
        },
        {
          id: '02',
          text: '进行中'
        },
        {
          id: '03',
          text: '已结束'
        },
      ],
    }
  },
  components: {
    ActivityItem,
    pageEmpty,
    SubTabs,
    Blocks,
    MescrollUni
  },
  mixins: [MescrollMixin],
}
</script>
<style lang="scss" scoped>
.activity-wrap {
  .fixd_wrap {
    border-top: 24rpx solid #f7f7f7;
    position: fixed;
    top: 80rpx;
    left: 0;
    right: 0;
    z-index: 200;
  }
}
</style>