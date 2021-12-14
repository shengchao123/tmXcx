<template>
  <div class='branch-wrap'>
    <BlockItem title="好支部"
               :list="list"
               @onBlockItem="onBlockItem"
               type="1"
               bgClass="block1"></BlockItem>
    <StreetTabs type="1"
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
      this.navigateTo(id, communityOrgId, 'good')
    },
    onThirdItem ({ id }, communityOrgId) {
      this.navigateTo(id, communityOrgId)
    },
    navigateTo (id, communityOrgId, type) {
      uni.navigateTo({ url: '/pages/steward/1branch/List?id=' + id + '&communityOrgId=' + communityOrgId + '&type=' + type })
    },

    findJourneyGoodCommunityPartyList () {
      this.$api.findJourneyGoodCommunityPartyList().then(res => {
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
    this.findJourneyGoodCommunityPartyList()
  },
  components: { BlockItem, StreetTabs },
}
</script>

<style lang='scss' scoped>
.branch-wrap {
}
</style>
