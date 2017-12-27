// 域名地址
let baseUrl = ''
// 路由模式
let routerMode = 'hash'
// 图片所在域名地址
let imgBaseUrl

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://cangdu.org:8001'
  imgBaseUrl = 'http://cangdu.org:8001/img/'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://cangdu.org:8001'
  imgBaseUrl = 'http://cangdu.org:8001/img/'
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl
}