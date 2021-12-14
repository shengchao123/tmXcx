export default (apiName) => {
  return {
    props: {
      tabCurrentIndex: Number
    },
    methods: {
      getListData () {
        this.$api[apiName]().then(res => {
          if (res.isError) return this.$msg(res.message)
          this.listData = res.content || []
          const count = this.listData.length
          this.$emit('updateCount', this.tabCurrentIndex, count)
        })
      }
    }
  }
}

