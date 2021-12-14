<template>
  <div class='detail-wrap pt20 flex1 column'>
    <expert-services-item :itemInfo="detailInfo"
                          :isDetail="true"
                          @onContact="onContact(detailInfo)"></expert-services-item>
    <view class="mt20 bg-white pl30 pr30 column flex1">
      <text class="title ft32 color-333 medium">个人介绍</text>
      <text class="line1 mt24 introduction pb20">{{detailInfo.introduction}}</text>
    </view>
    <contact-popup :showContact.sync="showContact"
                   :noTimeShow.sync="noTimeShow"
                   :selectItem="selectItem"
                   :noTimes="noTimes"
                   @onCall="onCall"
                   @onAction="onAction"
                   @onMessage="onMessage">
    </contact-popup>
  </div>
</template>
<script>
import ExpertMixin from '@/mixins/expert-detail.js'
import ContactPopup from '../components/ContactPopup.vue'
import ExpertServicesItem from '@/pages/think-tank/index/components/ExpertServicesItem'
import { filterWeek } from '../index/components/filter.js'
export default {
  name: 'Detail',
  methods: {
    filterWeek,
    getDetail () {
      const params = {
        id: this.id
      }
      this.$api.getShowJourneyTalentsDetail(params).then(res => {
        if (res.isError) {
          this.$msg(res.message)
          return
        }
        this.detailInfo = res.content
      })
    }
  },
  data () {
    return {
      detailInfo: {}
    }
  },
  onLoad ({ id }) {
    this.id = id
    this.getDetail()
  },
  mixins: [ExpertMixin],
  components: {
    ExpertServicesItem,
    ContactPopup
  }
}
</script>
<style>
page {
  background: #f7f7f7;
  display: flex;
  height: 100%;
}
</style>
<style lang='scss' scoped>
.line1 {
  line-height: 1;
}
.detail-wrap {
  box-sizing: border-box;
  .title {
    padding-top: 34rpx;
  }
  .introduction {
    text-align: justify;
    text-align-last: left;
    line-height: 1.5;
  }
}
</style>
