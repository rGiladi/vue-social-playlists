import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '@/components/AnonymousPages/Navigation'
import ExamplePlaylistCreator from '@/components/AnonymousPages/ExamplePlaylistCreator'
import SignUp from '@/components/AnonymousPages/Authentication/SignUp'
import Login from '@/components/AnonymousPages/Authentication/Login'
import PlaylistsList from '@/components/UserPages/PlaylistsList/PlaylistsList'
import Playlist from '@/components/UserPages/Playlist/Playlist'

Vue.use(Router)

const router = new Router({
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
    }, {
      path: '/:username/playlists',
      name: 'PlaylistsList',
      component: PlaylistsList
    },
    {
      path: '/:username/playlists/:playlist_id',
      name: 'Playlist',
      component: Playlist
    }
  ],
  mode: 'history'
})

const anonymousRoutes = ['anonymous-home-page', 'login', 'sign-up']

router.beforeEach((to, from, next) => {
  if (anonymousRoutes.indexOf(to.name) !== -1) {
    let user = localStorage.getItem('user')
    if (user) {
      next({
        path: '/' + user + '/playlists'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
