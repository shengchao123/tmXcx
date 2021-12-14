<template>
  <div class="wrap">
    <SubTabs @change="changeSubTab"
             :tabs="resourceSubTabs"></SubTabs>
    <mescroll-uni ref="mescrollRef"
                  :top="mescrollTop"
                  :bottom="mescrollBottom"
                  @scroll="listScroll"
                  @init="mescrollInit"
                  :up="upOption"
                  @up="upCallback"
                  @down="downCallback">
      <div v-if="!$isEmpty(dataList)">
        <ResourceItem :resourceItem="{item, index}"
                      @setNotesItem="setNotesItem"
                      v-for="(item, index) in dataList"
                      :key="item.id"></ResourceItem>
      </div>
      <empty v-else></empty>
    </mescroll-uni>

    <PublishBtn @onPublish="onPublish"
                :isScroll="isScroll"
                right="14rpx"></PublishBtn>
  </div>
</template>

<script>
import SubTabs from '@/pages/urban-rural/components/SubTabs'
import ResourceItem from '@/pages/urban-rural/components/ResourceItem'
import PublishBtn from '@/pages/urban-rural/components/PublishBtn'
import listMixins from '../mixins'
import { resourceSubTabs } from '@/utils/enum.js'

export default {
  name: 'List',
  methods: {
    onPublish () {
      uni.navigateTo({
        url: '/pages/urban-rural/resource/AddResource'
      });
    },
    setNotesItem (item, index) {
      this.$set(this.dataList, index, item)
    },
    changeSubTab (item) {
      this.search.resourceType = item.status
      this.search.pageNumber = 1
      this.getDataList()
    },
    listScroll () {
      this.mescrollTop = '210rpx'
      uni.$emit('changeImgStatus')

      this.isScroll = true
      if (this.timer) {
        this.timer = null
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.isScroll = false
      }, 500)
    },
    // 获取商品列表
    getDataList () {
      const params = {
        ...this.search
      }
      this.$api.getJourneyResourceSharingPage(params).then(res => {
        if (res.isError) return
        let { items, count } = res.content
        this.dataList = params.pageNumber === 1 ? items : this.dataList.concat(items)
        this.mescroll.endBySize(items.length, count)
      })
    },

  },
  components: { SubTabs, ResourceItem, PublishBtn },
  mixins: [listMixins],
  data () {
    return {
      mescrollTop: '410rpx',
      search: {
        pageNumber: 1,
        resourceType: '01'
      },
      isScroll: false,
      upOption: {
        toTop: {
          bottom: 240
        }
      },
      mescrollBottom: '20rpx',
      resourceSubTabs
    }
  }
}
</script>

<style lang='scss' scoped>
.wrap {
  height: 100%;
}
</style>
