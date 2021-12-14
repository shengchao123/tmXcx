const expertDetail = {
  data () {
    return {
      noTimes: '',
      selectItem: {},
      showContact: false,
      noTimeShow: false,
      isTalents: uni.getStorageSync('isTalents')
    }
  },
  methods: {
    onContact (item) {
      // 判断是否登录逻辑
      if (this.$notMember()) return this.$goLogin();
      this.selectItem = JSON.parse(JSON.stringify(item))
      const { openDayList, startTime, endTime, isTelephoneCommunication } = this.selectItem
      if (isTelephoneCommunication) {
        if (!this.isInTimes()) {
          this.noTimes = this.filterWeek(openDayList) + '，' + startTime + '～' + endTime
          this.$nextTick(() => {
            this.noTimeShow = true
          })
          return
        }
        this.showContact = true
        return
      }
      if (this.isTalents === 'true') {
        this.$msg('暂不支持专家给专家留言')
        return
      }
      this.onMessage()
    },
    // 将时间转成数字 与当前时间比较
    filterTimeToNumber (time) {
      return +(time.split(':').join(''))
    },
    // 判断当前时间是否在范围内
    isInTimes () {
      const { openDayList, startTime, endTime } = this.selectItem
      const currentWeek = this.$moment().weekday() + 1
      const currentTime = this.$moment().format("HH:mm")
      const numStart = this.filterTimeToNumber(startTime)
      const numEnd = this.filterTimeToNumber(endTime)
      const numCurrent = this.filterTimeToNumber(currentTime)
      if (!openDayList.includes(currentWeek)) return false
      if (numCurrent < numStart) return false
      if (numCurrent > numEnd) return false
      return true
    },
    // 留言
    onMessage () {
      this.showContact = false
      this.noTimeShow = false
      uni.navigateTo({
        url: `/pages/think-tank/message/index?id=${this.selectItem.id}`
      })
    },
    // 打电话
    onCall () {
      uni.makePhoneCall({
        phoneNumber: this.selectItem.contactPhone
      })
      this.$api.accumulationCallsNumber()
    },
    onAction (index) {
      this.showContact = false
      this.noTimeShow = false
      if (index === 0) {
        this.onCall()
        return
      }
      if (index === 1) {
        this.onMessage()
      }
    },
  }
}
export default expertDetail
