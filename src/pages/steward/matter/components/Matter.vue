<template>
  <div class='topic-wrap relative'>
    <img src="https://hzslzx.oss-cn-hangzhou.aliyuncs.com/system/tianmu/images/matter.png">

    <div class="form">
      <div class="form-item p30 ft30 center-align">
        <text class="w120 medium">姓名</text>
        <text>{{userInfo.name}}</text>
      </div>

      <div class="form-item p30 ft30 center-align">
        <text class="w120 medium">联系电话</text>
        <text>{{userInfo.phone}}</text>
      </div>

      <div class="form-item p30 ft30 center-align">
        <text class="w120 medium">身份证号</text>
        <text>{{userInfo.idCardNo}}</text>
      </div>

      <div class="form-item p30 ft30"
           style="border-bottom:none">
        <text class="w120 medium">问题描述</text>
        <div class="">
          <textarea placeholder="添加正文"
                    v-model="evaluate.problemDesc"
                    placeholder-style="color:#999"
                    maxlength="500"
                    style="width: 100%"
                    class="text-area mt36 ft30">
            </textarea>
        </div>
        <div class="tr ft22 color-999 mt8">{{evaluate.problemDesc.length}} / 500</div>
      </div>
      <view class="pb120 evaluate-box">
        <view class="mt24 flex pb8">
          <upload-images :count="9"
                         :length="9"
                         :imageData.sync="evaluate.attachments"></upload-images>
        </view>
      </view>
    </div>

    <div class="mt24">
      <view class="bt">
        <button class="submit tc ft32 bold back"
                @click="submit">
          提交
        </button>
      </view>
    </div>
  </div>
</template>

<script>
import UploadImages from "@/components/upload-images";
export default {
  name: 'Topic',
  components: {
    UploadImages
  },
  methods: {
    // 提交按钮
    submit () {
      this.show = true;
      const { problemDesc, attachments } = this.evaluate;
      if (!problemDesc || !attachments.length === 0) {
        return this.$msg("请填写完整信息");
      }
      const params = {
        ...this.evaluate,
      };
      this.$api.submitProblem(params).then((res) => {
        if (res.isError) return this.$msg(res.message);
        this.evaluate = {}
        uni.navigateTo({ url: '/pages/steward/matter/Success' })
      });
    },
    getMemberPersonalInfo () {
      this.$api.getMemberPersonalInfo().then(res => {
        if (res.isError) return
        uni.setStorageSync('isAuthCommunity', res.content.isAuthCommunity)
        this.userInfo = res.content
      })
    },
  },
  data () {
    return {
      userInfo: {},
      evaluate: {
        problemDesc: "",
        attachments: [],
      }
    }
  },
  created () {
    this.getMemberPersonalInfo()
  }
}
</script>

<style lang='scss' scoped>
.topic-wrap {
  padding-bottom: 140rpx;
  img {
    width: 100%;
  }
  .evaluate-box {
    .trips {
      height: 100rpx;
      border-top: 1px solid #eaeaea;
    }
  }
  .form {
    box-shadow: 3px 2px 12px 8px rgba(17, 17, 17, 0.03);
    border-radius: 8rpx;
    position: absolute;
    top: 210rpx;
    left: 30rpx;
    right: 30rpx;
    background-color: #ffffff;
  }
  .form-item {
    padding: 30rpx;
    border-bottom: 1px solid #eaeaea;
    .w120 {
      width: 160rpx;
    }
  }
  .pb120 {
    padding-bottom: 120rpx;
  }
  .back {
    background: #e32417 !important;
  }
  .bt {
    left: 0;
    right: 0;
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    padding-bottom: 16rpx;
    border-top: 1px solid #eaeaea;
    padding-top: 16rpx;
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

  .mt64 {
    margin-top: 64rpx;
  }
}
</style>
