<template>
  <div class="wrap">
    <mescroll-uni ref="mescrollRef"
                  :top="mescrollTop"
                  :bottom="mescrollBottom"
                  @init="mescrollInit"
                  :up="upOption"
                  @up="upCallback"
                  @down="downCallback">
      <div v-if="!$isEmpty(dataList)">
        <view v-for="(item, index) in dataList"
              :key="index"
              class="relative">
          <resource-item entrance="myTrends"
                         :resourceItem="{item, index}"
                         @click="setNotesItem">
            <!-- 审核状态 (1:已发布; 2:待审核) -->
            <view v-if="item.status === 2"
                  class="wait-check white-color ft22 tc fr">
              待审核
            </view>
          </resource-item>
        </view>
      </div>
      <empty v-else></empty>
    </mescroll-uni>
    <!-- <PublishBtn @onPublish="onPublish"
                :isScroll="isScroll"></PublishBtn> -->
  </div>
</template>
<script>
import ResourceItem from '../components/ResourceItem'
// import PublishBtn from '@/pages/urban-rural/components/PublishBtn'
import listMixins from '../mixins'
export default {
  name: 'List',
  methods: {
    // onPublish () {
    //   uni.navigateTo({
    //     url: '/pages/urban-rural/resource/AddResource'
    //   });
    // },
    setNotesItem (item, index) {
      const noteList = this.noteList
      noteList[index] = item
      this.noteList = [...noteList]
    },
    // scroll () {
    //   this.isScroll = true
    //   if (this.timer) {
    //     this.timer = null
    //     clearTimeout(this.timer)
    //   }
    //   this.timer = setTimeout(() => {
    //     this.isScroll = false
    //   }, 500)
    // },
    // 获取商品列表
    getDataList () {
      const params = {
        ...this.search
      }
      this.$api.getMyJourneyResourceSharingPage(params).then(res => {
        if (res.isError) return
        let { items, count } = res.content
        this.dataList = params.pageNumber === 1 ? items : this.dataList.concat(items)
        this.mescroll.endBySize(items.length, count)
      })
    }
  },
  components: { ResourceItem },
  mixins: [listMixins],
  data () {
    return {
      // isScroll: false,
      upOption: {
        onScroll: true
      },
      mescrollTop: '20rpx',
      mescrollBottom: '0rpx',
    }
  }
}
</script>

<style lang='scss' scoped>
.wrap {
  height: 100%;
  .wait-check {
    margin-top: -2rpx;
    margin-right: -30rpx;
    width: 96rpx;
    height: 42rpx;
    line-height: 42rpx;
    background: #ff8800;
    border-radius: 6rpx 0 0 6rpx;
    z-index: 9;
    margin-left: 20rpx;
  }
}
</style>
