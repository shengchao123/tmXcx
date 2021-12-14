<template>
  <view>
    <view class="pb120 evaluate-box">
      <input type="text"
             v-model="evaluate.title"
             placeholder="有标题可以获得更多赞哦～"
             placeholder-class="place-class"
             class="ft32 bold title-style" />
      <textarea placeholder="添加正文"
                v-model="evaluate.content"
                placeholder-style="color:#999"
                maxlength="-1"
                class="text-area mt36 ft30">
      </textarea>
      <view class="mt24 flex pb8">
        <upload-images :count="9"
                       :length="9"
                       :imageData.sync="evaluate.attachmentDTOList"></upload-images>
      </view>
    </view>
    <view class="bt">
      <button class="submit tc ft32 bold"
              :class="isSubmit"
              @click="submit">
        提交
      </button>
    </view>
    <u-popup mode="center"
             v-model="show"
             :mask-close-able="false"
             border-radius="24">
      <view class="tc pop-box">
        <svg-icon icon="icon_chenggongFill"
                  class="ft88 mt64 icon-style"></svg-icon>
        <view class="ft32 bold mt32">提交成功，等待审核</view>
        <view class="ft26 color-999 mt16">审核后，帖子内容将显示在论坛</view>
        <view class="know-btn ft28 color-666"
              @click="onKnow">我知道啦</view>
      </view>
    </u-popup>
  </view>
</template>
<script>
import UploadImages from "@/components/upload-images";

export default {
  data () {
    return {
      evaluate: {
        title: "",
        content: "",
        attachmentDTOList: [],
      },
      communityNoteId: "",
      show: false
    };
  },
  methods: {
    // 提交按钮
    submit () {
      const { title, content, attachmentDTOList } = this.evaluate;
      if (!title || !content || !attachmentDTOList.length === 0) {
        return this.$msg("请填写完整信息");
      }
      const params = {
        ...this.evaluate,
      };
      let apiName = "createCommunityNote";
      if (this.communityNoteId) {
        apiName = "modifyCommunityNote";
      }
      this.$api[apiName](params).then((res) => {
        if (res.isError) return this.$msg(res.message);
        this.show = true
      });
    },
    // 获取帖子详情数据
    getEvaluateData (id) {
      const params = {
        communityNoteId: id,
      };
      this.$api.getCommunityNoteInfoById(params).then((res) => {
        if (res.isError) return this.$msg(res.message);
        this.evaluate = { ...res.content };
      });
    },
    // 我知道了
    onKnow () {
      this.show = false;
      uni.navigateBack({ delta: 1 });
    }
  },
  computed: {
    isSubmit () {
      const { title, content, attachmentDTOList } = this.evaluate;
      if (title && content && attachmentDTOList.length > 0) {
        return "back";
      }
      return "";
    },
  },
  onLoad (option) {
    if (option.id) {
      this.communityNoteId = option.id;
      this.getEvaluateData(option.id);
    }
  },
  components: { UploadImages },
};
</script>
<style lang="scss" scoped>
.evaluate-box {
  padding: 0 30rpx;
  .place-class {
  }
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
  bottom: 16rpx;
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
