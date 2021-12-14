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
        <span class="ft40 color-333 medium mr20">{{detailInfo.name}}</span>
      </span>
      <!-- 表单列表 -->
      <view class="form-list">
        <view v-for="(item,index) in formList"
              :key="index"
              :style="{borderTop: index === 0 ? 'none' : ''}"
              class="ft30 form-item flex pt28 pb28">
          <text class="color-333 medium">{{item.name}}</text>
          <view class="pl32 flex1 color-666">
            <text
                  v-if="item.keyName === 'createTime'">{{$moment(detailInfo.createTime).format('YYYY-MM-DD HH:mm:ss')}}</text>
            <text
                  v-else-if="item.keyName === 'endTime'">{{$moment(detailInfo.endTime).format('YYYY-MM-DD HH:mm') + '截止'}}</text>
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
    <view v-if="detailInfo && detailInfo.status === 1"
          class="footer bg-white center">
      <text class="btn center ft32 medium"
            :style="{background: '#E32417',color:  '#fff'}"
            @click="onAction">我要认领
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
      const params = { id: this.detailInfo.id }
      this.$api.claimedJourneyCommunityWish(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$msg('认领成功', 'success')
        setTimeout(() => {
          uni.$emit('claimSuccess', this.detailInfo.id)
          uni.navigateBack({ delta: 1 })
        }, 1500);
      })
    }
  },
  data () {
    return {
      swiperHeight: (this.$windowWidth * (9 / 16)) * 2,
      images: [],
      formList: Object.freeze([
        {
          name: '发布单位',
          keyName: 'communityOrgName'
        },
        {
          name: '联系方式',
          keyName: 'phone'
        },
        {
          name: '活动时间',
          keyName: 'createTime',
          type: 'time'
        },
        {
          name: '报名截止',
          keyName: 'endTime',
          type: 'time'
        },
        {
          name: '活动地点',
          keyName: 'address'
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
      if (this.$isEmpty(this.detailInfo) || this.$isEmpty(this.detailInfo.attachmentList)) return
      return this.detailInfo.attachmentList.filter(item => item.sourceType === '01')
    },
    getStatusInfo () {
      return this.statusMap.get(this.detailInfo.status)
    }
  },
  onLoad (option) {
    this.detailInfo = JSON.parse(decodeURIComponent(option.item));
  }
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