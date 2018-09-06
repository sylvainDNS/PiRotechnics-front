import Vue from 'vue'
import Router from 'vue-router'
import Show from '@/components/Show'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Show',
      component: Show
    }
  ]
})
