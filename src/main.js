import Vue from 'vue'
import App from './App'
import store from './store'

import './utils/index'
import './api/index'
import './plugins/index'
import '@/components/index.js'


Vue.config.productionTip = false
Vue.prototype.$store = store;


Vue.prototype.$onLaunched = new Promise(resolve => {
  Vue.prototype.$isResolve = resolve
})

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
