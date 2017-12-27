import fetch from '../config/fetch'
import {getStore} from '../config/utils'

// fetch 可以接收 4个参数 根据 type 不同 做不同的处理

// 测试demo
export const city = () => {
  fetch('/v1/cities', {})
}

// 获取首页默认城市
export const cityGuess = () => {
  fetch('/v1/cities', {
    type: 'guess'
  })
}

// 获取首页热门城市
export const hotcity = () => {
  fetch('/v1/cities', {
    type: 'hot'
  })
}

// 获取首页所有城市
export const groupcity = () => {
  fetch('/v1/cities', {
    type: 'group'
  })
}

// 获取当前所在城市
export const currentcity = (number) => {
  fetch('/v1/cities' + number)
}

export const searchplace = (cityid, value) => {
  fetch('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
  })
}

// 获取用户信息
export const getUser = () => {
  fetch('/v1/user', {
    user_id: getStore('user_id')
  })
}

// 获取地址列表
export const getAddress = (id, sig) => {
  fetch('/v1/carts' + id + '/addresses', {
    sig
  })
}

export const getAddressList = (userId) => {
  fetch('/v1/users/' + userId + '/addresses')
}