<template>
  <div class='branch-wrap'>

    <ProjectList ref="list">
      <BlockItem title="好案例"
                 :list="list"
                 @onBlockItem="onBlockItem"
                 type="5"
                 bgClass="block5"></BlockItem>

      <div class="ft32 bold pl32 pb28 bb">已办结项目</div>
    </ProjectList>
  </div>
</template>

<script>
import BlockItem from '../components/BlockItem'
import ProjectList from '@/pages/steward/5case/ProjectList'

export default {
  name: 'index',
  methods: {
    onBlockItem ({ id, communityOrgId }) {
      uni.navigateTo({
        url: `/pages/steward/3helper/project-detail/index?id=${id}&entrance=helper`
      })
    },
    getList () {
      this.$api.findJourneyGoodHelperProjectList().then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        if (res.content && res.content[0]) {
          this.list = res.content.map(item => {
            return {
              tip: item.streetOrgName,
              ...item
            }
          })
        }
      })
    }
  },
  data () {
    return {
      listTop: '',
      list: []
    }
  },
  onLoad () {
    this.getList()
  },
  components: { BlockItem, ProjectList },
}
</script>

<style lang='scss' scoped>
.branch-wrap {
}
</style>
