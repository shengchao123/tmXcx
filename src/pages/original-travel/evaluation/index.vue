<template>
  <view>
    <view class="pb120 evaluate-box">
      <input type="text"
             v-model="evaluate.title"
             placeholder="有标题可以获得更多赞哦～"
             placeholder-class="place-class"
             class="ft32 title-style" />
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
      <view class="trips between-row"
            @click="changeEvaluate">
        <view class="center-align">
          <svg-icon icon="icon_didian"
                    class="ft30 mr16 color-666"></svg-icon>
          <view class="ft28">选择行程</view>
        </view>
        <view class="center-align">
          <view class="ft24 mr8 color-999">
            {{evaluateData.name ? evaluateData.name : "未选择"}}</view>
          <svg-icon icon="icon_xiangyoujiantou"
                    class="ft20 fc4"></svg-icon>
        </view>
      </view>
      <select-evaluate-pop ref="selectRoutePop"
                           :selectedId.sync="evaluate.journeyItineraryId"
                           @onEvaluateItem="getEvaluateItem"></select-evaluate-pop>
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
        <view class="ft26 color-999 mt16">审核后，评价内容将显示在初心之旅</view>
        <view class="know-btn ft28 color-666"
              @click="onKnow">我知道啦</view>
      </view>
    </u-popup>
  </view>
</template>
<script>
import UploadImages from "@/components/upload-images";
import SelectEvaluatePop from "./components/SelectEvaluatePop.vue";

export default {
  data () {
    return {
      evaluate: {
        title: "",
        content: "",
        attachmentDTOList: [],
        journeyItineraryId: "",
      },
      evaluateData: {
        id: "",
        name: "",
      },
      communityNoteId: '',
      show: false
    };
  },
  methods: {
    // 提交按钮
    submit () {
      const {
        title,
        content,
        attachmentDTOList,
        journeyItineraryId,
      } = this.evaluate;
      if (
        !title ||
        !content ||
        !attachmentDTOList.length === 0 ||
        !journeyItineraryId
      ) {
        return this.$msg("请填写完整信息");
      }
      const params = {
        ...this.evaluate,
      };
      let apiName = 'createItineraryEvaluation'
      if (this.communityNoteId) {
        apiName = 'modifyItineraryEvaluation'
      }
      this.$api[apiName](params).then((res) => {
        if (res.isError) return this.$msg(res.message);
        this.show = true
      });
    },
    // 选择行程
    changeEvaluate () {
      this.$refs.selectRoutePop.show();
    },
    // 获取评价详情数据
    getEvaluateData (id) {
      const params = {
        communityNoteId: id,
      };
      this.$api.getItineraryEvaluationInfoById(params).then((res) => {
        if (res.isError) return this.$msg(res.message);
        this.evaluate = { ...res.content };
        this.evaluateData.name = res.content.journeyItineraryName
      });
    },
    // 获取选择行程数据
    getEvaluateItem (val) {
      this.evaluate.journeyItineraryId = val.id
      this.evaluateData = val;
    },
    // 我知道了
    onKnow () {
      this.show = false;
      uni.navigateBack({ delta: 1 });
    }
  },
  computed: {
    isSubmit () {
      const { title, content, attachmentDTOList, journeyItineraryId } = this.evaluate;
      if (title && content && attachmentDTOList.length > 0 && journeyItineraryId) {
        return "back";
      }
      return "";
    },
  },
  onLoad (option) {//行程id或评价id(评价详情入口这期没做)
    if (option.id) {
      this.evaluate.journeyItineraryId = option.id
      this.evaluateData.name = option.name
    }
    // this.getEvaluateData(option.id); 详情接口
  },
  components: { UploadImages, SelectEvaluatePop },
};
</script>
<style lang="scss" scoped>
.evaluate-box {
  padding: 0 30rpx;
  .place-class {
    font-size: 32rpx;
  }
  .title-style {
    font-size: 32rpx;
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
.fc4 {
  color: #c4c4c4;
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
