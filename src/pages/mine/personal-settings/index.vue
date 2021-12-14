<template>
  <view class="tb">
    <view class="pl30 pr30 bg-white ft30">
      <view class="between-row h100 bb center-align">
        <text class="flex1 h100 center-align bold">头像</text>
        <view class="center-align color-999 relative">
          <img :src="avatarUrl(formData.avatar)"
               mode="scaleToFill"
               class="member-avator"
               @click="onBigAvatar" />
          <view @click="changeAvatar"
                class="upload-icon">
            <svg-icon icon="icon_xiangyoujiantou"
                      class="ft20 ml8 relative"></svg-icon>
          </view>
          <avatar @upload="myUpload"
                  ref="avatar"
                  style="width:0;height:0"></avatar>
        </view>
      </view>
      <template v-for="(item,index) in infoProps">
        <view :key="index"
              v-if="isInfoShow(item.prop)"
              :class="index !== 3 && 'bb'"
              class="between-row h100 center-align">
          <text class="flex1 bold">{{item.name}}</text>
          <view class="center-align color-999"
                @click="onInfoItem(item.prop)">
            <text>{{infoText(item.prop)}}</text>
            <svg-icon v-if="isClickShow(item.prop)"
                      icon="icon_xiangyoujiantou"
                      class="ft20 ml8 mt4"></svg-icon>
          </view>
        </view>
      </template>
      <view class="pt12 pb32 color-999 ft26">
        <text v-if="!formData.isRealName">认证后可在论坛发布帖子，可报名参加联盟活动</text>
        <template v-else>
          <view v-for="(item,index) in realNameProp"
                :key="index"
                :class="index === 0 && 'mb20'">
            <template v-if="index === 0">
              <text>{{item.name}}：</text>
              <text class="color-333">
                {{formData[item.prop]}}
                <span v-if="formData.isParty">(党员)</span>
              </text>
            </template>
            <template v-else>
              <text>{{item.name}}：</text>
              <text class="color-333">{{formData[item.prop]}}</text>
            </template>
          </view>
        </template>
        <div>
          <div class="mt16"
               v-if="formData.authAllianceOrgName">
            <span>党建联盟：</span>
            <span class="color-333">{{formData.authAllianceOrgName}}</span>
          </div>
          <div class="mt16"
               v-if="formData.authCommunityOrgName">
            <span>所在社区：</span>
            <span class="color-333">{{formData.authCommunityOrgName}}</span>
          </div>
        </div>
      </view>
    </view>
    <u-mask :show="isShowBigAvatar"
            :custom-style="maskCustomStyle"
            @click="onBigAvatar">
      <view class="center-align"
            style="height:100%">
        <img :src="avatarUrl(formData.avatar)"
             mode="widthFix"
             class="member-big-avator" />
      </view>
    </u-mask>
  </view>
</template>

<script>
import { avatarUrl } from '@/utils/tools'
import avatar from "@/components/yq-avatar/yq-avatar.vue";
export default {
  name: 'index',
  methods: {
    // 昵称、实名认证
    onInfoItem (type) {
      if (type === 'phone' || type === 'labelList') return
      if (type === 'orgName' && this.formData.isRealName) return
      const temUrl = type === 'nick' ? `/pages/mine/personal-settings/EditNick?nick=${this.formData.nick}` : '/pages/mine/real-name/index'
      uni.navigateTo({ url: temUrl })
    },
    // 唤起头像
    myUpload (rsp) {
      const images = rsp.path;
      this.uploadAvatar(images)
    },
    // 上传头像
    uploadAvatar (file) {
      this.$api.uploadAvatar(file).then(res => {
        this.formData.avatar = res.filePaths[0]
        const temParams = {
          avatar: res.filePaths[0]
        }
        this.modifyMemberPersonalInfo(temParams)
      })
    },
    // 打开上传头像
    changeAvatar () {
      const that = this
      that.$refs.avatar.fChooseImg({
        selWidth: "500rpx", selHeight: "500rpx",
        expWidth: '2000rpx', expHeight: '2000rpx',
        canRotate: false,
        quality: 1
      });
    },
    // 查看、关闭大图
    onBigAvatar () {
      this.isShowBigAvatar = !this.isShowBigAvatar
    },
    // 编辑会员个人信息
    modifyMemberPersonalInfo (params) {
      this.$api.modifyMemberPersonalInfo(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.getMemberPersonalInfo()
      })
    },
    // 获取会员个人信息
    getMemberPersonalInfo () {
      this.$api.getMemberPersonalInfo().then(res => {
        if (res.isError) return this.$msg(res.message)
        this.formData = res?.content ?? {}
        uni.setStorageSync('isAuthCommunity', res.content.isAuthCommunity)
      })
    }
  },
  data () {
    return {
      formData: {},
      isShowBigAvatar: false,
      infoProps: Object.freeze([
        {
          name: '昵称',
          prop: 'nick'
        },
        {
          name: '身份',
          prop: 'labelList'
        },
        {
          name: '绑定手机',
          prop: 'phone'
        },
        {
          name: '实名认证',
          prop: 'orgName'
        }
      ]),
      realNameProp: Object.freeze([
        {
          name: '姓名',
          prop: 'name'
        }
      ]),
      avatarUrl
    }
  },
  computed: {
    maskCustomStyle () {
      const temStyle = {
        background: 'rgba(0, 0, 0, 0.4)'
      }
      return temStyle
    },
    isInfoShow () {
      return (val) => {
        if (val === 'labelList') {
          return !this.$isEmpty(this.formData.labelList)
        }
        return true
      }
    },
    isClickShow () {
      return (val) => {
        if (val === 'nick') return true
        if (val === 'orgName') return !this.formData.isRealName
        return false
      }
    },
    infoText () {
      return (val) => {
        const { isRealName, labelList } = this.formData
        if (val === 'orgName') return isRealName ? '已认证' : '未认证'
        if (val === 'labelList') labelList.splice(0, 2).join('、')
        return this.formData[val]
      }
    }
  },
  components: {
    avatar
  },
  onShow () {
    this.getMemberPersonalInfo()
  }
}
</script>

<style lang='scss' scoped>
page {
  background: #f7f7f7;
  height: 100%;
}
.h100 {
  height: 100rpx;
}
.upload-icon {
  width: 100rpx;
  height: 88rpx;
  line-height: 88rpx;
  position: absolute;
  right: -72rpx;
}
.member-avator {
  width: 68rpx;
  height: 68rpx;
  border-radius: 68rpx;
  margin-right: 28rpx;
}
.member-big-avator {
  width: 100%;
}
</style>
