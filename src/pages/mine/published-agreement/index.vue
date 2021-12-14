<template>
  <view>
    <view class="border-b24 pt32 pl30 pr30">
      <view class="color-333 ft32 bold">查看协议</view>
      <view class="ft30 color-666 mt24">{{content}}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      content: '这里是天目红盟论坛发表协议，正在努力编写中...... '
    }
  }
}
</script>

<style lang='scss' scoped>
.border-b24 {
  border-top: 24rpx solid #f7f7f7;
}
</style>
