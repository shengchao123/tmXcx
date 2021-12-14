<template>
  <view>
    <popup ref="sharePopup"
           height="324"
           radius="15"
           type="bottom">
      <view class="share_dialog flex column">
        <view class="flex1">
          <view class="imgs flex">
            <view v-if="shareBtns.includes('wx')"
                  class="center column imgs-item"
                  @click="guideShareType">
              <image :src="imgHost + 'pull-new/invite_icon01.png'" />
              <text class="mt8 ft24 color-666">微信</text>
            </view>
            <view v-if="shareBtns.includes('moments')"
                  @click="guideShareType"
                  class="center column imgs-item">
              <image :src="imgHost + 'pull-new/invite_icon02.png'" />
              <text class="mt8 ft24 color-666">朋友圈</text>
            </view>
            <view v-if="shareBtns.includes('copyLink')"
                  v-clipboard:copy="linkRender(shareData.link)"
                  v-clipboard:success="(type) => onCopyResult('success')"
                  v-clipboard:error="(type) => onCopyResult('error')"
                  class="center column imgs-item">
              <image :src="imgHost + 'pull-new/invite_icon03.png'" />
              <text class="mt8 ft24 color-666">复制链接</text>
            </view>
            <!-- TODO: 钉钉图标、钉钉配置-->
            <!-- <view @click="onDingDing"
                  class="center column">
              <image :src="imgHost + 'pull-new/invite_icon03.png'" />
              <text class="mt8 ft24">钉钉</text>
            </view> -->
            <!-- 微信H5 无法直接下载图片 -->
            <!-- <view @click="saveCanvas"
                  class="center column imgs-item"
                  v-if="savePoster">
              <div class="save-img">
                <svg-icon class="ft46 color-999"
                          icon="icon_baocundaoxiangce"></svg-icon>
              </div>
              <text class="mt8 ft24 color-666">保存到相册</text>
            </view> -->
            <view class="center column imgs-item"
                  v-if="shareBtns.includes('poster')">
              <image :src="imgHost + 'pull-new/invite_icon04.png'"
                     @click="createPoster" />
              <text class="mt8 ft24 color-666">生成图片</text>
            </view>
          </view>
          <view class="flex operate"
                v-if="isOperate">
            <view @click="onEdit"
                  class="center column imgs-item">
              <svg-icon icon="icon_bianji"
                        class="ft32"></svg-icon>
              <p class="mt8 ft24 color-666">编辑</p>
            </view>
            <view @click="onDelete"
                  class="center column imgs-item">
              <svg-icon icon="icon_shanchu"
                        class="ft32"></svg-icon>
              <p class="mt8 ft24 color-666">删除</p>
            </view>
          </view>
          <view @click="hide"
                class="cancel_btn center">
            <text class="medium ft28 secondary-text">取消</text>
          </view>
        </view>

      </view>
    </popup>
    <view @click="closeMask"
          v-if="guideShare"
          class="guide_share">
      <image :src="imgHost + 'pull-new/guide_share_bg.png'"
             alt="">
    </view>
    <view v-show="showPoster"
          class="poster"
          @click="onPoster">
      <div class="poster-box column">
        <div v-show="!posterCreateEnd && showPoster"
             class="center"
             style="width: 100%; height: 380rpx">
          <u-loading size="60"
                     mode="circle"
                     style="margin: 30rpx auto 0"></u-loading>
        </div>
        <div v-if="posterCreateEnd"
             class="img-box">
          <img ref="posterImg"
               class="img"
               :src="posterUrl"
               @touchend="downloadImg" />
        </div>
        <div v-show="posterCreateEnd"
             class="tip tc ft26 flex1 center">长按图片保存</div>
      </div>
    </view>
    <div class="home-btn center"
         v-show="showHomeBtn"
         @click.stop="onHome">
      <svg-icon class="ft40 color-999"
                icon="icon_shouye"></svg-icon>
    </div>
  </view>
</template>

<script>
import Popup from '@/components/slzx-popup/slzx-popup.vue'
import wx from 'weixin-js-sdk'			//微信sdk依赖
import html2canvas from "html2canvas";
const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
export default {
  data () {
    return {
      guideShare: false,
      showPoster: false,
      // savePoster: false,
      posterCreateEnd: false,
      posterUrl: ''
    }
  },
  methods: {
    show () {
      // this.$refs.sharePopup.show()
    },
    // 关闭分享弹窗
    hide () {
      this.guideShare = false
      this.showPoster = false
      // this.savePoster = false
      this.posterCreateEnd = false
      this.posterUrl = ''
      this.$refs.sharePopup.close()
    },
    onHome () {
      uni.switchTab({
        url: '/pages/home/index/index'
      })
    },
    // 编辑按钮
    onEdit () {
      this.$emit('onEdit')
      this.hide()
    },
    // 删除按钮
    onDelete () {
      this.$emit('onDelete')
      this.hide()
    },
    // 关闭分享弹窗
    cancelShare () {
      this.$emit('closeShare', false)
    },
    // 关闭引导分享
    closeMask () {
      this.guideShare = false
    },
    // 点击海报蒙版
    onPoster () {
      if (!this.posterCreateEnd) return
      this.hide()
    },
    onWeixin () {
      this.getConfig()
    },
    // 获取微信分享配置
    getConfig () {
      const url = this.shareData.link && this.shareData.link.split('#')[0] // 获取的是当前分享的页面
      const params = {
        url,
      }
      this.$api.getJSConfig(params).then(res => {
        if (res.isError) {
          this.$msg(res.message)
          return
        }
        if (!this.$isEmpty(res.content)) {
          this.wxShare(res.content)
        }
      })
    },
    wxShare ({ appId, timestamp, nonceStr, signature }) {
      const { title, desc, link } = this.shareData
      let shareLink = this.linkRender(link)
      const imgUrl = this.$isEmpty(this.shareData.imgUrl) ? this.$imgHost + 'share.png' : this.shareData.imgUrl
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名
        jsApiList: [ //需要调用的JS接口列表
          'updateAppMessageShareData', //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0） 新接口
          'updateTimelineShareData', //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0） 老接口
          // 'onMenuShareTimeline', //分享到朋友圈 老接口
          // 'onMenuShareAppMessage',//分享给盆友 老接口
          // 'getLocation'  //获取定位
        ]
      })
      // const that = this
      wx.ready(function () {
        // wx.checkJsApi({
        //   jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        //   success: function (res) {
        //     // alert(JSON.stringify(res))
        //     // 以键值对的形式返回，可用的api值true，不可用为false
        //     // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        //   }
        // })
        wx.updateAppMessageShareData({
          title, // 分享标题
          desc, // 分享描述
          link: shareLink, // 分享链接
          imgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          success: function () {
            // 用户确认分享后执行的回调函数
            // alert('111已分享');

          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            // alert('111已取消');
          }
        });
        wx.updateTimelineShareData({
          title, // 分享标题
          desc, // 分享描述
          link: shareLink, // 分享链接
          imgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          success: function () {
            // 用户确认分享后执行的回调函数
            // alert('222已分享');
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            // alert('222已取消');
          }
        });

      })
      wx.error(function (result) {
        // alert(JSON.stringify(result) + "微信验证失败");
        this.getConfig()
      });
    },
    // 引导分享
    guideShareType () {
      this.hide()
      this.guideShare = true
    },
    // 复制结果
    onCopyResult (type) {
      if (type === 'success') {
        this.$msg('复制成功')
        this.hide()
      } else {
        this.$msg('复制失败')
      }
    },
    onDingDing () {
      const { title, content, image, url } = this.shareData
      dd.ready(() => {
        dd.biz.navigation.setRight({
          show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
          control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
          text: '...',//控制显示文本，空字符串表示显示默认文本
          onSuccess: function (result) {
            // console.log(666, result)
            //如果control为true，则onSuccess将在发生按钮点击事件被回调
            dd.biz.util.share({
              type: 0, //分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
              url,
              content,
              title,
              image,
              onSuccess: function () {
                //onSuccess将在分享完成之后回调
                /**/
              },
              onFail: function (err) { }
            })
          },
          onFail: function (err) { }
        });
      })

    },
    // 生成海报
    createPoster () {
      this.$emit('posterDrawStart')
      this.$emit('scrollToTop')
      this.showPoster = true
      // this.savePoster = true
      this.posterCreateEnd = false
      const posterEl = document.getElementById('posterView')
      setTimeout(() => {
        html2canvas(posterEl, { y: isiOS ? 160 : 0 }).then((canvas) => {
          this.posterCreateEnd = true
          this.posterUrl = canvas.toDataURL("image/png");
          console.log('生成了图片')
        });
      }, 200)
    },
    // 下载图片
    downloadImg () {
      // #ifdef APP-PLUS
      let dtask = null;
      dtask = plus.downloader.createDownload(this.posterUrl, {}, function (d, status) {
        // 下载完成
        if (status == 200) {
          console.log("Download success: " + d.filename);
        } else {
          console.log("Download failed: " + status);
        }
      });
      //dtask.addEventListener("statechanged", onStateChanged, false);
      dtask.start();
      // #endif
      let a = document.createElement('a');
      a.download = this.posterUrl;
      a.href = this.posterUrl;
      a.target = '_blank';
      a.click();
    },
    // 保存海报
    // saveCanvas () {
    //   let a = document.createElement('a')
    //   document.body.appendChild(a);
    //   a.setAttribute('download', '海报')
    //   a.href = this.posterUrl
    //   a.click()
    // },
    linkRender (link) {
      if (!link) return ''
      let shareLink = link
      if (!link.includes('masterOrgId')) {
        const separator = link.includes('?') ? '' : '?'
        const masterOrgId = uni.getStorageSync('masterOrgId')
        shareLink = link + separator + '&masterOrgId=' + masterOrgId
      }
      return shareLink
    },
  },
  props: {
    posterType: {
      type: String,
      default: 'group'
    },
    shareData: {
      type: Object,
      default: () => { }
    },
    shareBtns: {
      type: String,
      default: 'wx moments copyLink'
    },
    isOperate: {
      type: Boolean,
      default: false
    },
    sharePath: {//分享的当前页面地址
      type: String,
      default: ''
    },
    shareParams: {//分享请求参数
      type: [String, Object],
      default: ''
    },
    posterData: {//开团海报数据
      type: Object,
      default: () => { }
    },
    showHomeBtn: Boolean
  },
  computed: {
    imgHost () {
      return this.$imgHost
    }
  },
  watch: {
    shareData: {
      handler (val) {
        !this.$isEmpty(val) && this.getConfig()
      },
      immediate: true
    }
  },
  components: { Popup }
}
</script>
<style lang="scss" scoped>
page {
  width: 100%;
}
.share-btn {
  width: 95rpx;
  height: 95rpx;
  background: transparent;
  margin: 0 !important;
  padding: 0 !important;
}

.share_dialog {
  border-radius: 30rpx 30rpx 0rpx 0rpx;
  background: #f2f2f2;
  padding-top: 50rpx;
  z-index: 50;
}

.imgs {
  margin-bottom: 50rpx;
  padding: 0 60rpx;
  image {
    width: 88rpx;
    height: 88rpx;
  }
}
.imgs-item {
  width: 120rpx;
  margin-right: 50rpx;
  &:nth-of-type(4n) {
    margin-right: 0;
  }
}
.cancel_btn {
  height: 94rpx;
  background: #fff;
}

.icon-operate {
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  background: #ffffff;
}
.guide_share {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.75);
  z-index: 10001;
  image {
    position: absolute;
    right: 0rpx;
    top: 28rpx;
    width: 618rpx;
    height: 272rpx;
  }
}
.operate {
  padding: 0 60rpx 50rpx;
}
.mr87 {
  margin-right: 87rpx;
}
.ft46 {
  font-size: 46rpx;
}
.poster {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10075;
  .poster-box {
    width: 600rpx;
    box-sizing: border-box;
    padding: 20rpx 20rpx 0 20rpx;
    height: 55vh;
    margin: 50rpx auto;
    border-radius: 6rpx;
    background: #fff;
    .img-box {
      width: 100%;
      height: 48vh;
      box-shadow: 3rpx 2rpx 12rpx 8rpx rgba(0, 0, 0, 0.03);
      overflow: scroll;
      .img {
        width: 100%;
        height: auto;
      }
    }
    .tip {
      color: #518cfc;
    }
  }
}
.save-img {
  width: 88rpx;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  background: #ffffff;
  border-radius: 50%;
}
.home-btn {
  position: fixed;
  bottom: 140rpx;
  right: 16rpx;
  width: 98rpx;
  height: 98rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 4rpx 6rpx 8rpx 0 rgba(0, 0, 0, 0.25);
}
</style>
