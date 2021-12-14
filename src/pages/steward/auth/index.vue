<template>
  <view class="tb">
    <view class="bg-white pl30 pr30">
      <view class="bb h100 center-align">
        <div class="ft30 bold mr32"
             style="width: 130rpx">姓名</div>
        <u-input v-model="form.name"
                 :clearable="false"
                 placeholder="输入姓名"
                 @input="isRequire"
                 placeholder-style="color:#999"
                 :custom-style="inputCustomStyle" />
      </view>

      <view class="bb h100 center-align">
        <div class="ft30 bold mr32"
             style="width: 130rpx">身份证号</div>
        <u-input v-model="form.idCardNo"
                 :clearable="false"
                 placeholder="输入身份证"
                 @input="isRequire"
                 placeholder-style="color:#999"
                 :custom-style="inputCustomStyle" />
      </view>

      <view class="h100 center-align">
        <div class="ft30 bold mr32"
             style="width: 130rpx">手机号</div>
        <text>{{phone}}</text>
      </view>

    </view>

    <view class="bg-white pl30 pr30 mt32">
      <view class="bb h100 center-align">
        <div class="ft30 bold mr32"
             style="width: 130rpx">街道社区</div>
        <view class="ft30 flex1 between-row center-align"
              :class="form.communityOrgId ? 'color-333':'color-999'"
              @click="$refs.selectionCommunit.show()">
          <view class="mr8">{{streetCommunity}}</view>
          <svg-icon icon="icon_xiangyoujiantou"
                    class="ft20 color-999 mt4"></svg-icon>
        </view>
      </view>
      <view class="bb h100 center-align">
        <div class="ft30 bold mr32"
             style="width: 130rpx">小区名称</div>
        <div class="flex1 between-row center-align">
          <u-input v-model="form.plotName"
                   :clearable="false"
                   placeholder="输入小区名称"
                   @input="isRequire"
                   placeholder-style="color:#999"
                   :custom-style="inputCustomStyle" />
          <div class="color-999 ml8">{{form.plotName.length}}/20</div>
        </div>
      </view>
      <view class=" h100 center-align">
        <div class="ft30 bold mr32"
             style="width: 130rpx">小区地址</div>
        <div class="flex1 between-row center-align">
          <u-input v-model="form.address"
                   :clearable="false"
                   placeholder="输入小区地址"
                   @input="isRequire"
                   placeholder-style="color:#999"
                   :custom-style="inputCustomStyle" />
          <div class="color-999 ml8">{{form.address.length}}/20</div>
        </div>
      </view>
      <view class=" h100 center-align">
        <div class="ft30 bold mr32"
             style="width: 130rpx">党员</div>
        <MyRadioBox :options="radioOptions"
                    :value.sync="form.isParty"></MyRadioBox>
      </view>

    </view>

    <div class="bg-white btn-wrap tb">
      <u-button @click="onConfirm"
                :custom-style="btnStyle"
                :disabled="btnDisabled">确定</u-button>
    </div>

    <selection-communit ref="selectionCommunit"
                        @onConfirm="onConfirmCommunit"></selection-communit>
  </view>
</template>

<script>
import SelectionCommunit from '../components/SelectionCommunit.vue'
import { checkInput } from '@/utils/validate.js'
import MyRadioBox from '../components/MyRadioBox'

export default {
  components: { SelectionCommunit, MyRadioBox },
  name: 'index',
  methods: {
    onConfirmCommunit (info) {
      this.streetInfo = info.streetInfo
      this.communityInfo = info.communityInfo
      this.form.communityOrgId = info.communityInfo?.id ?? null
    },
    // 确定
    onConfirm () {
      if (!checkInput(this.form.idCardNo, 'card')) return this.$msg('请输入正确的身份证号')
      const params = {
        ...this.form
      }
      this.$api.communityCertification(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('社区认证成功')
        this.$store.dispatch('user/setMemberPersonalInfo')
        setTimeout(() => {
          uni.navigateBack()
        }, 500)
      })
    },
    // 输入框有值时按钮可操作
    isRequire () {
      const { name, communityOrgId, idCardNo, address, plotName } = this.form
      if (!this.$isEmpty(name) && !this.$isEmpty(communityOrgId) && !this.$isEmpty(idCardNo) && !this.$isEmpty(address) && !this.$isEmpty(plotName)) {
        this.btnDisabled = false
      } else {
        this.btnDisabled = true
      }
    }
  },
  data () {
    return {
      radioOptions: Object.freeze([
        { id: true, name: '是' },
        { id: false, name: '否' }
      ]),

      form: {
        name: '',
        address: '',
        idCardNo: '',
        communityOrgId: '',
        plotName: '',
        isParty: true,
      },
      phone: '',
      streetInfo: {},
      communityInfo: {},
      btnDisabled: true
    }
  },
  created () {
    this.phone = uni.getStorageSync('phone')
  },
  computed: {
    inputCustomStyle () {
      const temStyle = {
        fontSize: '30rpx',
        color: '#333',
      }
      return temStyle
    },
    streetCommunity () {
      const { streetInfo, communityInfo } = this
      if (this.$isEmpty(streetInfo)) return '街道社区'
      if (this.$isEmpty(communityInfo)) return streetInfo.name
      return streetInfo.name + communityInfo.name
    },
    btnStyle () { // 自定义按钮样式
      const btnBgColor = this.btnDisabled ? '#ccc' : '#E32417'
      const temStyle = {
        fontSize: '32rpx',
        color: '#fff',
        height: '98rpx',
        borderRadius: '54rpx',
        fontWeight: 'bold',
        background: btnBgColor
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
.btn-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16rpx 32rpx;
}
</style>
