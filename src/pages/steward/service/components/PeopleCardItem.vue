<template>
  <div class='card-item-wrap'>
    <div class="center-align">
      <div class="ft34 bold">{{item.plotOrgName}}</div>
    </div>

    <div class="between-row center-align mt24">
      <div class="center-align ft26 ">
        <span class="color-999">负责人：</span>
        <span>{{item.headName}}</span>
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
  padding: 24rpx;
  border-radius: 8rpx;
  margin-top: 24rpx;
}
</style>
