<template>
  <div class='detail-wrap'>
    <!-- 轮播图 -->
    <carousel v-if="!$isEmpty(imgList)"
              :imgList="imgList"
              :indicatorDots="true">
    </carousel>
    <view class="mt20 bg-white pt24 pl30 pr30 pb30">
      <text class="ft40 color-333 bold">{{detailInfo.title}}</text>
      <view class="color-666 ft26 mt24 line1">
        <text>{{$moment(detailInfo.createTime).format('YYYY年M月DD日')}}</text>
        <text class="ml48">{{detailInfo.publishingDepartment}}</text>
      </view>
      <view class="mt12">
        <text>{{detailInfo.content}}</text>
      </view>
      <div v-if="!$isEmpty(fileList)">
        <div class="bold ft28 mb24 mt48">附件</div>
        <div v-for="(item,index) in fileList"
             :key="index"
             class="ft24 attachment mb16"
             @touchstart="downLoad(item,index)"
             @touchend="onPreview(item)">
          <span>{{index + 1}}.</span>
          <span>{{item.name}}</span>
        </div>
      </div>
      <u-modal v-model="isDownload"
               width="540"
               title=""
               content="是否要下载当前文件"
               border-radius="24"
               :show-cancel-button="true"
               confirm-text="下载"
               cancel-text="取消"
               cancel-color="#333"
               @confirm="downloadFile"></u-modal>
    </view>
  </div>
</template>
<script>
import Carousel from '@/pages/components/Carousel.vue'
import { openDocument } from '@/utils/tools'
let allTime = null
export default {
  name: 'Detail',
  methods: {
    // 跳转预览文件页面
    onPreview (row) {
      clearTimeout(allTime);
      if (this.timeOutEvent === 0) {
        openDocument(row.url)
      }
    },
    // 长按下载
    downLoad (item, index) {
      this.timeOutEvent = 0;
      const that = this
      allTime = setTimeout(function () {
        that.timeOutEvent = allTime
        that.downIndex = index
        that.isDownload = true
      }, 1000);
    },
    downloadFile () {
      let url = this.$fileHost + this.detailInfo.attachmentList[this.downIndex].url
      let a = document.createElement('a');
      a.download = this.detailInfo.attachmentList[this.downIndex].name;
      a.href = url;
      a.target = '_blank';
      a.click();
    },
    getDetail () {
      const params = {
        id: this.id
      }
      this.$api.getShowJourneyPolicyDetail(params).then(res => {
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
      detailInfo: {},
      timeOutEvent: 0,
      isDownload: false,
      downIndex: null
    }
  },
  computed: {
    fileList () {
      if (this.$isEmpty(this.detailInfo.attachmentList)) return []
      return this.detailInfo.attachmentList.filter(item => item.sourceType === '04')
    },
    imgList () {
      const { picList } = this.detailInfo
      if (this.$isEmpty(picList)) return []
      const list = picList.filter(item => item.sourceType === '01')
      if (this.$isEmpty(list)) return []
      return list.map(item => item.url)
    }
  },
  onLoad ({ id }) {
    this.id = id
    this.getDetail()
  },
  components: {
    Carousel
  }
}
</script>
<style>
page {
  background: #f7f7f7;
}
</style>
<style lang='scss' scoped>
.line1 {
  line-height: 1;
}
.detail-wrap {
  .attachment {
    color: #518cfc;
    line-height: 1.5;
  }
}
</style>
