import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

// 自带调试工具 检测是否通过mutations修改 配置开发环境使用(npm run dev)
// production 生产环境
// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
  // 检测state修改是否来自于mutation
  // strict: debug,
  //  eslint-disable no-undef
  // plugins: debug ? [createLogger()] : []
})