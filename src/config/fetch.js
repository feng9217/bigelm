import {baseUrl} from './env'

// 传入 url 传参data GET/POST
// 返回 JSON格式化后的数据: res
// 根据需要自行取值
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase()
  url = baseUrl + url
  console.log('请求的url:')
  console.log(url)

  if (type === 'GET') {
    let dataStr = '' // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })
    // 效果如: pois?city_id=1&keyword=迪士尼&type=search

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
    console.log('请求的拼接参数')
    console.log(dataStr)
  }

  // 支持 fetch
  if (window.fetch && method === 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'force-cache'
    }
    console.log('请求头:')
    console.log(requestConfig)

    if (type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      const response = await fetch(url, requestConfig)
      const responseJson = await response.json()
      console.log('返回的JSON')
      console.log(responseJson)
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else {
  // 不支持 fetch
    return new Promise((resolve, reject) => {
      let requestObj
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest()
      } else {
        requestObj = new ActiveXObject; // eslint-disable-line
      }

      let sendData = ''
      if (type === 'POST') {
        sendData = JSON.stringify(data)
      }

      requestObj.open(type, url, true)
      requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      requestObj.send(sendData)

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj)
            }
            console.log('不支持fetch时返回的 obj')
            console.log(obj)
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}