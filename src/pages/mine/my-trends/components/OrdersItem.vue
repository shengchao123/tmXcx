<template>
  <div class='orders-item-wrap pl32 pr32 pt32 pb32 mb24'>
    <div class="between-row">
      <div class="user center-align">
        <div class="user-head mr16">
          <img :src="$avatarUrl(item.avatar)">
        </div>
        <div class="column">
          <p class="ft28 mb8">{{item.nick}}</p>
          <p class="ft22 color-999">{{item.time}}</p>
        </div>
      </div>
      <div v-if="entrance === 'myDynamic'">
        <span v-show="item.status === 2"
              class="ft24 color-e32417">已隐藏</span>
      </div>
      <div v-else
           class="take-info center-align">
        <div class="ft22 color-999">{{item.ordersQuantity}}人已接单</div>
        <div v-if="!isMySelf"
             class="center-align ml24">
          <div v-if="item.haveOrder"
               class="taked pl24 ft24 color-666">我已接单</div>
          <div v-else
               class="take-btn tc color-e32417 ft24"
               @click="onOrders">我要接单</div>
        </div>
      </div>
    </div>
    <div class="center-align mt32 mb24">
      <div style="width: 250rpx">
        <span class="ft26 color-999">人数：</span>
        <span class="ft26">{{item.peopleQuantity}}人</span>
      </div>
      <div>
        <span class="ft26 color-999">游玩天数：</span>
        <span class="ft26">{{item.playDays}}天</span>
      </div>
    </div>
    <div v-if="item.contactPhone"
         class="center-align mb24">
      <span class="ft26 color-999">电话：</span>
      <span class="ft26">{{item.contactPhone}}</span>
      <div class="ml16"
           @click="onCall(item.contactPhone )">
        <svg-icon icon="icon_dianhua"
                  class="ft32"
                  style="color: #518CFC"></svg-icon>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div ref="contentBox"
           class="content-box"
           :class="isHideContent && 'hide-content'">
        <span ref="contentText"
              class="ft26 content-text">{{item.demand}}
        </span>
      </div>
      <view v-if="isShowExpand"
            class="expand center-flex"
            @click.stop="onExpandContent">
        <text class="ft24 color-e32417">...展开</text>
      </view>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  methods: {
    onCall (phone) {
      uni.showModal({
        title: '即将拨打电话',
        content: phone,
        success: function (res) {
          if (res.confirm) {
            uni.makePhoneCall({
              phoneNumber: phone
            })
          }
        }
      })
    },
    onOrders () {
      if (this.$notMember()) return this.$goLogin()
      if (!this.memberPersonalInfo.isMerchant) {
        uni.showModal({
          title: '需先申请商家展位才能接单',
          cancelText: "取消",
          confirmText: "去申请",
          confirmColor: '#E32417',
          success: function (res) {
            res.confirm && uni.navigateTo({ url: '/pages/urban-rural/experience/AddMerchantBooth' })
          }
        })
        return
      }
      const params = {
        journeyPlayCustomizationId: this.item.journeyPlayCustomizationId
      }
      this.$api.orderJourneyPlayCustomizationInfoById(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('已接单')
        this.$emit('resetList')
      })
    },
    onExpandContent () {
      this.isShowExpand = false
      this.isHideContent = false
    },
    async calculationHeight () {
      const boxHeight = await this.$getOffHeight('.content-box', this)
      const textHeight = await this.$getOffHeight('.content-text', this)
      this.isShowExpand = textHeight > boxHeight
    },
  },
  props: {
    item: Object,
    entrance: String
  },
  data () {
    return {
      isShowExpand: false,
      isHideContent: true
    }
  },
  computed: {
    memberPersonalInfo () {
      return this.$store.state.user.memberPersonalInfo
    },
    isMySelf () {
      return uni.getStorageSync('memberId') === this.item.memberId
    }
  },
  watch: {
    item: {
      handler: function () {
        this.$nextTick(() => {
          this.calculationHeight()
        })
      },
      immediate: true,
    }
  },
}
</script>
<style lang='scss' scoped>
.orders-item-wrap {
  background: #fff;
  .user-head {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .take-info {
    height: 68rpx;
    justify-content: flex-end;
    .take-btn {
      width: 144rpx;
      height: 56rpx;
      line-height: 56rpx;
      border-radius: 30rpx;
      border: solid 1px #e32417;
    }
    .taked {
      border-left: solid 1px #d2d2d2;
      line-height: 24rpx;
    }
  }
  .content {
    position: relative;
    .content-box {
      width: 100%;
      .content-text {
        line-height: 38rpx;
      }
    }
    .hide-content {
      max-height: 80rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .expand {
      position: absolute;
      right: 0;
      bottom: 2rpx;
      width: 90rpx;
      height: 35rpx;
      background: rgba(255, 255, 255, 1);
      letter-spacing: 2rpx;
    }
  }
}
</style>