import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import History from './views/History.vue'
import Search from './views/Search.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/:query',
      name: 'search',
      component: Search,
      props: true
    }
  ]
})
