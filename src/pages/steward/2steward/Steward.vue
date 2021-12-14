<template>
  <div class='list-wrap'>
    <div class="top bg-white">
      <u-tabs ref="uTabs"
              :list="tabs"
              :current="currentTab"
              class="tabs"
              @change="tabsChange"
              :is-scroll="true"
              bar-width="32"
              bar-height="4"
              font-size="28"
              active-color="#E32417"
              inactive-color="#666666"></u-tabs>
    </div>
    <StewardInfo :detail="detail"
                 class="mt32"></StewardInfo>
  </div>
</template>

<script>

import StewardInfo from './components/StewardInfo'
export default {
  name: 'list',
  methods: {
    tabsChange (index) {
      this.currentTab = index;
      this.findJourneyCommunityStewardDetail()
    },
    findJourneyCommunityStewardDetail () {
      const params = {
        id: this.tabs[this.currentTab].id
      }
      this.$api.findJourneyCommunityStewardDetail(params).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.detail = res.content
      })
    },

    getTabs (communityOrgId, id) {
      const params = {
        communityOrgId
      }
      this.$api.findJourneyGoodCommunityStewardList(params).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.tabs = res.content
        const temIds = res.content.map(item => item.id)
        this.currentTab = temIds.indexOf(id)
        this.findJourneyCommunityStewardDetail()
      })
    },
  },
  onLoad ({ communityOrgId, id }) {
    this.getTabs(communityOrgId, id)
  },
  components: { StewardInfo },
  data () {
    return {
      tabs: [],
      detail: {},
      currentTab: 0
    }
  }
}
</script>

<style lang='scss' scoped>
page {
  background-color: #f6f6f6;
}
</style>
