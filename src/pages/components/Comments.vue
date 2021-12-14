<template>
  <view class="pl30 pr30">
    <view v-for="(item,index) in comments"
          :key="index"
          class="bt pb32 mb32">
      <view class="flex">
        <image :src="avatarUrl(item.avatar)"
               alt=""
               class="mr16 user-img"
               @click="toPerson(item)">
          <view class="w91">
            <view class="between-row mt12">
              <view>
                <view class="color-999 ft24 flex">{{item.nick}}
                  <view v-if="item.isAuthor"
                        class="author ft20 color-666 ml8 tc">作者</view>
                </view>
                <view class="center-align mt20">
                  <view class="ft26">{{item.content}}</view>
                  <view class="ml12 color-999 ft22 mr24 no-wrap">{{item.commentTime}}</view>
                </view>
              </view>
              <view class="tc relative ">
                <view @click="onLike(item)">
                  <svg-icon :icon="item.isLike ? 'icon_shoucang' : 'icon_weishoucang'"
                            v-if="item.status === 2"
                            class="ft32 color-d2d2d2"></svg-icon>
                  <svg-icon :icon="item.isLike ? 'icon_shoucang' : 'icon_weishoucang'"
                            v-else
                            class="ft32"
                            :class="item.isLike ? 'primary-color' : 'color-999'"></svg-icon>
                </view>
                <view class="mt20 ft22">{{item.likeCount}}</view>
              </view>
            </view>
            <!-- 子评论 -->
            <recursive-comments v-if="item.children"
                                :commentChildren="item.children"
                                :commentList="comments"
                                :index="index"
                                @getCommentsStatus="getCommentsStatus"></recursive-comments>
          </view>
      </view>
    </view>
  </view>
</template>
<script>
import RecursiveComments from '../components/RecursiveComments'
import { avatarUrl } from '@/utils/tools'

export default {
  methods: {
    // 点赞、取消点赞评论
    onLike (item) {
      if (this.$notMember()) return this.$goLogin();
      this.dealLike(item)
    },
    // 点赞和取消点赞接口
    dealLike (item) {
      const params = {
        communityNoteCommentId: item.id
      }
      let apiName = ''
      if (item.isLike) {
        apiName = 'cancelCommunityLikeNoteComment'
      } else {
        apiName = 'communityLikeNoteComment'
      }
      this.$api[apiName](params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg(item.isLike ? '取消点赞' : '点赞成功')
        if (item.isLike) {
          item.likeCount = item.likeCount - 1
        } else {
          item.likeCount = item.likeCount + 1
        }
        item.isLike = !item.isLike
      })
    },
    // 获取子组件状态
    getCommentsStatus (commentList) {
      this.commentList = [...commentList]
    },
    // 点击头像跳转个人中心
    toPerson (item) {
      uni.navigateTo({
        url: `/pagesDiscover/personalCenter/index?id=${item.communityMemberId}`
      })
    },
    avatarUrl
  },
  computed: {
    comments () {
      this.commentList.map((item) => {
        // item.otherChildren = item.children.slice(1)
        item.showMore = false
        // item.children.splice(1)
      })
      return this.commentList
    }
  },
  props: {
    commentList: {
      type: Array,
      default: () => []
    },
  },
  components: { RecursiveComments }
}
</script>
<style lang="scss" scoped>
.color-d2d2d2 {
  color: #d2d2d2;
}
.bt {
  border-bottom: 1px solid #eaeaea;
}
.user-img {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
}
.w91 {
  width: 91%;
}
.author {
  width: 80rpx;
  height: 36rpx;
  line-height: 36rpx;
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
.no-wrap {
  white-space: nowrap;
}
</style>
