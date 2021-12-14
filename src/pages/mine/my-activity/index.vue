<template>
  <view>
    <u-tabs :list="tabsOptions"
            font-size="28"
            :current="currentTab"
            :bar-style="{width: '32rpx', height:'4rpx', bottom: '10rpx'}"
            active-color="#E32417"
            inactive-color="#666666"
            @change="tabChange"></u-tabs>
    <activity ref="activity"
              :isEmpty="isEmpty"
              :dataList="dataList"
              :current.sync="currentTab"
              @getListData="getListData"></activity>
  </view>
</template>
<script>
import Activity from './Activity.vue'
export default {
  name: 'MyActivity',
  methods: {
    tabChange (index) {
      this.currentTab = index
      this.getListData()
    },
    getListData (page) {
      const params = {
        type: this.tabsOptions[this.currentTab].id,
        pageNumber: page && page.num || 1,
        pageSize: page && page.size || 10
      }
      const apiName = this.currentTab === 4 ? 'findMyJourneyCommunityWishPage' : 'getMyJourneyActivityPage'
      this.$api[apiName](params).then(res => {
        if (res.isError || !res.content) {
          this.$refs.activity.mescroll.endBySize(0, 0)
          this.dataList = []
          this.isEmpty = true
          return
        }
        const { items, count } = res.content
        this.$refs.activity.mescroll.endBySize(items.length, count)
        if (params.pageNumber === 1) this.dataList = []
        this.dataList = this.dataList.concat(items)
        this.isEmpty = this.$isEmpty(this.dataList)
      })
    },
  },
  onShow () {
    this.getListData()
  },
  data () {
    return {
      dataList: [],
      isEmpty: false,
      tabsOptions: Object.freeze([
        {
          id: '01',
          name: '联盟活动'
        }, {
          id: '02',
          name: '特色活动'
        }, {
          id: '03',
          name: '社区活动',
        }, {
          id: '04',
          name: '志愿活动'
        }, {
          id: '05',
          name: '微心愿'
        }
      ]),
      currentTab: 0
    }
  },
  components: { Activity },
}
</script>
<style>
page {
  background: #f7f7f7;
}
</style>
<style lang='scss' scoped>
</style>