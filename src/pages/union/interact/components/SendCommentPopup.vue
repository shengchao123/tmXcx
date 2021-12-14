<template>
  <u-popup v-model="isShow"
           mode="bottom"
           height="98">
    <view class="input-box">
      <input ref="input"
             class="input ft28"
             v-model="content"
             placeholder="写评论"
             :focus="isFocus"
             :adjust-position="true"
             :cursor-spacing="15"
             @focus="onFocus"
             @blur="onBlur"
             @confirm="onConfirm"
             :enableNative="false"
             confirm-type="send"
             type="text" />
    </view>
  </u-popup>
</template>
<script>
export default {
  methods: {
    hide () {
      this.isShow = false
    },
    show (communityNoteId) {
      this.isShow = true
      this.communityNoteId = communityNoteId
      setTimeout(() => {
        this.isFocus = true
      }, 300)
    },
    onFocus (e) {
    },
    onBlur (e) {
      this.isFocus = false
      this.hide()
    },
    onConfirm () {
      const { communityNoteId, content } = this
      if (!content) return
      const params = {
        communityNoteId: communityNoteId,
        content: content,
      }
      this.$api.createCommunityNoteComment(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('评论已发布')
        this.content = ''
        this.isFocus = false
        this.hide()
      })
    },
  },
  data () {
    return {
      isShow: false,
      isFocus: false,
      content: '',
      communityNoteId: null,
    }
  },
  watch: {
    isShow (val) {
      if (!val) {
        this.isFocus = false
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.input-box {
  height: 98rpx;
  background: #fff;
  .input {
    width: 100%;
    height: 98rpx;
    padding: 30rpx;
    box-sizing: border-box;
  }
}
</style>
