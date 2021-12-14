<template>
  <div class="wrap column">

    <SubTabs @change="changeSubTab"
             :tabs="subTabs"></SubTabs>

    <mescroll-uni ref="mescrollRef"
                  :top="mescrollTop"
                  :bottom="mescrollBottom"
                  @scroll="listScroll"
                  @init="mescrollInit"
                  :up="upOption"
                  @down="downCallback"
                  @up="upCallback">
      <div class="content"
           v-if="!$isEmpty(dataList)">
        <div v-for="item in dataList"
             :key="item.id">
          <ExperienceItem v-if="currentTab === 1"
                          :item="item"
                          :isScroll="isScroll"></ExperienceItem>
          <orders-item v-if="currentTab === 2"
                       :item="item"
                       @resetList="resetList"></orders-item>
        </div>
      </div>
      <empty v-else></empty>
    </mescroll-uni>
    <PublishBtn @onPublish="onPublish"
                :text="currentTab === 1 ? '申请展位' : '我要定制'"
                :isScroll="isScroll"
                right="14rpx"></PublishBtn>
  </div>
</template>
<script>
import SubTabs from '@/pages/urban-rural/components/SubTabs'
import ExperienceItem from '@/pages/urban-rural/components/ExperienceItem'
import OrdersItem from '../components/OrdersItem.vue'
import PublishBtn from '@/pages/urban-rural/components/PublishBtn'
import listMixins from '../mixins'
const apiNameMap = new Map([
  [1, 'getJourneyMerchantBoothInfoPage'],
  [2, 'getJourneyPlayCustomizationInfoPage']
])
export default {
  name: 'List',
  methods: {
    onPublish () {
      if (this.$notMember()) return this.$goLogin()
      uni.navigateTo({
        url: `/pages/urban-rural/experience/${this.currentTab === 1 ? 'AddMerchantBooth' : 'AddCustomMade'}`
      })
    },
    changeSubTab (item) {
      if (this.currentTab === item.id) return
      if (item.disabled) return this.$msg('功能开发中')
      this.currentTab = item.id
      this.search.pageNumber = 1
      this.dataList = []
      this.getDataList()
    },
    listScroll () {
      this.mescrollTop = '200rpx'
      uni.$emit('changeImgStatus')

      this.isScroll = true
      if (this.timer) {
        this.timer = null
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.isScroll = false
      }, 500)
    },
    // 获取商品列表
    getDataList () {
      const params = {
        ...this.search
      }

      this.$api[apiNameMap.get(this.currentTab)](params).then(res => {
        if (res.isError) return
        let { items, count } = res.content
        if (this.currentTab === 1) {
          items = items.map(item => {
            const _appropriateCrowdFormat = item.appropriateCrowd.map(item1 => item1.typeName)
            const _serviceContentFormat = item.serviceContent.map(item1 => item1.typeName)
            item.appropriateCrowdFormat = _appropriateCrowdFormat.join(' ')
            item.serviceContentFormat = _serviceContentFormat.join(' ')
            item.images = item.images.map(item1 => item1.url)
            return item
          })
        }
        this.mescroll.endBySize(items.length, count)
        this.dataList = params.pageNumber === 1 ? items : this.dataList.concat(items)
      })
    },
    resetList () {
      this.downCallback()
    }
  },
  mixins: [listMixins],
  components: { SubTabs, ExperienceItem, PublishBtn, OrdersItem },
  data () {
    return {
      isScroll: false,
      mescrollBottom: '0rpx',
      mescrollTop: '400rpx',
      upOption: {
        onScroll: true,
        toTop: {
          bottom: 240
        }
      },
      currentTab: 1,
      subTabs: [
        {
          id: 1,
          text: '实时推荐'
        },
        {
          id: 2,
          text: '接单大厅'
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.wrap {
  height: 100%;
  .content {
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
