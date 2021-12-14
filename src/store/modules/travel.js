import { api } from '@/api/index.js'
const state = {
  customPathPoints: [],
}

const mutations = {
  CUSTOM_PATH_POINTS: (state, content) => {
    state.customPathPoints = content
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
