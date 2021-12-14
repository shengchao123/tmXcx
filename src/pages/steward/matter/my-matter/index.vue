<template>
  <div class="wrap">
    <u-tabs :list="tabsOptions"
            font-size="28"
            :isScroll="false"
            :current="currentTab"
            :bar-style="{width: '32rpx', height:'4rpx', bottom: '10rpx'}"
            active-color="#E32417"
            inactive-color="#666666"
            @change="tabChange"></u-tabs>
    <div style="width:100%;height:16rpx;background:#f7f7f7"></div>
    <mescroll-uni ref="mescrollRef"
                  :top="mescrollTop"
                  :bottom="mescrollBottom"
                  @init="mescrollInit"
                  :up="upOption"
                  @up="upCallback"
                  @down="downCallback">
      <div v-if="!$isEmpty(dataList)">
        <MatterItem :resourceItem="{item, index}"
                    @click="setNotesItem"
                    v-for="(item, index) in dataList"
                    :key="item.id"></MatterItem>
      </div>
      <empty v-else></empty>
    </mescroll-uni>
  </div>
</template>

<script>
import MatterItem from './MatterItem'
import listMixins from './mixins'

export default {
  name: 'List',
  methods: {
    tabChange (index) {
      this.currentTab = index
      this.getDataList()
    },
    upCallback (page) {
      this.getDataList(page)
    },
    // 下拉刷新
    downCallback () {
      this.mescroll.resetUpScroll(); // 重置列表为第一页
    },
    // 获取商品列表
    getDataList (page) {
      const params = {
        pageNumber: page && page.num || 1,
        pageSize: page && page.size || 10,
        status: this.currentTab
      }
      this.$api.findMyJourneyCommunityProblemPage(params).then(res => {
        if (res.isError) return
        let { items, count } = res.content
        this.dataList = params.pageNumber === 1 ? items : this.dataList.concat(items)
        this.mescroll.endBySize(items.length, count)
      })
    },

  },
  components: { MatterItem },
  mixins: [listMixins],
  data () {
    return {
      tabsOptions: Object.freeze([
        {
          id: '01',
          name: '待处理'
        }, {
          id: '02',
          name: '处理中'
        }, {
          id: '03',
          name: '已解决',
        }
      ]),
      currentTab: 0,
      mescrollTop: '110rpx',
      upOption: {
        toTop: {
          bottom: 240
        }
      },
      mescrollBottom: '20rpx',
    }
  }
}
</script>

<style lang='scss' scoped>
page {
  background: #f7f7f7;
}
.wrap {
  height: 100%;
}
</style>
