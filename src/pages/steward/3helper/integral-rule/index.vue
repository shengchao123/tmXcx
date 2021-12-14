<template>
  <view class="integral-rule-wrap ft28">
    <view class="pl32 pr32">
      <view v-for="(item,index) in listData"
            :key="index"
            class="list-item pt30">
        <view class="color-333 ft30 medium lineh1">{{item.name}}</view>
        <view class="lineh1 mt24">
          <text class="color-999">每个单位</text>
          <text class="primary-color">{{item.point}}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'IntegralRule',
  methods: {},
  data () {
    return {
      listData: Object.freeze([
        {
          name: '共建单位联合领办对口社区项目并办结',
          point: '+1分'
        },
        {
          name: '共建单位单独领办对口社区项目并办结',
          point: '+2分'
        },
        {
          name: '单位在领办大厅中联合领办非对口社区项目并办结',
          point: '+2分'
        },
        {
          name: '单位在领办大厅中单独领办非对口社区项目并办结',
          point: '+3分'
        },
        {
          name: '单位在领办大厅中联合领办对口社区项目并办结',
          point: '+1分'
        },
        {
          name: '单位在领办大厅中单独领办对口社区项目并办结',
          point: '+2分'
        },
      ])
    }
  },
  created () { },
}
</script>
<style lang='scss' scoped>
.lineh1 {
  line-height: 1;
}
.integral-rule-wrap {
  .list-item {
    height: 142rpx;
    border-bottom: 1px solid rgba($color: #e1e1e1, $alpha: 0.5);
  }
}
</style>