<template>
  <div class='home-index-wrap relative'>

    <u-swiper :list="swiperList"
              height='388'
              class="swiper"></u-swiper>

    <div class="tc relative content-wrap">
      <img :src="$aliImg('home/00.png')"
           class="main-card">

      <template v-for="(item, index) in cardList">
        <div @click="onItem(item)"
             :key="index">
          <div class='item-wrap column center'
               :class="item.class">
            <img :src="item.img"
                 :style="{width: item.imgW + 'rpx', height:item.imgH + 'rpx'}"
                 object-fit="contain" />
            <div class="title mt16">{{item.text1}}</div>
            <div class="title">{{item.text2}}</div>
          </div>
        </div>
      </template>

      <div class="center wrap">
        <div class="qr-code-wrap mt32 row">
          <img :src="$aliImg('home/qrcode.jpeg')"
               alt="">
          <div class="right column ml16 ft26">
            <div>长按识别，关注「天目先锋」</div>
            <!-- <div class="mt16">“天目红盟”与您相约“云之家”</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    onItem (item) {
      if (item.needMember) {
        if (this.$notMember()) return this.$goLogin()
      }
      uni.navigateTo({ url: item.url })
    },
  },
  data () {
    return {
      swiperList: Object.freeze([
        {
          image: 'https://hzslzx.oss-cn-hangzhou.aliyuncs.com/system/tianmu/images/banner1.png',
        }
      ]),
      cardList: Object.freeze([
        {
          img: this.$aliImg('home/02.png'),
          text1: '初心之旅',
          text2: '一张图',
          imgW: 45,
          imgH: 45,
          class: 'class1',
          url: '/pages/original-travel/index/index'
        },
        {
          img: this.$aliImg('home/05.png'),
          text1: '组团发展',
          text2: '一联盟',
          imgW: 50, imgH: 45,
          class: 'class2',
          url: '/pages/union/index/index'
        },
        {
          img: this.$aliImg('home/01.png'),
          text1: '城乡融合',
          text2: '一社区',
          imgW: 50, imgH: 45,
          class: 'class3',
          url: '/pages/urban-rural/index/index'
        },
        {
          img: this.$aliImg('home/04.png'),
          text1: '乡村人才',
          text2: '一智库',
          imgW: 60, imgH: 45,
          class: 'class4',
          url: '/pages/think-tank/index/index'
        },
        {
          img: this.$aliImg('home/03.png'),
          text1: '基层治理',
          text2: '一管家',
          imgW: 50, imgH: 60,
          class: 'class5',
          url: '/pages/steward/index/index',
          needMember: true
        },
      ])
    }
  },
  onLoad (option) {
    if (option.masterOrgId) {
      uni.setStorageSync('masterOrgId', option.masterOrgId)
      uni.setStorageSync('orgId', option.masterOrgId)
    }
  },
}
</script>

<style lang='scss' scoped>
.class1 {
  position: absolute;
  left: 30rpx;
  top: 153rpx;
}
.class2 {
  position: absolute;
  left: 172rpx;
  top: 233rpx;
}
.class3 {
  position: absolute;
  left: 312rpx;
  top: 313rpx;
}
.class4 {
  position: absolute;
  right: 172rpx;
  top: 233rpx;
}
.class5 {
  position: absolute;
  right: 30rpx;
  top: 153rpx;
}
.home-index-wrap {
  background: url("https://hzslzx.oss-cn-hangzhou.aliyuncs.com/system/tianmu/images/home/bg.jpg")
    no-repeat 0 0;
  background-size: 100% 100%;
  position: absolute;
  width: 100vw;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  .swiper {
    margin: 24rpx 30rpx 0;
  }
  .main-card {
    height: 334rpx;
    width: 438rpx;
    margin-top: 32rpx;
  }
  .card {
    position: absolute;
    width: 128rpx;
  }

  .content-wrap {
    height: 752rpx;
  }
  .wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 32rpx;
    .qr-code-wrap {
      text-align: center;
      padding: 12rpx;
      background: #ffffff20;
      border-radius: 8px;
      color: #ffffff;
      img {
        width: 110rpx;
        height: 110rpx;
      }

      .right {
        justify-content: center;
      }
    }
  }
  .item-wrap {
    background-image: linear-gradient(90deg, #ffdb5d 21%, #ffca00 96%);
    border-radius: 8px;
    width: 128rpx;
    height: 178rpx;
    .title {
      font-family: PingFangSC-Regular;
      font-size: 24rpx;
      color: #333333;
    }
  }
}
</style>
