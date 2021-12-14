<template>
  <div class='street-tabs-wrap ft26'>
    <div class="ft32 bold">更多</div>
    <div class="content mt32">
      <div class="bgf3 row p24 ft24 medium">
        <div class="w178">街道</div>
        <div class="w178">社区</div>
        <div class="flex1">{{headerText}}</div>
      </div>

      <div class="list row">
        <div class="bgf3 w178"
             style="width">
          <div class="item1 p24 color-666 text-hidden"
               v-for="(item, index) in tabsList"
               :class="index === firstIndex && 'active'"
               @click="onFirstItem(index)"
               :key="index">
            {{item.name}}
          </div>
        </div>

        <div class="w178 lb rb"
             style="width">
          <div class="item1 p24 color-666 text-hidden"
               v-for="(item, index) in secondList"
               @click="onSecondItem(index)"
               :class="index === secondIndex && 'active'"
               :key="index">
            {{item.name}}
          </div>
        </div>

        <div class="flex1 rb"
             style="width">
          <div class="item1 p24 color-666 center-align between-row"
               v-for="(item, index) in thirdList"
               @click="onThirdItem(item)"
               :key="index">
            <div class="text-hidden "
                 style="width:240rpx">{{item.name || item.orgName}}</div>
            <svg-icon icon="icon_xiangyoujiantou"
                      class="ft20"></svg-icon>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
const apiNames = new Map([
  ['1', 'findJourneyCommunityPartyListByCommunityOrgId'],
  ['2', 'findJourneyCommunityAllianceListByCommunityOrgId'],
  ['4', 'findPlotOrganizationList']
])
const headerTexts = new Map([
  ['1', '党支部'],
  ['2', '党建联盟'],
  ['4', '小区']
])
export default {
  name: 'StreetTabs',
  methods: {
    onFirstItem (i) {
      this.firstIndex = i
      this.onSecondItem(0)
    },
    onSecondItem (i) {
      this.secondIndex = i
      const apiName = apiNames.get(this.type)
      const params = {
        communityOrgId: this.secondList[this.secondIndex].id
      }
      this.$api[apiName](params).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.thirdList = res.content
      })
    },
    onThirdItem (item) {
      this.$emit('onThirdItem', item, this.secondList[this.secondIndex].id)
    },
    findCommunityOrganizationTree () {
      this.$api.findCommunityOrganizationTree().then(res => {
        if (res.isError) return this.$msg(res.message)
        if (!res && !res.content) return
        const content = JSON.parse(JSON.stringify(res.content))
        this.tabsList = content
        this.onSecondItem(0)
      })
    }
  },
  data () {
    return {
      tabsList: [],
      thirdList: [],
      firstIndex: 0,
      secondIndex: 0
    }
  },
  computed: {
    headerText () {
      return headerTexts.get(this.type)
    },
    secondList () {
      if (!this.tabsList[0]) return []
      return this.tabsList[this.firstIndex].child || []
    }
  },
  props: {
    type: [String, Number]
  },
  created () {
    this.findCommunityOrganizationTree()
  }
}
</script>

<style lang='scss' scoped>
.p24 {
  padding: 24rpx;
}
.w178 {
  width: 178rpx;
}
.bgf3 {
  background-color: #f3f3f3;
}
.street-tabs-wrap {
  padding: 0 30rpx 30rpx;
  .content {
    border-radius: 8rpx;
    overflow: hidden;

    .active {
      background-color: #feece5;
      color: #e32417;
    }
  }
}
</style>
