<template>
  <div class='sign-up-wrap'>
    <div class="pl30 pr30">
      <p class="ft48 medium mb16">报名信息</p>
      <p class="ft26 color-999">请填写以下报名信息</p>
    </div>
    <u-form ref="form"
            :model="form.data"
            class="mt32">
      <div class="pl30 pr30">
        <u-form-item label="姓名"
                     label-width="160"
                     prop="name">
          <u-input v-model="form.data.name"
                   maxlength="10"
                   placeholder="输入姓名" />
        </u-form-item>
        <u-form-item label="手机号"
                     label-width="160"
                     prop="phone">
          <u-input v-model="form.data.phone"
                   type="number"
                   placeholder="输入手机号" />
        </u-form-item>
      </div>
    </u-form>
    <div class="confirm-btn ml30 mr30 tc ft32"
         @click="onConfirm">确定</div>
  </div>
</template>
<script>
export default {
  methods: {
    onConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.signUpJourneyItinerary()
        } else {
          this.$msg('还有信息未填写')
        }
      });
    },
    signUpJourneyItinerary () {
      const params = {
        ...this.form.data,
        id: this.id
      }
      const apiName = new Map([
        ['stroke', 'signUpJourneyItinerary'],
        ['activity', 'signUpJourneyActivity'],
      ])
      this.$api[apiName.get(this.type)](params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('报名成功')
        uni.$emit('updateDataList')
        uni.$emit('claimSuccess', this.id)
        setTimeout(() => {
          uni.navigateBack()
        }, 400)
      })
    }
  },
  data () {
    const phoneVal = (rule, value, callback) => {
      if (!value) return callback(new Error('输入手机号'))
      if (!this.$u.test.mobile(value)) return callback(new Error('手机号不正确'))
      callback()
    }
    return {
      id: null,
      type: '',
      form: {
        data: {
          name: uni.getStorageSync('nick') || '',
          phone: uni.getStorageSync('phone') || '',
        },
        rules: {
          name: [{ required: true, message: '输入名称', trigger: 'change' }],
          phone: [{ required: true, trigger: 'change', validator: phoneVal }],
        }
      }
    }
  },
  onReady () {
    this.$refs.form.setRules(this.form.rules);
  },
  onLoad (option) {
    const { id, type } = option
    this.id = id
    this.type = type
  }
}
</script>
<style lang='scss' scoped>
.sign-up-wrap {
  color: #333;
  padding-top: 48rpx;
  .confirm-btn {
    height: 98rpx;
    line-height: 98rpx;
    border-radius: 49rpx;
    background: #e32417;
    color: #fff;
    margin-top: 128rpx;
  }
}
</style>