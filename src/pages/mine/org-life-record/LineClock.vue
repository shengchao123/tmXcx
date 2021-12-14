<template>
  <view class="mt20 bg-white pl30 pr30">
    <view class="between-row center-align pt32"
          :class="isShowSignIn ? 'pb12' :'pb32'">
      <text class="ft32 bold color-333">线路打卡</text>
      <text v-if="clockPageType !== 'detail'"
            class="ft28 color-518cfc"
            @click="changeIsShowSignIn">{{isShowSignIn ? '设为隐藏' : '取消隐藏'}}</text>
    </view>
    <view class="show-line"
          :class="isShowSignIn && 'h-auto'">
      <view class="line-wrap"
            :class="isLineAllShow && 'h-auto'">
        <view v-for="(item,index) in lineList"
              :key="index"
              :class="index !== lineList.length-1 && 'bb'"
              class="h100 center-align between-row ft28">
          <text>{{item.name}}</text>
          <text>{{item.signInQuantity}}人</text>
        </view>
      </view>
      <view class="ft24 color-999 h100 center tb"
            v-if="lineList.length>3"
            @click="isLineAllShow = !isLineAllShow">
        <text>{{isLineAllShow ? '收起':'展开'}}</text>
        <span class="iconfont color-999 ml8 ft24"
              :class="isLineAllShow ? 'icon_xiangshangjiantou' : 'icon_xiangxia'"></span>

      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'LineClock',
  methods: {
    changeIsShowSignIn () {
      this.isShowSignIn && this.$msg('确定后，线路打卡情况将不会在组织生活记录显示')
      this.$nextTick(() => {
        this.$emit('update:isShowSignIn', !this.isShowSignIn)
      })
    },
    // 根据行程单id获取行程单打卡信息
    getJourneyItinerarySignInById () {
      const params = {
        id: this.journeyItineraryId
      }
      this.$api.getJourneyItinerarySignInById(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.lineList = res?.content?.pointSignInList ?? []
      })
    }
  },
  data () {
    return {
      isLineAllShow: false,
      lineList: []
    }
  },
  watch: {
    journeyItineraryId (val) {
      if (val) this.getJourneyItinerarySignInById()
    }
  },
  props: {
    isShowSignIn: Boolean,
    clockPageType: String,
    journeyItineraryId: String
  }
}
</script>

<style lang='scss' scoped>
.color-518cfc {
  color: #518cfc;
}
.h100 {
  height: 100rpx;
}
.show-line {
  width: 100%;
  overflow: hidden;
  max-height: 0rpx;
  transition: max-height 0.4s;
}
.line-wrap {
  width: 100%;
  overflow: hidden;
  max-height: 299rpx;
  transition: max-height 0.4s;
}
.h-auto {
  max-height: 2000rpx;
}
</style>
