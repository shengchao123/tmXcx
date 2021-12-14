<template>
  <div class='detail-wrap'>
    <u-swiper :list="images"
              height="562"></u-swiper>
    <div>
      <div class="content bg-white p32">
        <div class="name ft40 bold">{{detailInfo.name}}</div>
        <template v-for="item in infoItems">
          <div v-if="detailInfo[item.key] || detailInfo[item.key1]"
               :key="item.title"
               class="mt16 row">
            <div class="center-align">
              <svg-icon :icon="item.icon"
                        class="ft26 color-999"></svg-icon>
              <text class="ml16 ft26 color-999">{{item.title}}</text>
            </div>

            <div v-if="item.key2"
                 class="center-align">
              <div>{{detailInfo[item.key1]}}，{{detailInfo[item.key2]}}</div>
              <div @click="onCallPhone"
                   class="ml16">
                <svg-icon icon='icon_dianhua'
                          style="color:#518CFC;font-size:32rpx"></svg-icon>
              </div>
            </div>

            <text class="ft26 max-width"
                  v-else-if="!item.url && detailInfo[item.key]">{{detailInfo[item.key]}}</text>

            <uni-link :href="linkUrl"
                      v-if="item.url"
                      fontSize="26"
                      color="#518cfc"
                      :showUnderLine="false"
                      :text="detailInfo[item.key]"></uni-link>
          </div>
        </template>
      </div>

      <div class="buy ft24 bg-white mt2 p32 mt16">
        <div class="bold ft28">买家须知</div>
        <div class="mt24 color-666">本平台仅为联盟优选产品进行推介，产品售后请直接联系店铺客服</div>
      </div>
    </div>

    <div class="mt16 ">
      <u-divider color="#999999"
                 half-width="280"
                 bg-color="transparent"
                 border-color="#eaeaea">商品详情</u-divider>
      <div class="p32 bg-white mt16">
        <u-parse :html="detailInfo.content"></u-parse>
      </div>
    </div>

    <div class="buy-btn tb">
      <!-- <div class="ft32 center"
           @click="onBuy">购买下单</div> -->

      <div class="ft32 center"
           @click="onBuy">
        <div class=" center"
             style="color:#fff;font-size:32rpx;">立即下单</div>
      </div>

    </div>
  </div>
</template>

<script>
import md5 from 'js-md5';
const SLAT = 'ZcQCDCnitcGsljKVHwUvgOKZWfMkkgNh'

export default {
  name: 'Detail',
  methods: {
    onBuy () {
      this.$jumpWebview('城乡融合', this.linkUrl)
    },
    onCallPhone () {
      uni.makePhoneCall({
        phoneNumber: this.detailInfo.contactPhone,
        success: (result) => { },
        fail: (error) => { }
      })
    },
    // 获取详情
    getJourneyProductInfoById (id) {
      const params = {
        journeyProductId: id
      }
      this.$api.getJourneyProductInfoById(params).then(res => {
        if (res.isError) return
        this.detailInfo = res.content
        this.images = res.content.images.map(item => {
          return {
            image: this.$fileHost + item.url
          }
        })
      })
    }
  },

  computed: {
    // firstStoreUrl 来源于微店，secondStoreUrl 来源于新鲜买小程序，需要配置加密，优惠
    linkUrl () {
      let { secondStoreUrl, firstStoreUrl } = this.detailInfo
      if (!secondStoreUrl) return firstStoreUrl
      let host = secondStoreUrl.split('?')[0]
      let query = secondStoreUrl.split('?')[1]

      query = 'from=tmhm&' + query

      query += '&timestamp=' + new Date().getTime()
      const _md5 = md5(query + SLAT)

      const result = host + '?' + query + '&sign=' + _md5
      return result
    }

  },
  data () {
    return {
      infoItems: Object.freeze([
        {
          icon: 'icon_rongyu',
          title: '荣誉：',
          key: 'honor'
        },
        {
          icon: 'icon_pinpai',
          title: '品牌：',
          key: 'brand'
        },
        {
          icon: 'icon_chandi',
          title: '产地：',
          key: 'origin'
        },
        {
          icon: 'icon_dianpu',
          title: '店铺：',
          key: 'storeName',
          url: 'storeUrl'
        },
        {
          icon: 'icon_lianxiren',
          title: '联系人：',
          key1: 'contactPerson',
          key2: 'contactPhone'
        },
        {
          icon: 'icon_pingtaiyouhui',
          title: '平台优惠：',
          key: 'platformOffers'
        },
      ]),
      detailInfo: {},
      images: [],
    }
  },
  onLoad (options) {
    this.getJourneyProductInfoById(options.id)
  }
}

</script>

<style lang='scss' scoped>
.max-width {
  max-width: 500rpx;
}
.p32 {
  padding: 32rpx;
}
.detail-wrap {
  padding-bottom: 88rpx;
  background: #f7f7f7;
  .content {
    padding: 32rpx;
  }
}
.buy-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 16rpx 30rpx;
  div {
    background: #e32417;
    height: 88rpx;
    border-radius: 44rpx;
    color: #fff;
  }
}
</style>
