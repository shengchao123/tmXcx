<template>
  <view class="flex flex-wrap upload-wrap">
    <view v-for="(item, index) in imageList"
          :key="index"
          class="upload-item column center">
      <image class="upload-img"
             :src="$sourceUrl(item.url)"
             mode="aspectFill"
             @click="previewImage(index)"></image>
      <text class="upload-del-btn"
            @click="delImage(index)">
        <svg-icon icon="icon_guanbi"
                  class="ft32 mb16"></svg-icon>
      </text>
    </view>
    <view v-if="rduLength > 0"
          class="upload-item border-ea color-999 column center "
          @click="chooseImage">
      <svg-icon icon="icon_xiangji"
                class="ft76 mb16"></svg-icon>
      <view class="ft28">添加图片</view>
    </view>
  </view>
</template>

<script>
import { urls } from '@/api/urls.js'
import { getFullUrl } from '@/utils/tools.js'
export default {
  props: {
    count: {
      type: Number,
      default: 4 //单次可选择的图片数量
    },
    length: {
      type: Number,
      default: 50 //可上传总数量
    },
    imageData: {
      type: Array,
      default: () => []
    },
    imageTypeName: {
      type: String,
      default: 'type'
    }
  },
  computed: {
    rduLength () {
      return this.length - this.imageList.length;
    },
    imageList () {
      return this.imageData
    }
  },
  methods: {
    //选择图片
    chooseImage: function () {
      uni.chooseImage({
        count: this.rduLength < this.count ? this.rduLength : this.count, //最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有
        success: (res) => {
          const images = res.tempFilePaths;
          this.uploadFiles(images);
        }
      });
    },
    //上传图片
    async uploadFiles (images) {
      this.imageList.push({
        url: images[0],
        [this.imageTypeName]: '01'
      });
      let uploadData = ""
      uni.showLoading({
        title: '请稍后..',
        mask: true,
      })
      try {
        uploadData = await this.uploadImage(images[0]);
      } catch (err) {
        uni.hideLoading()
        uni.showToast({
          title: '系统连接超时，请稍后再试！',
          mask: false
        })
        return;
      }
      if (uploadData.success) {
        images.splice(0, 1);
        this.imageList[this.imageList.length - 1].url = uploadData.content.filePaths[0];
        //判断是否需要继续上传
        if (images.length > 0 && this.rduLength > 0) {
          this.uploadFiles(images);
        } else {
          uni.hideLoading();
          this.$emit('update:imageData', this.imageList)
        }
      } else {
        //上传失败处理
        this.imageList.pop();
        uni.hideLoading();
        uni.showToast({
          title: '上传中出现问题，已终止上传',
          icon: 'none',
          mask: true,
          duration: 2000
        });
      }
      // this.$emit('update:imageData', this.imageList)
    },
    uploadImage (file) {
      return new Promise((resolve, reject) => {
        //发送给后端的附加参数
        const formData = {
          type: 2,
        };
        const headers = {
          'ContentType': 'multipart/form-data',
        }
        uni.uploadFile({
          url: getFullUrl(urls.uploadFile),
          // url: 'https://www.example.com/upload',
          name: 'files',
          filePath: file,
          fileType: 'image',
          timeout: 100000,
          header: headers,
          formData,
          success (uploadFileResult) {
            const uploadFileRes = JSON.parse(uploadFileResult.data) || {};
            if (uploadFileRes.code === 10000 && uploadFileRes.content) {
              resolve(uploadFileRes);
            } else {
              reject('接口返回错误');
            }
          },
          fail () {
            reject('网络链接错误');
          }
        });
      });

    },
    //删除图片
    delImage (index) {
      this.imageList.splice(index, 1);
      this.$emit('update:imageData', this.imageList)
    },
    //预览图片
    previewImage (index) {
      const urls = [];
      this.imageList.forEach((item) => {
        urls.push(this.$sourceUrl(item.url));
      })
      uni.previewImage({
        current: urls[index],
        urls: urls,
        indicator: "number"
      })
    }
  },
}
</script>

<style lang="scss">
.ft76 {
  font-size: 76rpx;
}
.flex-wrap {
  flex: wrap;
}
.border-ea {
  border: 2rpx solid #eaeaea;
}
.upload-item {
  position: relative;
  width: 214rpx;
  height: 214rpx;
  border-radius: 10rpx;
  margin-right: 24rpx;
  margin-bottom: 24rpx;
  box-sizing: border-box;
  .upload-img {
    width: 100%;
    height: 100%;
    border-radius: 10rpx;
  }
  .upload-del-btn {
    position: absolute;
    right: -16rpx;
    top: -16rpx;
    width: 32rpx;
    height: 32rpx;
    color: #c7c7c7;
    background: #ffffff;
    border-radius: 100%;
  }
}
.upload-wrap .upload-item:nth-of-type(3n) {
  margin-right: 0;
}
</style>
