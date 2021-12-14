<template>
  <div class="tabs-wrap relative row bb">
    <div class="tab-item secondary-text"
         v-for="(item, index) in tabs"
         :key="index"
         @click="tabClick(item.id, index)">
      <span class="ft28 color-666"
            :class="current === index && 'color-e32417 medium'">
        {{item.name}}{{item.count ? `(${item.count})` : ''}}
      </span>
    </div>
    <div class="line"
         :style="lineStyle"></div>
  </div>
</template>
<script>
export default {
  methods: {
    tabClick (type, index) {
      this.current = index
      this.$emit('changeCurrent', index, type)
    },
    getJourneyHelperProjectCount () {
      if (!this.communityOrgId) return

      const params = {}
      if (!this.isUnitUser) {
        params.communityOrgId = this.communityOrgId
      }

      this.$api.getJourneyHelperProjectCount(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        const tabs = this.tabs
        res.content.forEach(el => {
          const { status, count } = el
          tabs[status - 1].count = count
        });
        this.tabs = tabs
      })
    }
  },
  props: {
    communityOrgId: [String, Number],
    isUnitUser: Boolean
  },
  data () {
    return {
      current: 0,
      tabs: [
        {
          id: 2,
          name: '待认领',
          count: 0
        },
        {
          id: 3,
          name: '领办中',
          count: 0
        },
        {
          id: 4,
          name: '已办结',
          count: 0
        }
      ]
    }
  },
  computed: {
    lineStyle () {
      const lineWidth = 32
      const itemWidth = 250
      const leftGap = (itemWidth - lineWidth) / 2
      let left = this.current * itemWidth + leftGap
      return `left: ${left}rpx`
    }
  },
  created () {
  }
}
</script>
<style lang='scss' scoped>
.tabs-wrap {
  justify-content: space-around;
  background: #fff;
  height: 88rpx;
  line-height: 88rpx;
  .tab-item {
    width: 250rpx;
    text-align: center;
  }
  .line {
    position: absolute;
    z-index: 1;
    transition: left 0.3s;
    bottom: 12rpx;
    left: 60rpx;
    width: 32rpx;
    height: 4rpx;
    border-radius: 4rpx;
    background: $color-f54400;
  }
}
</style>