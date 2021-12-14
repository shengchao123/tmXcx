<template>
  <div class='agricultural-product-wrap'
       v-if="!$isEmpty(allList)">
    <div class="line"></div>
    <div class="bold ft34 pl30 pt30 pb8">优质农产品</div>
    <div class="goods-list pl30 pr30">
      <div v-for="(item, index) in showList"
           :key="index"
           class="goods between-row center-align pt28 pb28">
        <div @click="onIntroduction(item)">
          <p class="ft30">{{item.name}}</p>
          <p class="ft24 color-999 mt8">{{item.journeyPointName}}</p>
        </div>
        <div class="btn center ml16"
             @click="onGuide(item)">
          <svg-icon icon="icon_daohang"
                    style="color: #518CFC "
                    class="icon"></svg-icon>
          <span class="ml8 color-666">导航</span>
        </div>
      </div>
    </div>
    <div v-if="showList.length < allList.length"
         class="more-btn color-999 center"
         style="height: 80rpx"
         @click="onMore">
      <span class="ft24">更多</span>
      <svg-icon icon="icon_xiangxia"
                class="ft24 ml8"></svg-icon>
    </div>
    <div v-else
         style="height: 35rpx"></div>
  </div>
</template>
<script>
export default {
  methods: {
    onMore () {
      this.showList = [...this.allList]
    },
    onIntroduction (item) {
      uni.navigateTo({
        url: `/pages/original-travel/introduction/index?journeyPointId=${item.journeyPointId}`
      })
    },
    onGuide (item) {
      this.onShowNavigationSelect({ item })
    },
    getJourneyProductListByJourneyLineId () {
      const params = {
        journeyLineId: this.journeyLineId
      }
      this.$api.getJourneyProductListByJourneyLineId(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.allList = res.content || []
        this.events()
        const allList = this.allList
        this.showList = allList.length > 5 ? allList.slice(0, 5) : [...allList]
      })
    },
    events () {
      uni.$emit('drawProductMarkers', this.allList)
    }
  },
  inject: ['onShowNavigationSelect'],
  props: {
    journeyLineId: String
  },
  data () {
    return {
      showList: [],
      allList: []
    }
  },
  watch: {
    journeyLineId (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getJourneyProductListByJourneyLineId()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.agricultural-product-wrap {
  color: #333;
  .line {
    width: 100%;
    height: 20rpx;
    background: #f7f7f7;
  }
  .goods-list {
    .goods {
      border-bottom: solid 1px #eaeaea;
      .btn {
        border: 1px solid #dcdcdc;
        border-radius: 28rpx;
        width: 120rpx;
        height: 56rpx;
        font-size: 26rpx;
        .icon {
          font-size: 18rpx;
        }
      }
    }
  }
}
</style>