<template>
  <div class='journey-item-wrap bb mb24'>
    <div class="between-row"
         @click="onOtherPage('detail')">
      <div class="date center column">
        <div class="ft28 bold">{{md}}</div>
        <div class="ft22 color-666 mt8">{{year}}</div>
      </div>

      <div class="ml24 column flex1 name-wrap">
        <div class="between-row center-align">
          <div class="ft30 bold">{{item.name}}</div>
          <svg-icon icon="icon_xiangyoujiantou"
                    class="ft24"
                    style="color:#c4c4c4"></svg-icon>
        </div>
        <div class="row ft24 color-999 mt24">
          <div>{{item.pointQuantity || 0}}个地标</div>
          <div class="ml24">{{item.playTimeName}}</div>
        </div>
      </div>

    </div>

    <div class="buttons ft24 center-align">
      <div class="btn"
           v-if="item.hasLifeRecord && item.needLifeDocumentary"
           @click="onOtherPage('lifeRecord')">查看组织生活记录</div>
      <div class="primary-btn"
           v-if="item.isOrganizer && !item.hasLifeRecord && item.needLifeDocumentary"
           @click="onOtherPage('writeLife')">填写组织生活记录</div>

      <div class="btn"
           @click="onOtherPage('clock')">打卡记录</div>
      <div class="btn"
           @click="onOtherPage('evaluation')">评价</div>
    </div>

  </div>
</template>

<script>
const pageUrlMap = Object.freeze(new Map([
  ['detail', '/pages/original-travel/stroke-order/detail?'],
  ['writeLife', '/pages/mine/org-life-record/index?'],
  ['lifeRecord', '/pages/mine/org-life-record/Detail?'],
  ['clock', '/pages/mine/card-record/index?'],
  ['evaluation', '/pages/original-travel/evaluation/index?']
]))
export default {
  name: 'MyJourneyItem',
  methods: {
    // 跳转其他页面
    onOtherPage (type) {
      const { id, name } = this.item
      let pageParams = `id=${id}`
      if (type === 'writeLife' || type === 'evaluation') {
        pageParams = pageParams + `&name=${name}`
      }
      const url = pageUrlMap.get(type)
      uni.navigateTo({ url: `${url}${pageParams}` })
    }
  },
  computed: {
    md () {
      return this.$moment(this.item.setOutTime).format('M月D日')
    },
    year () {
      return this.$moment(this.item.setOutTime).format('YYYY')
    }
  },
  props: {
    item: Object
  }
}
</script>

<style lang='scss' scoped>
.journey-item-wrap {
  .date {
    background-image: linear-gradient(90deg, #ffe06f 21%, #ffd533 96%);
    border-radius: 8px;
    padding: 24rpx 20rpx;
  }
  .name-wrap {
    justify-content: center;
  }

  .buttons {
    justify-content: flex-end;
    margin: 16rpx 0 24rpx;
    .btn-common {
      padding: 0 16rpx;
      height: 56rpx;
      border-radius: 28rpx;
      line-height: 56rpx;
      margin-left: 16rpx;
    }
    .primary-btn {
      border: 1px solid #f54400;
      color: #f54400;
      @extend .btn-common;
    }
    .btn {
      @extend .btn-common;
      color: #666666;
      border: 1px solid #d2d2d2;
    }
  }
}
</style>
