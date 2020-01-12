import axios from 'axios'
import { Notification } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({
  ease: 'ease',
  speed: 500,
  showSpinner: false,
  template:
    '<div class="bar" role="bar" style="background: #ff4949;height:4px;"><div class="peg" style="box-shadow: 0 0 10px #fff, 0 0 5px #fff;"></div></div><div class="spinner" role="spinner"><div class="spinner-icon" style="border-top-color:white;border-left-color: white"></div></div>'
})
let baseUrl = '/mall_admin/'

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 0 // 请求超时时间
})
// request拦截器

service.interceptors.request.use(
  config => {
    // 此处进行token等数据处理
    NProgress.start()
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    NProgress.done()
    return res
  },
  error => {
    const res = error.response
    const status = Number(res.status) || 200
    if (status < 300 && status >= 200) {
      return res
    }
    let message
    if (status === 401) {
      message = '401,登录过期,请重新登录'
    } else if (status === 404) {
      message = '404,你访问的服务不存在'
    } else {
      message = res.data.msg
    }
    message = message || '服务器连接已中断,请稍后再试'
    // 如果请求为非200否者默认统一处理
    Notification({
      message: message,
      type: 'error'
    })
    NProgress.done()
    return Promise.reject(new Error(error))
  }
)

export default service
