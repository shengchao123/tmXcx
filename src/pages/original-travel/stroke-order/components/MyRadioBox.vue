<template>
  <div class="my-radio-box"
       :class="boxClass">
    <div v-for="(item, index) in options"
         :key="index"
         class="center-align"
         :style="{marginRight: spacing + 'rpx', width: item.singleLine ? '100%' : 'auto'}"
         @click="onSelect(item.id)">
      <my-radio :selected="value === item.id">
        <div slot="text"
             class="center-align">
          <span class="ft30 ml16">{{item.name}}</span>
          <span @click.stop="onIcon(item)"
                class="center-align">
            <svg-icon v-if="item.hasIcon"
                      icon="icon_wenhao"
                      class="ft32 ml8"
                      style="color: #878787"></svg-icon>
          </span>
        </div>
      </my-radio>
    </div>
    <call-popup :showContact.sync="showContact"
                :itemConfig="callInfo"></call-popup>
  </div>
</template>
<script>
import CallPopup from '@/pages/components/CallPopup'
import MyRadio from './MyRadio'

export default {
  methods: {
    onShowContact () {
      this.showContact = true
    },
    onSelect (id) {
      this.$emit('update:value', id)
    },
    onIcon (item) {
      console.log(item)
      switch (item.id) {
        case '07':
          this.onThemeBus()
          break
        case '02':
          this.onPublicTransit()
          break
      }
    },
    // 初心之旅·共富巴士 - 共富巴士点击出现弹窗 联系方式
    onThemeBus () {
      this.onShowContact()
    },
    // 公共交通 - 查看实时交通
    onPublicTransit () {
      const url = 'http://zhjtwxpt.blueapps.cn/weixin/list.aspx?s=104217'
      uni.navigateTo({ url: '/pages/webView?webUrl=' + url + '&title=' + '公共交通' })
    }
  },
  props: {
    boxClass: {
      type: String,
      default: 'flex1 flex'
    },
    spacing: {
      type: [String, Number],
      default: '32'
    },
    value: [String, Number, Boolean],
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showContact: false,
      callInfo: {
        title: '杭州市临安公共交通有限公司',
        phoneList: ['0571-61081012']
      },
    }
  },
  components: {
    MyRadio,
    CallPopup
  }
}
</script>
<style lang='scss' scoped>
.my-radio-box {
  flex-wrap: wrap;
}
</style>