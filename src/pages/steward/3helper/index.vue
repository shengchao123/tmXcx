<template>
  <div class='good-helper-wrap'>
    <mescroll-uni ref="mescrollRef"
                  class="mescroll-wrap"
                  :up="upOption"
                  @init="mescrollInit"
                  @down="downCallback"
                  @up="upCallback">
      <template>
        <div class="between-row bg-white header pl32 pr32 pb32 pt28">
          <div class="link center-justify link-jointly column"
               @click="onContactList">
            <span class="ft30 white-color pl16">共建单位联系表</span>
            <span class="ft26 pt16 pl16 pb8"
                  style="color: #C8E5FF">临安区社区</span>
          </div>
          <div class="link center-justify link-hall column"
               @click="onReceptionHall">
            <span class="ft30 white-color pl16">领办大厅</span>
            <span class="ft26 pt16 pl16 pb8"
                  style="color: #FDD3C5">{{isUnitUser ? '领办项目享积分加成' : '项目供更多单位认领'}}</span>
          </div>
        </div>
        <div class="bg-white pl32 pr32 pb16">
          <template v-if="isShowSelectionCommunit">
            <div class="address pl24 pr24 center-align"
                 @click="onSelectCommunit">
              <span class="ft28 color-666">{{communityText}}</span>
              <svg-icon icon="icon_xiangxia"
                        class="ft16 ml8"></svg-icon>
            </div>
            <div class="tr pt16">
              <span class="ft22 color-999">共建单位：{{unitNameText}}</span>
            </div>
          </template>
          <template v-else>
            <div class="pl24 pr24 pt24 pb24"
                 style="border-radius: 16rpx; background: #f7f7f7;">
              <div>
                <span class="ft28 color-666 mr16">当前单位:</span>
                <span class="ft28">{{currentUnitName}}</span>
              </div>
              <div class="pt16 pb16">
                <span class="ft28 color-666 mr16">对口社区:</span>
                <span class="ft28">{{communityText}}</span>
              </div>
              <div>
                <span class="ft28 color-666 mr16">共建单位:</span>
                <span class="ft28">{{unitNameText}}</span>
              </div>
            </div>
          </template>
        </div>

        <div class="mt24">
          <status-tabs ref="statusTabs"
                       :communityOrgId="communityOrgId"
                       :isUnitUser="isUnitUser"
                       @changeCurrent="changeCurrent"></status-tabs>
          <div v-show="!$isEmpty(listData)"
               class="list">
            <project-item v-for="(item, index) in listData"
                          :project-item="item"
                          :key="index"
                          :show-border="index < listData.length - 1"
                          :isHome="true"
                          :isUnitUser="isUnitUser"
                          @onReceive="onReceive"></project-item>
          </div>
          <empty v-show="$isEmpty(listData)"></empty>
        </div>
      </template>
    </mescroll-uni>
    <selection-communit ref="selectionCommunit"
                        v-if="isShowSelectionCommunit"
                        @onConfirm="onConfirmCommunit"></selection-communit>
    <receive-pop ref="receivePop"
                 v-if="isUnitUser"
                 @receiveSuccess="receiveSuccess"></receive-pop>
  </div>
</template>
<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import StatusTabs from './components/StatusTabs.vue'
import ProjectItem from './components/ProjectItem.vue';
import SelectionCommunit from '../components/SelectionCommunit.vue';
import ReceivePop from './components/ReceivePop.vue';
export default {
  mixins: [MescrollMixin],
  components: { StatusTabs, ProjectItem, SelectionCommunit, ReceivePop, MescrollUni },
  methods: {
    onConfirmCommunit (item) {
      this.communityInfo = item.communityInfo
      this.streetInfo = item.streetInfo
      this.communityOrgId = item.communityInfo.id
    },
    onReceive (projectId) {
      if (this.$notMember()) return this.$goLogin();
      this.$refs.receivePop.show({
        projectId,
        unitIds: this.unitIds
      })
    },
    receiveSuccess () {
      this.downCallback()
    },
    changeCurrent (index, type) {
      this.projectType = type
      this.downCallback()
    },
    onSelectCommunit () {
      if (this.isUnitUser) return
      this.$refs.selectionCommunit.show()
    },
    // 共建单位联系表
    onContactList () {
      uni.navigateTo({
        url: '/pages/steward/3helper/contact-list/index'
      })
    },
    // 领办大厅
    onReceptionHall () {
      uni.navigateTo({
        url: '/pages/steward/3helper/reception-hall/index'
      })
    },
    updateTabsCount () {
      this.$nextTick(() => {
        const statusTabsEl = this.$refs.statusTabs
        if (statusTabsEl) {
          statusTabsEl.getJourneyHelperProjectCount()
        }
      })
    },
    upCallback (page) {
      this.getJourneyHelperProjectShowPage(page)
      this.mescroll.endErr()
    },
    downCallback () {
      this.mescroll.resetUpScroll(); // 重置列表为第一页
      this.updateTabsCount()
    },
    getJourneyHelperProjectShowPage (page) {
      if (!this.communityOrgId) return
      const params = {
        pageNumber: page && page.num || 1,
        pageSize: page && page.size || 10,
        type: this.projectType
      }
      if (!this.isUnitUser) {
        params.communityOrgId = this.communityOrgId
      }
      this.$api.getJourneyHelperProjectShowPage(params).then(res => {
        if (res.isError) return this.mescroll.endErr()
        const { items, count } = res.content
        this.mescroll.endBySize(items.length, count)
        this.listData = params.pageNumber === 1 ? items : this.listData.concat(items)
      })
    },
    getUnitListByCommunity () {
      const params = {
        communityOrgId: this.communityOrgId
      }
      this.$api.getUnitListByCommunity(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.unitIds = res.content || []
      })
    },
  },
  data () {
    return {
      communityInfo: {},
      streetInfo: {},
      upOption: {
        empty: {
          use: false, // 是否显示空布局
        },
        textNoMore: '',
      },
      communityOrgId: null,
      projectType: 2,
      unitIds: [],
      listData: []
    }
  },
  watch: {
    communityOrgId: {
      handler: function (val) {
        if (val && val !== '0') {
          this.getUnitListByCommunity()
        }
        if (this.isShowSelectionCommunit) {
          this.updateTabsCount()
          this.getJourneyHelperProjectShowPage()
        }
      },
      immediate: true
    },
    memberPersonalInfo: {
      handler: function (val) {
        if (val.communityOrgId && val.communityOrgId !== '0') {
          this.communityOrgId = this.memberPersonalInfo.communityOrgId
        }
      },
      immediate: true
    }
  },
  computed: {
    memberPersonalInfo () {
      return this.$store.state.user.memberPersonalInfo
    },
    // 是否共建单位用户
    isUnitUser () {
      return this.memberPersonalInfo.isUnitUser
    },
    communityText () {
      if (this.isUnitUser) {
        const { parentCommunityOrgName, communityOrgName } = this.memberPersonalInfo
        return parentCommunityOrgName || '' + ' ' + communityOrgName || ''
      }
      const { streetInfo, communityInfo } = this
      if (!communityInfo) return ''
      return streetInfo.name + ' ' + communityInfo.name
    },
    unitNameText () {
      const unitNames = this.unitIds.map(el => el.name)
      return unitNames.join(' ')
    },
    isShowSelectionCommunit () {
      const isUnitUser = this.isUnitUser
      return !isUnitUser && typeof (isUnitUser) !== 'undefined'
    },
    currentUnitName () {
      const unitIds = this.unitIds
      if (unitIds.length <= 0) return ''
      for (let i = 0; i < unitIds.length; i++) {
        if (unitIds[i].unitOrgId === this.memberPersonalInfo.unitOrgId) {
          return unitIds[i].name
        }
      }
      return '--'
    }
  }
}
</script>
<style>
page {
  height: 100%;
  background: #f7f7f7;
}
</style>
<style lang='scss' scoped>
.good-helper-wrap {
  .header {
    .link {
      width: 331rpx;
      height: 180rpx;
      border-radius: 16rpx;
      box-sizing: border-box;
      padding: 26rpx;
      box-shadow: 0 5rpx 15rpx 0 rgba(0, 0, 0, 0.1);
    }
    .link-jointly {
      background: url("https://hzslzx.oss-cn-hangzhou.aliyuncs.com/system/tianmu/images/steward/bg-jointly.png")
        no-repeat 0 0;
      background-size: 100% 100%;
    }
    .link-hall {
      background: url("https://hzslzx.oss-cn-hangzhou.aliyuncs.com/system/tianmu/images/steward/bg-hall.png")
        no-repeat 0 0;
      background-size: 100% 100%;
    }
  }
  .address {
    height: 79rpx;
    border-radius: 16rpx;
    background: #e8f0ff;
  }
}
</style>