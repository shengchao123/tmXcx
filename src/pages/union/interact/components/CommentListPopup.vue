<template>
  <popup ref="commentListPopupPopup"
         height="864"
         radius="15"
         type="bottom">
    <view class="comment-list-pop">
      <view class="tc title">
        <text class="ft34 medium">共{{count}}条评论</text>
        <view @click="hide"
              class="close ft20 color-999">
          <svg-icon icon="icon_cha"></svg-icon>
        </view>
      </view>
      <view class="comment-list">
        <mescroll-uni ref="mescrollRef"
                      class="mescroll-wrap"
                      top="114"
                      bottom="100"
                      :up="upOption"
                      @init="mescrollInit"
                      @down="downCallback"
                      @up="upCallback">
          <template>
            <comments :commentList="commentList"></comments>
          </template>
        </mescroll-uni>
      </view>
      <view class="input-box">
        <input ref="input"
               class="input ft28 pl20"
               v-model="content"
               placeholder="写评论"
               :adjust-position="true"
               :cursor-spacing="15"
               :enableNative="false"
               @confirm="onConfirm"
               confirm-type="send"
               type="text" />
      </view>
    </view>
  </popup>
</template>
<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import Comments from '@/pages/components/Comments.vue';
import Popup from '@/components/slzx-popup/slzx-popup.vue'
export default {
  methods: {
    hide () {
      this.$refs.commentListPopupPopup.close()
    },
    show (communityNoteId) {
      // 请求接口
      this.communityNoteId = communityNoteId
      this.$refs.commentListPopupPopup.show()
      this.resetGetList()
    },
    onConfirm () {
      const { communityNoteId } = this
      if (!this.content) return
      const params = {
        communityNoteId,
        content: this.content,
      }
      this.$api.createCommunityNoteComment(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('评论已发布')
        this.content = ''
      })
    },
    // 下拉刷新
    downCallback () {
      this.mescroll.resetUpScroll(); // 重置列表为第一页
    },
    // 加载更多
    upCallback (page) {
      this.getNoteCommentDetailPage(page)
    },
    resetGetList () {
      this.commentList = []
      this.mescroll.resetUpScroll()
      // this.mescroll.scrollTo(0, 100)
    },
    getNoteCommentDetailPage (page) {
      const communityNoteId = this.communityNoteId
      if (!communityNoteId) return
      const params = {
        pageNumber: page && page.num || 1,
        pageSize: page && page.size || 10,
        communityNoteId
      }
      this.$api.getNoteCommentDetailPage(params).then(res => {
        if (res.isError) return this.mescroll.endErr()
        const { items, count } = res.content
        this.mescroll.endBySize(items.length, count)
        const list = items
        this.count = count
        this.commentList = params.pageNumber === 1 ? list : this.commentList.concat(list)
      })
    }
  },
  data () {
    return {
      upOption: {
        empty: {
          use: false, // 是否显示空布局
          icon: this.$imgHost + "no-order.png",
          tip: '暂无关注' // 提示
        },
        textNoMore: "没有更多数据",
        noMoreSize: 1, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
      },
      communityNoteId: null,
      commentList: [],
      count: 0,
      content: ''
    }
  },
  mixins: [MescrollMixin],
  components: { MescrollUni, Comments, Popup }
}
</script>
<style lang='scss' scoped>
.comment-list-pop {
  color: #333;
  position: relative;
  .title {
    position: relative;
    line-height: 84rpx;
    border-bottom: solid 1px #eaeaea;
    .close {
      width: 40rpx;
      height: 40rpx;
      position: absolute;
      top: 0rpx;
      right: 32rpx;
    }
  }
  .comment-list {
    height: 810rpx;
    box-sizing: border-box;
  }
  .input-box {
    position: absolute;
    bottom: 0rpx;
    left: 0rpx;
    right: 0rpx;
    padding: 24rpx 30rpx;
    box-sizing: border-box;
    background: #fff;
    z-index: 1;
    .input {
      width: 100%;
      height: 64rpx;
      box-sizing: border-box;
      background: #f4f4f4;
      border-radius: 32rpx;
    }
  }
}
.mescroll-wrap {
  /deep/.mescroll-uni-content {
    padding-bottom: 100rpx;
  }
}
</style>
