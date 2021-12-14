<template>
  <div>
    <mescroll-uni ref="mescrollRef"
                  @init="mescrollInit"
                  @down="downCallback"
                  :up="upOption"
                  @up="upCallback"
                  bottom="50px"
                  top="88">
      <div v-if="!$isEmpty(jobsList)">
        <div v-for="(item,index) in jobsList"
             :key="index"
             class="pl32 pr32 mt24"
             @click="onToDetail(item.id)">
          <div class="cont-box">
            <div class="between-row center-align">
              <div class="bold ft34">{{item.name}}</div>
              <div class="delivery"
                   @click.stop="openDelivery(item)">我要投递</div>
            </div>
            <div class="ft26 mt12">{{item.companyName}}</div>
            <div class="flex-wrap ft24">
              <div class="ask-style mr16 mt24 color-666">经验:{{item.workExperienceName}}</div>
              <div class="ask-style mr16 mt24 color-666">学历:{{item.educationName}}</div>
              <div class="ask-style mr16 mt24 color-666">待遇:{{item.isNegotiableSalary?'面议薪资':item.annualSalary+'万/年'}}
              </div>
            </div>
            <div class="center-align color-999 mt24">
              <div class="mr48">{{$moment(item.createTime).format('YYYY-MM-DD')}}发布</div>
              <div>{{item.publishingDepartment}}</div>
            </div>
          </div>
        </div>
      </div>
      <empty v-else></empty>
    </mescroll-uni>
    <u-popup v-model="show"
             mode="bottom"
             border-radius="30">
      <div class="pt24 pl32 pr32 pb32">
        <div class="center relative mb4">
          <div class="tc ft30 bold">我要投递</div>
          <div @click="show = false">
            <svg-icon icon="icon_cha"
                      class="ft24 color-999 close-icon"></svg-icon>
          </div>
        </div>
        <div>
          <div class="ft30 center-align mt32">
            <div class="w120">联系人:</div>
            <div>{{popData.contactPerson}}</div>
          </div>
          <div class="ft30 center-align mt32">
            <div class="w120">电话:</div>
            <div>{{popData.contactPhone}}</div>
          </div>
          <div class="ft30 center-align mt32">
            <div class="w120">邮箱:</div>
            <div>{{popData.contactEmail}}</div>
          </div>
        </div>
        <div class="ft28 color-999 mt48">可通过邮件投递简历</div>
        <div class="center mt48">
          <div class="pop-btn mr24"
               @click.stop="copyEmail">复制邮箱</div>
          <div class="pop-btn"
               @click.stop="callPhone(popData.contactPhone)">拨打电话</div>
        </div>
      </div>
    </u-popup>
  </div>
</template>
<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
export default {
  data () {
    return {
      jobsList: [],
      upOption: {
        empty: {
          use: false
        },
        textNoMore: "没有更多数据",
        noMoreSize: 10, // 配置列表的总数量要大于等于10条才显示'-- END --'的提示
      },
      show: false,
      popData: {}
    }
  },
  methods: {
    upCallback (page) {
      this.getUnionReinforceData(page)
    },
    // 下拉刷新
    downCallback () {
      this.mescroll.resetUpScroll(); // 重置列表为第一页
    },
    // 获取联盟纳贤数据
    getUnionReinforceData (page) {
      const params = {
        pageNumber: page && page.num || 1,
        pageSize: page && page.size || 10
      }
      this.$api.getJourneyPostShowPage(params).then(res => {
        if (res.isError) {
          this.mescroll.endBySize(0, 0)
          this.$msg(res.message)
          return
        }
        const { items, count } = res.content
        this.mescroll.endBySize(items.length, count)
        this.jobsList = params.pageNumber === 1 ? items : this.jobsList.concat(items)
      })
    },
    // 我要投递弹窗
    openDelivery (item) {
      this.show = true
      this.popData = item
    },
    // 复制邮箱
    copyEmail (type) {
      uni.setClipboardData({
        data: this.popData.contactEmail,
        success: () => {
          this.$msg('复制成功')
        }
      })
    },
    // 拨打电话
    callPhone (phone) {
      uni.makePhoneCall({
        phoneNumber: phone
      })
    },
    // 跳转详情
    onToDetail (id) {
      uni.navigateTo({ url: `/pages/think-tank/unionreinforce/Detail?id=${id}` })
    }
  },
  components: { MescrollUni },
  mixins: [MescrollMixin]
}
</script>
<style lang="scss" scoped>
.cont-box {
  background: #ffffff;
  box-shadow: 3rpx 2rpx 12rpx 8rpx rgba(17, 17, 17, 0.03);
  border-radius: 8px;
  padding: 30rpx 32rpx;
  .delivery {
    width: 144rpx;
    height: 56rpx;
    text-align: center;
    line-height: 56rpx;
    border-radius: 44rpx;
    border: 1px solid #e32417;
    color: #e32417;
    font-size: 24rpx;
  }
  .ask-style {
    padding: 0 16rpx;
    height: 48rpx;
    line-height: 48rpx;
    background: #f0f0f0;
    border-radius: 6rpx;
  }
}
.close-icon {
  position: absolute;
  right: 0;
  top: 10rpx;
}
.w120 {
  width: 120rpx;
  color: #999999;
}
.pop-btn {
  width: 331rpx;
  height: 88rpx;
  text-align: center;
  line-height: 88rpx;
  border-radius: 49rpx;
  border: 2rpx solid #e32417;
  color: #e32417;
  font-size: 32rpx;
  font-weight: 600;
}
</style>