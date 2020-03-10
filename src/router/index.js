import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      // redirect: '/',
      component: Home
    },
    {
      path: '/drag',
      name: 'drag',
      // redirect: '/',
      component: () => import('@/components/drag.vue')
    }
  ]
})


