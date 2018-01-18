// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import './config/rem.js'
import VueAwsomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueAMap from 'vue-amap'

Vue.config.productionTip = false

Vue.use(VueAwsomeSwiper)
Vue.use(VueAMap)

fastclick.attach(document.body)
VueAMap.initAMapApiLoader({
  key: '177a43af998ed35c450eff81aa61e555', // your key
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation'] // 引入的插件
})
console.log(VueAMap)
// ------
// let createMap = () => {
//   const promise = new Promise(function (resolve, reject) {
//     let script = document.createElement('script')
//     script.type = 'text/javascript'
//     script.src = 'https://webapi.amap.com/maps?v=1.3&key=177a43af998ed35c450eff81aa61e555'   // 高德地图
//     document.body.appendChild(script)
//     if (script.nodeName === 'SCRIPT') {
//       resolve()
//     } else {
//       reject(new Error('Could not script image at ' + script.src))
//     }
//   })
//   return promise
// }
// createMap().then(function () {
//   console.log('读取高德地图成功')
//   // 加載當前的ip定位
// }).catch(function (error) {
//   // 处理 getJSON 和 前一个回调函数运行时发生的错误
//   console.log('发生错误！', error)
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
