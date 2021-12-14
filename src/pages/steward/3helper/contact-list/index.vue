<template>
  <view class="contact-list-wrap">
    <view class="filter-select center-align between-row pl32 pr32 color-666 ft28">
      <view @click="$refs.selectionCommunit.show()"
            class="center-align">
        <text class="street-community inline-block">{{streetCommunity}}</text>
        <svg-icon icon="icon_xiangxia"
                  class="ft18 ml16 color-999"></svg-icon>
      </view>
      <!-- <view @click="$refs.selectPop.show()"
                class="center-align">
            <text class="street-community inline-block">{{unitName}}</text>
            <svg-icon icon="icon_xiangxia"
                      class="ft18 ml16 color-999"></svg-icon>
          </view> -->
      <view class="point-rules ft24 center-align"
            @click="onToRules">
        <svg-icon icon="icon_wenhao"></svg-icon>
        <text class="ml8">积分规则</text>
      </view>
    </view>
    <view class="title-list color-666 ft26 medium center-align pl32 pr32 ">
      <view v-for="(item,index) in titleList"
            :key="index"
            class="title-item">
        {{item}}
      </view>
    </view>
    <mescroll-uni ref="mescrollRef"
                  class="mescroll-wrap"
                  :up="upOption"
                  @init="mescrollInit"
                  @down="downCallback"
                  @up="upCallback"
                  top="168rpx">
      <template>

        <empty v-if="$isEmpty(listData)"></empty>
        <view v-else
              class="content-list pl32 pr32">
          <item v-for="(item,index) in listData"
                :key="index"
                :itemInfo="{...item,index}">
          </item>
        </view>
        <select-pop ref="selectPop"
                    :selectedId.sync="selectedId"
                    :list="companyList"
                    title="选择共建单位"
                    @onRouteItem="(item)=>onRouteItem(item)"></select-pop>
        <selection-communit ref="selectionCommunit"
                            @onConfirm="onConfirmCommunit"
                            :isHaveAll="true"></selection-communit>
      </template>
    </mescroll-uni>
  </view>
</template>
<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import Item from './components/Item.vue';
import SelectPop from 'pages/components/SelectPop'
import SelectionCommunit from '../../components/SelectionCommunit.vue'
import { replaceString } from '@u/tools.js'
export default {
  name: 'ContactList',
  methods: {
    onConfirmCommunit (info) {
      this.streetInfo = info.streetInfo
      this.communityInfo = info.communityInfo
      this.communityOrgId = info.communityInfo?.id ?? null
      this.$nextTick(() => {
        this.getJourneyCoConstructionUnitTablePage()
      })
    },
    // 获取共建单位组织列表
    findUnitOrganizationList () {
      this.$api.findUnitOrganizationList().then(res => {
        if (res.isError) {
          this.$msg(res.message)
          return
        }
        this.companyList = replaceString(res.content, [{ key: 'orgId', value: 'id' }, { key: 'orgName', value: 'name' }])
      })
    },
    onRouteItem (item) {
      this.unitInfo = item
      this.$nextTick(() => {
        this.getJourneyCoConstructionUnitTablePage()
      })
    },
    onToRules () {
      uni.navigateTo({
        url: '/pages/steward/3helper/integral-rule/index'
      })
    },
    upCallback (page) {
      this.getJourneyCoConstructionUnitTablePage(page)
    },
    downCallback () {
      this.mescroll.resetUpScroll(); // 重置列表为第一页
    },
    getJourneyCoConstructionUnitTablePage (page) {
      const params = {
        pageNumber: page && page.num || 1,
        pageSize: page && page.size || 10,
        communityOrgId: this.communityOrgId,
        unitOrgId: this.unitInfo.id
      }
      this.$api.getJourneyCoConstructionUnitTablePage(params).then(res => {
        if (res.isError) return this.mescroll.endErr()
        const { items, count } = res.content
        this.mescroll.endBySize(items.length, count)
        this.listData = params.pageNumber === 1 ? items : this.listData.concat(items)
      })
    }
  },
  data () {
    return {
      streetInfo: {},
      communityInfo: {},
      selectedId: '',
      companyList: [],
      upOption: {
        empty: {
          use: false, // 是否显示空布局
        },
        textNoMore: '',
        noMoreSize: 10,
        toTop: {
          bottom: 120
        },
      },
      communityOrgId: null,
      unitInfo: {},
      listData: [],
      titleList: ['共建单位/街道社区', '接单', '抢单', '办结率', '积分']
    }
  },
  computed: {
    unitName () {
      const { unitInfo } = this
      if (this.$isEmpty(unitInfo)) return '共建单位'
      return unitInfo.name
    },
    streetCommunity () {
      const { streetInfo, communityInfo } = this
      if (this.$isEmpty(streetInfo)) return '街道社区'
      if (this.$isEmpty(communityInfo)) return streetInfo.name
      return streetInfo.name + communityInfo.name
    },
    memberPersonalInfo () {
      return this.$store.state.user.memberPersonalInfo
    },
    // 是否共建单位用户
    isUnitUser () {
      return this.memberPersonalInfo.isUnitUser
    }
  },
  created () {
    this.findUnitOrganizationList()
  },
  mixins: [MescrollMixin],
  components: {
    MescrollUni,
    Item,
    SelectPop,
    SelectionCommunit
  }
}
</script>
<style lang='scss' scoped>
.contact-list-wrap {
  .filter-select {
    width: 100%;
    height: 88rpx;
    position: fixed;
    top: 0;
    .street-community {
      max-width: 224rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .point-rules {
      color: #518cfc;
    }
  }
  .title-list {
    width: 100%;
    height: 80rpx;
    background: #f3f3f3;
    position: fixed;
    top: 88rpx;
    .title-item {
      &:first-child {
        width: 248rpx;
      }
      &:nth-child(2) {
        width: 96rpx;
        margin-left: 40rpx;
      }
      &:nth-child(3) {
        width: 96rpx;
      }
      &:nth-child(4) {
        width: 128rpx;
      }
    }
  }
}
</style>