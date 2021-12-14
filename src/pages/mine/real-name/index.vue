<template>
  <view class="tb">
    <view class="bg-white pl30 pr30">
      <view class="bb h100 between-row center-align">
        <text class="ft30 bold mr32">姓名</text>
        <u-input v-model="form.name"
                 :clearable="false"
                 placeholder="输入姓名"
                 input-align="right"
                 @input="isRequire"
                 placeholder-style="color:#999"
                 :custom-style="inputCustomStyle" />
      </view>
      <view class="h100 between-row center-align">
        <text class="ft30 bold mr32">组织</text>
        <view class="ft30 center-align"
              :class="form.orgId ? 'color-333':'color-999'"
              @click="onOrgPopup">
          <view class="mr8">{{orgNameText}}</view>
          <svg-icon icon="icon_xiangyoujiantou"
                    class="ft20 color-999 mt4"></svg-icon>
        </view>
      </view>
    </view>
    <view class="pl30 pr30 mt24">
      <view class="center-align">
        <view @click="changeCheck"
              class="check-img">
          <img class="check-img"
               :src="form.check ? xuanzhong : weixuanzhong" />
        </view>
        <text class="color-999 ml8 ft26">勾选表示同意</text>
        <text style="color:#518CFC"
              class="ft26"
              @click="onPublishedAgreement">《天目红盟论坛发表协议》</text>
      </view>
      <u-button @click="onConfirm"
                :custom-style="btnStyle"
                :disabled="btnDisabled">确定</u-button>
      <org-popup ref="orgPopup"
                 @selectedOrg="selectedOrg"></org-popup>
    </view>
  </view>
</template>

<script>
import OrgPopup from './OrgPopup.vue'
export default {
  components: { OrgPopup },
  name: 'index',
  methods: {
    // 确定
    onConfirm () {
      const { name, orgId } = this.form
      const params = {
        name, orgId
      }
      this.$api.verifiedRealName(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('实名认证成功')
        this.$store.dispatch('user/setMemberPersonalInfo')
        setTimeout(() => {
          uni.navigateBack()
        }, 500)
      })
    },
    // 发表协议
    onPublishedAgreement () {
      uni.navigateTo({ url: '/pages/mine/published-agreement/index' })
    },
    // 点击勾选
    changeCheck () {
      this.form.check = !this.form.check
      this.isRequire()
    },
    // 输入框有值时按钮可操作
    isRequire () {
      const { name, orgId, check } = this.form
      if (!this.$isEmpty(name) && !this.$isEmpty(orgId) && check === true) {
        this.btnDisabled = false
      } else {
        this.btnDisabled = true
      }
    },
    // 打开组织弹窗
    onOrgPopup () {
      const { orgId, orgName } = this.form
      const temSelectedOrg = {
        orgId,
        orgName
      }
      this.$refs.orgPopup.show(temSelectedOrg)
    },
    // 选择组织
    selectedOrg (org) {
      this.form = {
        ...this.form,
        ...org
      }
    }
  },
  data () {
    return {
      form: {
        name: '',
        orgId: '',
        orgName: '',
        check: false
      },
      btnDisabled: true,
      weixuanzhong: this.$aliImg('mine/weixuanzhong.png'),
      xuanzhong: this.$aliImg('mine/xuanzhong.png')
    }
  },
  computed: {
    inputCustomStyle () {
      const temStyle = {
        fontSize: '30rpx',
        color: '#333',
      }
      return temStyle
    },
    orgNameText () {
      const { orgId, orgName } = this.form
      this.isRequire()
      return orgId ? orgName : '选择所属组织'
    },
    btnStyle () { // 自定义按钮样式
      const btnBgColor = this.btnDisabled ? '#ccc' : '#E32417'
      const temStyle = {
        fontSize: '32rpx',
        color: '#fff',
        height: '98rpx',
        borderRadius: '54rpx',
        fontWeight: 'bold',
        background: btnBgColor,
        marginTop: '66rpx'
      }
      return temStyle
    },
  }
}
</script>

<style lang='scss' scoped>
page {
  background: #f7f7f7;
}
.h100 {
  height: 100rpx;
  line-height: 100rpx;
}
.check-img {
  width: 32rpx;
  height: 32rpx;
}
</style>
