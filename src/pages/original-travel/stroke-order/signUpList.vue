<template>
  <div class='sign-up-list-wrap'>
    <div class="line"></div>
    <div class="list pl30 pr30">
      <div v-for="(item, index) in list"
           :key="index"
           class="item pt32 pb32 center-align between-row">
        <div class="ft30 color-333 medium">{{item.name}}</div>
        <div class="ft26 color-999">{{item.phone}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'name',
  data () {
    return {
      list: []
    }
  },
  onLoad () {
    const signUpList = uni.getStorageSync('signUpList')
    this.list = signUpList ? JSON.parse(signUpList) : []
  }
}
</script>
<style lang='scss' scoped>
.sign-up-list-wrap {
  .line {
    width: 100%;
    height: 19rpx;
    background: #f7f7f7;
  }
  .list {
    .item {
      border-bottom: solid 1px rgba(225, 225, 255, 0.5);
    }
  }
}
</style>