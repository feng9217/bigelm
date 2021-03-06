import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import home from '../page/home/home'
import city from '../page/city/city'
import login from '../page/login/login'
import shop from '../page/shop/shop'
import shopDetail from '../page/shop/children/shopDetail/shopDetail'
import foodDetail from '../page/shop/children/foodDetail/foodDetail'
import search from '../page/search/searchMap'
import profile from '../page/profile/profile'

const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        // 地址为空时的默认跳转
        {
          path: '',
          redirect: '/home'
        },
        // 首页城市列表
        {
          path: '/home',
          component: home
        },
        // 当前城市地址详情
        {
          // 路由配置传参的字段
          path: '/city/:cityid',
          component: city
        },
        // 登录注册页
        {
          path: '/login',
          component: login
        },
        // 所有商铺列表
        {
          path: '/msite',
          component: msite,
          meta: {keepAlive: true}
        },
        // 商铺详情页
        {
          path: '/shop',
          component: shop,
          children: [
            {
              path: 'foodDetail',
              component: foodDetail
            },
            {
              path: 'shopDetail',
              component: shopDetail
            }
          ]
        },
        // 搜索页
        {
          path: '/search',
          component: search
        },
        // 个人中心页
        {
          path: '/profile',
          component: profile
        }
      ]
    }
  ]
})
