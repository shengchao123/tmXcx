<template>
  <div class='think-tank-wrap'>
    <div class="tab">
      <u-tabs :list="tab.list"
              :is-scroll="false"
              bar-width="32"
              bar-height="4"
              height="60"
              font-size="28"
              :offset="[20, 0]"
              :current="current"
              active-color="#E32417"
              inactive-color="#666666"
              @change="tabChange"></u-tabs>

      <div class="search-wrap mt16 "
           v-if="current === 0"
           style="padding:20rpx 30rpx;background: #fff">
        <u-search placeholder="输入发布单位或标题搜索"
                  :show-action="false"
                  @change="changeSearchKeyword"
                  search-icon-color="#999999"
                  placeholder-color="#999999"
                  v-model="search.keyword"></u-search>
      </div>

      <div class="search-wrap mt16 center-align"
           v-if="current === 1"
           style="padding:20rpx 30rpx;background: #fff">
        <u-search placeholder="请输入专家姓名搜索"
                  class="flex1"
                  :show-action="false"
                  @change="changeSearchKeyword"
                  search-icon-color="#999999"
                  placeholder-color="#999999"
                  v-model="search.keyword"></u-search>
        <div class="ml32 center-align"
             @click="onShowSearchType">
          <span class="color-666 ft28">{{search.type}}</span>
          <svg-icon icon="icon_xiangxia"
                    class="ft24 color-999 ml8"></svg-icon>
        </div>
      </div>
    </div>
    <!-- 政策、专家 -->
    <div v-if="current === 0 || current === 1">

      <empty v-if="isEmpty"
             style="margin-top:200rpx"></empty>
      <mescroll-uni v-else
                    ref="mescrollRef"
                    @init="mescrollInit"
                    @down="downCallback"
                    :up="upOption"
                    @up="upCallback"
                    bottom="50px"
                    top="200">
        <view v-if="current === 0"
              class="pb30">
          <view v-for="(item,index) in policyDataList"
                :key="index"
                class="list-item mt20 pl30 pr30 "
                @click="onToDetail(item.id)">
            <policy-info-item :itemInfo="item"></policy-info-item>
          </view>
        </view>
        <view v-else>
          <view v-for="(item,index) in expertDataList"
                :key="index"
                class="list-item mt20 pl30 pr30"
                @click="onToDetail(item.id)">
            <expert-services-item :itemInfo="item"
                                  @onContact="onContact(item)">
            </expert-services-item>
          </view>
        </view>
      </mescroll-uni>
    </div>
    <!-- 联盟纳贤 -->
    <div v-if="current === 2">
      <union-reinforce></union-reinforce>
    </div>
    <!-- 无感直补 -->
    <div v-if="current === 3">
      <subsidies></subsidies>
    </div>
    <contact-popup :showContact.sync="showContact"
                   :noTimeShow.sync="noTimeShow"
                   :selectItem="selectItem"
                   :noTimes="noTimes"
                   @onCall="onCall"
                   @onAction="onAction"
                   @onMessage="onMessage">
    </contact-popup>
    <custom-tabbar></custom-tabbar>

    <u-popup v-model="showSearchType"
             @close="closePopup"
             :closeable="true"
             mode="bottom">
      <div class="popup">
        <div class="title">类型</div>
        <div class="tags row">
          <div class="tag ft28 tc mb16"
               v-for="(item, index) in popupOptions"
               :key="index"
               @click="onPopupItem(item, index)"
               :class="[(index + 1) % 4 !== 0 && 'mr16', item === search.type ? 'active' : '' ]">
            <div>{{item}}</div>
          </div>
        </div>
      </div>
    </u-popup>
  </div>
</template>
<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import PolicyInfoItem from './components/PolicyInfoItem.vue'
import ExpertServicesItem from './components/ExpertServicesItem.vue'
import UnionReinforce from './components/UnionReinforce.vue'
import Subsidies from './components/Subsidies.vue'
import ExpertMixin from '@/mixins/expert-detail.js'
import ContactPopup from '../components/ContactPopup.vue'
import { filterWeek } from './components/filter.js'
export default {
  name: 'index',
  methods: {
    onShowSearchType () {
      this.showSearchType = true
    },
    closePopup () {
      this.showSearchType = false
    },
    onPopupItem (item) {
      this.search.type = item
      this.closePopup()
      this.getListData()
    },
    changeSearchKeyword () {
      this.search.pageNumber = 1
      this.getListData()
    },
    filterWeek,
    upCallback (page) {
      this.search.pageNumber = page.num || 1
      this.search.pageSize = page.size || 1
      this.getListData()
    },
    // 下拉刷新
    downCallback () {
      this.mescroll.resetUpScroll(); // 重置列表为第一页
    },
    findJourneyTalentsTpyeList () {
      this.$api.findJourneyTalentsTpyeList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.popupOptions = ['全部类型', ...res.content]
      })
    },
    getListData () {
      const params = {
        ...this.search
      }
      if (params.type === '全部类型') delete params.type
      const apiName = this.current === 0 ? 'getShowJourneyPolicyPage' : 'getShowJourneyTalentsPage'
      this.$api[apiName](params).then(res => {
        if (res.isError) {
          this.mescroll.endBySize(0, 0)
          this.isEmpty = true
          this.$msg(res.message)
          return
        }
        const { items, count } = res.content
        this.mescroll.endBySize(items.length, count)
        const dataList = this.current === 0 ? 'policyDataList' : 'expertDataList'
        if (params.pageNumber === 1) this[dataList] = []
        this[dataList] = this[dataList].concat(items)
        this.isEmpty = this.$isEmpty(this[dataList])
      })
    },
    onToDetail (id) {
      console.log(id)
      if (this.current === 0) {
        uni.navigateTo({ url: `/pages/think-tank/policy/Detail?id=${id}` })
      }
      if (this.current === 1) {
        uni.navigateTo({ url: `/pages/think-tank/expert/Detail?id=${id}` })
      }
      if (this.current === 3) {
        uni.navigateTo({ url: '/pages/think-tank/countryside/Detail' })
      }
    },
    tabChange (index) {
      this.current = index
      if (index === 0 || index === 1) {
        this.getListData()
      }
    },
  },
  data () {
    return {
      showSearchType: false,
      popupOptions: [],
      search: {
        pageNumber: 1,
        pageSize: 10,
        type: '全部类型'
      },
      policyDataList: [],
      expertDataList: [],
      isEmpty: false,
      upOption: {
        empty: {
          use: false
        },
        textNoMore: "没有更多数据",
        noMoreSize: 10, // 配置列表的总数量要大于等于10条才显示'-- END --'的提示
      },
      current: 0,

      tab: {
        list: [
          {
            name: '政策信息'
          },
          {
            name: '专家服务'
          },
          {
            name: '联盟纳贤'
          },
          {
            name: '无感直补'
          },
        ]
      }
    }
  },
  onLoad ({ current }) {
    this.findJourneyTalentsTpyeList()
    if (!current) return
    this.current = +current
  },
  mixins: [MescrollMixin, ExpertMixin],
  components: {
    PolicyInfoItem,
    ExpertServicesItem,
    MescrollUni,
    UnionReinforce,
    Subsidies,
    ContactPopup
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
.think-tank-wrap {
  padding-bottom: 50px;
  .tab {
    position: fixed;
    top: 0;
    width: 100%;
    height: 88rpx;
    box-sizing: border-box;
    padding-top: 16rpx;
    background: #fff;
    z-index: 1;
  }
  img {
    margin-top: -10rpx;
    width: 100vw;
  }
  .popup {
    padding: 24rpx 30rpx;
    .title {
      font-size: 34rpx;
      color: #000000;
      text-align: center;
      margin-bottom: 64rpx;
    }
    .tags {
      flex-wrap: wrap;
      width: calc(100vw - 60rpx);
    }
    .tag {
      width: 155rpx;
      height: 66rpx;
      line-height: 66rpx;
      background: #f7f7f7;
      border-radius: 33px;
      border: 1px solid transparent;
    }
    .active {
      border-color: #fa9a75;
      background: #fff1eb;
      color: #e32417;
    }
    .btn {
      margin-top: 80rpx;
      background: #e32417;
      font-size: 34rpx;
      color: #ffffff;
      border-radius: 49rpx;
      height: 98rpx;
      line-height: 98rpx;
    }
  }
}
</style>
