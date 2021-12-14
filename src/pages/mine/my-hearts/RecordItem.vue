<template>
  <view class='h122 center-align bb between-row'>
    <view class="column color-333">
      <text class="ft32 bold">{{record.description}}</text>
      <text class="ft24 opacity-5 mt8">{{timeText}}</text>
    </view>
    <view class="ft28"
          :class="record.type === '01' ?'color-333':'color-e32417'">{{record.value > 0 ?'+':''}}{{record.value}}
    </view>
  </view>
</template>

<script>
export default {
  name: 'RecordItem',
  props: {
    record: Object
  },
  computed: {
    timeText () {
      return this.$moment(this.record.createTime).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang='scss' scoped>
.opacity-5 {
  opacity: 0.5;
}
.color-e32417 {
  color: #e32417;
}
.h122 {
  height: 122rpx;
}
</style>
