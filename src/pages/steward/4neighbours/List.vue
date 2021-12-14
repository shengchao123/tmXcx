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

      <SubTabs :tabs="subTabs"
               @change="changeSubTab"></SubTabs>
    </div>

    <div class="list">
      <List1 :plotOrgId="plotOrgId"
             ref="list1"
             :currentSubTab="currentSubTab"></List1>
    </div>
  </div>
</template>

<script>
import SubTabs from '@/pages/urban-rural/components/SubTabs'
import List1 from './components/List1.vue'

export default {
  name: 'list',
  methods: {
    changeSubTab (e) {
      this.currentSubTab = e.id
      setTimeout(() => {
        this.$refs.list1.getDataList()
      }, 100);
    },
    tabsChange (index) {
      this.currentTab = index;
    },
    getTabs (communityOrgId, id) {
      const params = {
        communityOrgId
      }
      this.$api.findPlotOrganizationList(params).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.tabs = res.content.map(item => {
          return {
            id: item.orgId,
            name: item.orgName
          }
        })
        const temIds = res.content.map(item => item.orgId)
        this.currentTab = temIds.indexOf(id)
      })
    },
  },
  onLoad ({ communityOrgId, id }) {
    this.getTabs(communityOrgId, id)
  },
  computed: {
    plotOrgId () {
      if (this.$isEmpty(this.tabs)) return ''
      return this.tabs[this.currentTab].id
    }
  },
  components: { SubTabs, List1 },
  data () {
    return {
      tabs: [],
      currentSubTab: 0,
      currentTab: 0,
      subTabs: [
        {
          id: 0,
          text: '业委会'
        },
        {
          id: 1,
          text: '楼栋长'
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
