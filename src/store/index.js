import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedInUser: null,
    error: null,
    loadedPlaylist: null
  },
  mutations: {
    logUserIn (state, user) {
      state.loggedInUser = user
    },
    logUserOut (state) {
      state.loggedInUser = null
      localStorage.clear()
    },
    setLoadedPlaylist (state, playlist) {
      state.loadedPlaylist = playlist
    },
    setError (state, data) {
      state.error = data
    }
  },
  getters: {
    getLoggedInUser: state => {
      return state.loggedInUser
    },
    getLoadedPlaylist: state => {
      return state.loadedPlaylist
    },
    getError: state => {
      return state.error
    }
  }
})

export default store
