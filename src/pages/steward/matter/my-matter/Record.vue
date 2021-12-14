<template>
  <div class="bg-white pt28">
    <div class="ft32 medium pl32 pr32">处理记录</div>
    <div class="bg-white ">
      <div v-if="!$isEmpty(recordList)"
           class="record pt32 pl40 pr48">
        <div v-for="(item, index) in recordList"
             :key="index"
             class="record-item flex">
          <div class="step relative center-justify mr16">
            <div v-if="index === 0"
                 class="step-first">
              <svg-icon :icon="item.status === 2 ? 'icon_yiwancheng' : 'icon_shijian'"
                        class="ft40"
                        :class="item.status === 2 ? 'color-F58200' : 'color-999'"></svg-icon>
            </div>
            <div v-else
                 class="step-point"></div>
            <div v-if="index < recordList.length - 1"
                 class="step-line"></div>
          </div>
          <div class="flex1">
            <div class="between-row">
              <div class="ft30 medium"
                   :class="item.status === 2 && 'color-F58200'">
                {{item.status === 2 ? '已解决' : '跟进中'}}
              </div>
            </div>
            <div class="ft26 pt16 pb16"
                 v-if="item.status === 1">{{itemData.feedback}}</div>
            <div class="ft24 color-999 pb24">{{time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Record',
  props: {
    itemData: Object
  },
  computed: {
    time () {
      const { finishTime, dealTime } = this.itemData
      const time = finishTime ? finishTime : dealTime
      return this.$moment(time).format('YYYY-MM-DD hh:mm:ss')
    },
    recordList () {
      const { status } = this.itemData
      console.log(status)
      if (status === 1) {
        return [
          {
            text: '跟进中',
            status: 1
          }
        ]
      }
      if (status === 2) {
        return [
          {
            text: '已办结',
            status: 2
          },
          {
            text: '跟进中',
            status: 1
          }
        ]
      }
      return []
    }
  }
}
</script>

<style lang='scss' scoped>
.record-item {
  .step {
    width: 40rpx;
    .step-first {
      position: relative;
      z-index: 1;
      width: 40rpx;
      height: 40rpx;
      background: #fff;
    }
    .step-point {
      position: relative;
      z-index: 1;
      width: 14rpx;
      height: 14rpx;
      border-radius: 50%;
      background: #eaeaea;
      margin-top: 15rpx;
      box-shadow: 0 0 0 15rpx #fff;
    }
    .step-line {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 1px;
      background: #eaeaea;
    }
  }
  .img-list {
    flex-wrap: nowrap;
    .img-item {
      width: 185rpx;
      height: 185rpx;
      border-radius: 8rpx;
    }
  }
}
.color-F58200 {
  color: #f58200;
}
</style>
