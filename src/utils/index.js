import Vue from 'vue'
import { isEmpty, checkInput, addArrayAttr } from './validate'
import { timeFormat } from './date'
import { msg, sourceUrl, getOffHeight, getCurrentRoute, avatarUrl, json, prePage, imgUrlDeal, debounce, jumpWebview, aliImg } from './tools'
import { login, notMember, goLogin } from './login'
import { myAmapFun, mapCenter } from './map'

import uniGo from './rewriteUni';
Vue.prototype.$uniGo = uniGo;
Vue.prototype.$mapCenter = mapCenter;

Vue.prototype.$getOffHeight = getOffHeight;

Vue.prototype.$aliImg = aliImg
Vue.prototype.$getCurrentRoute = getCurrentRoute
Vue.prototype.$jumpWebview = jumpWebview

Vue.prototype.$checkInput = checkInput
Vue.prototype.$isEmpty = isEmpty
Vue.prototype.$timeFormat = timeFormat;
Vue.prototype.$temApi = { msg, json, prePage };
Vue.prototype.$msg = msg
Vue.prototype.$windowWidth = uni.getSystemInfoSync().windowWidth
Vue.prototype.$windowHeight = uni.getSystemInfoSync().windowHeight
Vue.prototype.$addArrayAttr = addArrayAttr
Vue.prototype.$login = login
Vue.prototype.$notMember = notMember
Vue.prototype.$imgUrlDeal = imgUrlDeal
Vue.prototype.$avatarUrl = avatarUrl
Vue.prototype.$debounce = debounce

Vue.prototype.$goLogin = goLogin
Vue.prototype.$sourceUrl = sourceUrl


Vue.prototype.$AMap = myAmapFun;

// 全局分享
const $x = {};
Vue.prototype.$x = $x;
let share = require('./share.js');
Vue.mixin(share);





