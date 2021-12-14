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
  name: 'List',
  methods: {
    changeSubTab (item) {
      this.search.classification = item.status
      this.search.pageNumber = 1
      this.getDataList()
    },
    // 获取商品列表
    getDataList () {
      const params = {
        ...this.search,
        pageSize: 5,
        id: this.communityOrgId
      }
      this.$api.findJourneyCommunityPartyContactByPartyId(params).then(res => {
        if (res.isError) return
        const { items, count } = res.content
        // this.mescroll.endBySize(items.length, count)
        this.dataList = res.content || []
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
    communityOrgId: String
  },
  watch: {
    communityOrgId: {
      handler: function (n, o) {
        if (n) {
          this.getDataList()
        }
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
