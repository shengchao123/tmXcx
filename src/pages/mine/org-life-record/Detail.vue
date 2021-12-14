<template>
  <view class="life-wrap"
        @click="onPage">
    <div id="posterView">
      <view class="tb pl30 pr30 bg-white content-wrap">
        <view class="flex bb pt24 pb24 ft28 color-333 content-item"
              v-for="(item,index) in lifeInfoProp"
              :key="index">
          <text class="w168 bold">{{item.name}}</text>
          <text class="pl24 flex1">{{lifeDataText(item.prop)}}</text>
        </view>
      </view>
      <view class="mt20 pl30 pr30 bg-white content-wrap">
        <view class="center-align bb pt24 pb24 ft28 color-333 content-item"
              v-for="(item,index) in numInfoProp"
              :key="index">
          <text class="w168 bold">{{item.name}}</text>
          <text class="pl24">{{lifeData[item.prop]}}</text>
        </view>
      </view>
      <view class="mt20 pl30 pr30 bg-white content-wrap">
        <view class="column bb pt24 pb32 ft28 color-333 content-item"
              v-for="(item,index) in nameInfoProp"
              :key="index">
          <text class="bold pb24">{{item.name}}</text>
          <text class="h78">{{lifeData[item.prop]}}</text>
        </view>
      </view>
      <view class="mt20 pl30 pr30 bg-white">
        <view class="column pt24 pb24 ft28 color-333">
          <text class="bold pb24">活动内容及决议</text>
          <text class="activity-content">{{lifeData.activityContent}}</text>
          <!-- <view class="color-999 ft22 experience-count mt8">{{lifeData.activityContent.length}}/1000</view> -->
        </view>
      </view>
      <line-clock v-if="lifeData.isShowSignIn"
                  ref="lineClock"
                  clockPageType="detail"
                  :isShowSignIn.sync="lifeData.isShowSignIn"
                  :journeyItineraryId="journeyItineraryId"></line-clock>
    </div>
    <view class="center-align bg-white pl30 pr30 save-btn between-row tb">
      <view class="center-align ft20 color-666 flex1"
            v-if="lifeData.isSelf">
        <view class="column m-bianji"
              @click="onEdit">
          <svg-icon icon="icon_bianji"
                    class="ft36 mb12"></svg-icon>
          <text>编辑</text>
        </view>
        <view class="column"
              @click="isDelShow = true">
          <svg-icon icon="icon_shanchu"
                    class="ft36 mb12"></svg-icon>
          <text>删除</text>
        </view>
      </view>
      <u-button @click="onShare"
                :custom-style="btnStyle">分享</u-button>
    </view>
    <u-modal v-model="isDelShow"
             width="540"
             title="要删除该组织生活记录？"
             content="删除后不可恢复"
             border-radius="24"
             :show-cancel-button="true"
             confirm-text="删除"
             cancel-text="先留着"
             cancel-color="#333"
             confirm-color="#F44000"
             :title-style="maskTitleStyle"
             :content-style="maskContentStyle"
             :cancel-style="maskCancelStyle"
             :confirm-style="maskConfirmStyle"
             @confirm="onDelete"></u-modal>
    <share-dialog ref="shareDialog"
                  shareBtns="wx moments copyLink poster"
                  :showHomeBtn="showHomeBtn"
                  :shareData="shareData"
                  @scrollToTop="scrollToTop"
                  @posterDrawStart="posterDrawStart"></share-dialog>
  </view>
</template>

<script>
import ShareDialog from '../../components/ShareDialog.vue'
import LineClock from './LineClock.vue'
import shareMixin from '@/mixins/share.js'
export default {
  name: 'Detail',
  methods: {
    //预览图片
    previewImage (index) {
      const urls = [];
      this.lifeData.attachmentList.forEach((item) => {
        urls.push(this.$sourceUrl(item.url));
      })
      uni.previewImage({
        current: urls[index],
        urls: urls,
        indicator: "number"
      })
    },
    posterDrawStart () {
      const lineClock = this.$refs.lineClock
      if (lineClock) {
        lineClock.isLineAllShow = true
      }
    },
    // 分享
    onShare () {
      this.$refs.shareDialog.show()
    },
    // 编辑
    onEdit () {
      const pageParams = `pageType=edit&id=${this.journeyItineraryId}&name=${this.lifeData.journeyItineraryName}`
      uni.navigateTo({ url: `/pages/mine/org-life-record/index?${pageParams}` })
    },
    // 删除
    onDelete () {
      const params = {
        journeyItineraryId: this.journeyItineraryId
      }
      this.$api.removeJourneyLifeDocumentary(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('删除成功')
        setTimeout(() => {
          uni.navigateBack()
        }, 500)
      })
    },
    getShareData () {
      const { journeyItineraryName, activityExperience } = this.lifeData
      this.shareData = {
        path: this.$getCurrentRoute().fullPath,
        title: journeyItineraryName,
        desc: activityExperience,
      }
    },
    // 根据行程单id获取生活纪实
    getJourneyLifeDocumentaryByItineraryId () {
      const id = this.journeyItineraryId
      if (!id) return
      const params = {
        journeyItineraryId: id
      }
      this.$api.getJourneyLifeDocumentaryByItineraryId(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.lifeData = res.content
        this.getShareData()
      })
    }
  },
  data () {
    return {
      journeyItineraryId: null,
      lifeInfoProp: Object.freeze([
        {
          prop: 'type',
          name: '类型'
        },
        {
          prop: 'date',
          name: '时间'
        },
        {
          prop: 'address',
          name: '地点'
        },
        {
          prop: 'host',
          name: '主持人'
        },
        {
          prop: 'recorder',
          name: '记录人'
        }
      ]),
      numInfoProp: Object.freeze([
        {
          prop: 'shouldNumber',
          name: '应到人数'
        },
        {
          prop: 'flowNumber',
          name: '流动党员和行动不便党员数'
        },
        {
          prop: 'actualNumber',
          name: '实到人数'
        }
      ]),
      nameInfoProp: Object.freeze([
        {
          prop: 'attendees',
          name: '到会人员'
        },
        {
          prop: 'superiors',
          name: '到会指导的上级领导'
        },
        {
          prop: 'absentPerson',
          name: '缺席人员及原因'
        }
      ]),
      lifeData: {
        activityContent: ''
      },
      isDelShow: false,
      shareData: {}
    }
  },
  onShow () {
    if (this.$notMember()) return this.$goLogin()
    this.getJourneyLifeDocumentaryByItineraryId()
  },
  onLoad (option) {
    this.journeyItineraryId = option.id
  },
  watch: {
    journeyItineraryId (val) {
      if (val) this.getJourneyLifeDocumentaryByItineraryId()
    }
  },
  computed: {
    lifeDataText () {
      return (val) => {
        const { date } = this.lifeData
        if (val === 'date') return this.$moment(date).format('YYYY-MM-DD')
        return this.lifeData[val]
      }

    },
    btnStyle () { // 自定义按钮样式
      const temWidth = this.lifeData.isSelf ? '330rpx' : '690rpx'
      const temStyle = {
        fontSize: '30rpx',
        color: '#E32417',
        width: temWidth,
        height: '88rpx',
        borderRadius: '44rpx',
        fontWeight: 'bold',
        border: '1px solid #E32417',
        background: '#fff'
      }
      return temStyle
    },
    maskTitleStyle () { // 自定义modal-title样式
      const temStyle = {
        fontSize: '32rpx',
        color: '#333',
        paddingTop: '58rpx',
        fontWeight: 'bold',
      }
      return temStyle
    },
    maskContentStyle () { // 自定义modal-content样式
      const temStyle = {
        fontSize: '26rpx',
        color: '#999',
        padding: '28rpx 0 58rpx'
      }
      return temStyle
    },
    maskCancelStyle () { // 自定义modal-cancel样式
      const temStyle = {
        fontSize: '32rpx',
        borderRight: '1px solid #EAEAEA'
      }
      return temStyle
    },
    maskConfirmStyle () { // 自定义modal-confirm样式
      const temStyle = {
        fontSize: '32rpx',
        borderRadius: '24rpx'
      }
      return temStyle
    }
  },
  mixins: [shareMixin],
  components: { LineClock, ShareDialog },
}
</script>


<style lang='scss' scoped>
page {
  background: #f7f7f7;
  height: 100%;
}
.w168 {
  width: 168rpx;
}
.h78 {
  min-height: 78rpx;
}
.m-bianji {
  margin: 0 124rpx 0 66rpx;
}
.content-wrap {
  .content-item:last-child {
    border-bottom: 0;
  }
}
.life-wrap {
  padding-bottom: 152rpx;
  overflow: auto;
  .activity-content {
    min-height: 320rpx;
    // overflow: auto;
  }
  .experience-count {
    height: 22rpx;
    line-height: 22rpx;
    text-align: right;
  }
}
.save-btn {
  height: 120rpx;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
