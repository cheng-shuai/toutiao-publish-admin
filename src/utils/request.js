/**
 *  基于axios封装的请求模块
 */
import axios from 'axios'

// 创建一个axios实例
// 我们请求通过这个实例去发请求,把需要的配置给这个实例来请求
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 请求的基础路径
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // 所有请求会经过这里
  // config 是当前请求相关的配置对象
  // config 是可以修改的

  const user = JSON.parse(window.localStorage.getItem('user'))
  // 如果有用户登录,则设置统一的token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // 当这里 return config 之后请求才会发出去
  return config
}, function (error) {
  // 请求失败会经过这里
  return Promise.reject(error)
})

// 相应拦截器
// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

// 导出请求方法
export default request

// 谁要使用谁就加载request模块
