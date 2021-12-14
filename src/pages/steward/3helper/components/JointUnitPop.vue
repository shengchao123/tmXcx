<template>
  <u-popup v-model="isShow"
           mode="bottom"
           border-radius="30"
           :mask-close-able="false">
    <view class="pl32 pr32 pb32">
      <div class="title ft30 tc">选择联办单位</div>
      <div class="tip ft24 tc pt8 pb8">*最多选择2个联办单位</div>
      <div class="close-btn"
           @click="hide">
        <svg-icon class="ft24 color-999 bold mt8"
                  icon="icon_cha"></svg-icon>
      </div>
      <scroll-view class="list pl30 pr30"
                   scroll-y>
        <view v-for="(item, index) in unitList"
              :key="index"
              class="item between-row center-align"
              :class="isSelected(item) && 'selected'"
              @click="onSelect(item)">
          <text class="ft28">{{item.name}}</text>
          <svg-icon v-if="isSelected(item)"
                    icon="icon_duihao"
                    class="ft28 mt4"></svg-icon>
        </view>
      </scroll-view>
      <div class="pt8 between-row">
        <div class="other-btn white-color ft30 tc"
             @click="hide">取消</div>
        <div class="confirm-btn white-color ft30 tc ml24"
             @click="onConfirm">确定</div>
      </div>
    </view>
  </u-popup>
</template>
<script>
export default {
  name: 'JointUnitPop',
  methods: {
    show () {
      this.isShow = true
      if (this.unitList.length <= 0) {
        this.getUnitListByCommunity()
      }
    },
    hide () {
      this.isShow = false
    },
    onSelect (item) {
      const selectList = this.selectList
      const { id } = item
      const selectedIndex = this.findTargetIndexOnObjectList(selectList, 'id', id)
      if (selectedIndex !== null) {
        selectList.splice(selectedIndex, 1)
        return
      }

      if (selectList.length >= 2) {
        return this.$msg('最多选择2个')
      }
      this.selectList.push(item)
    },
    onConfirm () {
      this.$emit('onConfirm', this.selectList)
      this.hide()
    },
    findTargetIndexOnObjectList (list, key, target) {
      for (let i = 0; i < list.length; i++) {
        if (list[i][key] === target) {
          return i
        }
      }
      return null
    },
    getUnitListByCommunity () {
      this.$api.getUnitListByCommunity().then(res => {
        if (res.isError) return this.$msg(res.message)
        const unitList = res.content || []
        const memberUnitOrgId = this.memberPersonalInfo.unitOrgId
        this.unitList = unitList.filter(el => el.id !== memberUnitOrgId)
      })
    }
  },
  data () {
    return {
      isShow: false,
      unitList: [],
      selectList: []
    }
  },
  computed: {
    isSelected () {
      return (item) => {
        return this.findTargetIndexOnObjectList(this.selectList, 'id', item.id) !== null
      }
    },
    memberPersonalInfo () {
      return this.$store.state.user.memberPersonalInfo
    },
  }
}
</script>
<style lang='scss' scoped>
.title {
  height: 74rpx;
  line-height: 74rpx;
}
.tip {
  color: #ff9400;
}
.list {
  max-height: 702rpx;
  overflow: scroll;
  .item {
    height: 97rpx;
    border-bottom: solid 1px #eaeaea;
  }
  .selected {
    color: #e32417;
  }
}
.close-btn {
  position: absolute;
  right: 24rpx;
  top: 12rpx;
}
.confirm-btn {
  width: 331rpx;
  height: 88rpx;
  line-height: 88rpx;
  background: #e32417;
  border-radius: 45rpx;
}
.other-btn {
  width: 331rpx;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 45rpx;
  border: solid 1px #e32417;
  color: #e32417;
}
</style>