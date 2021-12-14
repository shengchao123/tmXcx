<template>
  <view class='record-wrap border-t20'>
    <mescroll-uni ref="mescrollRef"
                  top="526"
                  @init="mescrollInit"
                  @down="downCallback"
                  :up="upOption"
                  @up="upCallback">
      <view v-if="isEmpty">
        <page-empty :imgUrl="empty.url"
                    :message="empty.msg"></page-empty>
      </view>
      <view v-else
            class="pl30 pr30 pt12">
        <view v-for="(item, index) in recordList"
              :key="index">
          <record-item :record="item"></record-item>
        </view>
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import RecordItem from './RecordItem.vue';
import pageEmpty from 'pages/components/PageEmpty'
const typeMap = Object.freeze(new Map([
  [0, ''],
  [1, '01'],
  [2, '02']
]))
export default {
  name: 'Record',
  methods: {
    downCallback () {
      this.mescroll.resetUpScroll()
    },
    upCallback (page) {
      this.getMyRedHeartRecordPage(page)
    },
    resetGetList (index) {
      this.recordList = []
      this.mescroll.resetUpScroll()
      this.mescroll.scrollTo(0, 100)
    },
    // 获取我的红心值记录分页
    getMyRedHeartRecordPage (page) {
      const params = {
        type: typeMap.get(this.tabsCurrent),
        pageNumber: page && page.num || 1,
        pageSize: page && page.size || 10
      }
      this.$api.getMyRedHeartRecordPage(params).then(res => {
        if (res.isError) return
        if (!res.content) {
          this.mescroll.endBySize(0, 0)
          this.isEmpty = true
          return
        }
        const { items, count } = res.content
        this.mescroll.endBySize(items.length, count)
        if (this.pageNumber == 1) this.recordList = []
        this.recordList = this.recordList.concat(items)
        this.isEmpty = this.$isEmpty(this.recordList)
      })
    }
  },
  data () {
    return {
      upOption: {
        empty: {
          use: false
        },
        textNoMore: "没有更多数据",
        noMoreSize: 10, // 配置列表的总数量要大于等于10条才显示'-- END --'的提示
      },
      recordList: [],
      isEmpty: false,
      empty: {
        url: this.$aliImg('hearts/empty.png'),
        msg: '暂无内容'
      },
    }
  },
  props: {
    tabsCurrent: Number
  },
  components: { MescrollUni, pageEmpty, RecordItem },
  mixins: [MescrollMixin],
}
</script>

<style lang='scss' scoped>
.border-t20 {
  border-top: 20rpx solid #f7f7f7;
}
</style>
