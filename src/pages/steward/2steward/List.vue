<template>
  <div class='list-wrap'>
    <div class="top bg-white">
      <u-tabs ref="uTabs"
              :list="tabs"
              :current="currentTab"
              class="tabs"
              :is-scroll="true"
              @change="tabsChange"
              bar-width="32"
              bar-height="4"
              font-size="28"
              active-color="#E32417"
              inactive-color="#666666"></u-tabs>
    </div>

    <div class="content"
         v-if="data">
      <PeopleCardItem :item="data"></PeopleCardItem>
    </div>
    <empty v-else></empty>
  </div>
</template>

<script>
import PeopleCardItem from './components/PeopleCardItem.vue'

export default {
  name: 'list',
  methods: {
    tabsChange (index) {
      this.currentTab = index;
      this.getList()
    },
    getTabs (id) {
      const params = {
        communityOrgId: this.currentCommunityOrgId
      }
      this.$api.findJourneyCommunityAllianceListByCommunityOrgId(params).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.tabs = res.content
        const temIds = res.content.map(item => item.id)
        this.currentTab = temIds.indexOf(id)
        this.getList()
      })
    },
    getList () {
      const params = {
        id: this.tabs[this.currentTab].id
      }
      this.$api.findJourneyCommunityAllianceDetail(params).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.data = res.content
      })
    },
  },
  onLoad ({ communityOrgId, id }) {
    this.currentCommunityOrgId = communityOrgId
    this.getTabs(id)
  },
  data () {
    return {
      tabs: [],
      currentCommunityOrgId: '',
      data: {},
      currentTab: 0
    }
  },
  components: {
    PeopleCardItem
  }
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
