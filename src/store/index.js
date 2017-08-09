import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedInUser: null
  },
  mutations: {
    logUserIn (state, user) {
      state.loggedInUser = user
    },
    logUserOut (state) {
      state.loggedInUser = null
      localStorage.clear()
    }
  },
  getters: {
    getLoggedInUser: state => {
      return state.loggedInUser
    }
  }
})

export default store
