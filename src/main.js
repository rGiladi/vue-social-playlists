import Vue from 'vue'
import App from './App'
import router from './router'
import VueYouTubeEmbed from 'vue-youtube-embed'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueYouTubeEmbed)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
