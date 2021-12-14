<template>
  <div style="width: 100%; height: 100%">
    <video class="video"
           id="video"
           :src="videoSrc"
           :enable-progress-gesture="false"
           :auto-pause-if-navigate="true"
           controls
           @play="videoStartPlayEvent"
           @error="videoErrorCallback"></video>
  </div>
</template>
<script>
export default {
  props: {
    videoSrc: String
  },
  methods: {
    pause () {
      this.videoEl.pause()
    },
    play () {
      this.videoEl.play()
    },
    videoStartPlayEvent () {
      this.$emit('videoStartPlayEvent')
    },
    videoErrorCallback (res) {
      console.log(res)
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.videoEl = uni.createVideoContext('video', this)
  }
}
</script>
<style lang='scss' scoped>
.video {
  width: 100%;
  height: 90%;
}
</style>