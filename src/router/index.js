import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/home/home'
import App from '../App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: '/home',
          component: home
        }
      ]
    }
  ]
})
