<template>
  <div class='branch-wrap'>
    <BlockItem title="好管家"
               :list="list"
               @onBlockItem="onBlockItem"
               type="2"
               bgClass="block2"></BlockItem>
    <StreetTabs type="2"
                @onThirdItem="onThirdItem"></StreetTabs>
  </div>
</template>

<script>
import BlockItem from '../components/BlockItem'
import StreetTabs from '@/pages/steward/components/StreetTabs'
export default {
  name: 'index',
  methods: {
    onBlockItem ({ id, communityOrgId }) {
      uni.navigateTo({ url: '/pages/steward/2steward/Steward?id=' + id + '&communityOrgId=' + communityOrgId })
    },
    onThirdItem ({ id }, communityOrgId) {
      this.navigateTo(id, communityOrgId)
    },
    navigateTo (id, communityOrgId) {
      uni.navigateTo({ url: '/pages/steward/2steward/List?id=' + id + '&communityOrgId=' + communityOrgId })
    },
    findJourneyGoodCommunityStewardList () {
      this.$api.findJourneyGoodCommunityStewardList().then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.list = res.content.map(item => {
          return {
            tip: item.streetOrgName,
            ...item
          }
        })
      })
    }
  },
  data () {
    return {
      list: []
    }
  },
  onLoad () {
    this.findJourneyGoodCommunityStewardList()
  },
  components: { BlockItem, StreetTabs },
}
</script>

<style lang='scss' scoped>
.branch-wrap {
}
</style>
