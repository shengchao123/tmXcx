<template>
  <div class="wrap">
    <SubTabs @change="changeSubTab"
             :tabs="subTabs"></SubTabs>
    <div class="search-wrap mt16"
         style="padding:20rpx;30rpx">
      <u-search placeholder="输入产品名称搜索"
                :show-action="false"
                @change="changeSearchKeyword"
                search-icon-color="#999999"
                placeholder-color="#999999"
                v-model="search.keyword"></u-search>
    </div>

    <mescroll-uni ref="mescrollRef"
                  :top="mescrollTop"
                  @scroll="listScroll"
                  @init="mescrollInit"
                  :up="upOption"
                  @down="downCallback"
                  @up="upCallback">
      <div class="content row"
           v-if="!$isEmpty(dataList)">
        <div v-for="item in dataList"
             :key="item.id">
          <ProductItem :item="item"></ProductItem>
        </div>
      </div>
      <empty v-else></empty>
    </mescroll-uni>

  </div>
</template>

<script>
import SubTabs from '@/pages/urban-rural/components/SubTabs'
import ProductItem from '@/pages/urban-rural/components/ProductItem'
import listMixins from '../mixins'
// import { debounce } from '@/utils/tools.js'

export default {
  name: 'List',
  methods: {
    changeSearchKeyword () {
      this.search.pageNumber = 1
      this.getDataList()
    },
    listScroll () {
      this.mescrollTop = '330rpx'
      uni.$emit('changeImgStatus')
    },
    changeSubTab (item) {
      this.search.classification = item.status
      this.search.pageNumber = 1
      this.getDataList()
    },
    // 获取商品列表
    getDataList () {
      const params = {
        ...this.search,
        pageSize: 5
      }
      this.$api.getJourneyProductInfoPage(params).then(res => {
        if (res.isError) return
        const { items, count } = res.content
        this.mescroll.endBySize(items.length, count)
        this.dataList = params.pageNumber === 1 ? items : this.dataList.concat(items)
      })
    },
    // 获取商品列表
    findProductClassification () {
      this.$api.findProductClassification().then(res => {
        if (res.isError) return
        let _temArr = res.content.map(item => {
          return {
            status: item.id,
            text: item.name
          }
        })
        _temArr.unshift({
          status: '',
          text: '综合推荐'
        })
        this.subTabs = _temArr
      })
    }
  },
  data () {
    return {
      isFixed: false,
      mescrollTop: '530rpx',
      upOption: {
        toTop: {
          bottom: 120
        }
      },
      subTabs: []
    }
  },
  created () {
    this.findProductClassification()
  },
  mixins: [listMixins],
  components: { ProductItem, SubTabs },
}
</script>

<style lang='scss' scoped>
.wrap {
  height: calc(100vh - 80rpx - var(--safe-bottom) - 200rpx);
  .search-wrap {
    background: #ffffff;
  }

  .content {
    padding: 0 30rpx;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
