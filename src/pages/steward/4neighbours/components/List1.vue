<template>
  <div class="list1-wrap">
    <div class="content"
         v-if="!$isEmpty(dataList)">
      <div v-for="(item, index) in dataList"
           :key="index">
        <PeopleCardItem :item="item"></PeopleCardItem>
      </div>
    </div>
    <empty v-else></empty>
  </div>
</template>

<script>
import listMixins from './mixins'
// import { debounce } from '@/utils/tools.js'
import PeopleCardItem from './PeopleCardItem'

export default {
  name: 'List1',
  methods: {
    changeSubTab (item) {
      this.search.classification = item.status
      this.search.pageNumber = 1
      this.getDataList()
    },
    // 获取商品列表
    getDataList () {
      const params = {
        plotOrgId: this.plotOrgId
      }
      const apiName = this.currentSubTab === 0 ? 'findJourneyCommunityOwnerByPlotOrgId' : 'findJourneyCommunityBuildingByPlotOrgId'
      this.$api[apiName](params).then(res => {
        if (res.isError) return
        this.dataList = res.content || []
        console.log(this.dataList)
      })
    }
  },
  data () {
    return {
      mescrollTop: '50rpx',
      upOption: {
        toTop: {
          bottom: 120
        }
      }
    }
  },
  props: {
    plotOrgId: String,
    currentSubTab: Number
  },
  watch: {
    plotOrgId: {
      handler: function (n, o) {
        this.getDataList()
      },
      immediate: true
    }
  },
  mixins: [listMixins],
  components: { PeopleCardItem },
}
</script>

<style lang='scss' scoped>
page {
  background-color: #f6f6f6;
}

.content {
  padding: 0 30rpx;
}
</style>
