<template>
  <div class="subsidies-wrap">
    <div class="search-wrap"
         v-if="current === 0"
         style="padding:20rpx 30rpx;background: #fff;margin-top: 1px">
      <u-search placeholder="输入发布单位或标题搜索"
                :show-action="false"
                @change="changeSearchKeyword"
                search-icon-color="#999999"
                placeholder-color="#999999"
                v-model="search.keyword"></u-search>
    </div>
    <div>
      <mescroll-uni ref="mescrollRef"
                    @init="mescrollInit"
                    @down="downCallback"
                    :up="upOption"
                    @up="upCallback"
                    bottom="50px"
                    top="200">
        <div v-if="!$isEmpty(noInductiveList)">
          <div v-for="(item,index) in noInductiveList"
               :key="index"
               class="list-item mt20 pl30 pr30"
               @click="onToDetail(item.id)">
            <div class="cont-box">
              <div class="title">{{item.title}}</div>
              <div class="center-align ft24 color-999 mt24">
                <div class="mr56">{{$moment(item.time).format('YYYY-MM-DD')}}</div>
                <div>{{item.publishingDepartment}}</div>
              </div>
            </div>
          </div>
        </div>
        <empty v-else></empty>
      </mescroll-uni>
    </div>
    <div class="apply ft24 white-color center column"
         @click="$refs.selectPop.show()">
      <text class="line1">申请</text>
      <text class="line1"
            style="margin-top:6rpx">补贴</text>
    </div>
    <select-pop ref="selectPop"
                :selectedId.sync="selectedId"
                @onRouteItem="onRouteItem"></select-pop>
  </div>
</template>
<script>
import SubTabs from '@/pages/urban-rural/components/SubTabs'
import SelectPop from './SelectPop.vue'
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";

export default {
  name: 'Subsidies',
  methods: {
    changeSearchKeyword () {
      this.search.pageNumber = 1
      this.getShowAgricultureRelatedProjectsPage()
    },
    onRouteItem () {
      // window.open('http://cdn.sy315.cn/html/%E6%97%A0%E6%84%9F%E8%A1%A5%E8%B4%B4/farmer/submit.html')
    },
    changeSubTab (item) {
      this.current = item.status
    },
    // 跳转无感详情
    onToDetail (id) {
      uni.navigateTo({ url: `/pages/think-tank/countryside/Detail?id=${id}` })
    },
    upCallback (page) {
      this.search.pageNumber = page.num || 1
      this.search.pageSize = page.size || 1
      this.getShowAgricultureRelatedProjectsPage()
    },
    // 下拉刷新
    downCallback () {
      this.mescroll.resetUpScroll(); // 重置列表为第一页
    },
    // 获取无感直补数据
    getShowAgricultureRelatedProjectsPage (page) {
      const params = {
        ...this.search
      }
      this.$api.getShowAgricultureRelatedProjectsPage(params).then(res => {
        if (res.isError) {
          this.mescroll.endBySize(0, 0)
          this.$msg(res.message)
          return
        }
        const { items, count } = res.content
        this.mescroll.endBySize(items.length, count)
        this.noInductiveList = params.pageNumber === 1 ? items : this.noInductiveList.concat(items)
      })
    },
  },
  data () {
    return {
      selectedId: null,
      current: 0,
      search: {
        pageNumber: 1,
        pageSize: 10
      },
      subTabs: [
        {
          status: 0,
          text: '规模种粮',
          width: 152
        },
        {
          status: 1,
          text: '种油补贴',
          width: 152
        },
        {
          status: 2,
          text: '农机购置补贴',
          width: 204
        }
      ],
      noInductiveList: [],
      upOption: {
        empty: {
          use: false
        },
        textNoMore: "没有更多数据",
        noMoreSize: 10, // 配置列表的总数量要大于等于10条才显示'-- END --'的提示
      },
    }
  },
  created () {

  },
  components: {
    SubTabs,
    SelectPop,
    MescrollUni
  },
  mixins: [MescrollMixin]
}
</script>
<style lang='scss' scoped>
.line1 {
  line-height: 1;
}
.subsidies-wrap {
  padding-top: 88rpx;
  .img {
    margin-top: -10rpx;
    width: 100vw;
  }
  .tabs {
    position: fixed;
    top: 88rpx;
    width: 100%;
    z-index: 1;
  }
  .apply {
    z-index: 9;
    position: fixed;
    right: 14rpx;
    bottom: calc(var(--safe-bottom) + 50rpx);
    width: 98rpx;
    height: 98rpx;
    background: #e32417;
    box-shadow: 4rpx 6rpx 8rpx 0 rgba(0, 0, 0, 0.25);
    border-radius: 50%;
  }
}
.cont-box {
  // width: 686rpx;
  background: #ffffff;
  box-shadow: 3rpx 2rpx 12rpx 8rpx rgba(17, 17, 17, 0.03);
  border-radius: 8rpx;
  padding: 24rpx 32rpx;
  .title {
    font-size: 34rpx;
    font-weight: 600;
  }
  .mr56 {
    margin-right: 56rpx;
  }
}
</style>