const commentList = {
  data() {
    return {
      commentList:[],
      communityNoteId: undefined
    }
  },
  methods: {
    // 分页获取笔记评论详情
    getNoteCommentDetailPage () {
      const params = {
        communityNoteId: this.communityNoteId
      }
      this.$api.getNoteCommentDetailPage(params).then(res => {
        if (res.isError) {
          this.$msg(res.message)
        }
        const {items} = res.content
        this.commentList = items
      })
    },
  }
}
export default commentList
