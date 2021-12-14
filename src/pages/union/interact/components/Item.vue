<template>
  <view class='notes-list-item-wrap mb20'
        @click="onNoteDetail">
    <!-- 头像/昵称 -->
    <view class="head pl30 pr30 mb16">
      <view class="center-align">
        <view class="head-img mr16">
          <image style="width: 100%; height: 100%"
                 :src="$avatarUrl(notesItem.avatar)"></image>
        </view>
        <view class="column">
          <view class="center-align mb10">
            <text class="ft28 medium">{{notesItem.nick}}</text>
          </view>
          <view>
            <text class="ft22 color-999"
                  style="margin-right: 40rpx">{{notesItem.orgName}}</text>
            <text class="ft22 color-999">{{notesItem.time}}</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 图片显示 -->
    <view class="pl30 pr30 mb20">
      <img-group :imgList="notesItem.attachments"></img-group>
    </view>
    <!-- 标题 -->
    <view class="mb10 pl30 pr30">
      <text class="ft30 medium">{{notesItem.title}}</text>
    </view>
    <!-- 内容 -->
    <view class="content ml30 mr30">
      <div ref="contentBox"
           class="content-box"
           :class="isHideContent && 'hide-content'">
        <span ref="contentText"
              class="ft26 content-text">{{notesItem.content}}</span>
      </div>
      <view v-if="isShowExpand"
            class="expand center-flex"
            @click.stop="onExpandContent">
        <text class="ft24 primary-color">...展开</text>
      </view>
    </view>
    <!-- 底部 点赞 分享 -->
    <view class="pl30 pr30">
      <item-footer :notesItem="notesItem"
                   :notesIndex="notesIndex"
                   :entrance="entrance"
                   @setNotesItem="setNotesItem">
      </item-footer>
    </view>
  </view>
</template>
<script>
import ImgGroup from './ImgGroup.vue'
import ItemFooter from './ItemFooter.vue'

export default {
  name: 'Item',
  methods: {
    onNoteDetail () {
      const { communityNoteId } = this.notesItem
      const { entrance } = this
      uni.navigateTo({
        url: `/pages/union/interact/note-detail/index?communityNoteId=${communityNoteId}&entrance=${entrance}`
      })
    },
    setNotesItem (item, index) {
      this.$emit('setNotesItem', item, index)
    },
    onExpandContent () {
      this.isShowExpand = false
      this.isHideContent = false
    },
    async calculationHeight () {
      const boxHeight = await this.$getOffHeight('.content-box', this)
      const textHeight = await this.$getOffHeight('.content-text', this)
      console.log(boxHeight)
      this.isShowExpand = textHeight > boxHeight
    },
  },
  props: {
    entrance: String,
    notesItem: {
      type: Object,
      default: () => ({})
    },
    notesIndex: Number,
  },
  data () {
    return {
      isShowExpand: false,
      isHideContent: true
    }
  },
  watch: {
    notesItem: {
      handler: function () {
        setTimeout(() => {
          this.calculationHeight()
        }, 500);
      },
      immediate: true,
    }
  },
  created () {
  },
  components: { ImgGroup, ItemFooter },
}
</script>
<style lang='scss' scoped>
.notes-list-item-wrap {
  color: #333;
  width: 100%;
  padding-top: 30rpx;
  background: #fff;
  .head {
    .head-img {
      width: 80rpx;
      height: 80rpx;
      border-radius: 40rpx;
      overflow: hidden;
      background: #eee;
    }
    .label {
      height: 36rpx;
      border-radius: 18rpx;
      padding: 0 16rpx;
      border: 1px solid #ff9708;
      color: #ff9708;
    }
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
      height: 80rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical; // 点点点
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .expand {
      position: absolute;
      right: 0;
      bottom: 8rpx;
      width: 90rpx;
      height: 35rpx;
      background: rgba(255, 255, 255, 1);
      letter-spacing: 2rpx;
    }
  }
}
</style>