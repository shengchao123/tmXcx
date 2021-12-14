<template>
  <view class="pt20 relative">
    <view class="flex leave-msg">

      <div class="ft22"
           :class="msgData.messageType === '01' ? 'type1' : 'type2'"
           v-if="!isTalents">{{msgData.messageType === '01' ? '专家服务' : '社区服务'}}
      </div>

      <view class="mr16 relative">
        <img :src="avatar(msgData.memberAvatar)"
             class="head-img">
        <span class="msg-status ask-color">问</span>
      </view>
      <view class="msg-cont">
        <view class="between-row">
          <view>
            <view class="user-name">{{msgData.memberNick}}</view>
            <view class="user-time">{{$moment(msgData.contentTime).format('YYYY-MM-DD HH:mm:ss')}}</view>
          </view>
          <view class="replay"
                v-if="msgData.status === 1 && isTalents"
                @click="replayMsg(msgData.id)">回复TA</view>

        </view>
        <view class="content">{{msgData.content}}</view>
        <ImgGroup v-if="msgData.attachments"
                  class="mt16"
                  :imgList="attachments"></ImgGroup>
      </view>

    </view>
    <view class="flex leave-msg"
          v-if="msgData.status !== 1">
      <view class="mr16 relative">
        <img :src="avatar(msgData.journeyTalentsPhoto)"
             v-if="msgData.journeyTalentsPhoto"
             class="head-img">
        <img :src="$aliImg('steward/logo1.png')"
             v-else
             class="head-img">
        <span class="msg-status answer-color">答</span>
      </view>
      <view class="msg-cont"
            style="border:none">
        <view class="user-name"
              v-if="!isTalents">
          {{msgData.messageType === '02' ? msgData.replyerName + '社区' : msgData.replyerName}}</view>
        <view class="user-name"
              v-else>
          {{msgData.journeyTalentsName}}</view>
        <view class="user-time">{{$moment(msgData.replyTime).format('YYYY-MM-DD HH:mm:ss')}}</view>
        <view class="content">{{msgData.replyContent}}</view>
      </view>
    </view>
    <send-message ref="sendMessage"
                  @sendMsg="sendMsg"></send-message>

  </view>
</template>
<script>
import SendMessage from './SendMessage'
import ImgGroup from './ImgGroup'

export default {
  methods: {
    replayMsg (id) {
      this.$refs.sendMessage.show(id)
    },
    sendMsg () {
      this.$emit('getMsgStatus')
    }
  },
  props: {
    msgData: {
      type: Object,
      default: {}
    },
    isTalents: Boolean
  },
  computed: {
    attachments () {
      if (!this.msgData.attachments) return []
      return this.msgData.attachments.map(item => item.url)
    },
    // 文字颜色
    msgColor () {
      if (this.msgData.status === 1) return 'msg-status ask-color'
      return 'msg-status answer-color'
    },
    // 时间
    msgTime () {
      const msgData = this.msgData
      if (msgData.status === 1) return msgData.content
      return msgData.replyContent
    },
    // 头像,增加默认头像
    avatar () {
      return (avatar) => {
        const fileHost = this.$fileHost
        if (avatar) return fileHost + avatar
        return this.$aliImg('home/default-avatar.png')
      }
    }
  },
  components: { SendMessage, ImgGroup },
}
</script>
<style lang='scss' scoped>
.leave-msg {
  background: #ffffff;
  padding: 32rpx 30rpx 0 30rpx;
}
.head-img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
.msg-status {
  display: block;
  width: 56rpx;
  height: 26rpx;
  text-align: center;
  line-height: 26rpx;
  border-radius: 4rpx;
  font-size: 20rpx;
  color: #ffffff;
  position: absolute;
  top: 62rpx;
  left: 12rpx;
}
.ask-color {
  background: #74a3fd;
}
.answer-color {
  background: #63d35d;
}
.msg-cont {
  width: 100%;
  padding-bottom: 32rpx;
  border-bottom: 1px solid #e1e1e1;
  .replay {
    width: 128rpx;
    height: 52rpx;
    line-height: 52rpx;
    text-align: center;
    border: 1px solid #dedede;
    border-radius: 26rpx;
    font-size: 24rpx;
    color: #666666;
  }
  .user-name {
    font-size: 28rpx;
    font-weight: 600;
    color: #333333;
  }
  .user-time {
    font-size: 24rpx;
    color: #999999;
    margin-top: 12rpx;
  }
  .content {
    margin-top: 24rpx;
    font-size: 28rpx;
    color: #333333;
  }
}
.type1 {
  position: absolute;
  right: 0;
  top: 64rpx;
  background: #e3edff;
  color: #2671ff;
  padding: 8rpx 12rpx;
  border-radius: 4rpx 0 0 2rpx;
}
.type2 {
  position: absolute;
  right: 0;
  top: 64rpx;
  background: #ddf9d7;
  color: #51ac3d;
  padding: 8rpx 12rpx;
  border-radius: 4rpx 0 0 2rpx;
}
</style>