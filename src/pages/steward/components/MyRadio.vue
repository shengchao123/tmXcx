<template>
  <div class="center-align radio-wrap">
    <div class='my-radio center'
         :class="selected && 'selected'">
      <div class="round"></div>
    </div>
    <slot name='text'></slot>
  </div>
</template>

<script>
export default {
  name: 'MyRadio',
  props: {
    selected: Boolean
  }
}
</script>

<style lang='scss' scoped>
.radio-wrap {
  .my-radio {
    width: 32rpx;
    height: 32rpx;
    border-radius: 50%;
    border: solid 1px #dedede;
    transition: all 0.3s;
    .round {
      width: 12rpx;
      height: 12rpx;
      border-radius: 50%;
      background: #fff;
    }
  }
  &:active {
    .my-radio {
      transform: scale(0.9);
    }
  }
  .selected {
    background: #e32417;
    border-color: #e32417;
  }
}
</style>

