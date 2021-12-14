<template>
  <view>
    <view class="flex mt24"
          v-for="(item,index) in commentChildren"
          :key="index">
      <image :src="avatarUrl(item.avatar)"
             mode="scaleToFill"
             class="mr16 user-img"
             @click="onPersonalCenter(item)" />
      <view class="w91">
        <view class="between-row mt12">
          <view>
            <view class="color-999 ft24">{{item.nick}}
              <span v-if="item.isAuthor"
                    class="author ft20 color-666 ml8">作者</span>
            </view>
            <view class="center-align mt20 w520">
              <view class="ft26">{{item.content}}</view>
            </view>
          </view>
          <view class="tc relative">
            <view :class="['ft32 color-999',item.isLike ? 'icon_zan primary-color' : 'icon_zankong']"
                  @click="onLike(item,index)">
            </view>
            <view class="mt20 ft22">{{item.likeCount}}</view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="showMore">
      <view v-for="(chlidren,idx) in commentList[index].otherChildren"
            :key="idx"
            class="flex mt24">
        <image :src="avatarUrl(chlidren.avatar)"
               mode="scaleToFill"
               class="mr16 user-img" />
        <view class="between-row mt12 w91">
          <view>
            <view class="color-999 ft24">{{chlidren.nick}}
              <span v-if="chlidren.isAuthor"
                    class="author ft20 color-666 ml8">作者</span>
            </view>
            <view class="center-align mt20 w520">
              <view class="ft26">{{chlidren.content}}</view>
            </view>
          </view>
          <view class="tc relative">
            <view :class="['ft32',chlidren.isLike ? 'icon_zan primary-color' : 'icon_zankong']"
                  @click="onLike(chlidren,idx,2)">
            </view>
            <view class="mt20 ft22">{{chlidren.likeCount}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="f518 ft24 ml64 mt32"
          @click="lookMore()"
          v-if="commentList[index].otherChildren.length">
      {{showMore?'收起':'展开'}}{{commentList[index].otherChildren.length}}条评论</view>
  </view>
</template>
<script>
import { avatarUrl } from '@/utils/tools'

export default {
  name: 'recursive',
  data () {
    return {
      showMore: false
    }
  },
  methods: {
    onPersonalCenter (item) {
      uni.navigateTo({
        url: `/pagesDiscover/personalCenter/index?id=${item.id}`
      })
    },
    // 点赞、取消点赞评论
    onLike (item, indx, type) {
      if (this.$notMember()) return this.$goLogin();
      let apiName = ''
      const params = {
        communityNoteId: item.communityNoteId
      }
      if (item.isLike) {
        apiName = 'cancelCommunityLikeNoteComment'
      } else {
        apiName = 'communityLikeNoteComment'
      }
      let childrenName = type === 2 ? 'otherChildren' : 'children'
      this.$api[apiName](params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg(item.isLike ? '取消点赞' : '点赞成功')
        const commentList = this.commentList[this.index][childrenName][indx]
        if (item.isLike) {
          commentList.likeCount = commentList.likeCount - 1
        } else {
          commentList.likeCount = commentList.likeCount + 1
        }
        commentList.isLike = !commentList.isLike
        this.$emit('getCommentsStatus', this.commentList)
      })
    },
    // 展开消息
    lookMore () {
      this.showMore = !this.showMore
    },
    avatarUrl
  },
  props: {
    commentChildren: {
      type: Array,
      default: () => []
    },
    commentList: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: () => ''
    },
  }
}
</script>
<style lang="scss" scoped>
.user-img {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
}
.w91 {
  width: 91%;
}
.author {
  padding: 8rpx 20rpx;
  background: #eeeeee;
  border-radius: 20rpx;
}
.w520 {
  width: 520rpx;
  white-space: pre-wrap;
}
.f518 {
  color: #518cfc;
}
.ml64 {
  margin-left: 64rpx;
}
</style>
