<template>
  <view>
    <u-tabs :list="tabsList"
            :is-scroll="false"
            font-size="28"
            active-color="#E32417"
            inactive-color="#666666"
            bar-width="32"
            bar-height="4"
            :current="tabsCurrent"
            @change="changeTabs"
            v-if="isTalents === 'true'"></u-tabs>
    <mescroll-uni ref="mescrollRef"
                  :top="isTalents === 'true' ? '88' : '0'"
                  @init="mescrollInit"
                  @down="downCallback"
                  :up="upOption"
                  @up="upCallback">
      <view v-for="(item,index) in messageList"
            :key="index">
        <message-list :msgData="item"
                      :isTalents="isTalents"
                      @getMsgStatus="resetGetList"></message-list>
      </view>
    </mescroll-uni>
    <page-empty :imgUrl="$aliImg('mine/no-message.png')"
                message="暂无内容"
                v-if="messageList.length === 0"></page-empty>
  </view>
</template>
<script>
import PageEmpty from '@/pages/components/PageEmpty.vue';
import MessageList from './components/MessageList.vue'
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";

export default {
  methods: {
    // 切换tab
    changeTabs (index) {
      this.tabsCurrent = index
      this.resetGetList()
    },
    downCallback () {
      this.mescroll.resetUpScroll()
    },
    upCallback (page) {
      this.getMessageList(page)
    },
    resetGetList (index) {
      this.mescroll.resetUpScroll()
      this.mescroll.scrollTo(0, 100)
    },
    // 获取留言列表
    getMessageList (page) {
      const params = {
        pageNumber: page && page.num || 1,
        pageSize: page && page.size || 10,
        status: this.isTalents ? this.tabsCurrent + 1 : null
      }
      const apiName = this.isTalents ? 'getMyJourneyTalentsMessagePage' : 'getMyJourneyMessagePage'

      this.$api[apiName](params).then(res => {
        if (res.isError) return this.$msg(res.message)
        const { items, count } = res.content
        this.mescroll.endBySize(items.length, count)
        this.messageList = params.pageNumber === 1 ? items : this.messageList.concat(items)
      })
    }
  },
  data () {
    return {
      tabsCurrent: 0,
      tabsList: [
        {
          name: '待回复'
        },
        {
          name: '已回复'
        }
      ],
      upOption: {
        empty: {
          use: false
        },
        textNoMore: "",
        noMoreSize: 10, // 配置列表的总数量要大于等于10条才显示'-- END --'的提示
      },
      isTalents: uni.getStorageSync('isTalents') === 'true', //是否为专家身份
      messageList: []
    }
  },
  components: { PageEmpty, MessageList, MescrollUni },
  mixins: [MescrollMixin],
}
</script>
<style>
page {
  background: #f7f7f7;
}
</style>
<style lang='scss' scoped>
</style>