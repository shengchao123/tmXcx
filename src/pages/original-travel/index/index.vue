<template>
  <div class="tabbar-home-wrap relative">
    <!-- 所有内容的容器 -->
    <Map :points="points"></Map>

    <DragPopover class="drag"
                 hasTabber>
      <div class="path-name center-align">
        <svg-icon icon="icon_luxian"></svg-icon>
        <div class="ml16">{{currentPath.name}}</div>
      </div>

      <div class="reset-btn center"
           @click="resetMap">
        <svg-icon class="ft40 color-666"
                  icon="icon_suoding"></svg-icon>
      </div>

      <mescroll-uni ref="mescrollRef"
                    :height="dragPopHeight + 'px'"
                    :up="upOption"
                    @init="mescrollInit"
                    @down="downCallback"
                    @up="upCallback">
        <template>
          <div class="box relative">
            <PathsList @onSelectPath="onSelectPath"
                       ref="pathList"></PathsList>
            <div>
              <div class="content">
                <ScenicSpot :points="points"
                            ref="refScenicSpot"></ScenicSpot>
              </div>
              <div class="center pb32 pt16 create-btn-wrap">
                <div class="create-btn center bold"
                     @click="onCreateTravel">创建我的行程</div>
              </div>
            </div>
            <agricultural-product :journeyLineId="selectJourneyLineId"></agricultural-product>
            <one-click-service @onShowContact="onShowContact"></one-click-service>
            <activity-swiper></activity-swiper>
            <evaluation-list ref="evaluationList"
                             @endBySize="endBySize"
                             @endErr="endErr"></evaluation-list>
          </div>
        </template>
      </mescroll-uni>
    </DragPopover>
    <btn-dialog :isScroll="isScroll"></btn-dialog>

    <custom-tabbar></custom-tabbar>
    <call-popup :showContact.sync="showContact"
                :itemConfig="callInfo"></call-popup>
  </div>
</template>

<script>
import Map from './components/Map'
import DragPopover from "@/components/DragPopover";
import PathsList from "./components/PathsList";
import ScenicSpot from "./components/ScenicSpot";
import BtnDialog from "./components/BtnDialog";
import ActivitySwiper from "./components/ActivitySwiper";
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import EvaluationList from './components/EvaluationList.vue';
import OneClickService from './components/OneClickService.vue';
import { beginGuide } from '@/utils/map.js'
import AgriculturalProduct from './components/AgriculturalProduct.vue';
import CallPopup from '@/pages/components/CallPopup'
export default {
  name: "index",
  methods: {
    onShowContact () {
      const { phoneList } = this.callInfo
      if (phoneList.length === 1) {
        uni.makePhoneCall({
          phoneNumber: phoneList[0]
        })
        return
      }
      this.showContact = true
    },
    // 下拉刷新
    downCallback () {
      // console.log('下拉刷新')
      this.mescroll.resetUpScroll(); // 重置列表为第一页
    },
    // 加载更多
    upCallback (page) {
      // console.log('加载更多')
      const evaluationList = this.$refs.evaluationList
      evaluationList && evaluationList.getItineraryEvaluationPage(page);
    },
    resetMap () {
      const mapEl = this.$refs.map
      mapEl && mapEl.resetMap()
    },
    resetGetList () {
      this.listData = [];
      this.mescroll.resetUpScroll();
    },
    endBySize (items, count) {
      this.mescroll.endBySize(items.length, count);
    },
    endErr () {
      this.mescroll.endErr()
    },
    dragTopChange (offsetHeight) {
      this.dragPopHeight = offsetHeight
    },
    onCreateTravel () {
      if (this.$notMember()) return this.$goLogin()
      uni.navigateTo({ url: `/pages/original-travel/stroke-order/index?journeyLineId=${this.selectJourneyLineId}` });
    },
    onSelectPath (item) {
      this.$nextTick(() => {
        this.$refs.refScenicSpot.scrollTop = 0;
      });
      this.currentPath = item
      this.selectJourneyLineId = item.journeyLineId
      this.getJourneyPointListByJourneyId(item.journeyLineId);
    },
    // 地图跳转
    onShowNavigationSelect (pointData) {
      this.pointData = pointData
      this.onSelectGuide(pointData)
    },
    // 选择地图导航回调
    onSelectGuide () {
      beginGuide(this.pointData.item)
    },
    // 根据路线 id 获取点位
    getJourneyPointListByJourneyId (journeyLineId) {
      const params = {
        journeyLineId,
      };
      this.$api.getJourneyPointListByJourneyId(params).then((res) => {
        if (res.isError) return;
        this.points = res.content;
      });
    },
  },
  provide () {
    return {
      onShowNavigationSelect: this.onShowNavigationSelect
    }
  },
  onShow () {
    this.$nextTick(() => {
      // this.$refs.pathList.scroll()
    })
  },
  data () {
    return {
      callInfo: {
        title: '杭州市临安公共交通有限公司',
        phoneList: ['0571-61081012']
      },
      showContact: false,
      isScroll: false,
      points: [],
      currentPath: {},

      upOption: {
        empty: {
          use: false, // 是否显示空布局
        },
        textNoMore: "到底了~",
        noMoreSize: 8, // 配置列表的总数量要大于等于1条才显示'-- END --'的提示
      },
      // scrollTop: 645,
      dragPopHeight: '50%',
      selectJourneyLineId: '',
      showGuide: false,
      pointData: {},
      actions: Object.freeze([{ text: '高德地图' }, { text: '腾讯地图' }]),
    };
  },
  components: {
    Map,
    DragPopover,
    PathsList,
    ScenicSpot,
    BtnDialog,
    ActivitySwiper,
    MescrollUni,
    EvaluationList,
    AgriculturalProduct,
    OneClickService,
    CallPopup
  },
  onLoad (option) {
    if (option.masterOrgId) {
      uni.setStorageSync('masterOrgId', option.masterOrgId)
      uni.setStorageSync('orgId', option.masterOrgId)
    }
    uni.$on("discoverBtn", (res) => {
      this.isScroll = !res;
    });
  },
  beforeDestroy () {
    uni.$off("discoverBtn");
  },
  mixins: [MescrollMixin],
};
</script>

<style lang="scss" scoped>
.drag {
  margin-bottom: var(--safe-bottom);
}
.tabbar-home-wrap {
  height: calc(100vh - var(--safe-bottom));
  .map {
    width: 100%;
    height: 30vh;
  }
  .path-name {
    position: absolute;
    top: -70rpx;
    right: 20rpx;
    height: 48rpx;
    border-radius: 24rpx;
    padding: 0 16rpx;
    font-size: 26rpx;
    z-index: 99;
    background: #ffffff;
    color: #e32417;
    box-shadow: 6rpx 4rpx 12rpx 3rpx rgba(17, 17, 17, 0.1);
  }
  .reset-btn {
    position: absolute;
    top: -105rpx;
    left: 15rpx;
    width: 88rpx;
    height: 88rpx;
    background: #ffffff;
    box-shadow: 0 -6rpx 17rpx 0 rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
  }
  .box {
    height: 100%;
    position: relative;
    .create-btn-wrap {
      background: #ffffff;
      .create-btn {
        width: 480rpx;
        height: 80rpx;
        border-radius: 40rpx;
        border: 1px solid #e32417;
        font-size: 32rpx;
        color: #e32417;
      }
    }
  }
  .content {
    box-sizing: border-box;
    overflow: scroll;
    white-space: nowrap;
  }
}
</style>
