<template>
  <div class='wish-item-wrap p30'>
    <div class="between-row">
      <span class="ft32 medium"></span>
      <svg-icon icon="icon_xiangyoujiantou"
                class="ft20 color-999"></svg-icon>
    </div>
    <div class="mt32 ft26">
      <svg-icon icon="icon_shijian"
                class="ft20"></svg-icon>
      <span class="color-999">时间：</span>
      <span>{{$moment(item.endTime).format('YYYY-MM-DD HH:mm')}}截止</span>
    </div>
    <div class="mt32 ft26">
      <svg-icon icon="icon_shequ"
                class="ft20"></svg-icon>
      <span class="color-999">社区：</span>
      <span>{{item.address}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WishItem',
  data () {
    return {

    }
  },
  props: {
    item: Object
  }
}
</script>

<style lang='scss' scoped>
.wish-item-wrap {
}
</style>
