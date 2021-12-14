<template>
  <div class='contact-person-wrap pl30 pr30'>
    <div class="title center-align">
      <svg-icon icon="icon_lianluoren"
                class="ft32"
                style="color: #BF2B19"></svg-icon>
      <div class="ft30 ml8 medium">联盟联络人</div>
    </div>
    <div v-for="(item, index) in list"
         :key="index"
         class="item between-row pt28 pb28">
      <div>
        <div class="ft28 mb20">{{item.orgName}}</div>
        <div class="ft26">
          <span>{{item.contactPerson}}：</span>
          <span class="color-666">{{item.tel}}</span>
        </div>
      </div>
      <div @click="onCall(item.tel)">
        <svg-icon icon="icon_dianhua"
                  class="ft32"
                  style="color: #518CFC"></svg-icon>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onCall (phone) {
      uni.showModal({
        title: '即将拨打电话',
        content: phone,
        success: function (res) {
          if (res.confirm) {
            uni.makePhoneCall({
              phoneNumber: phone
            })
          }
        }
      })
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
}
</script>
<style lang='scss' scoped>
.contact-person-wrap {
  color: #333;
  background: #fff;
  .title {
    height: 78rpx;
  }
  .item {
    border-top: solid 1px #eaeaea;
    align-items: flex-end;
  }
}
</style>