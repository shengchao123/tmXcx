<template>
  <div class='resource-item-wrap mb20'
       @click="onNoteDetail">
    <div class="wrap">
      <div class="info clearfix">
        <img :src="fileHost + resourceItem.item.avatar"
             class="avatar mr16 fl">
        <div class="name fl">
          <div class="ft28 medium">{{resourceItem.item.nick}}</div>
          <div class="ft22 color-999 mt8">{{resourceItem.item.time}}</div>
        </div>
        <slot></slot>
        <div class="tag fr ft22 color-999">{{resourceItem.item.resourceTypeName}}</div>
      </div>
      <div class="content">
        <div class="bold ft34 mt24">{{resourceItem.item.title}}</div>

        <div class="relative">
          <div @click.stop>
            <u-read-more close-text="...展开"
                         @open="open"
                         font-size="24"
                         color="#E32417 "
                         text-indent="0"
                         :shadow-style="{backgroundImage: 'none'}"
                         show-height="80">
              <rich-text :nodes="resourceItem.item.content"></rich-text>
            </u-read-more>
          </div>
          <div class="click-wrap"></div>
        </div>

      </div>

      <div class="contact center-align ft26">
        <template v-for="obj in contactItems">
          <div class="mt16 item center-align"
               :key="obj.key"
               v-if="resourceItem.item[obj.key]">
            <div class="color-999">{{obj.label}}</div>
            <div>{{resourceItem.item[obj.key]}}</div>
          </div>
        </template>
      </div>
    </div>

    <view class="pl30 pr30 mb20">
      <ImgGroup :imgList="resourceItem.item.attachments"></ImgGroup>
    </view>

    <!-- 底部 点赞 分享 -->
    <view class="pl30 pr30">
      <ItemFooter :notesItem="resourceItem.item"
                  :notesIndex="resourceItem.index"
                  :entrance="entrance"
                  @setNotesItem="setNotesItem"></ItemFooter>
    </view>

    <SendCommentPopup ref="sendCommentPopup"></SendCommentPopup>
    <CommentListPopup ref="commentListPopup"></CommentListPopup>
  </div>
</template>

<script>
import ImgGroup from '@/pages/union/interact/components/ImgGroup'
import ItemFooter from '@/pages/union/interact/components/ItemFooter'
import SendCommentPopup from '@/pages/union/interact/components/SendCommentPopup'
import CommentListPopup from '@/pages/union/interact/components/CommentListPopup'
import { dateForHowLongBefore } from '@u/date.js'

export default {
  name: 'ResourceItem',
  methods: {
    onNoteDetail () {
      const { communityNoteId } = this.resourceItem.item
      uni.navigateTo({
        url: `/pages/union/interact/note-detail/index?communityNoteId=${communityNoteId}`
      })
    },
    setNotesItem (item, index) {
      this.$emit('setNotesItem', item, index)
    },
    onShowCommentListPopup (communityNoteId) {
      this.$refs.commentListPopup.show(communityNoteId)
    },
    onShowSendCommentPopup (communityNoteId) {
      this.$refs.sendCommentPopup.show(communityNoteId)
    }
  },
  components: { ImgGroup, ItemFooter, SendCommentPopup, CommentListPopup },
  provide () {
    return {
      onShowCommentListPopup: this.onShowCommentListPopup,
      onShowSendCommentPopup: this.onShowSendCommentPopup
    }
  },
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
    time () {
      return dateForHowLongBefore(this.resourceItem.item.time)
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
    padding: 30rpx;
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
}
</style>
