// 通过 mutations 来改变 state 里的内容
// mutation-types 映射到 mutations
// actions 触发 mutations 改变 state 或 mutations 直接改变 state
import * as types from './mutation-types'
// import {setStore, getStore} from '../config/utils'

const mutations = {
  [types.RECORD_ADDRESS](state, {latitude, longitude}) {
    state.latitude = latitude
    state.longitude = longitude
  },

  [types.GET_USERINFO](state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  },

  [types.SAVE_ADDRESS](state, newAdress) {
    state.removeAddress = newAdress
  }
}

export default mutations