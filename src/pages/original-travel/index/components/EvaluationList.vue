<template>
  <div class="pl30 pr30 mt20 wrap">
    <div class="center-align">
      <span class="ft32 color-333 mr8 bold">评价</span>
      <span v-if="evaluationCount > 0"
            class="ft24 color-999">({{evaluationCount}})</span>
    </div>
    <div v-if="evaluationCount > 0"
         class="evaluation-list between-row  mt40">
      <div v-for="(item, index) in evaluationList"
           :key="index"
           class="evaluation-item mb20"
           @click="onDetail(item)">
        <img class="attachment"
             :src="$fileHost + item.attachment" />
        <div class="pl12 pr12 pt4 pb18">
          <div class="title ft28 color-333 medium mb4">{{item.title}}</div>
          <div class="center-align between-row">
            <div class="center-align">
              <div class="avatar mr8">
                <img :src="$avatarUrl(item.avatar)" />
              </div>
              <span class="ft24 color-999">{{item.nick}}</span>
            </div>
            <div class="trigger-area relative center-align pl32"
                 @click.stop="onLike(item, index)">
              <text class="ft28 mr8"
                    :class="item.isLike ? 'iconfont icon_zan primary-color' : 'icon_zankong color-999'"></text>
              <svg-icon :icon="item.isLike ? 'icon_shoucang' : 'icon_weishoucang'"
                        v-if="item.status === 2"
                        class="ft26 color-d2d2d2"></svg-icon>
              <svg-icon :icon="item.isLike ? 'icon_shoucang' : 'icon_weishoucang'"
                        v-else
                        class="ft26"
                        :class="item.isLike ? 'primary-color' : 'color-999'"></svg-icon>
              <text class="ft26 ml8"
                    :class="item.isLike ? 'primary-color' : 'color-666'">{{item.likeQuantity}}</text>
            </div>
          </div>
        </div>
      </div>
    </div>
    <page-empty v-else
                :imgUrl="$aliImg('empty/no_data.png')"
                message="暂无评价"></page-empty>
  </div>
</template>
<script>
import PageEmpty from '@/pages/components/PageEmpty.vue';

export default {
  name: 'name',
  methods: {
    // 去评价详情
    onDetail (item) {
      uni.navigateTo({
        url: `/pages/original-travel/evaluate-detail/index?communityNoteId=${item.communityNoteId}`
      })
    },
    // 点赞
    onLike (item, index) {
      if (this.$notMember()) return this.$goLogin()
      let { communityNoteId, isLike, likeQuantity } = item
      const evaluationList = this.evaluationList
      const params = {
        communityNoteId,
      }
      item.isLike = !isLike
      const apiName = isLike ? 'cancelCommunityLikeNote' : 'communityLikeNote'
      this.$api[apiName](params).then(res => {
        if (res.isError) return this.$msg(res.message)
        item.isLike = !isLike
        item.likeQuantity = isLike ? likeQuantity - 1 : likeQuantity + 1
        evaluationList[index] = item
        this.evaluationList = [...evaluationList]
      })
    },
    getItineraryEvaluationPage (page) {
      const params = {
        pageNumber: page ? page.num : 1,
        pageSize: page ? page.size : 10,
      };
      this.$api.getItineraryEvaluationPage(params).then((res) => {
        if (res.isError) return this.$emit('endErr')
        const { items, count } = res.content;
        this.$emit('endBySize', items, count)
        const list = res.content.items;
        this.evaluationList = params.pageNumber === 1 ? list : this.evaluationList.concat(list);
        this.evaluationCount = count
      });
    },

  },
  data () {
    return {
      evaluationList: [], $fileHost: this.$fileHost,
      evaluationCount: 0
    }
  },
  components: { PageEmpty }
}
</script>
<style lang='scss' scoped>
.color-d2d2d2 {
  color: #d2d2d2;
}
.wrap {
}
.evaluation-list {
  flex-wrap: wrap;
  .evaluation-item {
    width: 335rpx;
    border-radius: 6rpx;
    overflow: hidden;
    background: #fff;
    box-shadow: 3rpx 2rpx 12rpx 8rpx rgba(17, 17, 17, 0.03);
    .trigger-area {
      height: 82rpx;
    }
    .attachment {
      width: 335rpx;
      height: 335rpx;
    }
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .avatar {
      width: 32rpx;
      height: 32rpx;
      border-radius: 16rpx;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>