<template>
  <div class='porject-item-wrap bg-white pl32 pr32'
       @click="onDetail">
    <div class="pt32 pb32"
         :class="showBorder && 'bb'">
      <div class="center-align between-row">
        <div class="center-align">
          <div v-if="projectItem.status !== 1 && projectItem.isGrab && this.isHome"
               class="center mr8"
               style="width: 40rpx; height: 40rpx; background: #FA5A12; border-radius: 6rpx;">
            <span class="ft24 white-color">抢</span>
          </div>
          <div class="ft34 medium name ellipsis">{{projectItem.name}}</div>
          <div v-if="projectItem.status !== 1"
               class="center"
               style="height: 38rpx;">
            <svg-icon :icon="statusIcon.icon"
                      class="ml16"
                      style="font-size: 40rpx;"
                      :style="{color: statusIcon.color}"></svg-icon>
          </div>
        </div>
        <div v-if="isShowReceiveBtn"
             class="receive-btn tc ft24 color-e32417"
             @click.stop="onReceive">认领</div>
      </div>
      <div class="between-row center-align ft24 color-999 pt16 pb16">
        <div>
          <span style="margin-right: 56rpx">{{startTime}}</span>
        </div>
        <span v-if="isHome && isUnitUser && projectItem.status === 1"
              class="ft20 color-999">{{endTime}}</span>
      </div>
      <div class="between-row ft20 color-999">
        <span v-if="projectItem.status !== 1">{{projectLeadName}}</span>
        <span v-else-if="!isHome">{{projectReleaseName}}</span>
        <view class="trigger-area relative center-align pl32"
              @click.stop="onLike">
          <svg-icon :icon="projectItem.isLike ? 'icon_shoucang' : 'icon_weishoucang'"
                    v-if="projectItem.status === 2"
                    class="ft28 color-999 mr8 color-d2d2d2"></svg-icon>
          <svg-icon :icon="projectItem.isLike ? 'icon_shoucang' : 'icon_weishoucang'"
                    v-else
                    class="ft28 color-999 mr8"
                    :class="projectItem.isLike ? 'primary-color' : 'color-999'"></svg-icon>
          <text class="ft26"
                :class="projectItem.isLike ? 'primary-color' : 'color-666'">{{projectItem.likeQuantity}}</text>
        </view>
      </div>
      <div class="content">
        <div ref="contentBox"
             class="content-box"
             :class="isHideContent && 'hide-content'">
          <span ref="contentText"
                class="ft26 content-text">{{projectItem.description}}</span>
        </div>
        <view v-if="isShowExpand"
              class="expand center-flex"
              @click.stop="onExpandContent">
          <text class="ft24 color-e32417">...展开</text>
        </view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'projectItem',
  methods: {
    // 点赞
    onLike () {
      if (this.$notMember()) return this.$goLogin()
      if (this.entrance === 'myTrends' && this.projectItem.status === 2) return
      const projectItem = this.projectItem
      let { id, isLike, likeQuantity } = projectItem
      const params = {
        journeyHelperProjectId: id,
      }
      projectItem.isLike = !isLike
      const apiName = isLike ? 'cancelLikeGoodHelperProject' : 'likeGoodHelperProject'
      this.$api[apiName](params).then(res => {
        if (res.isError) return this.$msg(res.message)
        projectItem.isLike = !isLike
        projectItem.likeQuantity = isLike ? likeQuantity - 1 : likeQuantity + 1
        this.$emit('setProjectItem', projectItem, this.notesIndex)
      })
    },
    onDetail () {
      uni.navigateTo({
        url: `/pages/steward/3helper/project-detail/index?id=${this.projectItem.id}&entrance=helper`
      })
    },
    onReceive () {
      const projectId = this.projectItem.id
      this.$emit('onReceive', projectId)
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
    isHome: Boolean,
    isUnitUser: Boolean,
    projectItem: Object,
    notesIndex: Number,
    showBorder: Boolean
  },
  data () {
    return {
      isShowExpand: false,
      isHideContent: true
    }
  },
  computed: {
    isShowReceiveBtn () {
      // 1:待认领; 2:领办中; 3:已办结
      const { status } = this.projectItem
      return this.isUnitUser && status === 1
    },
    projectLeadName () {
      const { journeyHelperProjectLeadRecordList } = this.projectItem
      if (!journeyHelperProjectLeadRecordList) return ''
      if (journeyHelperProjectLeadRecordList.length > 1) {
        return '由共建单位联合领办'
      }
      return `由${journeyHelperProjectLeadRecordList[0].journeyCoConstructionUnitName}领办`
    },
    projectReleaseName () {
      const { communityParentOrgName, communityOrgName } = this.projectItem

      return `${communityParentOrgName}${communityOrgName}`
    },
    startTime () {
      const { status, createTime, leadTime } = this.projectItem
      let time = status === 1 ? createTime : leadTime
      let text = status === 1 ? '发布' : '领办'
      return this.$moment(time).format('YYYY-MM-DD') + text
    },
    endTime () {
      if (!this.isHome) return ''
      const { expiredTime } = this.projectItem
      const timeLeft = (expiredTime - new Date().getTime())
      const leave1 = timeLeft % (24 * 3600 * 1000)
      const leave2 = leave1 % (3600 * 1000)
      const day = Math.floor(timeLeft / (24 * 3600 * 1000))
      const hour = Math.floor(leave1 / (3600 * 1000))
      const minute = Math.floor(leave2 / (60 * 1000))
      let str = ''
      if (day) {
        str += day + '天'
      }
      if (hour) {
        str += hour + '小时'
      }
      if (!day) {
        str += minute + '分'
      }
      return str + '后转入领办大厅'
    },
    statusIcon () {
      return {
        icon: 'icon_yibanjie',
        color: '#F54000'
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.calculationHeight()
    })
  },
  created () {

  }
}
</script>
<style lang='scss' scoped>
.porject-item-wrap {
  .receive-btn {
    width: 128rpx;
    height: 56rpx;
    line-height: 56rpx;
    border-radius: 30rpx;
    border: solid 1px #e32417;
  }
  .name {
    max-width: 520rpx;
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
      -webkit-box-orient: vertical; // 点点点
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .expand {
      position: absolute;
      right: -8rpx;
      bottom: 4rpx;
      width: 90rpx;
      height: 35rpx;
      background: rgba(255, 255, 255, 1);
      letter-spacing: 2rpx;
    }
  }
}
</style>