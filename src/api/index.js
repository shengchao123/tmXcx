import Vue from 'vue'

import { urls, fileHost, imgHost } from './urls'
import * as app from './modules/app'
import * as login from './modules/login'
import * as mine from './modules/mine'
import * as originalTravel from './modules/original-travel'
import * as evaluateDetail from './modules/evaluate-detail'
import * as activity from './modules/activity'
import * as party from './modules/party'
import * as note from './modules/note'
import * as urbanRural from './modules/urban-rural'
import * as talentThinkTank from './modules/talent-think-tank'
import * as steward from './modules/steward'

export const api = {
  ...originalTravel,
  ...app,
  ...mine,
  ...login,
  ...evaluateDetail,
  ...activity,
  ...party,
  ...urbanRural,
  ...note,
  ...talentThinkTank,
  ...steward
}

Vue.prototype.$fileHost = fileHost
Vue.prototype.$imgHost = imgHost
Vue.prototype.$api = api
Vue.prototype.$urls = urls
