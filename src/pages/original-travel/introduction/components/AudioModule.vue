<template>
  <div class='audio-wrap center-align'>
    <div class="play-btn center mr16"
         @click="onPlayBtn">
      <svg-icon :icon="isPlay ? 'icon_zanting' : 'icon_bofang'"
                class="ft24"></svg-icon>
    </div>
    <div class="flex1">
      <div class="between-row mb16">
        <span class="ft24 color-333">语音播报</span>
        <span class="ft20 color-999">{{audioTime}}</span>
      </div>
      <div class="progress-bar flex1">
        <div class="progress"
             :style="{width: progressWidth}"></div>
      </div>
    </div>
  </div>
</template>
<script>
let tiemr = null
export default {
  methods: {
    onPlayBtn () {
      if (this.isPlay) {
        this.pause()
      } else {
        this.play()
      }
      this.isPlay = !this.isPlay
    },
    play () {
      const audio = this.audio
      const { currentTime, duration } = audio
      this.currentTime = duration - currentTime
      const playPromise = audio.onPlay()
      if (playPromise) {
        playPromise.then(() => {
          tiemr = setInterval(() => {
            const { currentTime, duration } = audio
            this.currentTime = duration - currentTime
            if (this.currentTime <= 0) {
              setTimeout(() => {
                this.onPlayEnd()
              }, 500)
              this.onPause()
            }
          }, 1000)
        }).catch((e) => {
          console.error(e)
        })
      }
    },
    pause () {
      tiemr && clearInterval(tiemr)
      this.audio.onPause()
    },
    onPlayEnd () {
      this.currentTime = this.duration
      this.isPlay = false

    },
    initAudio (src) {
      this.audio = uni.createInnerAudioContext();
      this.audio.src = src
      this.audio.onCanplay(() => {
        const { duration } = this.audio
        this.duration = duration
        this.currentTime = duration
      })
    }
  },
  data () {
    return {
      isPlay: false,
      audio: null,
      currentTime: 0,
      duration: 0
    }
  },
  computed: {
    audioTime () {
      const currentTime = this.currentTime
      let m = Math.floor(currentTime / 60)
      let s = Math.floor(currentTime % 60)
      if (m < 10) {
        m = '0' + m
      }
      if (s < 10) {
        s = '0' + s
      }
      return m + ':' + s
    },
    progressWidth () {
      const { duration, currentTime } = this
      if (duration === 0) return '0%'
      return Math.ceil((duration - currentTime) / duration * 100) + '%'
    }
  },
  created () {
  }
}
</script>
<style lang='scss' scoped>
.audio-wrap {
  width: 100%;
  height: 98rpx;
  border-radius: 50rpx;
  background: #eee;
  padding: 20rpx 32rpx;
  box-sizing: border-box;
  .play-btn {
    width: 56rpx;
    height: 56rpx;
    border-radius: 28rpx;
    background: #ff9204;
    color: #fff;
  }
  .progress-bar {
    height: 4rpx;
    background: #dedede;
    border-radius: 6rpx;
    overflow: hidden;
    .progress {
      background: #ff9204;
      width: 10%;
      height: 4rpx;
      border-radius: 6rpx;
    }
  }
}
</style>
