<template>
  <div>
    <div class="p32">
      <div class="ft40 bold">{{unionData.name}}</div>
      <div class="flex-wrap ft24">
        <div class="ask-style mr16 mt24 color-666">经验:{{unionData.workExperienceName}}</div>
        <div class="ask-style mr16 mt24 color-666">学历:{{unionData.educationName}}</div>
        <div class="ask-style mr16 mt24 color-666">
          待遇:{{unionData.isNegotiableSalary?'面议薪资':unionData.annualSalary+'万/年'}}
        </div>
      </div>
      <div class="center-align color-999 mt24">
        <div class="mr48">{{$moment(unionData.createTime).format('YYYY-MM-DD')}}发布</div>
        <div>{{unionData.publishingDepartment}}</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="p32 cont">
      <div class="pb32 bb">
        <div class="ft30 bold mb8">{{unionData.companyName}}</div>
        <div>
          <div class="ft28 center-align mt24">
            <div class="w112">地址:</div>
            <div>{{unionData.workAddress || '--'}}</div>
          </div>
          <div class="ft28 center-align mt24">
            <div class="w112">联系人:</div>
            <div>{{unionData.contactPerson || '--'}}</div>
          </div>
          <div class="ft28 center-align mt24">
            <div class="w112">电话:</div>
            <div>{{unionData.contactPhone || '--'}}</div>
          </div>
          <div class="ft28 center-align mt24">
            <div class="w112">邮箱:</div>
            <div>{{unionData.contactEmail || '--'}}</div>
          </div>
        </div>
      </div>
      <div class="pb32 bb"
           v-if="unionData.responsibilities">
        <div class="ft30 bold mt32">岗位职责</div>
        <div class="mt24 ft28">
          <div v-html="unionData.responsibilities"
               class="pre-line"></div>
        </div>
      </div>
      <div class="pb32"
           v-if="unionData.qualifications">
        <div class="ft30 bold mt32">任职资格</div>
        <div class="mt24 ft28">
          <div v-html="unionData.qualifications"
               class="pre-line"></div>
        </div>
      </div>
    </div>
    <div class="center btns">
      <div class="pop-btn mr24"
           @click="copyEmail">复制邮箱</div>
      <div class="pop-btn"
           @click="callPhone(unionData.contactPhone)">拨打电话</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      unionData: {}
    }
  },
  methods: {
    // 获取联盟纳贤详情数据
    getUnionDetailData (id) {
      const params = {
        id
      }
      this.$api.getJourneyPostDetail(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.unionData = res.content
      })
    },
    // 复制邮箱
    copyEmail () {
      uni.setClipboardData({
        data: this.unionData.contactEmail,
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
    }
  },
  onLoad (option) {
    option.id && this.getUnionDetailData(option.id)
  }
}
</script>
<style lang="scss" scoped>
.ask-style {
  padding: 0 16rpx;
  height: 48rpx;
  line-height: 48rpx;
  background: #f0f0f0;
  border-radius: 6rpx;
}
.line {
  width: 100%;
  height: 32rpx;
  background: #f7f7f7;
}
.p32 {
  padding: 32rpx;
}
.w112 {
  width: 112rpx;
  color: #999999;
}
.cont {
  padding-bottom: 120rpx;
}
.btns {
  width: 100%;
  height: 120rpx;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #eaeaea;
  background: #ffffff;
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
}
.pre-line {
  white-space: pre-line;
}
</style>