<template>
  <u-popup v-model="isTypeShow"
           mode="bottom"
           height="584"
           border-radius="30"
           :mask-custom-style="maskCustomStyle">
    <view class="popup-wrap">
      <view class="relative h84 bb">
        <view class="ft34 popup-title">选择类型</view>
        <view class="close-btn"
              @click="isTypeShow = false">
          <svg-icon class="ft24 color-999 bold mt8"
                    icon="icon_cha"></svg-icon>
        </view>
      </view>
      <view class="popup-content pl30 pr30">
        <scroll-view :scroll-y="true"
                     class="popup-content">
          <view v-for="(item,index) in typeData"
                :key="index"
                :class="selectedType === item ? 'selected-color' :'color-333'"
                class="center-align type-item bb between-row"
                @click="changeSelectedType(item)">
            <text>{{item}}</text>
            <svg-icon icon="icon_duihao"
                      v-if="selectedType === item"></svg-icon>
          </view>
        </scroll-view>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: 'OrgPopup',
  methods: {
    show (type) {
      this.selectedType = type
      this.isTypeShow = true
    },
    changeSelectedType (item) {
      this.$emit('selectedType', item)
      this.isTypeShow = false
    }
  },
  data () {
    return {
      isTypeShow: false,
      typeData: ["党组织班子会", "党小组会", "党员大会", "党课", "党员“固定主题党日”"],
      selectedType: ""
    }
  },
  computed: {
    maskCustomStyle () { // 遮罩层自定义样式
      const temStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.40)'
      }
      return temStyle
    },
  }
}
</script>

<style lang='scss' scoped>
.h84 {
  height: 84rpx;
  line-height: 84rpx;
}
.selected-color {
  color: #e32417;
}
.popup-wrap {
  position: relative;
  .popup-title {
    text-align: center;
    color: #000;
  }
  .close-btn {
    position: absolute;
    right: 30rpx;
    top: 0rpx;
  }
  .popup-content {
    height: 500rpx;
    .type-item {
      height: 100rpx;
      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
