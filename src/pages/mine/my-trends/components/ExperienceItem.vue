<template>
  <div class='experi-item-wrap relative mb32'
       @click="onGoDetail">
    <div class="name ft40 bold mr16">{{item.title}}</div>

    <div v-for="subItem in infoItems"
         :key="subItem.title"
         class="row mt16 ft26 relative">
      <div class="color-999"
           style="width:140rpx">{{subItem.title}}</div>
      <div style="max-width:420rpx"
           v-if="subItem.key !== 'contactPhone'">{{item[subItem.key]}}</div>

      <div class="center-align"
           @click.stop="onCallPhone"
           v-else>
        <div>{{item[subItem.key]}}</div>
        <svg-icon icon="icon_dianhua"
                  class="ft32 ml16"
                  style="color: #518CFC;"></svg-icon>
      </div>

      <div class="guide-btn center"
           v-if="subItem.key === 'address'"
           @click.stop="onGuide">
        <svg-icon icon="icon_daohang"
                  style="color:#518CFC "
                  class="ft20 mr8"></svg-icon>
        <span class="color-666 ft24">导航</span>
      </div>

    </div>

    <div class="images row mt24"
         v-if="showImgs">
      <ImgGroup :imgList="item.images"></ImgGroup>
    </div>

  </div>
</template>

<script>
import { subStringWithStrlen } from '@/utils/tools'
import ImgGroup from '@/pages/union/interact/components/ImgGroup'
export default {
  name: 'experiItem',
  methods: {
    // 显示导航选择框
    onGuide () {
      uni.$emit('onOpenGuide', this.item)
    },
    onCallPhone () {
      uni.makePhoneCall({
        phoneNumber: this.item.contactPhone
      })
    },
    onGoDetail () {
      uni.navigateTo({ url: '/pages/urban-rural/experience/Detail?id=' + this.item.journeyMerchantBoothId })
    },
  },
  data () {
    return {
      fileHost: this.$fileHost,
      showGuide: false,
      infoItems: Object.freeze([
        {
          title: '适宜人群：',
          key: 'appropriateCrowdFormat'
        },
        {
          title: '服务内容：',
          key: 'serviceContentFormat'
        },
        {
          title: '地址：',
          key: 'address'
        },
        {
          title: '电话：',
          key: 'contactPhone',
        },
      ]),
    }
  },
  components: {
    ImgGroup
  },
  props: {
    item: Object,
    showImgs: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    name () {
      return subStringWithStrlen(this.item.name, 60)
    },

  }
}
</script>

<style lang='scss' scoped>
.experi-item-wrap {
  background: #ffffff;
  padding: 24rpx 30rpx 32rpx;
  .guide-btn {
    position: absolute;
    top: 0;
    right: 0;
    margin-left: 16rpx;
    height: 48rpx;
    width: 100rpx;
    line-height: 48rpx;
    text-align: center;
    border: 1px solid #dcdcdc;
    border-radius: 28rpx;
  }
  .images {
    img {
      width: 214rpx;
      height: 214rpx;
      border-radius: 6rpx;
      margin-right: 24rpx;
    }
  }
}
</style>
