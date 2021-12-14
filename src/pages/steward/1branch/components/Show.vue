<template>
  <div class='show-wrap'>
    <div v-if="detailInfo">
      <div class="tc mt32 ft28 bold">{{detailInfo.title}}</div>
      <div class="content ft28 mt16 mb16">
        {{detailInfo.introduce}}
      </div>
      <ImgGroup :imgList="attachments"></ImgGroup>
    </div>
    <empty v-else></empty>
  </div>
</template>

<script>
import ImgGroup from '@/pages/union/interact/components/ImgGroup'
export default {
  name: 'Show',
  components: { ImgGroup },
  methods: {
    getData () {
      const params = {
        id: this.communityOrgId
      }
      this.$api.findJourneyCommunityPartyGraphicByPartyId(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.detailInfo = res.content
      })
    }
  },
  computed: {
    attachments () {
      if (!this.detailInfo) return []
      if (this.$isEmpty(this.detailInfo.attachments)) return []
      return this.detailInfo.attachments.map(item => item.url)
    }
  },
  data () {
    return {
      detailInfo: {}
    }
  },
  watch: {
    communityOrgId: {
      handler: function (n, o) {
        if (n) {
          this.getData()
        }
      },
      immediate: true
    }
  },
  props: {
    communityOrgId: String
  }
}
</script>

<style lang='scss' scoped>
.show-wrap {
  padding: 32rpx;
  background: #fff;
  border-top: 20rpx solid #f7f7f7;
  .content {
    line-height: 48rpx;
  }
}
</style>
