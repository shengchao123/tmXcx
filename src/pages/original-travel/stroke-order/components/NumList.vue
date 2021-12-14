<template>
  <div class='num-list-wrap center-align between-row'>
    <div class="flex1 center-align">
      <div class="column center-align">
        <div class="line"
             :class="currentIndex === 0 && 'hideLine'"></div>
        <div class="circle center ft22">{{pointData.index + 1}}</div>
        <div class="line"
             :class="currentIndex === lastIndex && 'hideLine'"></div>
      </div>

      <div class="ft32 ml16 flex1">{{pointData.item.name}}</div>
    </div>

    <div class="center-align">
      <template v-for="(item, index) in btns">
        <div class="btn center ml16"
             :key="index"
             @click="onBtn(item.type)"
             v-if="!(item.type === 'up' && currentIndex === 0) && !(item.type === 'down' && currentIndex === lastIndex)">
          <div class="ml8 color-666">{{item.text}}</div>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
export default {
  name: 'NumList',
  methods: {
    onBtn (type) {
      this.$emit('onHandlePoints', type, this.currentIndex)
    }
  },
  data () {
    return {
      btns: [
        {
          text: '上移',
          type: 'up'
        },
        {
          text: '下移',
          type: 'down'
        },
        {
          text: '删除',
          type: 'del'
        }
      ]
    }
  },
  props: {
    pointData: Object,
    currentIndex: [String, Number],
    lastIndex: [String, Number]
  }
}
</script>

<style lang='scss' scoped>
.num-list-wrap {
  padding: 0 32rpx;
  .line {
    border-left: 1px solid #ffd53d;
    width: 1px;
    height: 40rpx;
  }
  .hideLine {
    border-color: transparent;
  }
  .circle {
    background: #feffff;
    border: 1px solid #e1b406;
    height: 40rpx;
    width: 40rpx;
    border-radius: 22rpx;
    color: #e1b406;
  }
  .btn {
    border: 1px solid #dcdcdc;
    border-radius: 28rpx;
    width: 100rpx;
    height: 56rpx;
    font-size: 26rpx;
  }
}
</style>
