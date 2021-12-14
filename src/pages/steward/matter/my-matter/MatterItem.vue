<template>
  <div class='resource-item-wrap mb8'
       @click="onNoteDetail">
    <div class="wrap">
      <div class="info clearfix">
        <div class="relative">
          <img :src="fileHost + avatar"
               class="avatar mr16 fl">
          <span class="msg-status ask-color">问</span>
        </div>
        <div class="name fl">
          <div class="ft28 medium">{{resourceItem.item.memberName}}</div>
          <div class="ft22 color-999 mt8">{{time}}</div>
        </div>
      </div>
      <div class="content mt12">
        <div class="relative">
          <div @click.stop>
            <u-read-more close-text="...展开"
                         font-size="24"
                         color="#E32417 "
                         text-indent="0"
                         :shadow-style="{backgroundImage: 'none'}"
                         show-height="80">
              <rich-text :nodes="resourceItem.item.problemDesc"
                         class="ft28"></rich-text>
            </u-read-more>
          </div>
        </div>
      </div>
    </div>

    <view class="pl30 pr30">
      <ImgGroup :imgList="attachments"></ImgGroup>
    </view>

    <Record :itemData="resourceItem.item"
            v-if="resourceItem.item.status !== 0"></Record>
    <Divider></Divider>
  </div>
</template>

<script>
import ImgGroup from '@/pages/union/interact/components/ImgGroup'
import Record from './Record'
import Divider from '@/components/Divider'

export default {
  name: 'ResourceItem',
  methods: {
    onNoteDetail () {
      // const { communityNoteId } = this.resourceItem.item
      // uni.navigateTo({
      //   url: `/pages/union/interact/note-detail/index?communityNoteId=${communityNoteId}`
      // })
    }
  },
  components: { ImgGroup, Record, Divider },
  data () {
    return {
      contactItems: Object.freeze([
        {
          key: 'contactPerson',
          label: '联系人：'
        },
        {
          key: 'contactPhone',
          label: '电话：'
        },
        {
          key: 'weChatNumber',
          label: '微信：'
        }
      ])
    }
  },
  props: {
    entrance: String,
    resourceItem: Object
  },
  computed: {
    attachments () {
      return this.resourceItem.item.attachments.map(item => item.url)
    },
    avatar () {
      return this.$store.state.user.memberPersonalInfo.avatar
    },
    time () {
      return this.$moment(this.resourceItem.item.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    fileHost () {
      return this.$fileHost
    }
  }
}
</script>

<style lang='scss' scoped>
.resource-item-wrap {
  .click-wrap {
    position: absolute;
    top: 0;
    right: 100rpx;
    left: 0;
    bottom: 0;
  }
  .wrap {
    padding: 30rpx 30rpx 24rpx;
  }
  background: #ffffff;
  .info {
    .avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50rpx;
    }
  }
  .contact {
    flex-wrap: wrap;
    .item {
      width: 50%;
    }
  }
  /deep/ .u-content {
    color: #333333;
    font-size: 26rpx;
  }
  /deep/ .u-content__showmore-wrap {
    position: absolute;
    right: 0;
    top: 56rpx;
    background: #ffffff;
    width: 114rpx;
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
}
</style>
