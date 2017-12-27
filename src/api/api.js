import axios from 'axios'

const baseUrl = 'http://cangdu.org:8001'

// about city
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
