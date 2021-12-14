<template>
  <div class='poi-keywords-wrap'>
    <template v-for="(item, index) in keywords">
      <div :key="item.name"
           @click="onSelectKeyword(item, index)"
           class="item column center-align"
           :style="{color: selectedIndex === index ? '#F13042' : '#9D767A'}"
           :class="index !== 0 && 'tb'">
        <svg-icon :icon="item.svgIcon"
                  class="ft32"></svg-icon>
        <div class="ft20 mt8">{{item.name}}</div>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'PoiKeywords',
  methods: {
    onSelectKeyword (item, index) {
      this.selectedIndex = index
      this.$emit('changePois', item)
    }
  },
  data () {
    return {
      selectedIndex: 2,
      keywords: Object.freeze([
        {
          svgIcon: 'icon_dibiao',
          icon: 'guide_mark_1.png',
          type: '01',
          name: '生活馆'
        },
        {
          svgIcon: 'icon_nongchanpin',
          icon: 'guide_mark_6.png',
          type: '03',
          name: '农产品'
        },
        {
          svgIcon: 'icon_jingdian',
          icon: 'guide_mark_2.png',
          name: '风景'
        },
        {
          svgIcon: 'icon_tingchechang',
          icon: 'guide_mark_3.png',
          name: '停车场'
        },
        {
          svgIcon: 'icon_gonggongcesuo',
          icon: 'guide_mark_4.png',
          name: '公共厕所'
        },
        {
          svgIcon: 'icon_meishi',
          icon: 'guide_mark_5.png',
          name: '餐饮美食'
        }
      ])
    }
  }
}
</script>

<style lang='scss' scoped>
.poi-keywords-wrap {
  background: #ffffff;
  box-shadow: 0 -6rpx 17rpx 0 rgba(0, 0, 0, 0.1);
  border-radius: 16rpx;

  .item {
    padding: 16rpx 8rpx;
  }
}
</style>
