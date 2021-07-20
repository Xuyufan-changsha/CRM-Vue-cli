import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  getters: {
    isLogin: state => state.isLogin
  },
  mutations: {
    userStatus (state, flag) {
      state.isLogin = flag
    }
  },
  actions: {
    setUser ({commit}, flag) {
      commit('userStatus', flag)
    }
  }
})
