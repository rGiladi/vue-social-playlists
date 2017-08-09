import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueYouTubeEmbed from 'vue-youtube-embed'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import Toast from 'vue-easy-toast'

Vue.use(Vuelidate)
Vue.use(VueYouTubeEmbed)
Vue.use(VueAxios, axios)
Vue.use(Toast)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
