<template>
  <view class="tb">
    <view class="pl30 pr30 h112 center-align between-row bg-white">
      <u-input v-model="nick"
               :clearable="false"
               placeholder="输入昵称"
               placeholder-style="color:#999"
               maxlength="8"
               @input="changeInput"
               focus
               :custom-style=inputCustomStyle />
      <text class="color-999 ft24">{{nick.length}}/8</text>
    </view>
    <view class="pl30 pr30">
      <u-button @click="onConfirm"
                :disabled="btnDisabled"
                :custom-style="btnStyle">保存</u-button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'EditNick',
  methods: {
    // 输入框
    changeInput () {
      this.btnDisabled = this.$isEmpty(this.nick) || (this.nick === this.initNick)
    },
    // 保存
    onConfirm () {
      const params = {
        nick: this.nick
      }
      this.$api.modifyMemberPersonalInfo(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('昵称修改成功')
        setTimeout(() => {
          uni.navigateBack()
        }, 500)
      })
    }
  },
  data () {
    return {
      nick: '',
      initNick: '',
      btnDisabled: true
    }
  },
  computed: {
    inputCustomStyle () {
      const temStyle = {
        fontSize: '28rpx',
        color: '#333'
      }
      return temStyle
    },
    btnStyle () { // 自定义按钮样式
      const btnBgColor = this.btnDisabled ? '#ccc' : '#E32417'
      const temStyle = {
        fontSize: '34rpx',
        color: '#fff',
        height: '98rpx',
        borderRadius: '50rpx',
        background: btnBgColor,
        marginTop: '66rpx'
      }
      return temStyle
    },
  },
  onLoad (option) {
    this.nick = option.nick
    this.initNick = option.nick
  }
}
</script>

<style lang='scss' scoped>
page {
  background: #f7f7f7;
  height: 100%;
}
.h112 {
  height: 112rpx;
}
</style>
