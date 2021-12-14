<template>
  <u-popup v-model="isShow"
           border-radius="30"
           height="834"
           mode="bottom">
    <view class="popup">
      <view class="title center">
        <text class="ft34 medium">选择行程</text>
        <view @click="hide">
          <svg-icon icon="icon_cha"
                    class="color-999 ft24 close"></svg-icon>
        </view>
      </view>
      <mescroll-uni ref="mescrollRef"
                    class="mescroll-wrap"
                    top="100"
                    :up="upOption"
                    @init="mescrollInit"
                    @down="downCallback"
                    @up="upCallback">
        <view class="list pl30 pr30">
          <view v-for="(item, index) in list"
                :key="index"
                class="item between-row center-align"
                :class="item.id === selectedId && 'selected'"
                @click="onItem(item)">
            <text class="ft28">{{ item.name }}</text>
            <svg-icon v-if="item.id === selectedId"
                      icon="icon_duihao"
                      class="ft28 mt4"></svg-icon>
          </view>
        </view>
      </mescroll-uni>
    </view>
  </u-popup>
</template>
<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
export default {
  methods: {
    show () {
      this.isShow = true;
    },
    hide () {
      this.isShow = false;
    },
    onItem (item) {
      this.$emit("onEvaluateItem", item);
      this.hide();
    },
    // 下拉刷新
    downCallback () {
      this.mescroll.resetUpScroll(); // 重置列表为第一页
    },
    // 加载更多
    upCallback (page) {
      this.getRecommendJourneyLineList(page);
    },
    getRecommendJourneyLineList (page) {
      const params = {
        pageNumber: (page && page.num) || 1,
        pageSize: (page && page.size) || 10,
      };
      this.$api.getMyJourneyItineraryPage(params).then((res) => {
        if (res.isError) return this.$msg(res.message);
        const list = res.content;
        this.mescroll.endBySize(list.items.length, list.count);
        this.list =
          params.pageNumber === 1 ? list.items : this.list.concat(list.items);
      });
    },
  },
  props: {
    selectedId: {
      type: String,
      default: "",
    },
  },
  data () {
    return {
      isShow: false,
      list: [],
      upOption: {
        empty: {
          use: false, // 是否显示空布局
          icon: this.$imgHost + "no-order.png",
          tip: "暂无数据", // 提示
        },
        textNoMore: "没有更多数据",
        noMoreSize: 1, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
      },
    };
  },
  mixins: [MescrollMixin],
  components: { MescrollUni },
};
</script>
<style lang="scss" scoped>
.popup {
  .title {
    position: relative;
    line-height: 84rpx;
    border-bottom: solid 1px #ddd;
    .close {
      position: absolute;
      top: 8rpx;
      right: 32rpx;
      color: #c7c7c7;
    }
  }
  .list {
    max-height: 680rpx;
    .item {
      height: 99rpx;
      border-bottom: solid 3rpx #eaeaea;
    }
    .selected {
      color: #e32417;
    }
  }
}
</style>
