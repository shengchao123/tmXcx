<template>
  <map class="map"
       id="map"
       :latitude="$mapCenter().lat"
       :longitude="$mapCenter().lng"
       scale="9.5"
       :markers="pointsMarkers"
       :show-location="true"
       @markertap="markertap">
  </map>
</template>

<script>
export default {
  name: "index",
  methods: {
    markertap (e) {
      if (e.detail.markerId < 200 && e.detail.markerId >= 100) return
      const index = e.detail.markerId
      const point = this.points[index]
    },

    handleMainPoint (point) {
      if (!point) return
      this.mainPoint = point

      this.getPois()

    },
    setPoipoints (points) {
      this.poiPoints = points.map(item => {
        item.latitude = item.lat
        item.longitude = item.lng
        item.iconPath = this.$aliImg(`map/${this.mainPoint.search.icon}`)
        return {
          ...item,
          ...poiPointConfig
        }
      })
    },

    getPois () {
      const that = this
      if (!this.mainPoint) return
      const { lng, lat, search } = this.mainPoint
      this.$AMap().getPoiAround({
        location: `${lng},${lat}`,
        querytypes: search.name,
        success: function (data) {
          that.poiPoints = data.markers.map(item => {
            item.iconPath = that.$aliImg(`map/${search.icon}`)
            return item
          })
          uni.$emit('poisData', data.poisData)
        }
      })
    },


  },
  data () {
    return {
      $map: null,
      points: [],
      poiPoints: []
    }
  },
  computed: {
    pointsMarkers () {
      if (this.$isEmpty(this.poiPoints)) return []
      const temArr1 = this.poiPoints.map((item, index) => {
        return {
          id: 100 + index,
          ...item,
          ...poiPointConfig,
        }
      })
      const { lat, lng, iconPath } = this.mainPoint
      const _mainPoint = {
        id: 11,
        latitude: lat,
        longitude: lng,
        ...pointConfig,
        iconPath
      }
      temArr1.push(_mainPoint)
      return temArr1
    }
  },
  created () {
    this.$map = uni.createMapContext('map', this)
  }
}

const pointConfig = {
  height: 47,
  width: 38,
}
const poiPointConfig = {
  height: 25,
  width: 20,
}
</script>

<style lang="scss" scoped>
.map {
  width: 100vw;
  height: 674rpx;
}
</style>


