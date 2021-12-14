
import Vue from 'vue'

// 自定义组件
const requireComponents = require.context('@/components', true, /\.vue/)
requireComponents.keys().forEach(fileName => {
  // 组件实例
  const reqCom = requireComponents(fileName)
  // 截取路径作为组件名
  const temReqComName = fileName.split('/')[1]
  const reqComName = temReqComName.split('.')[0]
  // 组件挂载
  Vue.component(reqComName, reqCom.default || reqCom)
})
