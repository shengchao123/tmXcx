<template>
  <u-popup v-model="isOrgShow"
           mode="bottom"
           height="770"
           border-radius="30"
           :mask-custom-style="maskCustomStyle">
    <view class="popup-wrap">
      <view class="relative h84 bb">
        <view class="ft34 popup-title">选择联盟</view>
        <view class="close-btn"
              @click="isOrgShow = false">
          <svg-icon class="ft24 color-999 bold mt8"
                    icon="icon_cha"></svg-icon>
        </view>
      </view>
      <view class="popup-content pl30 pr30">
        <scroll-view :scroll-y="true"
                     class="popup-content">
          <view v-for="(item,index) in orgData"
                :key="index"
                :class="selectedOrg.orgId === item.orgId ? 'selected-color' :'color-333'"
                class="center-align org-item bb between-row"
                @click="changeSelectedOrg(item)">
            <text>{{item.orgName}}</text>
            <svg-icon icon="icon_duihao"
                      v-if="selectedOrg.orgId === item.orgId"></svg-icon>
          </view>
        </scroll-view>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: 'OrgPopup',
  methods: {
    show (org) {
      this.selectedOrg = org
      this.isOrgShow = true
    },
    // 获取联盟组织列表
    findOrgList () {
      const params = {
        hasMasterOrg: true
      }
      this.$api.findOrgList(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.orgData = res?.content ?? []
      })
    },
    changeSelectedOrg (item) {
      this.$emit('selectedOrg', item)
      this.isOrgShow = false
    }
  },
  data () {
    return {
      isOrgShow: false,
      orgData: [],
      selectedOrg: {}
    }
  },
  computed: {
    maskCustomStyle () { // 遮罩层自定义样式
      const temStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.40)'
      }
      return temStyle
    },
  },
  created () {
    this.findOrgList()
  }
}
</script>

<style lang='scss' scoped>
.h84 {
  height: 84rpx;
  line-height: 84rpx;
}
.selected-color {
  color: #e32417;
}
.popup-wrap {
  position: relative;
  .popup-title {
    text-align: center;
    color: #000;
  }
  .close-btn {
    position: absolute;
    right: 30rpx;
    top: 0rpx;
  }
  .popup-content {
    height: 686rpx;
    .org-item {
      height: 100rpx;
      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
