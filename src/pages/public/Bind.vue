<template>
  <div class='login-wrap relative'>
    <div class="skip-btn ft26"
         style="color:#FF8E00"
         @click="onJump">跳过</div>

    <div class="content">

      <div>
        <div class="ft48 bold">注册登录</div>
        <div class="ft26 color-999 mt8">请填写以下注册信息</div>
      </div>

      <div class="box bb center-align mt54">
        <div class="mr48">手机号</div>
        <u-input v-model="submitData.phone"
                 placeholder="请输入手机号"
                 maxlength="11"
                 :focus="true"
                 :trim="true"
                 type="number" />
      </div>

      <div class="box bb center-align">
        <div class="mr48">验证码</div>
        <u-input v-model="submitData.verifyCode"
                 class="mr32"
                 placeholder="请输入验证码"
                 maxlength="6"
                 :trim="true"
                 type="number" />

        <div style="color: #518CFC"
             class="lb pl24"
             @click="onGetVerifyCode">{{codeText}}</div>
      </div>

      <div class="color-999 ft24 mt16 center-align">
        <svg-icon icon="icon_tishi"></svg-icon>
        <div class="ml8">未注册的手机号验证后自动注册</div>
      </div>

      <div class="login-btn ft32 bold center "
           :class="isVerified ? 'active' : 'disabled'"
           @click="verifySubmitData">登录</div>

      <div class="center agreement ft22">
        <div class="color-999">登录即同意</div>
        <div style="color: #518CFC">《用户注册协议》</div>
      </div>

    </div>
  </div>
</template>

<script>

import { checkInput } from '@/utils/validate.js'
import { saveLoginInfo, slzxNavigateBack } from '@/utils/login.js'

export default {
  name: 'Login',
  methods: {
    onJump () {
      uni.switchTab({ url: '/pages/home/index/index' })
    },
    onGetVerifyCode () {
      if (this.timer) return
      if (!checkInput(this.submitData.phone, 'phone')) {
        this.$msg('请输入正确手机号')
        return
      }
      this.countdown()
      this.sendVerificationCode()
    },
    // 验证提交信息
    verifySubmitData () {
      if (!checkInput(this.submitData.phone, 'phone')) {
        this.$msg('请输入正确手机号')
        return
      }
      if (this.$isEmpty(this.submitData.verifyCode)) {
        this.$msg('请输入验证码')
        return
      }

      this.bindPhone()
    },
    // 绑定会员手机号
    bindPhone () {
      const params = {
        ...this.submitData,
        thirdUserId: uni.getStorageSync('thirdUserId')
      }
      this.$api.bindPhone(params).then(res => {
        if (res.isError) {
          if (res.subCode === 'ERROR') return this.$msg('验证码不正确')
          this.$msg(res.message)
          return
        }
        saveLoginInfo(res.content)
        uni.setStorageSync('status', 3)
        this.$store.dispatch('user/setMemberPersonalInfo')
        this.$msg('登录成功')
        setTimeout(() => {
          slzxNavigateBack()
        }, 900)
      })
    },
    // 发送验证码
    sendVerificationCode () {
      const params = {
        phone: this.submitData.phone
      }
      this.$msg('验证码已发送')
      this.$api.sendVerificationCode(params)
    },
    // 倒计时
    countdown () {
      if (this.time === 0) return this.resetCoundown()
      this.timer = setTimeout(() => {
        this.time--
        this.codeText = `验证码(${this.time}s)`
        this.countdown()
      }, 1000)
    },
    // 重置定时器
    resetCoundown () {
      this.time = 60
      this.timer = null
      this.codeText = '获取验证码'
    }
  },
  computed: {
    isVerified () {
      const { phone, verifyCode } = this.submitData
      return checkInput(phone, 'phone') && verifyCode.length === 6
    }
  },
  data () {
    this.time = 60
    this.timer = null
    return {
      codeText: '获取验证码',
      submitData: {
        phone: '',
        verifyCode: ''
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.mt54 {
  margin-top: 54rpx;
}
.login-wrap {
  padding-top: 120rpx;
  .skip-btn {
    position: absolute;
    right: 32rpx;
    top: 32rpx;
  }
  .content {
    padding: 0 32rpx;
    .box {
      font-size: 30rpx;
      padding: 30rpx 0;
    }
  }

  .login-btn {
    margin-top: 120rpx;
    height: 88rpx;
    border-radius: 44rpx;
    color: #ffffff;
  }
  .active {
    background: #e32417;
  }
  .disabled {
    background: #cccccc;
  }

  .agreement {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 60rpx;
  }
}
</style>
