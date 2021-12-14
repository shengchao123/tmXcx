<template>
  <div class='drag-popover-wrap'
       ref="wrap"
       :style="{top: top + 'rpx'}">
    <div class="relative column"
         style="height:100%">
      <div class="content flex1">
        <slot class="slot"></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DragPopover',
  props: {
    top: {
      type: [Number, String],
      default: 413
    }
  }
}
</script>

<style lang='scss' scoped>
.drag-popover-wrap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  box-shadow: 0 -6rpx 17rpx 0 rgba(0, 0, 0, 0.1);
  border-radius: 30rpx 30rpx 0 0;
  z-index: 99;
  .location {
    position: absolute;
    top: -120rpx;
    right: 20rpx;
    border-radius: 20rpx;
    height: 88rpx;
    width: 88rpx;
    background: #ffffff;
    box-shadow: 0 -12rpx 34rpx 0 rgba(0, 0, 0, 0.1);
  }
  .drag_control_wrap {
    // position: absolute;
    // top: 0;
    // left: 0;
    // right: 0;
    height: 38rpx;
    .drag_control {
      background: #eaeaea;
      border-radius: 3rpx;
      height: 6rpx;
      width: 48rpx;
    }
  }

  .container {
    position: absolute;
    top: 40rpx;
  }
  .content {
    height: 50%;
    padding-top: 30rpx;
    // position: absolute;
    // top: 40rpx;
    // left: 0;
    // right: 0;
    // bottom: 0;
  }
}
</style>
