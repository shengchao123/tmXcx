<template>
  <div v-if="baseInfo.id"
       class='detail-wrap'
       @click="onPage">
    <div id="posterView">
      <head-map :journeyLineName="baseInfo.journeyLineName"
                :journeyPointList="journeyPointList"
                :isDetail="true"></head-map>
      <detail-info :list="topList"></detail-info>
      <div class="line"></div>
      <detail-info :list="bottomList"></detail-info>
      <div class="pb24 bg-white"
           @click="onSignUpList">
        <div class="cenetr-align flex pt24 pl30 pr30">
          <div class="ft30 bold"
               style="width: 220rpx;">参与人员</div>
          <div class="between-row center-align flex1">
            <div class="ft30 color-666">{{signUpList.length}}人</div>
            <svg-icon v-if="!$isEmpty(signUpList)"
                      icon="icon_xiangyoujiantou"
                      class="ft20 color-999 ml8"></svg-icon>
          </div>
        </div>
        <!-- <div v-if="!$isEmpty(signUpList)"
           class="center-align pr30">
        <div class="sign-up-list">
          <div v-for="(item, index) in signUpList"
               :key="index"
               class="head-img ml32">
            <img class="img"
                 :src="$avatarUrl(avatar)" />
          </div>
        </div>
        <div v-if="signUpList.length > 6"
             class="mb12 ft26 color-666">···</div>
      </div> -->
        <!-- <div v-else
           class="ft26 color-999 pl30">暂时还没有人报名参加该行程～</div> -->
      </div>
    </div>
    <div class="footer pl30 pr30 between-row center-align">
      <div v-if="baseInfo.isOrganizer"
           @click="onShare">
        <!-- <div class="icon-btn center-align column color-666"
             @click="onEdit">
          <svg-icon icon="icon_bianji"
                    class="ft34"></svg-icon>
          <div class="ft20 mt14">编辑</div>
        </div>
        <div class="icon-btn center-align column color-666"
             @click="onDelete()">
          <svg-icon icon="icon_shanchu"
                    class="ft34"></svg-icon>
          <div class="ft20 mt14">删除</div>
        </div> -->
        <svg-icon icon="icon_diandian"
                  class="ft34"></svg-icon>
      </div>
      <div v-else
           class="icon-btn center-align column color-666"
           @click="onShare">
        <svg-icon icon="icon_zhuanfa"
                  class="ft34"></svg-icon>
        <div class="ft20 mt14">分享</div>
      </div>

      <div class="center-align"
           style="justify-content: flex-end">
        <div class="center-align">
          <div class="border-btn ft28 tc mr24 medium"
               @click="onComment">评价</div>
          <div v-if="baseInfo.needLifeDocumentary"
               class="ft28 tc medium"
               :class="baseInfo.hasLifeRecord ? 'border-btn w272' : 'confirm-btn'"
               @click="onLifeDocumentary">{{baseInfo.hasLifeRecord ? '查看' : '填写'}}组织生活记录</div>
        </div>
        <div v-if="isShowJoinBtn"
             class="ft28 tc medium w184 ml24"
             :class="baseInfo.isSignUp ? 'border-btn' : 'confirm-btn'"
             @click="onSignUp">{{baseInfo.isSignUp ? '取消报名' : '我要报名'}}</div>
      </div>
    </div>
    <u-modal v-model="showDeleteTip"
             border-radius="24"
             width="540"
             title="要删除该行程单？"
             content="删除后不可恢复"
             :title-style="{fontSize: '32rpx', color: '#333', fontWeight: 600}"
             :content-style="{fontSize: '26rpx', color: '#999', paddingTop: '28rpx'}"
             :show-cancel-button="true"
             confirm-text="删除"
             cancel-text="先留着"
             confirm-color="#F44000"
             cancel-color="#333333"
             @confirm="onDelete(true)"></u-modal>
    <share-dialog ref="shareDialog"
                  shareBtns="wx moments copyLink poster"
                  :isOperate="baseInfo.isOrganizer"
                  :shareData="shareData"
                  :showHomeBtn="showHomeBtn"
                  @scrollToTop="scrollToTop"
                  @onEdit="onEdit"
                  @onDelete="onDelete"></share-dialog>
  </div>
</template>
<script>
import HeadMap from './components/HeadMap.vue'
import { playTimeNameMap, activityNameMap, transportationNameMap } from '@/utils/enum'
import moment from "moment"
import DetailInfo from './components/DetailInfo.vue'
import ShareDialog from '@/pages/components/ShareDialog.vue'
import shareMixin from '@/mixins/share.js'
export default {
  methods: {
    onSignUpList () {
      const signUpList = this.signUpList
      if (signUpList.length <= 0) return
      uni.setStorageSync('signUpList', JSON.stringify(signUpList))
      uni.navigateTo({
        url: '/pages/original-travel/stroke-order/signUpList'
      })
    },
    // 编辑
    onEdit () {
      uni.navigateTo({
        url: `/pages/original-travel/stroke-order/index?isEdit=1&&id=${this.id}`
      })
    },
    // 删除
    onDelete (isDelete) {
      if (!isDelete) {
        this.showDeleteTip = true
        return
      }
      const params = {
        id: this.id
      }
      this.$api.removeJourneyItinerary(params).then(res => {
        if (res.isError) return this.$mmsg(res.message)
        this.$msg('删除成功')
        setTimeout(() => {
          uni.navigateBack()
        }, 500)
      })

    },
    // 分享
    onShare () {
      this.$refs.shareDialog.show()
    },
    // 去评价
    onComment () {
      if (this.$notMember()) return this.$goLogin()
      const { id, name } = this.baseInfo
      const url = `/pages/original-travel/evaluation/index?id=${id}&name=${name}`
      uni.navigateTo({ url })
    },
    // 去填写组织生活记录
    onLifeDocumentary () {
      if (this.$notMember()) return this.$goLogin()
      const { id, name, hasLifeRecord } = this.baseInfo
      const writeLifeUrl = `/pages/mine/org-life-record/index?id=${id}&name=${name}`
      const lifeRecordUrl = `/pages/mine/org-life-record/Detail?id=${id}`
      const url = hasLifeRecord ? lifeRecordUrl : writeLifeUrl
      uni.navigateTo({ url })
    },
    // 报名
    onSignUp () {
      if (this.$notMember()) return this.$goLogin()
      const id = this.id
      if (!this.baseInfo.isSignUp) {
        uni.navigateTo({
          url: `/pages/original-travel/stroke-order/signUp?id=${id}&type=stroke`
        })
        return
      }
      this.$api.cancelSignUpJourneyItinerary({ id }).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('取消成功')
        this.getJourneyItineraryById()
      })

    },
    getJourneyItineraryById () {
      const id = this.id
      if (!id) return
      const params = {
        id
      }
      this.$api.getJourneyItineraryById(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        const { journeyPointList, signUpList, journeyLineId } = res.content
        if (!journeyLineId) {
          res.content.journeyLineName = '自定义路线'
        }
        this.baseInfo = res.content
        this.journeyPointList = journeyPointList
        this.signUpList = signUpList || []
        this.getShareData()
      })

    },
    getShareData () {
      const { name, journeyLineName } = this.baseInfo
      this.shareData = {
        path: this.$getCurrentRoute().fullPath,
        title: name,
        desc: journeyLineName,
      }
    }
  },
  data () {
    return {
      id: null,
      showDeleteTip: false,
      baseInfo: {},
      journeyPointList: [],
      signUpList: [],
      shareData: {}
    }
  },
  computed: {
    isShowJoinBtn () {
      const { isOrganizer, setOutTime, isSignUp } = this.baseInfo
      const nowTime = new Date().getTime()
      const isAlreadyStarted = nowTime >= setOutTime
      if (isAlreadyStarted) return false
      return true
    },
    topList () {
      const { playTime, activityType, needLifeDocumentary } = this.baseInfo
      return [
        { label: '预估时长', content: playTimeNameMap.get(playTime) },
        { label: '活动类型', content: activityNameMap.get(activityType) },
        { label: '组织生活记录', content: needLifeDocumentary ? '需要' : '不需要' },
      ]
    },
    bottomList () {
      const { name, organizer, contactDetails, meetingPlace, setOutTime, transportation, precautions } = this.baseInfo
      return [
        { label: '名称', content: name },
        { label: '召集人', content: organizer },
        { label: '联系方式', content: contactDetails },
        { label: '集合地点', content: meetingPlace },
        { label: '出发日期', content: moment(setOutTime).format('YYYY-MM-DD HH:mm:ss') },
        { label: '交通方式', content: transportationNameMap.get(transportation) },
        { label: '温馨提示', content: precautions || null },
      ]
    }
  },
  onShow () {
    this.getJourneyItineraryById()
  },
  onLoad (option) {
    this.id = option.id
  },
  mixins: [shareMixin],
  components: { HeadMap, DetailInfo, ShareDialog }
}
</script>
<style lang='scss' scoped>
.detail-wrap {
  color: #333;
  height: 100%;
  background: #f7f7f7;
  padding-bottom: 152rpx;
  .sign-up-list {
    height: 80rpx;
    overflow-y: hidden;
    .head-img {
      display: inline-block;
      width: 80rpx;
      height: 80rpx;
      border-radius: 40rpx;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    height: 112rpx;
    z-index: 2;
    border-top: solid 1px #eaeaea;
    .left-btns {
      max-width: 220rpx;
      .icon-btn {
        width: 50rpx;
      }
    }
    .border-btn {
      width: 112rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 44rpx;
      border: solid 1px #e32417;
      color: #e32417;
    }
    .confirm-btn {
      width: 272rpx;
      height: 80rpx;
      line-height: 80rpx;
      background: #e32417;
      border-radius: 44rpx;
      color: #fff;
    }
  }
  .w272 {
    width: 272rpx !important;
  }
  .w184 {
    width: 184rpx !important;
  }
  .line {
    width: 100%;
    height: 20rpx;
    background: #f7f7f7;
  }
}
</style>