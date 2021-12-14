<template>
  <div class='tree-wrap'
       v-if="orgTree[0]">
    <scroll-view scroll-x>
      <div style="width: 200%">
        <div class='center-align pb32 ml30'>
          <div class="first center column pl8 pr8">
            <svg-icon icon="icon_dangjianlianmeng_mian"
                      class="ft32"
                      style="color: #FCF050"></svg-icon>
            <div class="ft20 mr8 ml8 tc"
                 style="color: #fff;">{{orgTree[0].name}}</div>
          </div>
          <div class='center-align'
               v-if="orgTree[0].child">
            <org-tree-child :list="orgTree[0].child"></org-tree-child>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
import OrgTreeChild from './OrgTreeChild.vue'
export default {
  props: {
    orgTree: Array
  },
  data () {
    return {}
  },
  components: { OrgTreeChild }
}
</script>
<style lang='scss' scoped>
.tree-wrap {
  width: 100%;
  .first {
    width: 156rpx;
    height: 130rpx;
    background: url("https://hzslzx.oss-cn-hangzhou.aliyuncs.com/system/tianmu/images/party/org_bg.png")
      no-repeat;
    background-size: 100% 100%;
  }
}
</style>