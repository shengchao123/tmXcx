<template>
  <view class="pb30">
    <view v-for="(item,index1) in travelList"
          :key="index1"
          class="column ft28 color-333 mt24 list-wrap ml32 mr32 line-h1">
      <view class="ft34 bold">{{item.name}}</view>
      <view class="mt16 ft20 center-align">
        <text v-for="(item1,index) in item.praise"
              :key="index">
          <svg-icon icon="icon_xingji"
                    class="mr8 praise-color"></svg-icon>
        </text>
      </view>
      <view class="mt12 row line-h38">
        <text class="color-666">地址：</text>
        <text class="flex1">{{item.address}}</text>
      </view>
      <view class="mt20">
        <text class="color-666">电话：</text>
        <text>{{item.tel}}</text>
        <svg-icon icon="icon_dianhua"
                  @click="onTel(item.tel)"
                  class="ft32 ml8 tel-color"></svg-icon>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'index',
  methods: {
    // 打电话
    onTel (tel) {
      uni.makePhoneCall({
        phoneNumber: tel
      })
    },
    getTravelList () {
      this.travelList = [
        {
          id: 1,
          name: '临安新世纪国际旅行社有限公司',
          praise: 4,
          address: '临安区锦北街道临天路2431号',
          tel: '13777577140'
        },
        {
          id: 2,
          name: '杭州临安旅游集散中心有限公司',
          praise: 4,
          address: '临安区锦城街道农林大路37号（临安汽车东站对面）',
          tel: '0571-63710111'
        },
        {
          id: 3,
          name: '杭州阳光假期国际旅游有限公司',
          praise: 4,
          address: '临安区锦北街道西径山路61号',
          tel: '13805708985'
        },
        {
          id: 4,
          name: '临安天马国际旅游有限公司',
          praise: 4,
          address: '临安区锦城街道石镜街616号（101-103）',
          tel: '0571-23658333'
        }
      ]
    }
  },
  data () {
    return {
      travelList: []
    }
  },
  onShow () {
    this.getTravelList()
  },

}
</script>
<style>
page {
  height: 100%;
  background: #f7f7f7;
}
</style>
<style lang='scss' scoped>
.line-h1 {
  line-height: 1;
}
.line-h38 {
  line-height: 38rpx;
}
.list-wrap {
  background: #ffffff;
  box-shadow: 4rpx 2rpx 12rpx 8rpx rgba(17, 17, 17, 0.03);
  border-radius: 8rpx;
  padding: 30rpx 32rpx;
  .praise-color {
    color: #ff9204;
  }
  .tel-color {
    color: #518cfc;
  }
}
</style>
