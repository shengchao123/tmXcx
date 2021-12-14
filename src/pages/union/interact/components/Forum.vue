<template>
  <view class='notes-list-wrap'>
    <!-- <view style="width: 100%; height: 20rpx;"></view> -->
    <mescroll-uni ref="mescrollRef"
                  class="mescroll-wrap"
                  top="130"
                  :up="upOption"
                  @init="mescrollInit"
                  @down="downCallback"
                  @up="upCallback">
      <view class="empty-wrap"
            v-if="isEmpty">
        <page-empty :imgUrl="this.$imgHost + 'discover/icon-attention.png'"
                    message="暂无帖子"></page-empty>
      </view>
      <template>
        <item v-for="(item, index) in noteList"
              :key="index"
              :notesIndex="index"
              :notesItem="item"
              @setNotesItem="setNotesItem"></item>
      </template>
    </mescroll-uni>
    <share-dialog ref="shareDialog"
                  shareBtns="copyLink"
                  :shareData="shareData"></share-dialog>
    <comment-list-popup ref="commentListPopup"></comment-list-popup>
    <send-comment-popup ref="sendCommentPopup"></send-comment-popup>
  </view>
</template>
<script>
import pageEmpty from 'pages/components/PageEmpty'
import Item from './Item.vue';

import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import ShareDialog from '@/pages/components/ShareDialog'
import CommentListPopup from './CommentListPopup.vue';
import SendCommentPopup from './SendCommentPopup.vue';
export default {
  name: 'NoteList',
  methods: {
    setShareData (shareData) {
      this.shareData = JSON.parse(JSON.stringify(shareData))
      this.$refs.shareDialog.show()
    },
    onShowCommentListPopup (communityNoteId) {
      this.$refs.commentListPopup.show(communityNoteId)
    },
    onShowSendCommentPopup (communityNoteId) {
      this.$refs.sendCommentPopup.show(communityNoteId)
    },
    setNotesItem (item, index) {
      const noteList = this.noteList
      noteList[index] = item
      this.noteList = [...noteList]
    },
    // 回到顶部
    onScrollTop () {
      this.mescroll.scrollTo(0, 100)
    },
    // 下拉刷新
    downCallback () {
      this.mescroll.resetUpScroll(); // 重置列表为第一页
    },
    // 加载更多
    upCallback (page) {
      this.getCommunityNotePage(page)
    },
    resetGetList () {
      this.noteList = []
      this.mescroll.resetUpScroll()
    },
    getCommunityNotePage (page, callback) {
      const params = {
        pageNumber: page && page.num || 1,
        pageSize: page && page.size || 10
      }
      this.$api.getCommunityNotePage(params).then(res => {
        callback && callback()
        if (res.isError) return this.mescroll.endErr()
        const { items, count } = res.content
        this.mescroll.endBySize(items.length, count)
        this.noteList = params.pageNumber === 1 ? items : this.noteList.concat(items)
      })
    }
  },
  provide () {
    return {
      setShareData: this.setShareData,
      onShowCommentListPopup: this.onShowCommentListPopup,
      onShowSendCommentPopup: this.onShowSendCommentPopup
    }
  },
  data () {
    return {
      $imgHost: this.$imgHost,
      upOption: {
        empty: {
          use: false, // 是否显示空布局
          icon: this.$imgHost + 'discover/icon-attention.png',
          tip: '暂无动态' // 提示
        },
        textNoMore: "没有更多数据",
        noMoreSize: 1, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
      },
      shareData: {},
      noteList: [],
    }
  },
  computed: {
    isEmpty () {
      return this.noteList.length <= 0
    },
  },
  mixins: [MescrollMixin],
  components: { MescrollUni, pageEmpty, Item, ShareDialog, CommentListPopup, SendCommentPopup }
}
</script>
<style lang='scss' scoped>
.notes-list-wrap {
  .empty-wrap {
    height: 100%;
  }
}
</style>
