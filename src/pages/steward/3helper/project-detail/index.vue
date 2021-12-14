<template>
  <div class='project-detail-wrap'
       @scroll="scroll">
    <div class="pt28 pb28 pl32 pr32 bg-white">
      <div>
        <svg-icon v-if="baseInfo.status !== 1 && baseInfo.isGrab && entrance === 'helper'"
                  icon="icon_qiangdan"
                  class="ft48 mr8"
                  style="color: #FA5A12"></svg-icon>
        <span class="flex1 ft40 bold">{{baseInfo.name}}</span>
      </div>
      <div class="ft26 color-666 pt24 pb24">
        <div class="pb8">
          <span>{{baseInfo.createTime && $moment(baseInfo.createTime).format('YYYY年MM月DD日')}}发布</span>
          <span v-if="baseInfo.status !== 1"
                class="ml48">{{baseInfo.communityParentOrgName}}{{baseInfo.communityOrgName}}发布</span>
        </div>
        <div v-if="baseInfo.status !== 1">
          <span>{{baseInfo.leadTime && $moment(baseInfo.leadTime).format('YYYY年MM月DD日')}}领办</span>
          <span class="ml48">{{projectLeadName}}</span>
        </div>
      </div>
      <div class="ft30 content">{{baseInfo.description}}</div>
    </div>
    <div v-if="baseInfo.status !== 1"
         class="line-block"></div>
    <div v-if="baseInfo.status !== 1"
         class="bg-white pt28">
      <div class="ft32 medium pl32 pr32">跟进记录</div>
      <div v-if="!$isEmpty(recordList)"
           class="record pt32 pl40 pr48">
        <div v-for="(item, index) in recordList"
             :key="index"
             class="record-item flex">
          <div class="step relative center-justify mr16">
            <div v-if="index === 0"
                 class="step-first">
              <svg-icon :icon="item.status === 3 ? 'icon_yiwancheng' : 'icon_shijian'"
                        class="ft40"
                        :class="item.status === 3 ? 'color-F58200' : 'color-999'"></svg-icon>
            </div>
            <div v-else
                 class="step-point"></div>
            <div v-if="index < recordList.length - 1"
                 class="step-line"></div>
          </div>
          <div class="flex1">
            <div class="between-row">
              <div class="ft30 medium"
                   :class="item.status === 3 && 'color-F58200'">
                {{item.status === 3 ? '已办结' : '跟进中'}}
              </div>
              <div v-if="isCanEdit"
                   class="edit-btn"
                   @click="onEdit(item)">
                <svg-icon icon="icon_bianji"
                          class="ft28 color-666"></svg-icon>
              </div>
            </div>
            <div class="ft26 pt16 pb16">{{item.description}}</div>
            <div class="ft24 color-999 pb24">{{$moment(item.recordTime).format('YYYY-MM-DD hh:mm:ss')}}</div>
            <div v-if="item.attachmentDTOList && item.attachmentDTOList.length > 0"
                 class="img-list flex pb28">
              <image v-for="(img, imgIndex) in item.attachmentDTOList"
                     :key="imgIndex"
                     mode="aspectFill"
                     class="img-item mr20"
                     :src="$fileHost + img.url"
                     @click="onShowBigImgView(imgIndex, item.attachmentDTOList)"></image>
            </div>
          </div>
        </div>
      </div>
      <div v-else
           class="center column"
           style="padding-top: 100rpx">
        <img :src="$aliImg('empty/no_data.png')"
             style="width: 332rpx;height: 256rpx;">
        <div class="color-999 ft28 mt16">暂无跟进记录</div>
      </div>
    </div>
    <publish-btn v-if="isCanEdit"
                 text="添加记录"
                 :isScroll="isScroll"
                 right="14rpx"
                 bottom="134rpx"
                 @onPublish="onPublish"></publish-btn>
    <div v-if="isUnitUser && baseInfo.status === 1"
         class="footer-btn pl32 pr32 center">
      <div class="receive-btn tc ft32"
           @click="onReceive">认领</div>
    </div>

    <div class="bg-white btn-wrap tb center"
         v-if="baseInfo.status === 3">
      <view class="trigger-area relative center-align pl32"
            @click.stop="onLike">
        <svg-icon :icon="baseInfo.isLike ? 'icon_shoucang' : 'icon_weishoucang'"
                  v-if="baseInfo.status === 2"
                  class="ft28 color-999 mr8 color-d2d2d2"></svg-icon>
        <svg-icon :icon="baseInfo.isLike ? 'icon_shoucang' : 'icon_weishoucang'"
                  v-else
                  class="ft28 color-999 mr8"
                  :class="baseInfo.isLike ? 'primary-color' : 'color-999'"></svg-icon>
        <text class="ft26"
              :class="baseInfo.isLike ? 'primary-color' : 'color-666'">{{baseInfo.likeQuantity}}</text>
      </view>
    </div>

    <receive-pop ref="receivePop"
                 v-if="isUnitUser && baseInfo.status === 1"
                 :isHall="entrance === 'hall'"></receive-pop>

  </div>
</template>
<script>
import PublishBtn from '@/pages/urban-rural/components/PublishBtn.vue'
import ReceivePop from '../components/ReceivePop.vue';
let timer = null
export default {
  methods: {
    // 点赞
    onLike () {
      if (this.$notMember()) return this.$goLogin()
      if (this.entrance === 'myTrends' && this.baseInfo.status === 2) return
      const baseInfo = this.baseInfo
      let { id, isLike, likeQuantity } = baseInfo
      const params = {
        journeyHelperProjectId: id,
      }
      baseInfo.isLike = !isLike
      const apiName = isLike ? 'cancelLikeGoodHelperProject' : 'likeGoodHelperProject'
      this.$api[apiName](params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.baseInfo.isLike = !isLike
        this.baseInfo.likeQuantity = isLike ? likeQuantity - 1 : likeQuantity + 1
      })
    },
    // 认领
    onReceive () {
      if (this.$notMember()) return this.$goLogin()
      const entrance = this.entrance
      this.$refs.receivePop.show({
        projectId: this.baseInfo.id,
        communityOrgId: entrance === 'helper' && this.baseInfo.communityOrgId,
        unitIds: entrance === 'hall' && this.unitIds
      })
    },
    // 新增跟进
    onPublish () {
      uni.navigateTo({
        url: `/pages/steward/3helper/add-record/index?projectId=${this.id}`
      })
    },
    // 编辑跟进
    onEdit (item) {
      uni.setStorageSync('journeyHelperProjectSchedule', JSON.stringify(item))
      uni.navigateTo({
        url: `/pages/steward/3helper/add-record/index?projectId=${this.id}&scheduleId=${item.id}`
      })
    },
    // 查看大图
    onShowBigImgView (index, imgList) {
      const urls = imgList.map(({ url }) => this.$fileHost + url)
      uni.previewImage({
        urls: urls,
        current: index,
      })
    },
    getJourneyHelperProjectDetail () {
      const params = {
        id: this.id
      }
      this.$api.getJourneyHelperProjectDetail(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.baseInfo = res.content
        this.recordList = this.baseInfo.journeyHelperProjectScheduleList || []
        // 从好帮手页面进入 认领方式不同
        if (this.entrance === 'helper') {
          this.getUnitListByCommunity()
        }
      })
    },
    getUnitListByCommunity () {
      const params = {
        communityOrgId: this.baseInfo.communityOrgId
      }
      this.$api.getUnitListByCommunity(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.unitIds = res.content || []
      })
    },
    setEvent () {
      uni.$on('helperProjectOver', () => {
        this.getJourneyHelperProjectDetail()
      })
    },
    clearEvent () {
      uni.$off('helperProjectOver')
    },
    scroll () {
      this.isScroll = true
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(() => {
        this.isScroll = false
      }, 800)
    },
  },
  data () {
    return {
      id: null,
      isScroll: false,
      entrance: null, $fileHost: this.$fileHost,
      baseInfo: {},
      recordList: []
    }
  },
  computed: {
    memberPersonalInfo () {
      return this.$store.state.user.memberPersonalInfo
    },
    // 是否共建单位用户
    isUnitUser () {
      return this.memberPersonalInfo.isUnitUser
    },
    startTime () {
      const { status, createTime, leadTime } = this.baseInfo
      let time = status === 1 ? createTime : leadTime
      let text = status === 1 ? '发布' : '领办'
      return this.$moment(time).format('YYYY年MM月DD日') + text
    },
    projectLeadName () {
      const { journeyHelperProjectLeadRecordList } = this.baseInfo
      if (!journeyHelperProjectLeadRecordList) return ''
      if (journeyHelperProjectLeadRecordList.length > 1) {
        return '由共建单位联合领办'
      }
      return `由${journeyHelperProjectLeadRecordList[0].journeyCoConstructionUnitName}领办`
    },
    isCanEdit () {
      return this.isUnitUser && this.baseInfo.status === 2
    }
  },
  destroyed () {
    this.clearEvent()
    window.removeEventListener('scroll', this.scroll)
  },
  onLoad ({ id, entrance }) {
    this.id = id
    this.entrance = entrance // helper | hall
    this.getJourneyHelperProjectDetail()
    this.setEvent()
    window.addEventListener('scroll', this.scroll)
  },
  components: {
    ReceivePop,
    PublishBtn
  },
}
</script>
<style>
page {
  height: 100%;
}
</style>
<style lang='scss' scoped>
.btn-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 98rpx;
}
.project-detail-wrap {
  padding-bottom: 150rpx;
  .content {
    text-align: justify;
  }
  .line-block {
    width: 100%;
    height: 24rpx;
    background: #f7f7f7;
  }
  .record {
    .record-item {
      .step {
        width: 40rpx;
        .step-first {
          position: relative;
          z-index: 1;
          width: 40rpx;
          height: 40rpx;
          background: #fff;
        }
        .step-point {
          position: relative;
          z-index: 1;
          width: 14rpx;
          height: 14rpx;
          border-radius: 50%;
          background: #eaeaea;
          margin-top: 15rpx;
          box-shadow: 0 0 0 15rpx #fff;
        }
        .step-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 1px;
          background: #eaeaea;
        }
      }
      .img-list {
        flex-wrap: nowrap;
        .img-item {
          width: 185rpx;
          height: 185rpx;
          border-radius: 8rpx;
        }
      }
    }
  }
  .footer-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 128rpx;
    background: #fff;
    .receive-btn {
      height: 98rpx;
      line-height: 98rpx;
      background: #e32417;
      border-radius: 50rpx;
      color: #fff;
      width: 100%;
    }
  }
  .color-F58200 {
    color: #f58200;
  }
}
</style>