<template>
  <span class="ft24 color-999 ml4">{{modelData.length}}/{{maxLength}}</span>
</template>
<script>
export default {
  props: {
    modelData: [String, Number],
    maxLength: [String, Number],
  }
}
</script>