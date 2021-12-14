<template>
  <div class="wrap">

    <SubTabs @change="changeSubTab"
             :tabs="subTabs"></SubTabs>

    <mescroll-uni ref="mescrollRef"
                  :top="mescrollTop"
                  @scroll="listScroll"
                  :bottom="mescrollBottom"
                  @init="mescrollInit"
                  :up="upOption"
                  @down="downCallback"
                  @up="upCallback"
                  class="mt30">
      <div v-if="!$isEmpty(dataList)">
        <div v-for="item in dataList"
             :key="item.id">
          <ActiveItem :item="item"></ActiveItem>
        </div>
      </div>
      <empty v-else></empty>
    </mescroll-uni>

  </div>
</template>

<script>
import SubTabs from '@/pages/urban-rural/components/SubTabs'
import ActiveItem from '@/pages/urban-rural/components/ActiveItem'
import listMixins from '../mixins'
export default {
  name: 'List',
  methods: {
    changeSubTab (item) {
      if (this.search.status === item.status) return
      this.search.status = item.status
      this.search.pageNumber = 1
      this.getDataList()
    },
    listScroll () {
      this.mescrollTop = '220rpx'
      uni.$emit('changeImgStatus')
    },
    // 获取商品列表
    getDataList () {
      const params = {
        ...this.search
      }
      this.$api.getJourneyActivityPage(params).then(res => {
        if (res.isError) return
        let { items, count } = res.content
        this.mescroll.endBySize(items.length, count)
        this.dataList = params.pageNumber === 1 ? items : this.dataList.concat(items)
      })
    }
  },
  mixins: [listMixins],
  components: { SubTabs, ActiveItem },
  data () {
    return {
      mescrollTop: '420rpx',
      upOption: {
        toTop: {
          bottom: 120
        }
      },
      mescrollBottom: '0rpx',
      subTabs: [
        {
          status: '',
          text: '全部'
        },
        {
          status: '01',
          text: '报名中'
        },
        {
          status: '02',
          text: '进行中'
        },
        {
          status: '03',
          text: '已结束'
        }
      ],
    }
  },
  created () {
    uni.$on('updateDataList', () => {
      this.getDataList()
    })
  }
}
</script>

<style lang='scss' scoped>
.wrap {
  height: 100%;
}
</style>
