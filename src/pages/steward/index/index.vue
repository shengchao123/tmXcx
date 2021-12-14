<template>
  <div class='steward-wrap relative'>
    <!-- 头部标题logo -->
    <div class="top column center-align">
      <img :src="$aliImg('steward/top_logo.png')"
           class="logo">
      <img :src="$aliImg('steward/top_title.png')"
           class="title-img">
    </div>

    <!-- 内容 -->
    <div class="content">
      <!-- 跳转icons -->
      <div class="between-row icons">
        <div class="icon column center-align"
             @click="onJump(item)"
             v-for="(item, index) in iconsOptions"
             :key="index">
          <img :src="item.imgUrl">
          <div class="icon-title ft24 medium">{{item.label}}</div>
        </div>
      </div>
      <!-- 三块 -->
      <div class="part between-row ft24">
        <div class="part1"
             style="background-image: url('https://hzslzx.oss-cn-hangzhou.aliyuncs.com/system/tianmu/images/steward/bg1.png');"
             @click="onAuthPart(1)">
          <div class="ft30 medium">服务站</div>
          <div class="color-999 ">
            <div>一键办事</div>
            <div>社区热线</div>
            <div>物业服务</div>
            <div>家政服务</div>
            <div>活动报名</div>
          </div>
        </div>

        <div class="part2"
             style="background-image: url('https://hzslzx.oss-cn-hangzhou.aliyuncs.com/system/tianmu/images/steward/bg2.png');"
             @click="onAuthPart(2)">
          <div class="ft30 medium">议事厅</div>
          <div class="color-999 ">
            <div>热门话题</div>
            <div>我要报事</div>
          </div>
        </div>
        <div class="part3"
             style="background-image: url('https://hzslzx.oss-cn-hangzhou.aliyuncs.com/system/tianmu/images/steward/bg3.png');"
             @click="onAuthPart(3)">
          <div class="ft30 medium">志愿汇</div>
          <div class="color-999 ">
            <div>微心愿认领</div>
            <div>志愿活动</div>
          </div>
        </div>
      </div>
    </div>

    <div class="pl32">
      <swiper class="swiper "
              :indicator-dots="false"
              :autoplay="true"
              next-margin="16rpx"
              :interval="2000"
              :duration="500">
        <swiper-item v-for="(item, index) in imgList"
                     :key="index">
          <div class="swiper-item relative"
               @click="onAdDetail(item)">
            <img :src="$fileHost + item.imgUrl">
            <div class="title ft32 bold">{{item.title}}</div>
          </div>
        </swiper-item>
      </swiper>

    </div>

    <!-- 底部导航 -->
    <custom-tabbar></custom-tabbar>
  </div>
</template>

<script>
const Pages = new Map([
  [1, '/pages/steward/service/index'],
  [2, '/pages/steward/matter/index'],
  [3, '/pages/steward/wish/index']
])
export default {
  methods: {
    onAdDetail (item) {
      uni.setStorageSync('detail', JSON.stringify(item))
      uni.navigateTo({
        url: '/pages/steward/index/AdDetail'
      })
    },
    findJourneyAdvertisementList () {
      this.$api.findJourneyAdvertisementList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.imgList = res.content
      })
    },
    // 跳转
    onJump (item) {
      uni.navigateTo({
        url: item.page
      })
    },
    onAuthPart (type) {
      if (this.$notMember()) return this.$goLogin();
      if (!this.isAuthCommunity) return uni.navigateTo({ url: '/pages/steward/auth/index' })
      uni.navigateTo({ url: Pages.get(type) })
    }
  },
  created () {
    this.findJourneyAdvertisementList()
  },
  computed: {
    isAuthCommunity () {
      return this.$store.state.user.memberPersonalInfo.isAuthCommunity
    }
  },
  data () {
    return {
      imgList: [], $fileHost: this.$fileHost,
      iconsOptions: Object.freeze([
        {
          imgUrl: this.$aliImg('steward/icon1.png'),
          label: '好支部',
          page: '/pages/steward/1branch/index'
        },
        {
          imgUrl: this.$aliImg('steward/icon2.png'),
          label: '好管家',
          page: '/pages/steward/2steward/index'
        },
        {
          imgUrl: this.$aliImg('steward/icon3.png'),
          label: '好帮手',
          page: '/pages/steward/3helper/index'
        },
        {
          imgUrl: this.$aliImg('steward/icon4.png'),
          label: '好邻里',
          page: '/pages/steward/4neighbours/index'
        },
        {
          imgUrl: this.$aliImg('steward/icon5.png'),
          label: '好案例',
          page: '/pages/steward/5case/index'
        },
      ])
    }
  }
}
</script>

<style lang='scss' scoped>
div {
  box-sizing: border-box;
}
.steward-wrap {
  height: calc(100vh - var(--safe-bottom));
  overflow-y: scroll;
  .top {
    background-image: url("https://hzslzx.oss-cn-hangzhou.aliyuncs.com/system/tianmu/images/top_bg.png");
    background-size: 100% 100%;
    padding: 40rpx 40rpx 80rpx;
    .logo {
      width: 150rpx;
      height: 150rpx;
      margin-bottom: 20rpx;
    }
    .title-img {
      width: 206rpx;
      height: 45rpx;
    }
    .title {
      font-family: FZCQJW--GB1-0;
      font-size: 40rpx;
      color: #fff;
    }
  }
  .content {
    background: #fff;
    border-radius: 40rpx 40rpx 0 0;
    margin-top: -40rpx;
    .icons {
      padding: 32rpx;
    }
    .icon {
      img {
        width: 134rpx;
        height: 114rpx;
      }
    }
    .part {
      padding: 0 32rpx 32rpx;
      .common {
        padding: 32rpx;
        background-size: 100% 100%;
        width: calc(50vw - 32rpx - 9rpx);
      }
      .part1 {
        height: 262rpx;
        width: 31%;
        @extend .common;
      }
      .part2 {
        height: 262rpx;
        width: 31%;
        @extend .common;
      }
      .part3 {
        height: 262rpx;
        width: 31%;
        @extend .common;
      }
    }
  }
  .swiper {
    height: 360rpx;
  }
  .swiper-item {
    box-shadow: 3px 2px 12px 8px rgba(17, 17, 17, 0.03);
    img {
      width: 686rpx;
      border-radius: 8rpx;
      height: 340rpx;
    }
    .title {
      color: #fff;
      position: absolute;
      left: 0;
      right: 22rpx;
      border-radius: 0 0 8rpx 8rpx;
      bottom: 0;
      background-image: linear-gradient(
        180deg,
        rgba(47, 46, 46, 0) 0%,
        rgba(0, 0, 0, 0.76) 99%
      );
      padding: 32rpx;
    }
  }
}
</style>
