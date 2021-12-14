<template>
  <view class="my-customization-wrap">
    <mescroll-uni ref="mescrollRef"
                  :top="mescrollTop"
                  :bottom="mescrollBottom"
                  @init="mescrollInit"
                  :up="upOption"
                  @up="upCallback"
                  @down="downCallback">
      <div v-if="!$isEmpty(dataList)">
        <div v-for="(item, index) in dataList"
             :key="index">
          <orders-item :item="item"
                       entrance='myDynamic'>
            <div class="footer mt24 between-row center-align pt24">
              <div class="center-align ft32 color-666">
                <span class="icon-btn-room"
                      @click="onEdit(item)">
                  <svg-icon icon="icon_bianji"></svg-icon>
                </span>
                <span class="icon-btn-room ml32 center"
                      @click="onDelete(item)">
                  <svg-icon icon="icon_shanchu"></svg-icon>
                </span>
              </div>
              <div class="hide-btn ft24 color-666 tc"
                   @click="onStatus(item, index)">{{item.status === 2 ? '取消隐藏' : '隐藏'}}</div>
            </div>
          </orders-item>
        </div>
      </div>
      <empty v-else></empty>
    </mescroll-uni>
  </view>
</template>
<script>
import OrdersItem from '../components/OrdersItem.vue'
import listMixins from '../mixins'

export default {
  name: 'List',
  methods: {
    onEdit (item) {
      uni.navigateTo({
        url: `/pages/urban-rural/experience/AddCustomMade?id=${item.journeyPlayCustomizationId}`
      })
    },
    onDelete ({ journeyPlayCustomizationId }) {
      uni.showModal({
        title: '要删除该条定制信息？',
        content: '删除后不可恢复',
        cancelText: "先留着",
        confirmText: "删除",
        confirmColor: '#E32417',
        success: (res) => {
          res.confirm && this.deleteJourneyPlayCustomizationInfoById(journeyPlayCustomizationId)
        }
      })
    },
    // 隐藏 || 取消隐藏
    onStatus (item, index) {
      const { journeyPlayCustomizationId, status } = item
      const params = {
        displayOrHidden: status === 2,
        journeyPlayCustomizationId
      }
      this.$api.modifyJourneyPlayCustomizationInfoShowStatusById(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        const msg = `已${status === 2 ? '取消' : ''}隐藏`
        this.$msg(msg)
        this.dataList[index].status = status === 2 ? 1 : 2
      })
    },
    deleteJourneyPlayCustomizationInfoById (journeyPlayCustomizationId) {
      const params = {
        journeyPlayCustomizationId,
      }
      this.$api.deleteJourneyPlayCustomizationInfoById(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('已删除')
        this.mescroll.resetUpScroll()
      })
    },
    getDataList () {
      const params = {
        ...this.search
      }
      this.$api.getMyJourneyPlayCustomizationInfoPage(params).then(res => {
        if (res.isError) return
        let { items, count } = res.content
        this.dataList = params.pageNumber === 1 ? items : this.dataList.concat(items)
        this.mescroll.endBySize(items.length, count)
      })
    },
    setEvent () {
      uni.$on('editCustomMadeOver', () => {
        this.mescroll.resetUpScroll()
      })
    },
    clearEvent () {
      uni.$off('editCustomMadeOver')
    }
  },
  data () {
    return {
      mescrollTop: '24rpx',
      mescrollBottom: '20rpx',
    }
  },
  destroyed () {
    this.clearEvent()
  },
  created () {
    this.setEvent()
  },
  mixins: [listMixins],
  components: {
    OrdersItem
  }

}
</script>
<style lang='scss' scoped>
.my-customization-wrap {
  .footer {
    border-top: solid 1px #eaeaea;
    .icon-btn-room {
      width: 60rpx;
      height: 56rpx;
      line-height: 56rpx;
    }
    .hide-btn {
      width: 132rpx;
      height: 56rpx;
      line-height: 56rpx;
      border: solid 1px #d2d2d2;
      border-radius: 30rpx;
    }
  }
}
</style>