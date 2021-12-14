<template>
  <view class="life-wrap">
    <u-form :model="formData"
            ref="uForm"
            :label-style="labelStyle">
      <view class="tb pl30 pr30 bg-white">
        <u-form-item label="类型"
                     class="p10-0"
                     label-width="192rpx">
          <div class="between-row center-align">
            <u-input v-model="formData.type"
                     placeholder="选择或输入类型"
                     :clearable="false"
                     maxlength="10"
                     @input="changeInput"
                     placeholder-style="color:#999"
                     :custom-style="customInputStyle" />
            <svg-icon icon="icon_xiangyoujiantou"
                      @click="onTypePopup"
                      class="ft20 h28 color-999 ml16"></svg-icon>
          </div>
        </u-form-item>
        <u-form-item label="时间"
                     class="p10-0"
                     label-width="192rpx">
          <div class="between-row center-align">
            <view @click="onShowTimePicker"
                  style="width:100%"
                  class="center-align"
                  :class="formData.date ? 'color-333':'color-999'">
              <view class="mr8 flex1">{{dateText}}</view>
              <svg-icon icon="icon_riqi"
                        class="ft28 color-999"></svg-icon>
            </view>
          </div>
        </u-form-item>
        <u-form-item label="地点"
                     class="p10-0"
                     label-width="192rpx">
          <!-- <u-input v-model="formData.address"
                   placeholder="输入地址"
                   :clearable="false"
                   maxlength="30"
                   @input="changeInput"
                   placeholder-style="color:#999"
                   :custom-style="customInputStyle" /> -->
          <div class="between-row center-align">
            <view class="address-textarea">
              <textarea placeholder="输入地址"
                        :auto-height="true"
                        maxlength="30"
                        placeholder-style="color:#999"
                        @input="changeInput"
                        v-model="formData.address"
                        :enableNative="false">
          </textarea>
            </view>
            <view class="color-999 ft24 h28 ml16">{{formData.address.length}}/30</view>
          </div>
        </u-form-item>
        <u-form-item label="主持人"
                     class="p10-0"
                     label-width="192rpx">
          <div class="between-row center-align">
            <u-input v-model="formData.host"
                     placeholder="输入主持人姓名"
                     :clearable="false"
                     maxlength="5"
                     @input="changeInput"
                     placeholder-style="color:#999"
                     :custom-style="customInputStyle" />
            <view class="color-999 ft24 h28 ml16">{{formData.host.length}}/5</view>
          </div>
        </u-form-item>
        <u-form-item label="记录人"
                     class="p10-0"
                     label-width="192rpx">
          <div class="between-row center-align">
            <u-input v-model="formData.recorder"
                     placeholder="输入记录人姓名"
                     :clearable="false"
                     maxlength="5"
                     @input="changeInput"
                     placeholder-style="color:#999"
                     :custom-style="customInputStyle" />
            <view class="color-999 ft24 h28 ml16">{{formData.recorder.length}}/5</view>
          </div>
        </u-form-item>
      </view>
      <view class="mt20 pl30 pr30 bg-white">
        <u-form-item label="应到人数"
                     class="p10-0"
                     label-width="192rpx">
          <div class="between-row center-align">
            <u-input v-model="formData.shouldNumber"
                     placeholder="输入人数"
                     :clearable="false"
                     @input="changeInput"
                     placeholder-style="color:#999"
                     :custom-style="customInputStyle" />
          </div>
        </u-form-item>
        <u-form-item label="流动党员和行动不便党员数"
                     class="p24"
                     label-width="192rpx">
          <u-input v-model="formData.flowNumber"
                   placeholder="输入人数"
                   :clearable="false"
                   @input="changeInput"
                   placeholder-style="color:#999"
                   :custom-style="customInputStyle" />
        </u-form-item>
        <u-form-item label="实到人数"
                     class="p10-0"
                     label-width="192rpx">
          <u-input v-model="formData.actualNumber"
                   placeholder="输入人数"
                   :clearable="false"
                   @input="changeInput"
                   placeholder-style="color:#999"
                   :custom-style="customInputStyle" />
        </u-form-item>
      </view>
      <view class="mt20 pl30 pr30 bg-white">
        <u-form-item label="到会成员"
                     label-position="top"
                     class="p24"
                     label-width="192rpx">
          <view class="mt4 name-textarea">
            <textarea placeholder="输入人员姓名，多个用逗号隔开"
                      :auto-height="true"
                      placeholder-style="color:#999"
                      @input="changeInput"
                      v-model="formData.attendees"
                      :enableNative="false">
          </textarea>
          </view>
        </u-form-item>
        <u-form-item label="到会指导的上级领导"
                     label-position="top"
                     class="p24"
                     label-width="192rpx">
          <view class="mt4 name-textarea">
            <textarea placeholder="输入人员姓名，多个用逗号隔开"
                      :auto-height="true"
                      placeholder-style="color:#999"
                      @input="changeInput"
                      v-model="formData.superiors"
                      :enableNative="false">
          </textarea>
          </view>
        </u-form-item>
        <u-form-item label="缺席人员及原因"
                     label-position="top"
                     class="p24"
                     :border-bottom="false"
                     label-width="192rpx">
          <view class="mt4 name-textarea">
            <textarea placeholder="如张三（临时有事）"
                      :auto-height="true"
                      placeholder-style="color:#999"
                      @input="changeInput"
                      v-model="formData.absentPerson"
                      :enableNative="false">
          </textarea>
          </view>
        </u-form-item>
      </view>
      <view class="mt20 pl30 pr30 bg-white">
        <u-form-item label="活动内容及决议"
                     label-position="top"
                     class="p24"
                     :border-bottom="false"
                     label-width="192rpx">
          <view class="content-textarea mt4">
            <textarea placeholder="输入内容"
                      :maxlength="1000"
                      placeholder-style="color:#999"
                      @input="changeInput"
                      v-model="formData.activityContent"
                      :enableNative="false">
          </textarea>
            <view class="color-999 ft22 experience-count mt8">{{formData.activityContent.length}}/1000</view>
          </view>
        </u-form-item>
      </view>
    </u-form>
    <line-clock :isShowSignIn.sync="formData.isShowSignIn"
                :journeyItineraryId="lineData.journeyItineraryId"></line-clock>
    <view class="center-align bg-white pl30 pr30 save-btn tb">
      <u-button @click="onSave"
                :disabled="btnDisabled"
                :custom-style="btnStyle">{{pageType === 'edit' ? '保存':'确定'}}</u-button>
    </view>
    <type-popup ref="typePopup"
                @selectedType="selectedType"></type-popup>
    <u-picker v-model="showTimePicker"
              mode="time"
              title="日期"
              confirm-color="#E32417"
              :params="timePickerConfig.params"
              :start-year="timePickerConfig.startYear"
              :end-year="timePickerConfig.endYear"
              :default-time="timePickerConfig.defaultTime"
              @confirm="confirmTimePicker"></u-picker>
  </view>
</template>

<script>
import LineClock from './LineClock.vue'
import TypePopup from './TypePopup.vue'
export default {
  components: { LineClock, TypePopup },
  name: 'index',
  methods: {
    // 打开类型弹窗
    onTypePopup () {
      const { type } = this.formData
      this.$refs.typePopup.show(type)
    },
    // 选择类型
    selectedType (type) {
      this.formData.type = type
    },
    // 显示 日期选择 弹窗
    onShowTimePicker () {
      this.showTimePicker = true
    },
    // 日期选中回调
    confirmTimePicker (params) {
      const { timestamp } = params
      const setOutTime = timestamp * 1000
      this.formData.date = setOutTime
      this.formData = JSON.parse(JSON.stringify(this.formData))
      this.setTimePickerDefaultValue(setOutTime)
    },
    // 设置日期选择 默认时间
    setTimePickerDefaultValue (setOutTime) {
      this.timePickerConfig.defaultTime = this.$moment(setOutTime).format('YYYY-MM-DD')
    },
    // 输入框有值时按钮可操作
    changeInput () {
      const temArr = ['type', 'date', 'address', 'host', 'recorder', 'shouldNumber', 'flowNumber', 'actualNumber', 'attendees', 'superiors', 'absentPerson', 'activityContent']
      const temArrLength = temArr.length
      for (let i = 0; i < temArrLength; i++) {
        if (this.$isEmpty(this.formData[temArr[i]])) {
          return this.btnDisabled = true
        }
      }
      this.btnDisabled = false
    },
    // 确定
    onSave () {
      const params = {
        ...this.formData,
        journeyItineraryId: this.lineData.journeyItineraryId
      }
      this.pageType === 'edit' ? this.modifyJourneyLifeDocumentary(params) : this.createJourneyLifeDocumentary(params)
    },
    // 创建生活纪实
    createJourneyLifeDocumentary (params) {
      this.$api.createJourneyLifeDocumentary(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.successTip()
      })
    },
    // 修改生活纪实
    modifyJourneyLifeDocumentary (params) {
      this.$api.modifyJourneyLifeDocumentary(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.successTip()
      })
    },
    // 成功提示
    successTip () {
      this.$msg('信息提交成功')
      setTimeout(() => {
        uni.navigateBack()
      }, 500)
    },
    // 根据行程单id获取生活纪实
    getJourneyLifeDocumentaryByItineraryId (journeyItineraryId) {
      this.$api.getJourneyLifeDocumentaryByItineraryId({ journeyItineraryId }).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.formData = res.content
      })
    },
    getJourneyItineraryById (id) {
      const params = { id }
      this.$api.getJourneyItineraryById(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.formData.shouldNumber = res?.content?.signUpList?.length ?? 0
        this.formData = JSON.parse(JSON.stringify(this.formData))
      })
    },
  },
  data () {
    return {
      formData: {
        type: '',
        date: '',
        address: '',
        host: '',
        recorder: '',
        shouldNumber: '',
        flowNumber: '',
        actualNumber: '',
        attendees: '',
        superiors: '',
        absentPerson: '',
        activityContent: '',
        isShowSignIn: true
      },
      lineData: {},
      btnDisabled: true,
      pageType: 'add',
      showTimePicker: false,
      timePickerConfig: {
        params: {
          year: true,
          month: true,
          day: true,
          timestamp: true,
        },
        defaultTime: '',
      }
    }
  },
  computed: {
    dateText () {
      this.changeInput()
      const setOutTime = this.formData.date
      if (!setOutTime) return '选择时间'
      return this.$moment(setOutTime).format('YYYY-MM-DD')
    },
    labelStyle () { // 自定义label样式
      const temStyle = {
        fontSize: '28rpx',
        color: '#333',
        fontWeight: 'bold',
        lineHeight: '40rpx'
      }
      return temStyle
    },
    customInputStyle () { // 自定义输入框样式
      const temStyle = {
        fontSize: '28rpx',
        color: '#333',
      }
      return temStyle
    },
    btnStyle () { // 自定义按钮样式
      const btnBgColor = this.btnDisabled ? '#ccc' : '#E32417'
      const temStyle = {
        fontSize: '30rpx',
        color: '#fff',
        width: '690rpx',
        height: '88rpx',
        borderRadius: '44rpx',
        fontWeight: 'bold',
        background: btnBgColor
      }
      return temStyle
    }
  },
  onLoad (option) {
    const { pageType, name, id } = option
    this.lineData = {
      journeyItineraryName: name,
      journeyItineraryId: id
    }
    this.pageType = pageType
    pageType === 'edit' ? this.getJourneyLifeDocumentaryByItineraryId(id) : this.getJourneyItineraryById(id)
  }
}
</script>

<style lang='scss' scoped>
page {
  background: #f7f7f7;
  height: 100%;
}
.p10-0 {
  padding: 10rpx 0;
}
.p24 {
  padding: 24rpx 0 !important;
}
.h28 {
  height: 28rpx;
  line-height: 28rpx;
}
/deep/ .u-form-item--left__content {
  padding-right: 24rpx;
}
.life-wrap {
  padding-bottom: 152rpx;
  overflow: auto;
}
.address-textarea {
  overflow: hidden;
  width: 420rpx;
  /deep/ textarea {
    padding: 0 !important;
    width: 100%;
    font-size: 28rpx;
  }
}
.name-textarea {
  overflow: hidden;
  width: 100%;
  /deep/ textarea {
    min-height: 78rpx !important;
    padding: 0 !important;
    width: 100%;
    font-size: 28rpx;
  }
}
.content-textarea {
  overflow: hidden;
  height: 200rpx;
  width: 100%;
  /deep/ textarea {
    height: 170rpx !important;
    padding: 0 !important;
    width: 100%;
    font-size: 28rpx;
    overflow-y: scroll;
  }
  .experience-count {
    height: 22rpx;
    line-height: 22rpx;
    float: right;
  }
}
.save-btn {
  height: 120rpx;
  position: fixed;
  bottom: 0;
  z-index: 100;
}
/deep/.u-datetime-picker {
  border-radius: 30rpx 30rpx 0 0;
  overflow: hidden;
}
</style>
