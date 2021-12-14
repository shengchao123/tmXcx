<template>
  <div class="wrap"
       @click="$emit('click')">
    <text class="iconfont"
          :class="icon"
          :style="[{color: color}]"
          @click="$emit('click', $event)"></text>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    color: String
  }
}
</script>

<style scoped lang="scss">
@import url("./iconfont.css");
.wrap {
  display: inline-block;
}
.iconfont {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
}
</style>