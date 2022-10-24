import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'

const TimeOut = 3600

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 定义5秒超时
  // process.env.NODE_ENV # 当为production时为生产环境 为development时为开发环境
})
// 请求拦截器主要处理 token的**统一注入问题**
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (isProxyCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    // 如果token存在 注入token
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
  }
  return config
})
// 响应拦截器主要处理 返回的**数据异常** 和**数据结构**问题
service.interceptors.response.use(response => {
  // 解构赋值
  const { message, data, success } = response.data
  if (success) {
    // 成功直接返回数据
    return data
  } else {
    // 提示错误
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
})
function isProxyCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() //  缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service
