<template>
  <div class='get-red-wrap column between-row'>
    <!-- 搜索框 -->
    <div class="search-wrap">
      <div class="search center-align color-999 ft26">
        <svg-icon icon="icon_hanhan-01-01"></svg-icon>
        <u-input v-model="search.keyword"
                 placeholder="请输入红色地标名称搜索"
                 type="text" />
      </div>
    </div>

    <div class="content row flex1">
      <div class="left-nav-wrap">
        <div v-for="(item, index) in regions"
             :key="index"
             class="region-item text-hidden"
             :class="search.regionsCode === item.code && 'active'"
             @click="onRegion(item)">
          {{item.name}}
        </div>
      </div>
      <div class="points-wrap flex1">
        <div v-for="(item, index) in points"
             :key="index"
             class="point-item between-row bb">

          <img :src="$fileHost + item.imageUrl">
          <div class="title-wrap flex1 ml16 mr16 column between-row">
            <div class="between-row flex1">
              <div class="ft30 bold text-hidden">{{item.name}}</div>
              <div>
                <u-checkbox @change="checkboxChange"
                            icon-size="20"
                            :value="pointIds.includes(item.code)"
                            shape="circle"
                            active-color="#E32417"
                            :name="item.code"></u-checkbox>
              </div>
            </div>
            <div class="ft22 color-999">{{item.regionsName}}</div>
          </div>

        </div>
      </div>
    </div>

    <div class="btn-wrap center-align bold ft32 tb">
      <div class="cancel center"
           @click="onCancel">取消</div>
      <div class="add center"
           @click="onAdd">
        <span>加入路线</span>
        <span v-if="!$isEmpty(pointIds)">({{pointIds.length || ''}})</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GetRedPoints',
  methods: {
    onCancel () {
      uni.navigateBack()
    },

    onAdd () {
      this.$store.commit('travel/CUSTOM_PATH_POINTS', this.selectPoints)
      uni.redirectTo({ url: '/pages/original-travel/stroke-order/CustomPath' })
    },

    onRegion (item) {
      this.search.regionsCode = item.code
      this.getJourneyPointListByRegionsCode()
    },

    checkboxChange (e) {
      const _points = this.points.filter(item => item.code === e.name)
      if (e.value) {
        this.pointIds.push(e.name)
        this.selectPoints.push(_points[0])
      } else {
        const _index = this.pointIds.indexOf(e.name)
        this.pointIds.splice(_index, 1)
        this.selectPoints.splice(_index, 1)
      }
    },

    // 根据区域获取点位
    getJourneyPointListByRegionsCode () {
      const params = {
        ...this.search
      }
      this.$api.getJourneyPointListByRegionsCode(params).then(res => {
        if (res.isError) return
        this.points = res.content
      })
    },

    // 获取区域列表
    getJourneyRegionsList () {
      const params = {}
      this.$api.getJourneyRegionsList(params).then(res => {
        if (res.isError) return
        this.search.regionsCode = res.content[0].code
        this.getJourneyPointListByRegionsCode()
        this.regions = res.content
      })
    },
  },
  watch: {
    '$store.state.travel.customPathPoints': {
      handler: function (n, o) {
        if (n) {
          this.selectPoints = JSON.parse(JSON.stringify(n))
          this.pointIds = n.map(item => item.code)
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      search: {
        keyword: '',
        regionsCode: ''
      },
      regions: [], $fileHost: this.$fileHost,
      points: [],
      pointIds: [],
      selectPoints: []
    }
  },
  created () {
    this.getJourneyRegionsList()
  }
}
</script>

<style lang='scss' scoped>
.get-red-wrap {
  height: calc(100vh);
  position: relative;
  .search-wrap {
    padding: 24rpx 30rpx;
    .search {
      height: 66rpx;
      padding: 0 20rpx;
      border-radius: 33rpx;
      background: #f4f5f7;
    }
  }
  .content {
    box-sizing: border-box;
    overflow: scroll;
    white-space: nowrap;
  }
  .left-nav-wrap {
    width: 180rpx;
    background: #f5f5f5;
    font-size: 26rpx;
    height: 100%;
    overflow: scroll;
    .region-item {
      line-height: 90rpx;
      height: 90rpx;
      padding-left: 32rpx;
      border-left: 6rpx solid transparent;
      background: transparent;
      color: #999999;
    }
    .active {
      border-color: #e32417;
      background: #ffffff;
      color: #e32417;
    }
  }

  .points-wrap {
    height: 100%;
    overflow: scroll;
    .point-item {
      margin: 32rpx 0 32rpx 32rpx;
      padding-bottom: 32rpx;
      img {
        width: 128rpx;
        height: 128rpx;
        border-radius: 10rpx;
      }
    }
  }

  .btn-wrap {
    height: 120rpx;
    background: #ffffff;
    justify-content: space-around;
    div {
      width: 332rpx;
      height: 88rpx;
      border-radius: 44rpx;
    }
    .cancel {
      border: 1px solid #e32417;
      color: #e32417;
    }
    .add {
      background: #e32417;
      color: #ffffff;
    }
  }
}
</style>
