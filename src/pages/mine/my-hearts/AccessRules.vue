<template>
  <u-popup v-model="isRuleShow"
           mode="center"
           height="672"
           width="540"
           border-radius="6"
           :mask-custom-style="maskCustomStyle">
    <view class="popup-wrap">
      <view class="relative pb24 center-align">
        <view class="ft30 popup-title bold pt40">红心获取规则</view>
        <view class="close-btn"
              @click="isRuleShow = false">
          <svg-icon icon="icon_cha"
                    class="ft24 color-999 bold"></svg-icon>
        </view>
      </view>
      <view class="pl32 pr32 pt8 h568">
        <scroll-view :scroll-y="true"
                     class="h568">
          <view v-for="(item,index) in contentData"
                :key="index"
                class="between-row ft28 color-333 mb32">
            <text class="bold">{{item.name}}</text>
            <text>+{{item.point}}</text>
          </view>
        </scroll-view>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: 'AccessRules',
  methods: {
    show () {
      this.isRuleShow = true
    }
  },
  data () {
    return {
      isRuleShow: false,
      contentData: Object.freeze([
        {
          name: '创建行程单',
          point: 2
        },
        {
          name: '填写组织生活记录',
          point: 3
        },
        {
          name: '行程单报名',
          point: 1
        },

        {
          name: '行程评价发布',
          point: 5
        },
        {
          name: '点赞',
          point: 1
        },
        {
          name: '分享',
          point: 1
        },
        {
          name: '社区发帖成功',
          point: 5
        },
        {
          name: '发布评论',
          point: 2
        },
        {
          name: '打卡',
          point: 10
        },
        {
          name: '注册成功',
          point: 10
        },
        {
          name: '实名认证(联盟)',
          point: 5
        },
        {
          name: '实名认证(社区)',
          point: 5
        },
        {
          name: '认领微心愿',
          point: 5
        },
        {
          name: '报名参加志愿活动',
          point: 5
        },
        {
          name: '参与报事',
          point: 5
        },
        {
          name: '活动报名',
          point: 5
        },
        {
          name: '申请商家展位成功',
          point: 20
        },
        {
          name: '留言回复成功（仅限专家）',
          point: 10
        }
      ])
    }
  },
  computed: {
    maskCustomStyle () { // 遮罩层自定义样式
      const temStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.40)'
      }
      return temStyle
    }
  }
}
</script>

<style lang='scss' scoped>
.h568 {
  height: 568rpx;
  overflow: auto;
}
.popup-wrap {
  .popup-title {
    text-align: center;
    color: #000;
  }
  .close-btn {
    position: absolute;
    right: 20rpx;
    top: 12rpx;
  }
}
</style>
