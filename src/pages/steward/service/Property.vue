<template>
  <div class='property-wrap'>
    <SubTabs :tabs="subTabs"
             @change="changeSubTab"></SubTabs>

    <empty v-if="$isEmpty(this.dataList)"></empty>

    <div v-else>
      <div class="list"
           v-if="currentSubTab === 1">
        <div v-for="(item, index) in dataList"
             :key="index">
          <PeopleCardItem :item="item"></PeopleCardItem>
        </div>
      </div>

      <div class="list"
           v-if="currentSubTab === 2">
        <div v-for="(item, index) in dataList"
             :key="index">
          <PolicyInfoItem :item="item"></PolicyInfoItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubTabs from '@/pages/urban-rural/components/SubTabs'
import PeopleCardItem from './components/PeopleCardItem'
import PolicyInfoItem from './components/PolicyInfoItem'
export default {
  name: 'Property',
  methods: {
    changeSubTab (e) {
      this.currentSubTab = e.id
      if (this.currentSubTab === 1) {
        this.getList()
      } else {
        this.findJourneyCommunityPropertyAttachmentList()
      }
    },
    getList () {
      this.$api.findJourneyCommunityPropertyInfoList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.dataList = res.content
      })
    },
    findJourneyCommunityPropertyAttachmentList () {
      this.$api.findJourneyCommunityPropertyAttachmentList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.dataList = res.content
      })
    },
  },
  created () {
    this.getList()
  },
  data () {
    return {
      dataList: [],
      currentSubTab: 1,
      subTabs: [
        {
          id: 1,
          text: '服务热线'
        },
        {
          id: 2,
          text: '经费公开'
        }
      ]
    }
  },
  components: {
    SubTabs,
    PeopleCardItem,
    PolicyInfoItem
  }
}
</script>

<style lang='scss' scoped>
page {
  background: #f7f7f7;
}
.property-wrap {
}
</style>
