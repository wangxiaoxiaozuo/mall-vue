import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userId: null
  },
  getters: {},
  mutations: {
    saveUserId(state, userId) {
      state.userId = userId
    }
  }
})

export default store
