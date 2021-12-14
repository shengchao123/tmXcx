<template>
  <div class='wish-wrap'>
    <u-tabs :list="tabsList"
            :is-scroll="false"
            font-size="28"
            active-color="#E32417"
            inactive-color="#666666"
            bar-width="32"
            bar-height="4"
            :current="tabsCurrent"
            @change="changeTabs"></u-tabs>
    <Wish v-if="tabsCurrent === 0"></Wish>
    <activity v-else
              ref="activity"
              current="01"></activity>
  </div>
</template>

<script>
import Activity from './components/Activity'
import Wish from './components/Wish'

export default {
  name: 'index',
  methods: {
    // 切换tab
    changeTabs (index) {
      this.tabsCurrent = index
    },
  },
  data () {
    return {
      tabsCurrent: 0,

      tabsList: [
        {
          name: '微心愿'
        },
        {
          name: '志愿活动'
        }
      ]
    }
  },
  components: { Activity, Wish },
}
</script>

<style lang='scss' scoped>
page {
  background: #f7f7f7;
}
</style>
