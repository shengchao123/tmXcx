<template>
  <view v-if="detailInfo"
        class="detail-wrap flex1"
        :style="{paddingBottom: detailInfo && detailInfo.status === '01' ? '120rpx' : ''}">
    <u-swiper v-if="!$isEmpty(images)"
              :list="images"
              :height="swiperHeight"
              border-radius="0"></u-swiper>
    <view class="pl30 pr30 bg-white">
      <!-- 标题 -->
      <span class="title pt28 pb28 inline-block">
        <span class="ft32 color-333 medium mr20">{{detailInfo.name}}</span>
        <span class="status-info ft20 inline-block"
              :style="{color: getStatusInfo.color, borderColor: getStatusInfo.color}">{{getStatusInfo.text}}</span>
      </span>
      <!-- 表单列表 -->
      <view class="form-list">
        <view v-for="(item,index) in formList"
              :key="index"
              class="ft30 form-item flex pt28 pb28">
          <text class="color-333 medium">{{item.name}}</text>
          <view class="pl32 flex1 color-666">
            <text v-if="item.keyName === 'activityTime'">{{getTime}}</text>
            <div v-if="item.keyName === 'phone'">
              <span>{{detailInfo.phone}}</span>
              <svg-icon icon='icon_dianhua'
                        class="ml16"
                        @click="onCallPhone"
                        style="color:#518CFC;font-size:32rpx"></svg-icon>
            </div>
            <text
                  v-else-if="item.keyName === 'startTime'">{{moment(detailInfo.startTime).format('YYYY-MM-DD HH:mm')}}</text>
            <!-- <view v-else-if="item.keyName ==='address'"
                  class="between-row">
              <text class="color-666">{{detailInfo[item.keyName]}}</text>
              <view @click="onToMap">
                <svg-icon class="ding-wei"
                          icon="icon_dingwei"></svg-icon>
              </view>
            </view> -->
            <text
                  v-else-if="item.keyName === 'numberLimit'">{{detailInfo.numberLimit === -1 ? '不限制' : detailInfo.numberLimit}}</text>
            <text v-else>{{detailInfo[item.keyName]}}</text>
          </view>

        </view>
      </view>
    </view>
    <!-- 活动风采 -->
    <!-- 活动已结束才有活动风采 -->
    <view v-if="detailInfo && detailInfo.status === '03' && detailInfo.styleDescription"
          class="activity-style pt32 pb24 pl30 pr30 bg-white ft30 color-333 column mt20 mb32">
      <text class="bold">活动风采</text>
      <text class="pt20">{{detailInfo.styleDescription}}</text>
      <view class="mt16 imgs">
        <image v-for="(item,index) in imgList"
               :key="index"
               mode="aspectFill"
               class="img"
               :src="$sourceUrl(item.url)"
               @click="onShowBigImgView(index)"></image>
      </view>
    </view>
    <view v-if="detailInfo && detailInfo.status === '01'"
          class="footer bg-white center">
      <text class="btn center ft32 medium"
            :style="{background: detailInfo.isSignUp? '#fff':'#E32417',color: detailInfo.isSignUp ? '#E32417' : '#fff'}"
            @click="changeSignUpStatus">{{detailInfo.isSignUp ? '取消报名' : '我要报名'}}
      </text>
    </view>
  </view>
</template>
<script>
import moment from "moment"
import { statusMap } from '@/utils/enum.js'
export default {
  name: 'Detail',
  methods: {
    onCallPhone () {
      uni.makePhoneCall({
        phoneNumber: this.detailInfo.phone
      })
    },
    moment,
    onShowBigImgView (index) {
      const urls = this.imgList.map(url => this.$sourceUrl(url.url))
      uni.previewImage({
        urls: urls, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
        current: index, // 当前显示图片的http链接，默认是第一个
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
    onToMap () {
      uni.getLocation({
        type: 'gcj02', //返回可以用于uni.openLocation的经纬度
        success: function (res) {
          console.log(res);
          const latitude = res.latitude;
          const longitude = res.longitude;
          uni.openLocation({
            latitude: latitude,
            longitude: longitude,
            success: function () {
              console.log('success');
            }
          });
        }
      });
    },
    // 操作
    onAction () {
      const { isSignUp, id } = this.detailInfo
      const apiName = isSignUp ? 'cancelSignUpJourneyActivity' : 'signUpJourneyActivity'
      const msg = isSignUp ? '取消报名' : '报名'
      const params = {
        id,
        name: uni.getStorageSync('nick') || '',
        phone: uni.getStorageSync('phone') || ''
      }
      this.$api[apiName](params).then(res => {
        if (res.isError) {
          this.$msg(res.message)
          return
        }
        this.$msg(msg + '成功')
        this.getJourneyActivityDetail()
        uni.$emit('updateDataList')
      })
    },
    changeSignUpStatus () {
      if (this.$notMember()) return this.$goLogin();
      const { isSignUp, id } = this.detailInfo
      if (isSignUp) {
        uni.showModal({
          title: '要取消报名？',
          cancelText: "取消报名",
          confirmText: "不取消",
          confirmColor: '#E32417',
          success: ((res) => {
            if (!res.confirm) {
              this.onAction()
            }
          })
        })
        return
      }
      uni.navigateTo({ url: `/pages/original-travel/stroke-order/signUp?id=${id}&type=activity` })
    },
    getJourneyActivityDetail () {
      const params = {
        id: this.id
      }
      this.$api.getJourneyActivityDetail(params).then(res => {
        if (res.isError) {
          this.$msg(res.message)
          return
        }
        const { activityPicList } = res.content
        if (!this.$isEmpty(activityPicList)) {
          this.images = activityPicList.map(item => {
            return {
              image: this.$fileHost + item.url
            }
          })
        }
        this.detailInfo = res.content
      })
    }
  },
  data () {
    return {
      swiperHeight: (this.$windowWidth * (9 / 16)) * 2,
      images: [],
      formList: Object.freeze([
        {
          name: '组织单位',
          keyName: 'orgName'
        },
        {
          name: '联系方式',
          keyName: 'phone'
        },
        {
          name: '活动时间',
          keyName: 'activityTime'
        },
        {
          name: '报名截止',
          keyName: 'startTime'
        },
        {
          name: '活动地点',
          keyName: 'address'
        },
        {
          name: '活动人数',
          keyName: 'numberLimit'
        },
        {
          name: '报名人数',
          keyName: 'signUpQuantity'
        },
        {
          name: '活动介绍',
          keyName: 'introduction'
        },
      ]),
      id: '',
      statusMap,
      detailInfo: ''
    }
  },
  computed: {
    imgList () {
      if (this.$isEmpty(this.detailInfo)) return
      return this.detailInfo.attachmentList.filter(item => item.sourceType === '01')
    },
    getTime () {
      const { startTime, endTime } = this.detailInfo
      const sDay = moment(startTime).format('YYYY-MM-DD')
      const eDay = moment(endTime).format('YYYY-MM-DD')
      const eTime = moment(endTime).format('HH:mm')
      const newStartTime = moment(startTime).format('YYYY-MM-DD HH:mm')
      const newEndTime = moment(endTime).format('YYYY-MM-DD HH:mm')
      if (sDay === eDay) {
        return newStartTime + '~' + eTime
      }
      return newStartTime + '~' + newEndTime
    },
    getStatusInfo () {
      return this.statusMap.get(this.detailInfo.status)
    }
  },
  onLoad ({ id, title }) {
    this.id = id
  },
  onShow () {
    this.getJourneyActivityDetail()
  },
}
</script>
<style>
page {
  background: #f7f7f7;
  display: flex;
}
</style>
<style lang='scss' scoped>
.detail-wrap {
  .title {
    .status-info {
      vertical-align: top;
      margin-top: 6rpx;
      border: 1px solid transparent;
      border-radius: 0 16rpx 0 16rpx;
      height: 32rpx;
      line-height: 32rpx;
      text-align: center;
      width: 88rpx;
    }
  }
  .form-list {
    .form-item {
      border-top: 1px solid #eaeaea;
      .ding-wei {
        color: #0084f6;
      }
    }
  }
  .activity-style {
    .imgs {
      display: grid;
      grid-gap: 18rpx;
      grid-template-columns: 1fr 1fr 1fr;
      .img {
        width: 218rpx;
        height: 218rpx;
      }
    }
  }
  .footer {
    width: 100%;
    height: 120rpx;
    position: fixed;
    bottom: 0;
    .btn {
      width: calc(100% - 60rpx);
      height: 88rpx;
      border: 1px solid #e32417;
      border-radius: 49rpx;
      color: #e32417;
    }
  }
}
</style>