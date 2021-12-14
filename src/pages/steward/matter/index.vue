<template>
  <div class='matter-wrap'>

    <u-tabs ref="uTabs"
            :list="tabs"
            :current="currentTab"
            class="tabs"
            @change="tabsChange"
            :is-scroll="true"
            bar-width="32"
            bar-height="4"
            font-size="28"
            active-color="#E32417"
            inactive-color="#666666"></u-tabs>
    <Forum v-if="currentTab === 0"></Forum>
    <Matter v-if="currentTab === 1"></Matter>
  </div>
</template>

<script>
import UploadImages from "@/components/upload-images";
import Matter from './components/Matter'
import Forum from './components/Forum'
export default {
  name: 'index',
  methods: {
    tabsChange (index) {
      this.currentTab = index
    }
  },
  data () {
    return {
      tabs: [
        {
          name: '热门话题'
        },
        {
          name: '我要报事'
        }
      ],
      currentTab: 0,
    }
  },
  onLoad () {

  },
  components: { UploadImages, Matter, Forum },
}
</script>

<style lang='scss' scoped>
</style>
