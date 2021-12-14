<template>
  <div class='card-item-wrap'>
    <div class="center-align"
         v-if="item.name">
      <div class="ft34 bold">{{item.name}}</div>
      <div class="ft22 color-666 ml24">{{item.contactTypeName}}</div>
    </div>

    <div class="center-align ft26 mt32">
      <span class="color-999">电话：</span>
      <span>{{item.phone}}</span>
      <div @click="onPhone"
           class="center-align">
        <svg-icon class="text-btn ft32 ml16"
                  style="color: #518cfc"
                  icon="icon_dianhua"></svg-icon>
      </div>
    </div>

    <div class="center-align ft26 mt24">
      <span class="color-999">分工：</span>
      <span>{{item.position}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PeopleCardItem',
  methods: {
    onPhone () {
      uni.makePhoneCall({
        phoneNumber: this.item.phone
      })
    }
  },
  props: {
    item: Object
  }
}
</script>

<style lang='scss' scoped>
.card-item-wrap {
  background-color: #ffffff;
  padding: 32rpx 24rpx;
  border-radius: 8rpx;
  margin-top: 24rpx;
}
</style>
