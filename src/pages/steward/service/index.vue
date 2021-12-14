<template>
  <div class='list-wrap'>
    <div class="top bg-white">
      <u-tabs ref="uTabs"
              :list="tabs"
              :current="currentTab"
              class="tabs"
              @change="tabsChange"
              :is-scroll="false"
              bar-width="32"
              bar-height="4"
              font-size="28"
              active-color="#E32417"
              inactive-color="#666666"></u-tabs>

    </div>

    <div class="list">
      <Divider v-show="currentTab === 0"></Divider>
      <Activity v-show="currentTab === 0"></Activity>
      <Property v-show="currentTab === 1"></Property>
      <HouseKeep v-if="currentTab === 2"></HouseKeep>
    </div>
  </div>
</template>

<script>

import Divider from '@/components/Divider'
import HouseKeep from '@/pages/steward/service/components/HouseKeep'

import Activity from './components/Activity'
import Property from './Property'

export default {
  name: 'list',
  methods: {
    tabsChange (index) {
      this.currentTab = index;
    },
  },
  onLoad () {
  },
  components: { Divider, Activity, Property, HouseKeep },
  data () {
    return {
      tabs: [
        {
          name: '社区服务'
        }, {
          name: '物业服务'
        },
        {
          name: '家政服务'
        }
      ],
      currentTab: 0
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
