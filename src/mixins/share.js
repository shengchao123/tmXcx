const share = {
  // 分享好友设置
  onShareAppMessage () {
    const { title, desc, path, imageUrl } = this.shareData
    return {
      title,
      desc,
      path,
      imageUrl,
    }
  },
  //分享朋友圈设置
  onShareTimeline () {
    const { title, imageUrl } = this.shareData
    return {
      title,
      query: {
        luckyId: this.luckyId
      }, // 页面传参
      imageUrl
    }
  },
}
export default share
