<template>
  <div class="info pl30 pr30">
    <template v-for="(item, index) in list">
      <div v-if="item.content"
           :key="index"
           class="info-item pt24 pb24 flex"
           :class="index === (list.length - 1) && 'no-border'">
        <div class="label ft30 bold">{{item.label}}</div>
        <div class="content ft30 flex1 center-align"
             v-if="item.label==='联系方式'">
          <span>{{item.content}}</span>
          <SvgIcon icon='icon_dianhua'
                   class="ml16"
                   @click="onCallPhone(item.content)"
                   style="color:#518CFC;font-size:32rpx"></SvgIcon>
        </div>
        <div class="content ft30 flex1"
             v-else>{{item.content}}</div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'name',
  methods: {
    onCallPhone (phone) {
      uni.makePhoneCall({
        phoneNumber: phone
      })
    },
  },
  props: {
    list: Array
  },
}
</script>
<style lang='scss' scoped>
.info {
  background: #fff;
  .info-item {
    border-bottom: solid 1px #eaeaea;
    .label {
      width: 220rpx;
    }
    .content {
    }
  }
  .no-border {
    border: none;
  }
}
</style>