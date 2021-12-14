<template>
  <div class='stroke-order-wrap'>
    <head-map ref="headMap"
              :journeyLineId.sync="form.data.journeyLineId"
              :journeyLineName="journeyLineName"
              :journeyPointList="journeyPointList"
              @journeyLineChange="journeyLineChange"></head-map>
    <u-form ref="form"
            :model="form.data"
            class="bg-white">
      <div class="pl30 pr30">
        <u-form-item label="预估时长"
                     label-width="144">
          <my-radio-box :options="playTimeOptions"
                        :value.sync="form.data.playTime"></my-radio-box>
        </u-form-item>

        <u-form-item label="活动类型"
                     label-width="144">
          <my-radio-box :options="activityTypeOptions"
                        :value.sync="form.data.activityType"></my-radio-box>
        </u-form-item>
        <u-form-item label="组织生活记录"
                     label-width="204"
                     :border-bottom="false">
          <my-radio-box :options="needLifeDocumentaryOptions"
                        :value.sync="form.data.needLifeDocumentary"></my-radio-box>
        </u-form-item>
      </div>
      <div class="line-bold"></div>
      <div class="pl30 pr30">
        <u-form-item label="名称"
                     label-width="144"
                     prop="name">
          <div class="row">
            <u-input v-model="form.data.name"
                     style="width:460rpx;margin-right:10rpx"
                     maxlength="15"
                     placeholder="命名你的行程，如临安红色一日游" />
            <input-length-word :modelData="form.data.name"
                               maxLength="15"></input-length-word>
          </div>
        </u-form-item>
        <u-form-item label="召集人"
                     label-width="144"
                     prop="organizer">
          <div class="row">
            <u-input v-model="form.data.organizer"
                     maxlength="10"
                     style="width:460rpx;margin-right:10rpx"
                     placeholder="输入召集人姓名" />
            <input-length-word :modelData="form.data.organizer"
                               maxLength="10"></input-length-word>
          </div>
        </u-form-item>
        <u-form-item label="手机号"
                     label-width="144"
                     prop="contactDetails">
          <u-input v-model="form.data.contactDetails"
                   type="number"
                   placeholder="输入召集人手机号" />
        </u-form-item>
        <u-form-item label="集合地点"
                     label-width="144"
                     prop="meetingPlace">
          <div class="center-align flex1"
               @click="onVenueMap">
            <span class="flex1"
                  :class="form.data.meetingPlace ? 'color-333' : 'color-placeholder'">{{meetingPlaceText}}</span>
            <input-length-word :modelData="form.data.meetingPlace"
                               maxLength="30"></input-length-word>
            <svg-icon icon="icon_dingwei"
                      class="ft30 ml16"
                      style="color: #518CFC"></svg-icon>
          </div>
        </u-form-item>
        <u-form-item label="出发日期"
                     label-width="144"
                     prop="setOutTime">
          <div class="center-align flex1"
               @click="onShowTimePicker">
            <span class="flex1"
                  :class="form.data.setOutTime ? 'color-333' : 'color-placeholder'">{{setOutTimeText}}</span>
            <svg-icon icon="icon_riqi"
                      class="ft30 ml16"
                      style="color: #878787"></svg-icon>
          </div>
        </u-form-item>
        <u-form-item label="交通方式"
                     label-width="144">
          <my-radio-box :options="transportationOptions"
                        :value.sync="form.data.transportation"></my-radio-box>
        </u-form-item>
        <u-form-item label="温馨提示"
                     label-width="144"
                     :border-bottom="false">
          <u-input v-model="form.data.precautions"
                   placeholder="输入其他注意事项（选填）" />
        </u-form-item>
      </div>
    </u-form>
    <div class="footer pl30 pr30 center-align">
      <div class="confirm-btn ft32 tc"
           @click="onConfirm">{{isEdit ? '保存' : '确定'}}</div>
    </div>
    <u-picker v-model="showTimePicker"
              mode="time"
              title="日期"
              confirm-color="#E32417"
              :params="timePickerConfig.params"
              :start-year="timePickerConfig.startYear"
              :end-year="timePickerConfig.endYear"
              :default-time="timePickerConfig.defaultTime"
              @confirm="confirmTimePicker"></u-picker>
  </div>
</template>
<script>
import { playTimeOptions, activityTypeOptions, needLifeDocumentaryOptions, transportationOptions } from '@/utils/enum'
import MyRadio from './components/MyRadio'
import MyRadioBox from './components/MyRadioBox.vue'
import HeadMap from './components/HeadMap.vue'
import InputLengthWord from './components/InputLengthWord.vue'

export default {
  methods: {
    // 选择集合点
    onVenueMap () {
      uni.chooseLocation({
        success: ({ name, address, longitude, latitude }) => {
          uni.$emit('setMeetingPlaceEvent', {
            meetingPlace: name,
            meetingPlaceLat: latitude,
            meetingPlaceLng: longitude
          })
        }
      })
    },
    // 显示 日期选择 弹窗
    onShowTimePicker () {
      this.showTimePicker = true
    },
    // 日期选中回调
    confirmTimePicker (params) {
      const { timestamp } = params
      const setOutTime = timestamp * 1000
      this.form.data.setOutTime = setOutTime
      this.setTimePickerDefaultValue(setOutTime)
    },
    // 行程路线 切换 回调
    journeyLineChange ({ playTime }) {
      this.form.data.playTime = playTime
    },
    onConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.form.data.journeyLineId && this.$isEmpty(this.journeyPointList)) {
            return this.$msg('请选择行程路线')
          }
          this.createJourneyItinerary()
        } else {
          this.$msg('还有信息未填写')
        }
      })
    },
    createJourneyItinerary () {
      console.log(111)
      const {
        name, playTime, activityType,
        needLifeDocumentary, organizer, contactDetails,
        meetingPlace, meetingPlaceLat, meetingPlaceLng,
        setOutTime, transportation, journeyLineId,
        precautions
      } = this.form.data
      const params = {
        activityType,
        contactDetails,
        meetingPlace,
        meetingPlaceLat,
        meetingPlaceLng,
        name,
        needLifeDocumentary,
        organizer,
        playTime,
        precautions,
        setOutTime,
        transportation,
        type: journeyLineId ? '01' : '02' // 是否自定义路线
      }
      if (journeyLineId) {
        params.journeyLineId = journeyLineId
      } else {
        params.journeyPointIds = this.journeyPointList.map(el => el.journeyPointId)
      }
      if (this.isEdit) { // 编辑id
        params.id = this.id
      }
      const apiName = this.isEdit ? 'modifyJourneyItinerary' : 'createJourneyItinerary'
      this.$api[apiName](params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$store.commit('travel/CUSTOM_PATH_POINTS', [])
        this.$msg(this.isEdit ? '修改成功' : '创建成功')
        setTimeout(() => {
          if (this.isEdit) {
            uni.navigateBack()
            return
          }
          const temHref = this.$getCurrentRoute().route
          const link = temHref.split('/pages')[0] + `/pages/original-travel/stroke-order/detail?id=${res.content.id}`
          const shareData = {
            link,
            title: name,
            desc: precautions,
          }
          uni.setStorageSync('strokeCreateShare', shareData)
          uni.redirectTo({
            url: `/pages/original-travel/stroke-order/createSuccess?id=${res.content.id}`
          })
        }, 500)
      })
    },
    getJourneyItineraryById (id) {
      const params = { id }
      this.$api.getJourneyItineraryById(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        const { journeyLineName, journeyPointList, setOutTime, journeyLineId } = res.content
        const journeyLineIdCache = journeyLineId && journeyLineId !== '0' ? journeyLineId : null
        this.journeyLineName = journeyLineName
        this.journeyPointList = journeyPointList
        this.form.data = {
          ...res.content,
          journeyLineId: journeyLineIdCache
        }
        this.$refs.headMap.journeyLineIdCache = journeyLineIdCache
        this.setTimePickerDefaultValue(setOutTime)
      })
    },
    // 编辑设置
    setEditConfig (id) {
      uni.setNavigationBarTitle({
        title: '编辑行程单'
      })
      this.getJourneyItineraryById(id)
    },
    // 设置日期选择 默认时间
    setTimePickerDefaultValue (setOutTime) {
      this.timePickerConfig.defaultTime = this.$moment(setOutTime).format('YYYY-MM-DD HH:mm')
    },
    // 设置 日期选择器配置
    setTimePickeConfig () {
      const nowDate = new Date()
      const nowYear = nowDate.getFullYear()
      this.timePickerConfig = {
        ...this.timePickerConfig,
        startYear: nowYear,
        endYear: nowYear + 4,
      }
    },
    setEvent () {
      uni.$on('setJourneyPointListEvent', (list) => {
        this.journeyPointList = [...list]
      })
      uni.$on('setMeetingPlaceEvent', (data) => {
        const { meetingPlace, meetingPlaceLat, meetingPlaceLng } = data
        const formData = this.form.data
        this.form.data = {
          ...formData,
          meetingPlace,
          meetingPlaceLat,
          meetingPlaceLng
        }
      })
    },
    clearEvent () {
      uni.$off('setJourneyPointListEvent')
      uni.$off('setMeetingPlaceEvent')
    }
  },
  data () {
    const contactDetailsVal = (rule, value, callback) => {
      if (!value) return callback(new Error('输入召集人手机号'))
      if (!this.$u.test.mobile(value)) return callback(new Error('手机号不正确'))
      callback()
    }
    const setOutTimeVal = (rule, value, callback) => {
      if (!value) return callback(new Error('选择出发时间'))
      callback()
    }
    return {
      id: null,
      isEdit: false,
      showTimePicker: false,
      form: {
        data: {
          name: '',
          playTime: '01',
          activityType: '01',
          needLifeDocumentary: true,
          organizer: '',
          contactDetails: '',
          meetingPlace: '',
          meetingPlaceLat: '',
          meetingPlaceLng: '',
          setOutTime: '',
          transportation: '01',
          precautions: '',
          journeyLineId: null
        },
        rules: {
          name: [{ required: true, message: '输入行程名称', trigger: ['change', 'blur'] }],
          organizer: [{ required: true, message: '输入召集人姓名', trigger: ['change', 'blur'] }],
          contactDetails: [{ required: true, trigger: ['change', 'blur'], validator: contactDetailsVal }],
          meetingPlace: [{ required: true, message: '输入集合地点', trigger: ['change', 'blur'] }],
          setOutTime: [{ required: true, trigger: ['change', 'blur'], validator: setOutTimeVal }],
        }
      },
      timePickerConfig: {
        params: {
          year: true,
          month: true,
          day: true,
          hour: true,
          minute: true,
          timestamp: true,
        },
        startYear: '',
        endYear: '',
        defaultTime: '',
      },
      journeyLineName: '',
      journeyPointList: [],
      playTimeOptions,
      activityTypeOptions,
      needLifeDocumentaryOptions,
      transportationOptions,
    }
  },
  computed: {
    setOutTimeText () {
      const setOutTime = this.form.data.setOutTime
      if (!setOutTime) return '选择时间'
      return this.$moment(setOutTime).format('YYYY-MM-DD HH:mm')
    },
    meetingPlaceText () {
      const meetingPlace = this.form.data.meetingPlace
      if (!meetingPlace) return '选择集合点'
      return meetingPlace
    }
  },
  destroyed () {
    this.clearEvent()
  },
  onReady () {
    this.$refs.form.setRules(this.form.rules);
  },
  onLoad (option) {
    const { isEdit, id, journeyLineId } = option
    this.form.data.journeyLineId = journeyLineId
    this.id = id
    this.isEdit = isEdit === '1'
    if (this.isEdit) this.setEditConfig(id)
    this.setTimePickeConfig()
    this.setEvent()
  },
  components: { MyRadio, MyRadioBox, HeadMap, InputLengthWord }
}
</script>
<style>
page {
  height: 100%;
  background: #fff;
}
</style>
<style lang='scss' scoped>
.stroke-order-wrap {
  color: #333;
  padding-bottom: 152rpx;
  .map {
    width: 689rpx;
    height: 300rpx;
    border-radius: 4rpx;
    overflow: hidden;
  }
  .line-bold {
    width: 100%;
    height: 20rpx;
    background: #f7f7f7;
  }
  .head-map-from {
    background: #fff;
    .route-select {
      height: 74rpx;
    }
  }
  .ellipsis-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    height: 120rpx;
    z-index: 2;
    .confirm-btn {
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      background: #e32417;
      border-radius: 44rpx;
      color: #fff;
    }
  }
  .color-placeholder {
    color: rgb(192, 196, 204);
  }
  /deep/.u-form-item--left {
    align-items: flex-start;
  }
  /deep/.u-datetime-picker {
    border-radius: 30rpx 30rpx 0 0;
    overflow: hidden;
  }
}
</style>