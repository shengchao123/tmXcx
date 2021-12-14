<template>
  <map class="map-wrap"
       :latitude="$mapCenter().lat"
       :longitude="$mapCenter().lng"
       scale="8.5"
       :markers="pointsMarkers"
       :polyline="polylines">
  </map>
</template>

<script>
import { imgHost } from '@/api/urls.js'
export default {
  name: "index",

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
      return this.points.map((item, index) => {
        return {
          id: 100 + index,
          latitude: item.lat,
          longitude: item.lng,
          ...pointConfig,
        }
      })
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
.map-wrap {
  width: 690rpx;
  height: 300rpx;
}
</style>
