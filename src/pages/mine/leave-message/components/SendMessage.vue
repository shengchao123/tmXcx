<template>
  <u-popup v-model="isShow"
           mode="bottom"
           height="98">
    <view class="input-box">
      <input ref="input"
             class="input ft28"
             v-model="content"
             placeholder="输入回复内容～"
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
    show (id) {
      this.isShow = true
      this.msgId = id
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
      const { msgId, content } = this
      if (!content) return
      const params = {
        id: msgId,
        content: content,
      }
      this.$api.respondMessage(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('留言回复成功')
        this.content = ''
        this.isFocus = false
        this.hide()
        this.$emit('sendMsg')
      })
    },
  },
  data () {
    return {
      isShow: false,
      isFocus: false,
      content: '',
      msgId: null,
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
