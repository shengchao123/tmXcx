<template>
  <view v-if="detailInfo"
        class="evaluate-detail-wrap">
    <!-- 轮播图 -->
    <carousel :imgList="detailInfo.attachments"
              :indicatorDots="true">
    </carousel>
    <!-- 用户信息 -->
    <view class="user between-row pl30 pr30 pt24 pb24">
      <view class="center-align">
        <image @click="onToPersonalCenter"
               class="user-avatar"
               :src="$avatarUrl(detailInfo.avatar)">
        </image>
        <view class="ml16 column">
          <text class="ft28 medium">{{detailInfo.nick}}</text>
          <text class="ft22 color-999">{{detailInfo.time}}</text>
        </view>
      </view>
    </view>
    <!-- 笔记内容 -->
    <view class="pt8 ml30 mr30 note-content">
      <view class="pb32 column">
        <text class="ft36 bold pb16">{{detailInfo.title}}</text>
        <text class="content ft30">{{detailInfo.content}}
        </text>
      </view>
    </view>
    <view class="footer center-align ft30 color-999 between-row bg-white">
      <view class="flex">
        <view @click="onShowShareDialog">
          <svg-icon icon="icon_zhuanfa"
                    :class="detailInfo.status === 2 ? 'color-d2d2d2' : 'color-999'"></svg-icon>
          <text class="pl20">{{detailInfo.shareQuantity}}</text>
        </view>
      </view>
      <view @click="changeStatus('isLike')">
        <svg-icon :icon="detailInfo.isLike ? 'icon_shoucang' : 'icon_weishoucang'"
                  v-if="detailInfo.status === 2"
                  class="ft32 color-d2d2d2"></svg-icon>
        <svg-icon :icon="detailInfo.isLike ? 'icon_shoucang' : 'icon_weishoucang'"
                  v-else
                  class="ft32"
                  :class="detailInfo.isLike ? 'primary-color' : 'color-999'"></svg-icon>
        <text class="pl20">{{detailInfo.likeQuantity}}</text>
      </view>
    </view>
    <!-- 分享弹窗 -->
    <share-dialog ref="shareDialog"
                  :shareData="shareData"
                  :showHomeBtn="showHomeBtn">
    </share-dialog>
  </view>
</template>
<script>
import ShareDialog from '@/pages/components/ShareDialog.vue';
import Carousel from '@/pages/components/Carousel.vue'
import shareMixin from '@/mixins/share.js'
export default {
  name: 'index',
  methods: {
    // 改变状态（关注，点赞，收藏）
    changeStatus (type) {
      if (this.$notMember()) return this.$goLogin();
      if (this.entrance === 'myTrends' && this.detailInfo.status === 2) return
      const { communityMemberId, communityNoteId } = this.detailInfo
      const { apiName, msg, countKey, count } = this.statusMap.get(type).get(this.detailInfo[type])
      const params = {
        communityMemberId,
        communityNoteId
      }
      this.$api[apiName](params).then(res => {
        if (res.isError) {
          this.$msg(res.message)
          return
        }
        this.$msg(msg)
        // 除了关注，点赞和收藏都需要数量计算
        if (type !== 'isAttention') {
          const countNum = this.detailInfo[countKey]
          this.detailInfo[countKey] = countNum + count
        }
        this.detailInfo[type] = !this.detailInfo[type]
      })
    },
    onShowShareDialog () {
      if (this.entrance === 'myTrends' && this.detailInfo.status === 2) return
      this.$refs.shareDialog.show()
    },
    getItineraryEvaluationInfoById () {
      const params = {
        communityNoteId: this.communityNoteId
      }
      this.$api.getItineraryEvaluationInfoById(params).then(res => {
        if (res.isError) {
          this.$msg(res.message)
          return
        }
        this.detailInfo = res.content
      })
    }
  },
  data () {
    return {
      entrance: '',
      statusMap: Object.freeze(
        new Map([
          ['isAttention', new Map([
            [true, { apiName: 'cancelAttentionUser', msg: '取消关注' }],
            [false, { apiName: 'attentionUser', msg: '已关注' }]])
          ],
          ['isLike', new Map([
            [true, { apiName: 'cancelCommunityLikeNote', msg: '取消点赞', countKey: 'likeQuantity', count: -1 }],
            [false, { apiName: 'communityLikeNote', msg: '点赞成功', countKey: 'likeQuantity', count: 1 }]])
          ],
          ['isFavorites', new Map([
            [true, { apiName: 'cancelCommunityFavoritesNote', msg: '取消收藏', countKey: 'favoritesQuantity', count: -1 }],
            [false, { apiName: 'communityFavoritesNote', msg: '收藏成功', countKey: 'favoritesQuantity', count: 1 }]])
          ],
        ])
      ),
      communityNoteId: '',
      detailInfo: ''
    }
  },
  computed: {
    shareData () {
      const { title, content, attachments } = this.detailInfo
      return {
        title,
        desc: content,
        path: this.$getCurrentRoute().fullPath,
        imageUrl: this.$isEmpty(attachments) ? '' : this.$sourceUrl(attachments[0]),
      }
    },
  },
  onLoad ({ communityNoteId, entrance }) {
    this.communityNoteId = communityNoteId
    this.entrance = entrance
    this.getItineraryEvaluationInfoById()
  },
  mixins: [shareMixin],
  components: {
    Carousel,
    ShareDialog
  }
}
</script>
<style lang='scss' scoped>
.color-d2d2d2 {
  color: #d2d2d2;
}
.evaluate-detail-wrap {
  padding-bottom: 98rpx;
  .user {
    .user-avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
    }
  }
  .note-content {
    .content {
      line-height: 1.6;
    }
  }
  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #eaeaea;
    padding: 0 102rpx;
    height: 98rpx;
  }
}
</style>