<template>
  <map class="map"
       :latitude="$mapCenter().lat"
       :longitude="$mapCenter().lng"
       scale="10"
       :markers="pointsMarkers"
       :polyline="polylines"
       :show-location="true"
       @markertap="markertap">
  </map>
</template>

<script>
import { imgHost } from '@/api/urls.js'

export default {
  name: "index",
  methods: {
    markertap (e) {
      if (e.detail.markerId < 200 && e.detail.markerId >= 100) return
      const index = e.detail.markerId
      const point = this.points[index]
      uni.navigateTo({
        url: `/pages/original-travel/introduction/index?journeyPointId=${point.journeyPointId}`
      })
    }
  },
  data () {
    return {
      productPoints: [],
    };
  },
  created () {
    uni.$on('drawProductMarkers', (data) => {
      if (!this.$isEmpty(data)) {
        this.productPoints = data
      }
    })
  },
  computed: {
    pointsMarkers () {
      const temArr1 = this.productPoints.map(item => {
        return {
          latitude: item.lat,
          longitude: item.lng,
          ...productPointConfig,
        }
      })
      const temArr2 = this.points.map((item, index) => {
        return {
          id: 100 + index,
          latitude: item.lat,
          longitude: item.lng,
          ...pointConfig,
        }
      })
      return [...temArr1, ...temArr2]
    },
    polylines () {
      const points = this.points.map((item, index) => {
        return {
          latitude: item.lat,
          longitude: item.lng
        }
      })
      return [{
        points,
        color: '#FC5E51',
        width: 5
      }]
    }
  },
  beforeDestroy () {
    uni.$off("discoverBtn");
  },
  props: {
    points: {
      type: Array,
      default: () => []
    }
  }
}

const pointConfig = {
  height: 38,
  width: 23,
  iconPath: imgHost + 'map/travel_mark.png'
}
const productPointConfig = {
  height: 25,
  width: 20,
  iconPath: imgHost + 'map/guide_mark_6.png'
}
</script>

<style lang="scss" scoped>
.map {
  width: 100vw;
  height: 30vh;
}
</style>
