<template>
  <map class="map"
       :latitude="$mapCenter().lat"
       :longitude="$mapCenter().lng"
       scale="9"
       :markers="markers"
       :show-location="true"
       @markertap="markertap">
  </map>
</template>

<script>
import { imgHost } from '@/api/urls.js'

export default {
  name: 'index',
  methods: {
    markertap (e) {
      const index = e.detail.markerId
      uni.$emit('changeIndex', index)
      this.$nextTick(() => {
        this.drawMarkers()
      })
    },
    drawMarkers () {
      if (this.$isEmpty(this.points)) return
      const temArr = this.points.map((item, index) => {
        let item1 = {
          id: index,
          latitude: item.lat,
          longitude: item.lng,
          ...pointConfig
        }
        if (index === Number(this.currentIndex)) {
          item1 = {
            ...item1,
            ...pointConfig2
          }
        }
        return item1
      })
      this.markers = temArr
    }
  },
  props: {
    points: Array,
    currentIndex: [Number, String]
  },
  data () {
    return {
      markers: []
    }
  },
  watch: {
    points () {
      this.drawMarkers()
    },
    currentIndex () {
      this.drawMarkers()
    }
  }
}
const pointConfig = {
  height: 28,
  width: 20,
  iconPath: imgHost + 'map/party.png'
}
const pointConfig2 = {
  height: 75,
  width: 80,
  iconPath: imgHost + 'map/party_l.gif'
}
</script>

<style lang='scss' scoped>
.map {
  width: 100vw;
  height: 560rpx;
}
</style>
