<script>
export default {
  onLaunch: function () {

    /// 进入程序登录问题
    uni.clearStorageSync()
    this.$login().then(() => {
      this.$isResolve()
    })

    // 检测新版本
    const updateManager = uni.getUpdateManager();
    if (updateManager) {
      updateManager.onUpdateReady(function (res) {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success (res) {
            if (res.confirm) {
              updateManager.applyUpdate();
            }
          }
        })
      })
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
page {
  --safe-bottom: calc(env(safe-area-inset-bottom) + 50px);
}
/*每个页面公共css */
@import "uview-ui/index.scss";
@import "./styles/atom.scss";
@import "./styles/flex.scss";
@import "./styles/global.scss";
@import "./styles/init.scss";
@import "./styles/u-view.scss";
</style>
