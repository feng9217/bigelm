import axios from 'axios'
// import {getStore} from '../config/utils'

const baseUrl = 'http://cangdu.org:8001'

// 城市相关接口 (about city)
const city = '/v1/cities'

// getcityGuess() {
//   let url = 'http://cangdu.org:8001/v1/cities'
//   axios.get(url, {params: {
//     type: 'guess'
//   }
//   }).then((res) => {
//     console.log(res)
//   })
// }

// 获取城市列表
// 示例: http://cangdu.org:8001/v1/cities?type=guess
export function getCityType(type) {
  let url = baseUrl + city + ''
  let setType = type
  return axios.get(url, {
    params: {
      type: `${setType}`
    }
  }).then((res) => {
    // console.log(res)
    // 加上 Promise 封装 在外面调用时才可以链式调用赋值
    return Promise.resolve(res)
  })
}

// 获取所选城市信息
// 示例: http://cangdu.org:8001/v1/cities/1
export function getCity(cityid) {
  let url = baseUrl + city + `/${cityid}`
  return axios.get(url, {
    params: {
      id: cityid
    }
  })
}

// 获取当前所在城市
export const currentcity = (number) => {
  let url = baseUrl + city + number
  return axios.post(url, {}).then((res) => {
    return res
  })
}

// 用户相关接口 (about user)
const user = '/v1/user'

// 获取用户信息
export const getUser = () => {
  let url = baseUrl + user + ''
  return axios.get(url).then((res) => {
    // console.log(res)
    return Promise.resolve(res)
  })
}

// 搜索地址
// 示例: http://cangdu.org:8001/v1/pois?city_id=1&keyword=迪士尼&type=search
export function searchAddress(id, keyword) {
  let url = baseUrl + `/v1/pois`
  return axios.get(url, {
    params: {
      cityid: id,
      keyword: `${keyword}`,
      type: 'search'
    }
  }).then((res) => {
    return Promise.resolve(res)
  })
}

// 地址相关
const addr = '/addresses'
export const getAddressList = (userId) => {
  let url = baseUrl + user + userId + addr + ''
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  })
}

// 获取图片验证码
export const getCaptchas = () => {
  let url = baseUrl + '/v1/captchas'
  return axios.post(url).then((res) => {
    // console.log(res)
    return res
  })
}

// 获取短信验证码
export const mobileCode = (phone) => {
  let url = baseUrl + '/v4/mobile/verify_code/send'
  return axios.post(url, {
    mobile: phone,
    scene: 'login',
    text: 'sms'
  }).then((res) => {
    return res
  })
}

// 检测账号是否存在
export const checkExsis = (checkNumber, type) => {
  let url = baseUrl + '/v1/users/exists'
  return axios.post(url, {
    [type]: checkNumber,
    type
  }).then((res) => {
    return res
  })
}

// 获取msite页面地址信息
export const msiteAddress = (geohash) => {
  let url = baseUrl + '/v2/pois/' + geohash
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  })
}

// 获取msite页面食品分类列表
export const msiteFoodType = (geohash) => {
  let url = baseUrl + '/v2/index_entry'
  return axios.get(url, {
    geohash,
    group_type: '1',
    'flag[]': 'F'
  }).then((res) => {
    return Promise.resolve(res)
  })
}

// 获取商铺列表
export const searchRes = (geohash, keyword) => {
  let url = baseUrl + '/v4/restaurants'
  return axios.get(url, {
    'extras[]': 'restaurant_activity',
    geohash,
    keyword,
    type: 'search'
  })
}
