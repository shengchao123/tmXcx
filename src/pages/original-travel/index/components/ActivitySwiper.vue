<template>
  <div v-if="!$isEmpty(activityList)">
    <div class="line"></div>
    <div class="pt30">
      <div class="between-row center-align pl30 pr30">
        <div class="bold ft34">活动提醒</div>
        <div v-if="!$isEmpty(activityList)"
             class="color-999 ft24">{{ current }}/{{ activityList.length }}</div>
      </div>
      <div>
        <swiper class="swiper mt24"
                :class="swiperClass"
                :duration="1000"
                :interval="3000"
                :autoplay="true"
                :circular="true"
                @change="getSwiper">
          <swiper-item v-for="(item, index) in activityList"
                       :key="index"
                       class="swiper-item">
            <div class="activity-item mt16 ml30 mr30"
                 @click="onActivityDetail(item)">
              <div class="ft28 color-333 center-align">
                <div class="name ellipsis">{{ item.name }}</div>
                <div class="status-info ft20 ml8"
                     :style="{color: getStatusInfo(item).color, borderColor: getStatusInfo(item).color}">
                  {{getStatusInfo(item).text}}
                </div>
              </div>
              <div class="flex mt18">
                <image v-if="item.type === '02'"
                       mode="aspectFill"
                       class="mr16"
                       style="width: 160rpx;height: 119rpx; border-radius: 6rpx;"
                       :src="$fileHost + item.picUrl">
                </image>
                <div class="flex1">
                  <div class="ft26 flex mb12">
                    <svg-icon icon="icon_shijian"
                              class="ft26 color-999 mt4 mr8"></svg-icon>
                    <!-- <span class="color-999"
                          style="white-space: nowrap;">时间：</span> -->
                    <span class="ft24">{{activityTime(item)}}</span>
                  </div>
                  <div class="ft26 flex mb18">
                    <svg-icon icon="icon_lianmeng"
                              class="ft26 color-999 mt4 mr8"></svg-icon>
                    <!-- <span class="color-999"
                          style="white-space: nowrap;">组织：</span> -->
                    <span class="ft24">{{item.orgName}}</span>
                  </div>
                  <div class="ft20 color-999 mt4">
                    <u-count-down separator='zh'
                                  font-size="20"
                                  separator-size="20"
                                  separator-color="#999"
                                  color="#999"
                                  :show-seconds="false"
                                  :timestamp="timestamp(item)"></u-count-down>
                    <span>后报名截止</span>
                  </div>
                </div>
              </div>
            </div>
          </swiper-item>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import { statusMap } from '@/utils/enum.js'
import moment from 'moment'

export default {
  data () {
    return {
      activityList: [],
      current: 1, $fileHost: this.$fileHost,
      statusMap,
    };
  },
  methods: {
    getActivityList () {
      this.$api.getJourneyActivityList().then((res) => {
        if (res.isError) return this.$msg(res.message);
        const cont = res.content
        if (!cont) return
        this.activityList = cont.length > 0 ? cont.slice(0, 5) : []
      });
    },
    getSwiper (e) {
      this.current = e.detail.current + 1;
    },
    // 跳转活动详情
    onActivityDetail (item) {
      uni.navigateTo({ url: `/pages/union/interact/detail/index?id=${item.id}` })
    }
  },
  computed: {
    getStatusInfo () {
      return (item) => {
        return this.statusMap.get(item.status)
      }
    },
    // 轮播样式
    swiperClass () {
      if (this.activityList.length === 1) {
        return 'swiper-one'
      } else {
        return 'swipers'
      }
    },
    activityTime () {
      return (item) => {
        const { startTime, endTime } = item
        const sDay = moment(startTime).format('YYYY-MM-DD')
        const eDay = moment(endTime).format('YYYY-MM-DD')
        const eTime = moment(endTime).format('HH:mm')
        const newStartTime = moment(startTime).format('YYYY-MM-DD HH:mm')
        const newEndTime = moment(endTime).format('YYYY-MM-DD HH:mm')
        if (sDay === eDay) {
          return newStartTime + '~' + eTime
        }
        return newStartTime + '~' + newEndTime
      }
    },
    timestamp () {
      return (item) => {
        return Math.floor((item.endTime - new Date().getTime()) / 1000)
      }
    }
  },
  created () {
    this.getActivityList();
  },
};
</script>
<style lang="scss" scoped>
.line {
  width: 100%;
  background: #f7f7f7;
  height: 20rpx;
}
.swiper {
  height: 300rpx !important;
  .swiper-item {
    height: 300rpx !important;
    .activity-item {
      padding: 22rpx 24rpx;
      background: #ffffff;
      box-shadow: 3rpx 2rpx 12rpx 8rpx rgba(17, 17, 17, 0.03);
      border-radius: 6rpx;
      .status-info {
        border: 1px solid transparent;
        border-radius: 0 16rpx 0 16rpx;
        height: 32rpx;
        line-height: 32rpx;
        text-align: center;
        width: 88rpx;
      }
      .name {
        max-width: 532rpx;
      }
    }
  }
}
.swiper-one {
  /deep/.uni-swiper-slide-frame {
    width: 100% !important;
  }
}
.swipers {
  /deep/.uni-swiper-slide-frame {
    width: 100% !important;
  }
}
.activity-in {
  color: rgb(255, 179, 25);
}
.activity-ing {
  color: rgb(245, 64, 0);
}
.activity-over {
  color: rgb(153, 153, 153);
}
</style>
