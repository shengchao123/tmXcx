<template>
  <view class='fans-wrap'>
    <mescroll-uni v-show="!$isEmpty(listData)"
                  ref="mescrollRef"
                  class="mescroll-wrap"
                  top="0"
                  :up="upOption"
                  @init="mescrollInit"
                  @down="downCallback"
                  @up="upCallback">
      <template>
        <view v-for="(item, index) in listData"
              :key="index"
              class="ml30 mr30 item mt20"
              @click="onItem(item)">
          <div v-if="item.type === '01'"
               class="center-align between-row">
            <div class="ellipsis">
              <span class="tip mr8 bg-color-518CFC ft22 mt4"
                    style="vertical-align: middle;">公告</span>
              <span class="ft32 medium"
                    style="vertical-align: middle;">{{item.title}}</span>
            </div>
            <svg-icon icon="icon_xiangyoujiantou"
                      class="ft20 color-999 ml16"></svg-icon>
          </div>
          <div v-else>
            <span class="tip mr8 bg-color-FF9708 ft22">系统通知</span>
            <span class="ft32 medium">{{item.title}}</span>
          </div>
          <div v-if="item.content"
               class="ellipsis-clamp-2 ft26 mt20">{{item.content}}</div>
          <div class="ft24 color-999 mt20">
            <span style="margin-right: 60rpx">{{$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
            <span v-if="item.orgName">{{item.orgName}}</span>
          </div>
        </view>
      </template>
    </mescroll-uni>
    <view v-show="$isEmpty(listData)"
          class="empty-page center-align column">
      <image style="width: 332rpx; height: 256rpx"
             :src="$imgHost + 'discover/icon-attention.png'"></image>
      <text class="ft28 color-999 mt20">暂无公告</text>
    </view>
  </view>
</template>
<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
export default {
  methods: {
    onItem (item) {
      const { id, type } = item
      if (type === '02') return
      uni.navigateTo({
        url: `/pages/mine/notification/announcementDetail?id=${id}`
      })
    },
    // 下拉刷新
    downCallback () {
      this.mescroll.resetUpScroll(); // 重置列表为第一页
    },
    // 加载更多
    upCallback (page) {
      this.getMyJourneyAnnouncementPage(page)
    },
    resetGetList () {
      this.listData = []
      this.mescroll.resetUpScroll()
    },
    getMyJourneyAnnouncementPage (page) {
      const params = {
        pageNumber: page ? page.num : 1,
        pageSize: page ? page.size : 10
      }
      this.$api.getMyJourneyAnnouncementPage(params).then(res => {
        if (res.isError) return this.mescroll.endErr()
        const { items, count } = res.content
        const list = res.content.items
        this.listData = params.pageNumber === 1 ? list : this.listData.concat(list)
        this.mescroll.endBySize(items.length, count)
      })
    }
  },
  data () {
    return {
      $imgHost: this.$imgHost,
      upOption: {
        empty: {
          use: false, // 是否显示空布局
        },
        textNoMore: "到底了~",
        noMoreSize: 8, // 配置列表的总数量要大于等于1条才显示'-- END --'的提示
      },
      listData: []
    }
  },
  mixins: [MescrollMixin],
  components: { MescrollUni }
}
</script>
<style lang='scss' scoped>
.fans-wrap {
  color: #333;
  height: 100%;
  .item {
    box-shadow: 3rpx 2rpx 12rpx 8rpx rgba(17, 17, 17, 0.03);
    padding: 30rpx;
    border-radius: 8rpx;
    background: #fff;
    .tip {
      display: inline-block;
      height: 32rpx;
      line-height: 32rpx;
      padding: 0 8rpx;
      border-radius: 6rpx;
      color: #fff;
    }
    .bg-color-518CFC {
      background: #518cfc;
    }
    .bg-color-FF9708 {
      background: #ff9708;
    }
    .ellipsis {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .ellipsis-clamp-2 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .empty-page {
    text-align: center;
    padding-top: 200rpx;
  }
}
</style>
