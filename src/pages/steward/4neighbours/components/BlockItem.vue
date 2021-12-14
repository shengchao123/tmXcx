<template>
  <div class='block-item-wrap'>
    <div class="ft32 bold mb24"
         v-if="!$isEmpty(list)">{{title}}</div>
    <div class="between-row">
      <div class="column">
        <div class="item mb16"
             @click="onItem(item)"
             :class="bgClass"
             v-for="(item, index) in list"
             :key="index">
          <div class="center-align between-row">
            <div class="ft28"
                 style="color: #fff">{{item.name}}</div>
            <svg-icon icon="icon_xiangyoujiantou"
                      class="ft20"></svg-icon>
          </div>
          <div class="address ft24 mt16">{{item.tip}}</div>
        </div>
      </div>
      <div class="column">
        <div class="item mb16"
             @click="onItem(item)"
             :class="bgClass"
             v-for="(item, index) in list1"
             :key="index">
          <div class="center-align between-row">
            <div class="ft28"
                 style="color: #fff">{{item.name}}</div>
            <svg-icon icon="icon_xiangyoujiantou"
                      class="ft20"></svg-icon>
          </div>
          <div class="address ft24 mt16">{{item.tip}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockItem',
  methods: {
    onItem (item) {
      this.$emit('onBlockItem', item)
    }
  },
  props: {
    title: String,
    list: Array,
    list1: Array,
    bgClass: String,
    type: [String, Number]
  }
}
</script>



<style lang='scss' scoped>
div {
  box-sizing: border-box;
}

.block-item-wrap {
  padding: 30rpx;
  .item {
    width: 334rpx;
    padding: 24rpx;
    border-radius: 8rpx;
  }
}

.block1 {
  background-image: linear-gradient(46deg, #ff7f2b 0%, #ff721a 87%);
  color: #ffb88c;
}

.block2 {
  background-image: linear-gradient(225deg, #0079ff 0%, #2ea5ff 87%);
  color: #8dc9ff;
}

.block4 {
  background-image: linear-gradient(142deg, #fbae29 0%, #fca213 100%);
  color: #fddba3;
}

.block5 {
  background-image: linear-gradient(46deg, #fd6616 0%, #f5450c 100%);
  color: #fba987;
}
</style>
