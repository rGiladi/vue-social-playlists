import Vue from 'vue'
import router from '@/router'
import VueYouTubeEmbed from 'vue-youtube-embed'
import axios from 'axios'
import VueAxios from 'vue-axios'
import GetSongsFromYoutube from '@/components/AnonymousPages/GetSongsFromYoutube'

Vue.use(VueYouTubeEmbed)
Vue.use(VueAxios, axios)

var sinon = require('sinon')

describe('GetSongsFromYoutube Component', () => {
  var vm
  before(() => {
    const Constructor = Vue.extend(GetSongsFromYoutube)
    vm = new Constructor({ router }).$mount()
  })
  describe('getSongObjectFromYoutube Method', () => {
    it('should successfuly process the url', (done) => {
      let url = 'https://www.youtube.com/watch?v=4CmcnWQ-754'
      vm.getSongObjectFromYoutube(url)
      .then(() => {
        expect(vm.$data.ytSongObject.title).to.not.equal('')
        done()
      })
    })
    it('should alert user for invalid url', () => {
      let url = 'https://www.google.com'
      let spy = sinon.spy(window, 'alert')
      vm.getSongObjectFromYoutube(url)
      expect(spy.calledWith('Not a valid url!')).to.be.true
      spy.restore()
    })
  })
  describe('convertYoutubeTime', () => {
    it('should convert youtube time to HH:MM:SS format', () => {
      let durations = {
        'PT5M21S': '05:21',
        'PT4M38S': '04:38',
        'PT5M58S': '05:58',
        'PT4M57S': '04:57',
        'PT1H4M39S': '01:04:39',
        'PT46M44S': '46:44',
        'PT56S': '00:56'
      }
      for (let key in durations) {
        expect(vm.convertYoutubeTime(key)).to.equal(durations[key])
      }
    })
  })
})
