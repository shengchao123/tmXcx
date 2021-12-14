<template>
  <div class='point-guide-wrap'>
    <Map :points="points"
         ref="map"
         @poisData="poisData"
         :mainPoint="mainPoint"></Map>
    <PoiKeywords class="poi-keywords"
                 @changePois="changePois"></PoiKeywords>

    <DragPopover showLocation="true"
                 top="664"
                 @onLocation="onLocation">
      <!-- 生活馆 搜索框 -->
      <div v-if="currentPoi.type === '01'"
           class="search-wrap">
        <div class="search center-align color-999 ft26">
          <svg-icon icon="icon_hanhan-01-01"
                    class="mr16"></svg-icon>
          <u-input v-model="keyword"
                   @input="poiSearch"
                   placeholder="搜索地点"
                   type="text" />
        </div>
      </div>
      <div class="content-box">
        <PointGuideItem v-for="(item, index) in poiPoints"
                        @onGuide="onSelectGuide"
                        @onPoi="onPoi"
                        :key="index"
                        :info="{item, index}"
                        :main="index === currentIndex"></PointGuideItem>
      </div>
    </DragPopover>

  </div>
</template>

<script>
import DragPopover from '@/components/DragPopover'
import { beginGuide } from '@/utils/map.js'
import PointGuideItem from './components/PointGuideItem'
import PoiKeywords from './components/PoiKeywords'
import Map from './components/Map'
export default {
  name: 'index',
  methods: {
    // 兴趣点名字
    changePois (poi) {
      this.currentPoi = poi
      this.mainPoint.search = poi
      if (poi.type) return this.getJourneyPointListByRegionsCode(poi.type)
      this.$refs.map.handleMainPoint(this.mainPoint)
    },
    poisData (pois) {
      this.poiPoints = pois
    },
    // 选择切换 poi 点
    onPoi (info) {
      this.currentIndex = info.index
    },
    // 选择地图导航回调
    onSelectGuide (item) {
      let temItem = item.item
      if (!temItem.lat) {
        temItem.lat = +temItem.location.split(',')[1]
        temItem.lng = +temItem.location.split(',')[0]
      }
      beginGuide(temItem)
    },
    getJourneyPointListByRegionsCode (type) {
      const params = {
        type,
      }
      this.$api.getJourneyPointListByRegionsCode(params).then(res => {
        if (res.isError) return
        const _pois = res.content.map(item => {
          item.address = item.regionsName
          return item
        })
        this.poiPoints = [{ address: this.mainPoint.regionsName, ...this.mainPoint }, ..._pois]
        this.$refs.map.setPoipoints(this.poiPoints, this.currentPoi)
      })
    },
    // 生活馆 搜索地点
    poiSearch () {
      const type = '01'
      this.getJourneyPointListByRegionsCode(type)
    },
  },
  created () {
    uni.$on('poisData', pois => {
      this.poiPoints = [{ address: this.mainPoint.regionsName, ...this.mainPoint }, ...pois]
    })
  },
  data () {
    return {
      currentPoi: {},
      currentIndex: 0,
      mainPoint: {},
      poiPoints: [],
      showGuide: false,
      guidePoint: {},
      actions: Object.freeze([{ text: '高德地图' }, { text: '腾讯地图' }]),
    }
  },
  components: { Map, PoiKeywords, DragPopover, PointGuideItem },
  mounted () {
    this.mainPoint = { ...JSON.parse(uni.getStorageSync('pointData')) }
    this.mainPoint.iconPath = this.$aliImg('map/guide_mark_red.png')
    this.mainPoint.search = {
      icon: 'guide_mark_2.png',
      name: '风景'
    }
    this.$refs.map.handleMainPoint(this.mainPoint)
  },
}
</script>

<style lang='scss' scoped>
.point-guide-wrap {
  height: 100%;

  .poi-keywords {
    position: absolute;
    z-index: 98;
    left: 12px;
    top: 12px;
  }
  .content-box {
    height: 100%;
    overflow: scroll;
  }
  .search-wrap {
    padding: 0rpx 30rpx 2rpx;
    .search {
      height: 66rpx;
      padding: 0 20rpx;
      border-radius: 33rpx;
      background: #f4f5f7;
    }
  }
}
</style>
