<template>
  <div class='child-wrap center-align'>
    <div v-if="list.length !== 1"
         class="border-top w16"></div>
    <div>
      <div v-for="item in list"
           :key="'list'+item.id"
           class="center-align relative"
           :class="list.length === 1 ? '':'pb16 list-item'">
        <div class="mr8 border-top w24"
             :class="list.length === 1 ?'w32' : 'w24'"></div>
        <div class="ft24 color-666 mr8"
             style="max-width: 280rpx">{{item.name}}</div>
        <div v-if="item.child">
          <org-tree-child :list="item.child"></org-tree-child>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrgTreeChild from './OrgTreeChild.vue'

export default {
  name: 'orgTreeChild',
  props: {
    list: Array
  },
  components: { OrgTreeChild }
}
</script>

<style lang='scss' scoped>
.border-top {
  height: 1px;
  border-top: 1px solid #fbafa3;
}
.w16 {
  width: 16rpx;
}
.w24 {
  width: 24rpx;
}
.w32 {
  width: 32rpx;
}
.list-item::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 1px;
  border-left: 1px solid #fbafa3;
}
.list-item:first-child::before {
  top: calc(50% - 8rpx);
  height: calc(50% + 8rpx);
}
.list-item:last-child::before {
  height: 50%;
}
.list-item:last-child {
  padding-bottom: 0;
}
</style>
