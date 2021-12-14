<template>
  <div class='card-item-wrap'>
    <div class="center-align">
      <div class="ft34 bold">{{item.headName}}</div>
      <div class="ft22 color-666 ml24">联盟主任</div>
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
      <span class="color-999">共建单位：</span>
      <span class="flex1">{{unitOrgName}}</span>
    </div>

    <div class="center-align ft26 mt24">
      <span class="color-999">覆盖小区：</span>
      <span class="flex1">{{plotOrgNames}}</span>
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
  },
  computed: {
    plotOrgNames () {
      if (this.$isEmpty(this.item.plots)) return '--'
      const temArray = this.item.plots.map(item => item.plotOrgName)
      return temArray.join('、')
    },
    unitOrgName () {
      if (this.$isEmpty(this.item.units)) return '--'
      const temArray = this.item.units.map(item => item.unitOrgName)
      return temArray.join('、')
    }
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
