<template>
  <div class='message-wrap'>
    <div class="content relative">
      <div>
        <textarea placeholder="请输入您的留言，留言回复后可以在“我的-服务记录”中查看"
                  v-model="form.content"
                  placeholder-style="color:#999"
                  maxlength="500"
                  class="text-area ft28">
            </textarea>
      </div>
      <div class="tr ft24 color-999 mt16">{{form.content.length || 0}}/500</div>
    </div>
    <div class="pl32 bg-white mt24 pt24 pr32">
      <div class="between-row mb16">
        <span class="mediumn ft28">图片上传（非必填）</span>
        <span class="ft22 color-999">{{form.attachments.length}}/3</span>
      </div>
      <upload-images :count="3"
                     :length="3"
                     imageTypeName='sourceType'
                     :imageData.sync="form.attachments"></upload-images>
    </div>
    <u-button @click="onConfirm"
              class="ml32 mr32"
              :custom-style="btnStyle"
              :disabled="!form.content">确定</u-button>
  </div>
</template>

<script>
import UploadImages from "@/components/upload-images";
export default {
  name: 'LeaveMessage',
  components: {
    UploadImages
  },
  methods: {
    onConfirm () {
      const params = {
        ...this.form
      }
      this.$api.communityLeaveMessage(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$msg('提交成功')
        setTimeout(() => {
          uni.navigateBack({ delta: 1 })
        }, 1000);
      })
    }
  },
  data () {
    return {
      form: {
        content: '',
        attachments: []
      }
    }
  },
  computed: {
    btnStyle () { // 自定义按钮样式
      const btnBgColor = !this.form.content ? '#ccc' : '#E32417'
      const temStyle = {
        fontSize: '32rpx',
        color: '#fff',
        height: '98rpx',
        borderRadius: '54rpx',
        fontWeight: 'bold',
        background: btnBgColor,
        marginTop: '66rpx'
      }
      return temStyle
    },
  }
}
</script>

<style lang='scss' scoped>
page {
  background: #f7f7f7;
}
.content {
  padding: 32rpx;
  background: #fff;
  .text-area {
    width: 100%;
  }
}
</style>
