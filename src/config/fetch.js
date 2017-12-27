import {baseUrl} from './env'

// async/await 是ES7的API
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase()
  url = baseUrl + url

  if (type === 'GET') {
    let dataStr = ''
    Object.keys(data).forEach((key) => {
      dataStr += key + '=' + data[key] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }

  // 传统的 XMLHttpRequest 被 Fetch 代替 是一个基于Promise的API
  // 识别 fetch的就用fetch 不识别的就用 XMLhttpRequest
  if (window.fetch && method === 'fetch') {
    // 设置请求信息
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

    if (type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      const response = await fetch(url, requestConfig)
      const responseJson = await response.json()
      return responseJson
    } catch (e) {
      throw new Error(e)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj
      if (window.XMLHttpRequest) {
        // 创建一个 ajax 请求
        requestObj = new XMLHttpRequest()
      } else {
        /* eslint-disable no-undef */
        requestObj = new ActiveXObject()
      }

      let sendData = ''
      if (type === 'POST') {
        sendData = JSON.stringify(data)
      }
      requestObj.open(type, url, true)
      requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      requestObj.send(sendData)

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj)
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}