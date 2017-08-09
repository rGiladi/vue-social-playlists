import Vue from 'vue'
import router from '@/router'
import VueYouTubeEmbed from 'vue-youtube-embed'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ExamplePlaylistCreator from '@/components/AnonymousPages/ExamplePlaylistCreator'

Vue.use(VueYouTubeEmbed)
Vue.use(VueAxios, axios)

// var sinon = require('sinon')

describe('ExamplePlaylistCreator Component', () => {
  var vm
  before(() => {
    const Constructor = Vue.extend(ExamplePlaylistCreator)
    vm = new Constructor({ router }).$mount()
  })
  describe('beforeDestroy Hook', () => {
    it('shoud save user input to sessionStorage', () => {
      vm.pTitle = 'test-title'
      vm.$destroy()
      let objFromStorage = JSON.parse(sessionStorage.getItem('epc-values'))
      expect(objFromStorage['title']).to.equal('test-title')
    })
  })
})
