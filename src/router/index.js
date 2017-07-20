import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '@/components/AnonymousPage/Navigation'
import ExamplePlaylistCreator from '@/components/AnonymousPage/ExamplePlaylistCreator'
import SignUp from '@/components/AnonymousPage/Authentication/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'anonymous-home-page',
      components: {
        default: ExamplePlaylistCreator,
        'ano-navigation': Navigation
      }
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      components: {
        default: SignUp,
        'ano-navigation': Navigation
      }
    }
  ],
  mode: 'history'
})
