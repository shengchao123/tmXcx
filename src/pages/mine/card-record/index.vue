<template>
  <div class='card-record-wrap'>
    <div class="head column pl30 pr30"
         @click="onStrokeOrder">
      <div class="mb20 medium center-align">
        <span class="ft32">对应行程：{{journeyItineraryName}}</span>
        <svg-icon icon="icon_xiangyoujiantou"
                  class="ft20 ml8 bold"></svg-icon>
      </div>
      <div class="ft24"
           style="opacity: 0.6">行程参与人数：{{signUpQuantity}}人</div>
    </div>
    <scroll-view v-if="myPoint"
                 scroll-y>
      <div class="list pb48">
        <div v-for="(item, index) in pointSignInList"
             :key="index"
             class="item mt20 ml30 mr30 pt24 pl24 pb24 center-align">
          <div class="flex flex1">
            <div class="num tc ft24 mr20">{{index + 1}}</div>
            <div class="flex1">
              <div class="ft32 bold mb14">{{item.name}}</div>
              <div class="ft24 mb8">{{item.address}}</div>
              <div class="center-align color-999"
                   @click="onPersonnelCard(item)">
                <span class="ft24">{{item.signInQuantity}}人已打卡，{{signUpQuantity - item.signInQuantity}}人未打卡</span>
                <svg-icon icon="icon_xiangxia"
                          class="ft24 ml8"></svg-icon>
              </div>
            </div>
          </div>
          <div class="card-btn center column center-align"
               @click="onCard(item)">
            <svg-icon :icon="cardBtnIcon(item).icon"
                      style="font-size: 48rpx"
                      :class="cardBtnIcon(item).className"></svg-icon>
            <div class="ft22 tc"
                 :class="cardBtnText(item).className">{{cardBtnText(item).text}}</div>
            <div class="ft20 color-999 tc">距你{{distanceText(item) || '--'}}</div>
          </div>
        </div>
      </div>

    </scroll-view>
    <div v-else
         class="pt48">
      <div class="center">
        <u-loading mode="circle"></u-loading>
        <div class="ft28 color-999 ml16">正在获取位置信息...</div>
      </div>
    </div>
  </div>
</template>
<script>
let timer = null
export default {
  methods: {
    onStrokeOrder () {
      uni.navigateTo({
        url: `/pages/original-travel/stroke-order/detail?id=${this.journeyLineId}`
      })
    },
    // 查看打卡人员
    onPersonnelCard (item) {
      if (this.signUpQuantity <= 0) return
      const { id } = item
      uni.navigateTo({
        url: `/pages/mine/card-record/personnelCard?id=${this.journeyLineId}&journeyPointId=${id}`
      })
    },
    // 打卡
    onCard (item) {
      const { id, distance } = item
      if (distance > 500) return this.$msg('不在打卡范围内')
      const params = {
        id: this.journeyLineId,
        journeyPointId: id,
      }
      this.$api.journeyItineraryPointSignIn(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('打卡成功')
        this.getJourneyItinerarySignInById()
      })
    },
    getJourneyItinerarySignInById (id) {
      const params = {
        id
      }
      this.$api.getJourneyItinerarySignInById(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        const { journeyItineraryName, signUpQuantity, pointSignInList } = res.content
        this.journeyItineraryName = journeyItineraryName
        this.signUpQuantity = signUpQuantity
        this.pointSignInList = pointSignInList || []
      })
    },
    initMyPoint () {
      const that = this
      uni.getLocation({
        type: 'wgs84',
        success: function (res) {
          console.log('当前位置的经度：' + res.longitude);
          console.log('当前位置的纬度：' + res.latitude);
          that.myPoint = [res.latitude, res.longitude]
        }
      });
    },
    getDistance (lat1, lon1, lat2, lon2) {
      var radLat1 = (lat1 * Math.PI) / 180; //将角度换算为弧度
      var radLat2 = (lat2 * Math.PI) / 180; //将角度换算为弧度
      var a = radLat1 - radLat2;
      var b = (lon1 * Math.PI) / 180 - (lon2 * Math.PI) / 180;
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(
        Math.sin(b / 2), 2)));
      s = s * 6378137.0; // 取WGS84标准参考椭球中的地球长半径(单位:m)
      //s = Math.round(s * 10000) / 10000; //两点之间距离(保留四位)
      if (s >= 1000) {
        s /= 1000;
        return Math.round(s) + "km";
      }
      return Math.round(s) + "m"; //(单位:m)
    },

    setPointDistance () {
      const pointSignInList = this.pointSignInList.map(el => {
        const { lng, lat } = el
        const distance = this.getDistance(lat, lng, this.myPoint[0], this.myPoint[1])
        return {
          ...el,
          distance,
        }
      })
      this.pointSignInList = [...pointSignInList]
    }
  },
  data () {
    return {
      journeyItineraryName: '',
      signUpQuantity: 0,
      pointSignInList: [],
      myPoint: null,
    }
  },
  computed: {
    cardBtnIcon () {
      return (item) => {
        const { isSignIn, distance } = item
        let icon = 'icon_dakaline'
        let className = 'color-E32417'
        if (isSignIn) {
          icon = 'icon_daka'
        }
        if (!distance || distance > 500) {
          className = 'color-999'
        }
        return { icon, className }
      }
    },
    cardBtnText () {
      return (item) => {
        const { isSignIn, distance } = item
        let className = 'color-333'
        let text = '打卡'
        if (isSignIn) {
          text = '已打卡'
          className = 'color-E32417'
        }
        if (!distance || distance > 500) {
          className = 'color-999'
        }
        return { className, text }
      }
    },
    distanceText () {
      return (item) => {
        const { distance } = item
        if (distance > 10000000) return '还很远'
        if (distance > 1000) return Math.round(distance / 1000) + 'km'
        return distance + 'm'
      }
    }
  },
  watch: {
    myPoint: {
      deep: true,
      handler: function () {
        this.setPointDistance()
      }
    }
  },
  destroyed () {
    timer && clearTimeout(timer)
  },
  onLoad (option) {
    this.initMyPoint()
    this.journeyLineId = option.id
    this.getJourneyItinerarySignInById(this.journeyLineId)
  }
}
</script>
<style lang='scss' scoped>
.card-record-wrap {
  color: #333;
  .head {
    width: 100%;
    height: 162rpx;
    background-image: linear-gradient(90deg, #ffdb5d 21%, #ffca00 96%);
    justify-content: center;
  }
  .list {
    height: 100%;
    .item {
      background: #fff;
      box-shadow: 3rpx 2rpx 12rpx 8rpx rgba(17, 17, 17, 0.03);
      border-radius: 6rpx;
      .num {
        width: 48rpx;
        height: 48rpx;
        line-height: 48rpx;
        border-radius: 26rpx;
        border: solid 1px #e1b406;
        color: #e1b406;
      }
      .card-btn {
        min-width: 160rpx;
        height: 100%;
        padding: 0 8rpx;
        border-left: solid 1px #eaeaea;
      }
      .color-E32417 {
        color: #e32417;
      }
    }
  }
}
</style>