<template>
  <div class='personnel-wrap'>
    <scroll-view :scroll-y="true"
                 class="list">
      <div class="mt20 pl30 pr30 bg-white">
        <div class="ft26 pt20 pb20">已打卡</div>
        <div v-for="(item, index) in signUpList"
             :key="index"
             class="item pt28 pb28 between-row"
             :class="index === signUpList.length -1 && 'no-line'">
          <div>
            <div class="ft28 mb12">{{item.name}}</div>
            <div class="ft26 color-999">{{item.phone}}</div>
          </div>
          <span class="ft24 color-999">已打卡</span>
        </div>
      </div>
      <div class="mt20 pl30 pr30 bg-white">
        <div class="ft26 pt20 pb20">未打卡</div>
        <div v-for="(item, index) in notSignUpList"
             :key="index"
             class="item pt28 pb28 between-row"
             :class="index === signUpList.length -1 && 'no-line'">
          <div>
            <div class="ft28 mb12">{{item.name}}</div>
            <div class="ft26 color-999">{{item.phone}}</div>
          </div>
          <span class="ft24 color-999"></span>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
export default {
  methods: {
    getJourneyItineraryPointSignIn () {
      const params = {
        id: this.id,
        journeyPointId: this.journeyPointId
      }
      this.$api.getJourneyItineraryPointSignIn(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        if (!res.content) return
        const { notSignUpList, signUpList } = res.content
        this.notSignUpList = notSignUpList
        this.signUpList = signUpList
      })
    }
  },
  data () {
    return {
      id: null,
      journeyPointId: null,
      notSignUpList: [],
      signUpList: []
    }
  },
  onLoad (option) {
    const { id, journeyPointId } = option
    this.id = id
    this.journeyPointId = journeyPointId
    this.getJourneyItineraryPointSignIn()
  }
}
</script>
<style>
page {
  height: 100%;
  background: #f7f7f7;
}
</style>
<style lang='scss' scoped>
.personnel-wrap {
  color: #333;
  .item {
    border-bottom: solid 1px #e1e1e1;
    align-items: flex-end;
  }
  .no-line {
    border: none;
  }
}
</style>