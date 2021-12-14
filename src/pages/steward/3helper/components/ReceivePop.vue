<template>
  <div>
    <u-popup v-model="isShow"
             mode="bottom"
             border-radius="30"
             :mask-close-able="false">
      <view class="pl32 pr32 pb32">
        <div class="title ft30 tc">认领</div>
        <div class="close-btn"
             @click="hide">
          <svg-icon class="ft24 color-999 bold mt8"
                    icon="icon_cha"></svg-icon>
        </div>
        <div v-for="(item, index) in selectList"
             :key="index"
             class="option mb24 pl24 pt32 pb32 center-justify column"
             :class="item.type === selectedType ? 'option-selected' : ''"
             @click="onSelect(item)">
          <div class="center-align mb8">
            <div class="mr16 radio center">
              <svg-icon v-if="item.type === selectedType"
                        icon="icon_duihao"
                        class="ft20 white-color"></svg-icon>
            </div>
            <span class="ft32 name">{{item.name}}</span>
          </div>
          <span class="ft24 description">{{item.description}}</span>
          <div v-if="item.type === 1 && isHall"
               class="pt24">
            <div class="select-btn ft24 tc"
                 style="color: #E32417"
                 @click="onJointUnitShow">选择联办单位</div>
            <div class="ft24 color-999 pt16">{{unitNameText}}</div>
          </div>
        </div>
        <div class="confirm-btn white-color ft30 tc mt32"
             @click="onConfirm">确定</div>
      </view>
    </u-popup>
    <joint-unit-pop v-if="isHall"
                    ref="jointUnitPop"
                    @onConfirm="jointUnitConfirm"></joint-unit-pop>
  </div>
</template>
<script>
import JointUnitPop from './JointUnitPop.vue'
let cacheSelectList = null
export default {
  components: { JointUnitPop },
  name: 'ReceivePop',
  methods: {
    show ({ projectId, unitIds }) {
      this.isShow = true
      this.projectId = projectId
      this.unitIds = unitIds || []
      if (unitIds && unitIds.length === 1) { // 若当前联合单位为 1 默认单独领办
        this.selectedType = 2
        this.selectList.splice(0, 1)
      }
    },
    hide () {
      this.isShow = false
      this.resetData()
    },
    resetData () {
      this.projectId = null
      this.unitIds = []
      this.selectedType = 1
      this.selectList = [...cacheSelectList]
    },
    onSelect (item) {
      this.selectedType = item.type
    },
    onJointUnitShow () {
      this.$refs.jointUnitPop.show()
    },
    jointUnitConfirm (list) {
      this.selectUnits = [...list]
    },
    onConfirm () {
      this.leadJourneyHelperProjectSchedule()
    },
    leadJourneyHelperProjectSchedule () {
      const selectedType = this.selectedType
      if (this.isHall && selectedType === 1 && this.selectUnits.length === 0) {
        return this.$msg('请先选择联办单位')
      }

      const memberUnitOrgId = this.memberPersonalInfo.unitOrgId
      let chooseUnitList = this.isHall ? this.selectUnits : this.unitIds
      chooseUnitList = chooseUnitList.filter(el => el.id !== memberUnitOrgId)
      const params = {
        id: this.projectId,
      }

      if (selectedType === 1) {
        params.journeyCoConstructionUnitIds = chooseUnitList.map(el => el.id)
      }

      this.$api.leadJourneyHelperProjectSchedule(params).then(res => {
        if (res.isError) return this.$msg(res.message)
        this.$msg('认领成功')
        this.$emit('receiveSuccess')
        this.hide()
      })
    }
  },
  data () {
    return {
      isShow: false,
      projectId: null,  // 项目id
      unitIds: [],
      selectUnits: [],
      selectedType: 1,
      selectList: [
        {
          name: '联合领办',
          type: 1,
          description: '视为共建单位联合领办，分数平分'
        },
        {
          name: '单独领办',
          type: 2,
          description: '视为单独领办，享受分数加成'
        }
      ]
    }
  },
  computed: {
    unitNameText () {
      const selectUnits = this.selectUnits
      if (selectUnits.length === 0) return ''
      const nameList = selectUnits.map(el => el.name)
      return `(已选：${nameList.join('、')})`
    },
    memberPersonalInfo () {
      return this.$store.state.user.memberPersonalInfo
    },
  },
  props: {
    isHall: Boolean,
    itemConfig: Object,
    showContact: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  created () {
    cacheSelectList = [...this.selectList]
  },
}
</script>
<style lang='scss' scoped>
.title {
  height: 90rpx;
  line-height: 90rpx;
}
.close-btn {
  position: absolute;
  right: 24rpx;
  top: 12rpx;
}
.option {
  width: 100%;
  background: #f3f3f3;
  border-radius: 8rpx;
  box-sizing: border-box;
  .radio {
    width: 32rpx;
    height: 32rpx;
    border-radius: 50%;
    border: solid 1px #999;
    box-sizing: border-box;
  }
  .description {
    color: #999;
  }
}
.option-selected {
  background: #fce9e7;
  .radio {
    border: none;
    background: #e32417;
  }
  .name {
    color: #e32417;
  }
  .description {
    color: #ef867f;
  }
}
.confirm-btn {
  height: 80rpx;
  line-height: 80rpx;
  background: #e32417;
  border-radius: 40rpx;
}
.select-btn {
  width: 186rpx;
  height: 56rpx;
  line-height: 56rpx;
  border: solid 1px #e32417;
  border-radius: 30rpx;
}
</style>