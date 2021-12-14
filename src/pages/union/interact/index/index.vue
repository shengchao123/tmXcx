<template>
  <div class='league-interact-wrap'>
    <div class="center tabs bg-white">
      <div class="top-tabs">
        <u-subsection :list="subsection.list"
                      :height="56"
                      mode="subsection"
                      active-color="#E32417"
                      :current="subsection.curNow"
                      @change="subsectionChange"></u-subsection>
      </div>
    </div>
    <view>
      <forum ref="forum"
             v-if="subsection.curNow === 0"></forum>
      <activity v-else
                ref="activity"
                :isEmpty="isEmpty"
                :dataList="dataList"
                :current.sync="current"
                :height="100"
                :top="82"
                bottom="142"
                :delHeight="140"
                @getListData="getListData"></activity>
    </view>
    <view v-if="subsection.curNow === 0"
          class="btn-box">
      <view :class="['publish white-color bold center', isScroll ? 'is-scroll' : '']"
            @click="onPublish">
        <svg-icon icon="icon_jia"
                  class="ft32"></svg-icon>
      </view>
    </view>

    <custom-tabbar></custom-tabbar>
  </div>
</template>
<script>
import Activity from '@/pages/components/Activity.vue'
import Forum from '../components/Forum'
export default {
  name: 'index',
  methods: {
    onPublish () {
      // 判断是否登录逻辑
      if (this.$notMember()) return this.$goLogin();
      if (this.memberPersonalInfo.isRealName) {
        uni.navigateTo({
          url: '/pages/union/interact/send-post/index'
        })
      } else {
        uni.showModal({
          title: '请先实名认证',
          content: '认证后，即可发布帖子，评论',
          cancelText: "取消",
          confirmText: "实名认证",
          confirmColor: '#E32417',
          success: function (res) {
            if (res.confirm) {
              uni.navigateTo({
                url: '/pages/mine/real-name/index'
              })
            }
          }
        })
      }
    },
    getListData (page) {
      const params = {
        status: this.current !== 0 ? "0" + this.current : '',
        pageNumber: page && page.num || 1,
        pageSize: page && page.size || 10,
        type: '01'
      }
      this.$api.getJourneyActivityPage(params).then(res => {
        if (res.isError || !res.content) {
          this.$refs.activity && this.$refs.activity.mescroll.endBySize(0, 0)
          this.dataList = []
          this.isEmpty = true
          return
        }
        const { items, count } = res.content
        this.$refs.activity && this.$refs.activity.mescroll.endBySize(items.length, count)
        if (params.pageNumber === 1) this.dataList = []
        this.dataList = this.dataList.concat(items)
        this.isEmpty = this.$isEmpty(this.dataList)
      })
    },
    subsectionChange (e) {
      this.subsection.curNow = e
    },
    checkIsShareIn (option) {
      if (option && option.shareId) {
        const { communityNoteId, shareId, masterOrgId } = option
        uni.redirectTo({
          url: `/pages/union/interact/note-detail/index?communityNoteId=${communityNoteId}&shareId=${shareId}&masterOrgId=${masterOrgId}`
        })
      }
    }
  },
  data () {
    return {
      isScroll: false,
      isEmpty: false,
      dataList: [],
      current: 0,
      subsection: {
        list: Object.freeze([
          {
            name: '论坛'
          },
          {
            name: '活动'
          }
        ]),
        curNow: 1
      }
    }
  },
  computed: {
    memberPersonalInfo () {
      return this.$store.state.user.memberPersonalInfo
    },
  },
  onShow () {
    this.getListData()
  },
  beforeDestroy () {
    uni.$off('discoverBtn')
  },
  // 页面周期函数--监听页面加载
  onLoad (option) {
    this.checkIsShareIn(option)
    uni.$on('discoverBtn', (res) => {
      this.isScroll = !res
    })
  },
  components: { Activity, Forum },
}
</script>
<style>
page {
  background: #f7f7f7;
}
</style>
<style lang='scss' scoped>
.league-interact-wrap {
  .tabs {
    width: 100%;
    position: fixed;
    z-index: 9;
    top: 0;
    height: 112rpx;
    .top-tabs {
      width: 272rpx;
    }
  }
  .btn-box {
    position: absolute;
    z-index: 9;
    right: 14rpx;
    bottom: calc(var(--safe-bottom) + 20rpx);
    width: 98rpx;
    height: 98rpx;
    border-radius: 50%;
  }
  .publish {
    position: absolute;
    right: 0rpx;
    width: 98rpx;
    height: 98rpx;
    border-radius: 50%;
    // background-image: linear-gradient(98deg, #f54400 0%, #ff6630 72%);
    background: #e32417;
    box-shadow: 4rpx 6rpx 8rpx 0 rgba(14, 2, 2, 0.25);
    bottom: 0rpx;
    font-size: 56rpx;
    transition: all 0.5s ease-in-out;
    opacity: 1;
  }
  .is-scroll {
    transition: all 0.5s ease-in-out;
    right: -80rpx !important;
    opacity: 0.4 !important;
  }
}
</style>
