import Vue from 'vue'
import Router from 'vue-router'
import AnonymousHomePage from '@/components/AnonymousPage/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AnonymousHomePage',
      component: AnonymousHomePage
    }
  ],
  mode: 'history'
})
