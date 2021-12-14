<template>
  <div class="wrap pb120">
    <div class=" form-box">
      <input type="text"
             v-model="form.title"
             placeholder="标题，比如xx农场，xx农家乐，xx民宿都可以"
             placeholder-class="place-class"
             class="ft32 title-style" />
      <u-input v-model="form.introduction"
               type="textarea"
               class="text-area mt36 ft30"
               maxlength="500"
               placeholder-style="color:#999"
               placeholder="做个介绍吧" />
      <div class="color-999 tr mt8 ft24">{{form.introduction ? form.introduction.length : 0}}/500</div>
      <div class="mt24 flex pb8">
        <upload-images :count="9"
                       :length="9"
                       :imageData.sync="form.images"></upload-images>
      </div>
    </div>

    <u-form :model="form"
            class="form ft26"
            label-width="144"
            ref="uForm">
      <u-form-item label="适宜人群"
                   prop="appropriateCrowd">
        <div class="flex1 mr16 text-hidden"
             @click="showAppropriateCrowd = true"
             :style="{color: appropriateCrowdNames === '未选择' ? '#999999' : '#333333'}">
          {{appropriateCrowdNames}}</div>
        <svg-icon icon="icon_xiangyoujiantou"
                  style="color:#c4c4c4"></svg-icon>
      </u-form-item>
      <u-form-item label="服务内容"
                   prop="serviceContent">
        <div class="flex1 mr16 text-hidden"
             @click="showServiceContent = true"
             :style="{color: serviceContentNames === '未选择' ? '#999999' : '#333333'}">
          {{serviceContentNames}}</div>
        <svg-icon icon="icon_xiangyoujiantou"
                  style="color:#c4c4c4"></svg-icon>
      </u-form-item>
      <u-form-item label="地址"
                   prop="address">
        <u-input v-model="form.address"
                 placeholder-style="color: #999999"
                 placeholder="输入地址" />
      </u-form-item>
      <u-form-item label="经纬度">
        <u-input v-model="form.lngLat"
                 placeholder-style="color: #999999"
                 placeholder="输入经纬度，如：192.743，32.123" />
      </u-form-item>

      <u-form-item label="联系电话"
                   prop="contactPhone">
        <u-input v-model="form.contactPhone"
                 placeholder-style="color: #999999"
                 placeholder="输入电话" />
      </u-form-item>
    </u-form>

    <div class="bt">
      <button class="submit tc ft32 bold"
              :class="isSubmit"
              @click="submit">
        提交
      </button>
    </div>
    <u-popup mode="center"
             v-model="show"
             :mask-close-able="false"
             border-radius="24">
      <div class="tc pop-box">
        <svg-icon icon="icon_chenggongFill"
                  class="ft88 mt64 icon-style"></svg-icon>
        <div class="ft32 bold mt32">提交成功，等待审核</div>
        <div class="ft26 color-999 mt16">审核后，展位内容将显示在定制体验列表</div>
        <div class="know-btn ft28 color-666"
             @click="onKnow">我知道啦</div>
      </div>
    </u-popup>

    <u-popup v-model="showAppropriateCrowd"
             @close="closeAppPopup"
             :closeable="true"
             mode="bottom">
      <div class="popup">
        <div class="title">选择适宜人群</div>
        <div class="tags row">
          <div class="tag ft28 tc mb16"
               v-for="(item, index) in appropriateCrowdOptions"
               :key="index"
               @click="onAppropriateItem(item, index)"
               :class="[(index + 1) % 4 !== 0 && 'mr16', item.isSelected ? 'active' : '' ]">
            <div>{{item.name}}</div>
          </div>
        </div>
        <div class="btn tc bold ft34"
             @click="onConfirmAppropriate">确定</div>
      </div>
    </u-popup>

    <u-popup v-model="showServiceContent"
             @close="closeAppPopup"
             :closeable="true"
             mode="bottom">
      <div class="popup">
        <div class="title">选择服务内容</div>
        <div class="tags row">
          <div class="tag ft28 tc mb16"
               v-for="(item, index) in serviceContentOptions"
               :key="index"
               @click="onServiceItem(item, index)"
               :class="[(index + 1) % 4 !== 0 && 'mr16', item.isSelected ? 'active' : '' ]">
            <div>{{item.name}}</div>
          </div>
        </div>
        <div class="btn tc bold ft34"
             @click="onConfirmService">确定</div>
      </div>
    </u-popup>
  </div>
</template>
<script>
import UploadImages from "@/components/upload-images";
import { appropriateCrowdOptions, serviceContentOptions } from '@/utils/enum.js'
import { subStringWithStrlen } from '@/utils/tools'
import { checkInput } from '@u/validate.js'

let appropriateCrowdList = []
let serviceContentList = []
export default {
  data () {
    return {
      appropriateCrowdOptions: JSON.parse(JSON.stringify(appropriateCrowdOptions)),
      serviceContentOptions: JSON.parse(JSON.stringify(serviceContentOptions)),
      showAppropriateCrowd: false,
      showServiceContent: false,
      form: {
        title: "",
        images: [],
        appropriateCrowd: '',
        serviceContent: ''
      },
      communityNoteId: "",
      show: false
    };
  },
  methods: {
    onAppropriateItem (item, index) {
      const temArr = this.appropriateCrowdOptions
      temArr[index].isSelected = !item.isSelected
      this.appropriateCrowdOptions = temArr
    },
    onConfirmAppropriate () {
      appropriateCrowdList = this.appropriateCrowdOptions.filter(item => item.isSelected)
      this.form.appropriateCrowd = this.handleTags(appropriateCrowdList)
      this.showAppropriateCrowd = false
    },
    closeAppPopup () {
      const _temArr = this.form.appropriateCrowd.split('、')
      const _temArr1 = this.form.serviceContent.split('、')
      this.appropriateCrowdOptions = this.appropriateCrowdOptions.map(item => {
        item.isSelected = _temArr.includes(item.name)
        return item
      })
      this.serviceContentOptions = this.serviceContentOptions.map(item => {
        item.isSelected = _temArr1.includes(item.name)
        return item
      })
    },
    onServiceItem (item, index) {
      const temArr = this.serviceContentOptions
      temArr[index].isSelected = !item.isSelected
      this.serviceContentOptions = temArr
    },
    onConfirmService () {
      serviceContentList = this.serviceContentOptions.filter(item => item.isSelected)
      this.form.serviceContent = this.handleTags(serviceContentList)
      this.showServiceContent = false
    },
    handleTags (list) {
      const _arr = list.map(item => item.name)
      return _arr.join('、')
    },
    // 提交按钮
    submit () {
      if (!this.validateForm()) return
      const params = {
        ...this.form,
      }
      params.appropriateCrowd = appropriateCrowdList.map(item => item.id)
      params.serviceContent = serviceContentList.map(item => item.id)
      if (params.lngLat.includes(',')) {
        params.lng = params.lngLat.split(',')[0]
        params.lat = params.lngLat.split(',')[1]
      }
      if (params.lngLat.includes('，')) {
        params.lng = params.lngLat.split('，')[0]
        params.lat = params.lngLat.split('，')[1]
      }
      delete params.lngLat
      params.images = params.images.map(item => {
        const temItem = {
          url: item.url,
          sourceType: item.type
        }
        return temItem
      })
      this.$api.createJourneyMerchantBooth(params).then((res) => {
        if (res.isError) return this.$msg(res.message);
        this.show = true
      });
    },
    validateForm () {
      for (const [key, val] of formValidateMap) {
        const _val = this.form[key]
        if (this.$isEmpty(_val)) {
          this.$msg(val)
          return
        }
        if (_val && key === 'lngLat' && !_val.includes('，') && !_val.includes(',')) {
          return this.$msg('经纬度格式不正确')
        }
        if (this.form.address.length > 30) {
          return this.$msg('地址最多支持输入 30 字')
        }
        if (_val && key === 'contactPhone' && !checkInput(_val, 'phone') && !checkInput(_val, 'tel')) {
          return this.$msg('电话号格式不正确')
        }
      }
      return true
    },
    validateFormClass () {
      for (const [key, val] of formValidateMap) {
        if (this.$isEmpty(this.form[key])) {
          return false
        }
      }
      return true
    },

    // 我知道了
    onKnow () {
      this.show = false;
      uni.navigateBack({ delta: 1 });
    }
  },
  computed: {
    appropriateCrowdNames () {
      const _temStr = subStringWithStrlen(this.form.appropriateCrowd, 34)
      return _temStr || '未选择'
    },
    serviceContentNames () {
      const _temStr = subStringWithStrlen(this.form.serviceContent, 34)
      return _temStr || '未选择'
    },
    isSubmit () {
      return this.validateFormClass() ? 'back' : ''
    },
  },
  components: { UploadImages },
};
const formValidateMap = new Map([
  ['title', '请输入标题'],
  ['introduction', '请输入描述'],
  ['images', '请至少上传一张照片'],
  ['appropriateCrowd', '请选择适宜人群'],
  ['serviceContent', '请选择服务内容'],
  ['address', '请输入地址'],
  ['lngLat', '请输入经纬度'],
  ['contactPhone', '请输入联系电话'],
])
</script>
<style lang="scss" scoped>
.wrap {
  .popup {
    padding: 24rpx 30rpx;
    .title {
      font-size: 34rpx;
      color: #000000;
      text-align: center;
      margin-bottom: 64rpx;
    }
    .tags {
      flex-wrap: wrap;
      width: calc(100vw - 60rpx);
    }
    .tag {
      width: 155rpx;
      height: 66rpx;
      line-height: 66rpx;
      background: #f7f7f7;
      border-radius: 33px;
      border: 1px solid transparent;
    }
    .active {
      border-color: #fa9a75;
      background: #fff1eb;
      color: #e32417;
    }
    .btn {
      margin-top: 80rpx;
      background: #e32417;
      font-size: 34rpx;
      color: #ffffff;
      border-radius: 49rpx;
      height: 98rpx;
      line-height: 98rpx;
    }
  }
  .tr {
    text-align: right !important;
  }
  /deep/ .u-input__right-icon {
    display: none;
  }
  /deep/ .u-form-item--left {
    font-weight: 400 !important;
  }

  .form {
    padding: 20rpx 30rpx;
  }
}
.form-box {
  padding: 0 30rpx;

  .title-style {
    height: 100rpx;
    border-bottom: 1px solid #eaeaea;
  }
  .text-area {
    height: 360rpx !important;
    padding: 0 !important;
    width: 100%;
    font-size: 28rpx;
    overflow-y: scroll;
  }
  .trips {
    height: 100rpx;
    border-top: 1px solid #eaeaea;
  }
}
.pb120 {
  padding-bottom: 120rpx;
}
.back {
  background: #e32417 !important;
}
.bt {
  width: 100%;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #eaeaea;
  padding: 16rpx 0;
  background: #ffffff;
  z-index: 99;
  .submit {
    width: 690rpx;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 49rpx;
    color: #ffffff;
    background: #cccccc;
  }
}
.ft88 {
  font-size: 88rpx;
}
.ft26 {
  font-size: 26rpx;
}
.know-btn {
  width: 240rpx;
  height: 70rpx;
  line-height: 70rpx;
  border-radius: 49rpx;
  border: 1px solid #d2d2d2;
  margin: 0 auto;
  margin-top: 32rpx;
}
.pop-box {
  width: 540rpx;
  height: 416rpx;
  .icon-style {
    color: #67c23a;
  }
}
.mt64 {
  margin-top: 64rpx;
}
</style>
