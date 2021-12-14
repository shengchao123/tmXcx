<template>
  <view @click="$emit('click')">
    <slot></slot>
  </view>
</template>

<script>
export default {
  methods: {
    init () {
    }
  }
}
</script>