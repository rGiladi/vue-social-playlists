import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '@/components/AnonymousPage/Navigation'
import ExamplePlaylistCreator from '@/components/AnonymousPage/ExamplePlaylistCreator'
import SignUp from '@/components/AnonymousPage/Authentication/SignUp'
import Login from '@/components/AnonymousPage/Authentication/Login'

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
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: Login,
        'ano-navigation': Navigation
      }
    }
  ],
  mode: 'history'
})
