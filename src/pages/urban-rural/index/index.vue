<template>
  <div class='urban-rural-wrap'
       :class="!showImg && 'margin-tabs'">
    <img src="https://hzslzx.oss-cn-hangzhou.aliyuncs.com/system/tianmu/images/banner.png"
         class="banner"
         :class="!showImg && 'hide-img'"
         @click="onImg">
    <u-tabs ref="uTabs"
            :list="list"
            :current="current"
            class="tabs"
            @change="tabsChange"
            :is-scroll="false"
            bar-width="32"
            bar-height="4"
            font-size="28"
            active-color="#E32417"
            inactive-color="#666666"></u-tabs>

    <List1 v-if="current === 0"></List1>
    <List2 v-if="current === 1"></List2>
    <List3 v-if="current === 2"></List3>
    <List4 v-if="current === 3"></List4>

    <custom-tabbar></custom-tabbar>

    <ShareDialog ref="shareDialog"
                 shareBtns="copyLink"
                 :shareData="shareData"></ShareDialog>
  </div>
</template>

<script>
import List1 from '../optimization/List.vue'
import List2 from '../activity/List.vue'
import List3 from '../experience/List.vue'
import List4 from '../resource/List.vue'
import { beginGuide } from '@/utils/map.js'
import ShareDialog from '@/pages/components/ShareDialog'

export default {
  name: 'index',
  methods: {
    // 选择地图导航回调
    onSelectGuide (act) {
      const { lng, lat, address } = this.guideItem
      beginGuide(act, {
        name: address,
        lng,
        lat
      })
    },
    onImg () {
      const url = 'https://gfd.larcb.net/html/index_e.html?channel=hm'
      uni.navigateTo({ url: '/pages/webView?webUrl=' + url })
    },
    setShareData (shareData) {
      this.shareData = JSON.parse(JSON.stringify(shareData))
      console.log(this.$refs.shareDialog)
      this.$refs.shareDialog.show()
    },
    // swiper-item左右移动，通知tabs的滑块跟随移动
    transition (e) {
      let dx = e.detail.dx;
      this.$refs.uTabs.setDx(dx);
    },
    tabsChange (index) {
      this.current = index;
      this.showImg = true
    }
  },
  onLoad ({ current }) {
    if (!current) return
    this.current = 1 * current
  },
  created () {
    uni.$on('changeImgStatus', () => {
      this.showImg = false
    })
    uni.$on('onOpenGuide', (data) => {
      this.guideItem = data
      this.onSelectGuide(data)
    })
  },
  components: { List1, List2, List3, List4, ShareDialog },
  provide () {
    return {
      setShareData: this.setShareData,
    }
  },
  data () {
    this.guideItem = {}
    return {
      showImg: true,
      shareData: {},
      current: 0,
      cacheCurrent: [0],
      actions: Object.freeze([{ text: '高德地图' }, { text: '腾讯地图' }]),
      showGuide: false,
      list: [
        {
          name: '联盟优选'
        }, {
          name: '特色活动'
        }, {
          name: '定制体验',
        }, {
          name: '资源共享'
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.urban-rural-wrap {
  padding-top: 200rpx;
}
.banner {
  width: 100vw;
  height: 200rpx;
  position: fixed;
  top: 0;
  transition: 0.5s all;
}

.hide-img {
  top: -200rpx;
}

.tabs {
  margin-top: 0;
  transition: 0.5s all;
}

.margin-tabs {
  padding-top: 0;
}

.urban-rural-wrap {
  background: #f7f7f7;
  padding-bottom: var(--safe-bottom);
  height: calc(100vh - var(--safe-bottom));
  overflow-y: hidden;
}
</style>
