<template>
  <div class='record-wrap'>
    <u-form ref="form"
            :model="form.data">
      <div class="pl32 pr32 bg-white">
        <u-form-item label="跟进状态"
                     label-width="192"
                     prop="status">
          <div class="between-row center-align flex1 relative">
            <u-input v-model="form.statusName"
                     :disabled="true"
                     placeholder="选择跟进状态" />
            <svg-icon icon="icon_xiangyoujiantou"
                      class="ft20 color-666"></svg-icon>
            <div class="btn-area"
                 @click="onShowStatusSelect"></div>
          </div>
        </u-form-item>
        <u-form-item label="记录时间"
                     label-width="192"
                     prop="recordTime">
          <div class="between-row center-align flex1 relative">
            <u-input v-model="form.recordTimeName"
                     :disabled="true"
                     placeholder="选择跟进状态" />
            <svg-icon icon="icon_riqi"
                      class="ft28 color-666"></svg-icon>
            <div class="btn-area"
                 @click="onShowTimePicker"></div>
          </div>
        </u-form-item>
        <u-form-item label="记录内容"
                     label-position="top"
                     :border-bottom="false"
                     prop="description">
          <div class="flex1">
            <u-input v-model="form.data.description"
                     type="textarea"
                     height="160"
                     maxlength="200"
                     placeholder="输入内容，记录项目的服务进度" />
            <div class="ft22 color-999"
                 style="text-align: right; line-height: 24rpx">{{form.data.description.length}}/200</div>
          </div>
        </u-form-item>

      </div>
      <div class="mt24 pl32 bg-white">
        <u-form-item label="图片上传（非必填）"
                     label-width="192"
                     label-position="top"
                     prop="playDays">
          <upload-images :count="3"
                         :length="3"
                         imageTypeName='sourceType'
                         :imageData.sync="form.data.attachmentList"></upload-images>
        </u-form-item>
      </div>
    </u-form>
    <div class="footer-btn pl32 pr32">
      <div class="submit tc mt16 ft32 medium"
           :class="isDisabled && 'disabled'"
           @click="onSubmit">{{scheduleId ? '保存' : '提交'}}</div>
    </div>
    <u-select v-model="showStatusSelected"
              :list="statusList"
              confirm-color="#E32417"
              @confirm="onStatusSelect"></u-select>
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
import UploadImages from "@/components/upload-images";

export default {
  methods: {
    onShowStatusSelect () {
      if (this.scheduleId) return
      this.showStatusSelected = true
    },
    onShowTimePicker () {
      this.showTimePicker = true
    },
    onStatusSelect (item) {
      const { label, value } = item[0]
      this.form.data.status = value
      this.form.statusName = label
    },
    // 日期选中回调
    confirmTimePicker (params) {
      const { timestamp } = params
      const setOutTime = timestamp * 1000
      this.form.data.recordTime = setOutTime
      this.form.recordTimeName = this.$moment(setOutTime).format('YYYY-MM-DD HH:mm')
      this.setTimePickerDefaultValue(setOutTime)
    },
    // 设置日期选择 默认时间
    setTimePickerDefaultValue (setOutTime) {
      this.timePickerConfig.defaultTime = this.$moment(setOutTime).format('YYYY-MM-DD HH:mm')
    },
    onSubmit () {
      if (this.isDisabled) return
      if (this.scheduleId) {
        this.modifyJourneyHelperProjectSchedule()
      } else {
        this.createJourneyHelperProjectSchedule()
      }
    },
    createJourneyHelperProjectSchedule () {
      const params = {
        id: this.projectId,
        ...this.form.data
      }
      this.$api.createJourneyHelperProjectSchedule(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('记录添加成功')
        setTimeout(() => {
          uni.$emit('helperProjectOver')
          uni.navigateBack()
        }, 500)
      })
    },
    modifyJourneyHelperProjectSchedule () {
      const params = {
        scheduleId: this.scheduleId,
        ...this.form.data
      }
      this.$api.modifyJourneyHelperProjectSchedule(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('记录编辑成功')
        setTimeout(() => {
          uni.$emit('helperProjectOver')
          uni.navigateBack()
        }, 500)
      })
    },
    setFormData (formData) {
      const { status, recordTime, description, attachmentDTOList } = formData
      this.form.data = {
        status,
        recordTime,
        description,
        attachmentList: attachmentDTOList || [],
      }
      this.form.statusName = status === 2 ? '跟进中' : '已办结'
      this.form.recordTimeName = this.$moment(recordTime).format('YYYY-MM-DD HH:mm')
      this.setTimePickerDefaultValue(recordTime)
    }
  },
  data () {
    return {
      projectId: null, // 项目id
      scheduleId: null,
      form: {
        statusName: '',
        recordTimeName: '',
        data: {
          status: null,
          recordTime: null,
          description: '',
          attachmentList: []
        }
      },
      showStatusSelected: false,
      statusList: [{ label: '跟进中', value: 2 }, { label: '已办结', value: 3 }],
      showTimePicker: false,
      timePickerConfig: {
        params: {
          year: true,
          month: true,
          day: true,
          hour: true,
          minute: true,
          timestamp: true,
        },
        defaultTime: '',
      },
    }
  },
  computed: {
    isDisabled () {
      const { status, recordTime, description } = this.form.data
      return !(status && recordTime && description)
    }
  },
  destroyed () {
    uni.removeStorageSync('journeyHelperProjectSchedule')
  },
  onLoad ({ projectId, scheduleId }) {
    this.projectId = projectId
    if (scheduleId) {
      uni.setNavigationBarTitle({
        title: '编辑记录'
      });
      this.scheduleId = scheduleId
      const journeyHelperProjectSchedule = JSON.parse(uni.getStorageSync('journeyHelperProjectSchedule'))
      this.setFormData(journeyHelperProjectSchedule)
    }
  },
  components: { UploadImages }
}
</script>
<style>
page {
  height: 100%;
  background: #f7f7f7;
}
</style>
<style lang='scss' scoped>
.record-wrap {
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
  .btn-area {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
}
</style>