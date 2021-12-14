<template>
  <div class='party-wrap'
       @scroll="scroll">
    <div class="map relative">
      <Map ref="map"
           :points="partyList"
           :currentIndex="selectPoint"></Map>
      <div class="reset-btn center"
           @click="resetMap">
        <svg-icon class="ft40 color-666"
                  icon="icon_suoding"></svg-icon>
      </div>

    </div>
    {{selectPoint}}
    <div class="pt24 pl30 pr30 bg-white pb20">
      <div class="title center-align between-row">
        <div class="center-align">
          <div class="ft34 bold">{{baseInfo.name}}</div>
          <div class="tip ft20 ml16">{{baseInfo.regionsName}}</div>
        </div>
        <div class="center-align change"
             @click="onchange">
          <span class="ft24">切换</span>
          <svg-icon icon="icon_xiangyoujiantou"
                    class="ft20 ml8 medium"></svg-icon>
        </div>
      </div>
      <div class="ft30 mt8"
           style="line-height: 42rpx">{{baseInfo.introduction}}</div>
    </div>
    <div class="mb20 bg-white pb32">
      <org-tree :orgTree="orgTree"></org-tree>
      <div class="center">
        <div class="graphic-btn tc"
             @click="onGraphic">风采展示</div>
      </div>
    </div>
    <div class="bg-white pl30 pr30 mb20 pt24 pb30"
         @click="onJourney">
      <div class="center-align">
        <svg-icon icon="icon_shifandai"
                  class="ft32"
                  style="color: #BF2B19"></svg-icon>
        <span class="ft32 medium ml8">示范带</span>
      </div>
      <div class="between-row center-align pt28 pb24 pl40">
        <span class="ft30 medium">{{baseInfo.journeyLineName}}</span>
        <svg-icon icon="icon_xiangyoujiantou"
                  class="ft20 color-999"></svg-icon>
      </div>
      <div class="flex"
           style="color: #518CFC">
        <svg-icon icon="icon_didian"
                  class="ft24 mr14"></svg-icon>
        <div class="flex1 ft26">{{pointsName}}</div>
      </div>
    </div>
    <div class="bg-white pl30 pr30 mb20 pt24 pb30 pb38">
      <div class="center-align mb20">
        <svg-icon icon="icon_zhongdiangongzuo"
                  class="ft32"
                  style="color: #BF2B19"></svg-icon>
        <span class="ft32 medium ml8">年度重点工作</span>
      </div>
      <div class="work-list">
        <div v-for="(item, index) in baseInfo.keyWorkDTOList"
             :key="index"
             class="work-item flex"
             :class="index !== baseInfo.keyWorkDTOList.length -1 && 'work-item-line'">
          <div class="icon-box flex mr14 mt12">
            <svg-icon :icon="workStatusInfo(item).icon"
                      class="ft24"
                      :class="workStatusInfo(item).className"></svg-icon>
          </div>
          <div class="flex1">
            <p class="ft30 mb16">{{item.content}}</p>
            <p class="ft24 color-999 mb20">{{workStatusInfo(item).text}}</p>
          </div>
        </div>
      </div>
    </div>
    <contact-person :list="baseInfo.addressBookList"></contact-person>
    <div class="link-btn center white-color column"
         :class="isScroll && 'is-scroll'"
         @click="onInteract">
      <span class="ft24">联盟</span>
      <span class="ft24">互动</span>
    </div>
    <div style="width: 100%; height: 250rpx;"></div>
    <custom-tabbar></custom-tabbar>
    <SelectPop :partyList="partyList"
               ref="selectRoutePop"
               :index.sync="selectPoint"
               :selectedId.sync="selectPointId"
               @onRouteItem="onRouteItem"></SelectPop>
  </div>
</template>

<script>
import ContactPerson from '../components/ContactPerson.vue'
import OrgTree from './components/OrgTree.vue'
import Map from './components/Map'
import SelectPop from './components/SelectPop'
let timer = null
export default {
  methods: {
    changeIndex (tem) {
      this.selectPoint = tem
    },
    onchange () {
      this.$refs.selectRoutePop.show()
    },
    resetMap () {
      const mapEl = this.$refs.map
      mapEl && mapEl.resetMap()
    },
    onInteract () {
      uni.navigateTo({
        url: '/pages/union/interact/index/index'
      })
    },
    onGraphic () {
      uni.navigateTo({
        url: `/pages/union/graphic/index?current=${this.selectPoint}`
      })
    },
    onJourney () {
      uni.$emit('initJourneyLineId', this.baseInfo)
      uni.navigateTo({
        url: '/pages/original-travel/index/index?journeyLineId=' + this.baseInfo.journeyLineId
      })
    },
    onRouteItem (item, index) {
      this.selectPoint = index
    },
    scroll (e) {
      timer && clearTimeout(timer) // 每次滚动前 清除一次
      this.isScroll = true
      timer = setTimeout(() => {
        this.isScroll = false
      }, 500)
    },
    findOrgTreeByOrgId () {
      const params = {
        orgId: this.baseInfo.orgId
      }
      this.$api.findOrgTreeByOrgId(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.orgTree = [res.content]
      })
    },
    getJourneyAllianceDetailList () {
      this.$api.getJourneyAllianceDetailList().then(res => {
        if (res.isError) return this.$msg(res.message)
        this.partyList = res.content || []
      })
    }
  },
  data () {
    return {
      selectPointId: '',
      selectPoint: 0,
      partyList: [],
      orgTree: [],
      isScroll: false,
    }
  },
  computed: {
    baseInfo () {
      return this.partyList[this.selectPoint] || {}
    },
    pointsName () {
      if (!this.baseInfo.pointNameList) return
      return this.baseInfo.pointNameList.join('→')
    },
    workStatusInfo () {
      return (item) => {
        const { workStatus } = item
        if (workStatus === 1) return {
          className: 'color-8A8A8A',
          icon: 'icon_weikaishi',
          text: '未开始'
        }
        if (workStatus === 2) return {
          className: 'color-FE8B00',
          icon: 'icon_jinhangzhong',
          text: '进行中'

        }
        if (workStatus === 3) return {
          className: 'color-4CBF00',
          icon: 'icon_yiwancheng',
          text: '已完成'
        }
      }
    }
  },
  watch: {
    baseInfo () {
      this.findOrgTreeByOrgId()
    }
  },
  onLoad () {
    uni.$on('changeIndex', (data) => {
      this.selectPoint = data
    })
    this.getJourneyAllianceDetailList()
  },
  components: { ContactPerson, OrgTree, SelectPop, Map }
}
</script>
<style>
page {
  height: 100%;
  background: #f7f7f7;
  overflow: hidden;
}
</style>
<style lang='scss' scoped>
.party-wrap {
  height: 100%;
  overflow: scroll;
  color: #333;
  .map {
    width: 100%;
    height: 560rpx;
    .reset-btn {
      position: absolute;
      left: 15rpx;
      bottom: 15rpx;
      width: 88rpx;
      height: 88rpx;
      background: #ffffff;
      box-shadow: 0 -6rpx 17rpx 0 rgba(0, 0, 0, 0.1);
      border-radius: 20rpx;
    }
  }
  .title {
    .tip {
      height: 32rpx;
      padding: 0 12rpx;
      background-image: linear-gradient(98deg, #ffddb0 3%, #ffe6b0 72%);
      border-radius: 20rpx 0 20rpx 0;
      color: #bf2b19;
    }
  }
  .graphic-btn {
    width: 224rpx;
    height: 56rpx;
    line-height: 56rpx;
    border-radius: 28rpx;
    border: 1px solid #f54400;
    color: #f54400;
  }
  .work-list {
    .work-item {
      position: relative;
      .icon-box {
        position: relative;
        width: 24rpx;
        height: 24rpx;
        background: #fff;
        z-index: 1;
        .color-8A8A8A {
          color: #8a8a8a;
        }
        .color-FE8B00 {
          color: #fe8b00;
        }
        .color-4CBF00 {
          color: #4cbf00;
        }
      }
    }
    .work-item-line {
      &::after {
        content: "";
        position: absolute;
        top: 10%;
        bottom: 0;
        height: 120%;
        left: 10rpx;
        width: 1px;
        background: #eaeaea;
      }
    }
  }
  .link-btn {
    position: fixed;
    bottom: calc(var(--safe-bottom) + 50rpx);
    right: 14rpx;
    width: 98rpx;
    height: 98rpx;
    background: #e32417;
    box-shadow: 4rpx 6rpx 8rpx 0 rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    transition: all 0.4s;
  }
  .is-scroll {
    transition: all 0.5s ease-in-out;
    right: -80rpx !important;
    opacity: 0.4 !important;
  }
  .change {
    border: 1px solid #f54400;
    height: 56rpx;
    padding: 0 16rpx;
    border-radius: 28rpx;
    color: #f54400;
  }
}
</style>
