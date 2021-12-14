const navigateTo = (params) => {
  uni.navigateTo(params)
}

const redirectTo = (params) => {
  uni.redirectTo(params)
}

const reLaunch = (params) => {
  uni.reLaunch(params)
}

const switchTab = (params) => {
  uni.switchTab(params)
}

module.exports = {
  navigateTo,
  redirectTo,
  reLaunch,
  switchTab,
}
