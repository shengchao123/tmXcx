<template>
  <div class='wrap'>
    <u-form ref="form"
            :model="form.data">
      <div class="pl32 pr32 bg-white">
        <u-form-item label="人数"
                     label-width="192"
                     prop="peopleQuantity">
          <u-input v-model="form.data.peopleQuantity"
                   type="number"
                   placeholder="输入人数" />
        </u-form-item>
        <u-form-item label="游玩天数"
                     label-width="192"
                     prop="playDays">
          <div class="between-row flex1">
            <u-input v-model="form.data.playDays"
                     type="number"
                     placeholder="输入游玩天数" />
            <span class="ft24 color-999 ml8">天</span>
          </div>
        </u-form-item>
        <u-form-item label="联系电话"
                     label-width="192"
                     :border-bottom="false"
                     prop="contactPhone">
          <u-input v-model="form.data.contactPhone"
                   type="number"
                   placeholder="输入电话" />
        </u-form-item>
      </div>
      <div class="pl32 pr32 ft22 color-999"
           style="height: 62rpx; line-height: 62rpx">
        *只有符合条件商家接单后才能看到您的联系方式，以做进一步沟通
      </div>
      <div class="pl32 pr32 bg-white">
        <u-form-item label="定制需求"
                     label-position="top"
                     :border-bottom="false"
                     prop="demand">
          <div class="flex1">
            <u-input v-model="form.data.demand"
                     type="textarea"
                     height="160"
                     maxlength="200"
                     placeholder="说说您的需求，比如您的出行方式，需要体验哪些活动等，以获取更合适的服务" />
            <div class="ft22 color-999"
                 style="text-align: right; line-height: 24rpx">{{form.data.demand.length}}/200</div>
          </div>
        </u-form-item>
      </div>
    </u-form>
    <div class="footer-btn pl32 pr32">
      <div class="submit tc mt16 ft32 medium"
           :class="isDisabled && 'disabled'"
           @click="onSubmit">提交</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.journeyPlayCustomizationId) {
            this.modifyJourneyPlayCustomizationInfoById()
          } else {
            this.createJourneyPlayCustomization()
          }
        }
      })
    },
    createJourneyPlayCustomization () {
      const params = {
        ...this.form.data
      }
      this.$api.createJourneyPlayCustomization(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('定制发布成功')
        setTimeout(() => {
          uni.navigateBack()
        }, 500)
      })
    },
    modifyJourneyPlayCustomizationInfoById () {
      const params = {
        journeyPlayCustomizationId: this.journeyPlayCustomizationId,
        ...this.form.data
      }
      this.$api.modifyJourneyPlayCustomizationInfoById(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('定制编辑成功')
        setTimeout(() => {
          uni.$emit('editCustomMadeOver')
          uni.navigateBack()
        }, 500)
      })
    },
    setFormData (formData) {
      const { contactPhone, demand, peopleQuantity, playDays } = formData
      this.form.data = {
        peopleQuantity: peopleQuantity + '',
        playDays: playDays + '',
        contactPhone: contactPhone + '',
        demand,
      }
    },
    getJourneyPlayCustomizationInfoById (id) {
      const params = {
        journeyPlayCustomizationId: id
      }
      this.$api.getJourneyPlayCustomizationInfoById(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.setFormData(res.content)
      })
    }
  },
  data () {
    const contactPhoneVal = (rule, value, callback) => {
      if (!value) return callback(new Error('输入电话'))
      if (!this.$u.test.mobile(value)) return callback(new Error('手机号不正确'))
      callback()
    }
    return {
      journeyPlayCustomizationId: null,
      form: {
        data: {
          peopleQuantity: null,
          playDays: null,
          contactPhone: null,
          demand: '',
        },
        rules: {
          peopleQuantity: [{ required: true, message: '输入人数', trigger: ['change', 'blur'] }],
          playDays: [{ required: true, message: '输入游玩天数', trigger: ['change', 'blur'] }],
          contactPhone: [{ required: true, trigger: ['change', 'blur'], validator: contactPhoneVal }],
          demand: [{ required: true, message: '输入定制需求', trigger: ['change', 'blur'] }],
        }
      }
    }
  },
  computed: {
    isDisabled () {
      const { peopleQuantity, playDays, contactPhone, demand } = this.form.data
      return !(peopleQuantity && playDays && contactPhone && demand)
    }
  },
  onReady () {
    this.$refs.form.setRules(this.form.rules);
  },
  onLoad ({ id }) {
    if (id) {
      this.journeyPlayCustomizationId = id
      this.getJourneyPlayCustomizationInfoById(id)
    }
  }
}
</script>
<style >
page {
  background: #f7f7f7;
}
</style>
<style lang='scss' scoped>
.wrap {
  .footer-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 128rpx;
    background: #fff;
    .submit {
      width: 100%;
      height: 98rpx;
      line-height: 98rpx;
      border-radius: 50rpx;
      background: #e32417;
      color: #fff;
    }
    .disabled {
      background: #ccc;
    }
  }
  /deep/.uni-textarea-placeholder {
    overflow: inherit;
  }
}
</style>