import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";

const map = {
  data () {
    return {
      search: {
        pageNumber: 1,
        keyword: ''
      },
      mescrollBottom: '0',
      upOption: {
        empty: {
          use: false
        },
        page: {
          size: 10 // 每页数据的数量,默认10
        },
        textNoMore: "没有更多数据",
        noMoreSize: 10, // 配置列表的总数量要大于等于10条才显示'-- END --'的提示
      },
      dataList: []
    }
  },
  methods: {
    upCallback (page) {
      this.search.pageNumber = page.num
      this.getDataList()
    },
    downCallback (page) {
      this.mescroll.resetUpScroll()
    },
  },
  mixins: [MescrollMixin],
  components: {
    MescrollUni
  }
}

export default map
