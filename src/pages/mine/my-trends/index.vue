<template>
  <div class='urban-rural-wrap'>
    <div>
      <u-tabs-swiper ref="uTabs"
                     :list="list"
                     :current="current"
                     @change="tabsChange"
                     :is-scroll="true"
                     bar-width="32"
                     bar-height="4"
                     font-size="28"
                     active-color="#E32417"
                     inactive-color="#666666"
                     gutter="64"></u-tabs-swiper>
    </div>
    <swiper :current="swiperCurrent"
            class="swiper"
            @transition="transition"
            @animationfinish="animationfinish">
      <swiper-item>
        <List1 v-if="current === 0 || hasLoaded(0)"></List1>
      </swiper-item>
      <swiper-item>
        <List2 v-if="current === 1 || hasLoaded(1)"></List2>
      </swiper-item>
      <swiper-item>
        <List3 v-if="current === 2 || hasLoaded(2)"></List3>
      </swiper-item>
      <swiper-item>
        <List4 v-if="current === 3 || hasLoaded(3)"></List4>
      </swiper-item>
      <swiper-item>
        <List5 v-if="current === 4 || hasLoaded(4)"></List5>
      </swiper-item>
    </swiper>
    <ShareDialog ref="shareDialog"
                 shareBtns="copyLink"
                 :shareData="shareData"></ShareDialog>
  </div>
</template>
<script>
import List1 from './travel-evaluation/List.vue'
import List2 from './union-note/List.vue'
import List3 from './resource/List.vue'
import List4 from './experience/List.vue'
import List5 from './my-customization/List.vue'
import { beginGuide } from '@/utils/map.js'
import ShareDialog from '@/pages/components/ShareDialog'
export default {
  name: 'index',
  methods: {
    // 选择地图导航回调
    onSelectGuide (guideItem) {
      const { lng, lat, address } = guideItem
      beginGuide({
        name: address,
        lng,
        lat
      })
    },
    setShareData (shareData) {
      this.shareData = JSON.parse(JSON.stringify(shareData))
      this.$refs.shareDialog.show()
    },
    // swiper-item左右移动，通知tabs的滑块跟随移动
    transition (e) {
      let dx = e.detail.dx;
      this.$refs.uTabs.setDx(dx);
    },
    // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
    // swiper滑动结束，分别设置tabs和swiper的状态
    animationfinish (e) {
      let current = e.detail.current;
      this.$refs.uTabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
    tabsChange (index) {
      this.swiperCurrent = index;
    },
    changeCTab (index) {
      this.current = index
    },
  },
  components: { List1, List2, List3, List4, List5, ShareDialog },
  provide () {
    return {
      setShareData: this.setShareData,
    }
  },
  data () {
    this.guideItem = {}
    return {
      actions: Object.freeze([{ text: '高德地图' }, { text: '腾讯地图' }]),
      shareData: {},
      current: 0,
      swiperCurrent: 0,
      cacheCurrent: [0],
      list: [
        {
          name: '行程评价'
        }, {
          name: '联盟帖子'
        }, {
          name: '资源共享',
        }, {
          name: '商家展位'
        }, {
          name: '我的定制'
        },
      ]
    }
  },
  computed: {
    hasLoaded () {
      return (index) => {
        return this.cacheCurrent.includes(index)
      }
    },
  },
  watch: {
    current (val) {
      if (this.cacheCurrent.includes(val)) return
      this.cacheCurrent.push(val)
    }
  },
  created () {
    uni.$on('onOpenGuide', (data) => {
      this.guideItem = data
      this.onSelectGuide(data)
    })
  }
}
</script>
<style lang='scss' scoped>
.urban-rural-wrap {
  background: #f7f7f7;
  // padding-bottom: 50px;
  height: calc(100vh);
  .swiper {
    height: calc(100vh - 80rpx);
  }
}
</style>
