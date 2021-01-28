/**
 *  基于axios封装的请求模块
 */
import axios from 'axios'
import JSONbig from 'json-bigint'

// 创建一个axios实例
// 我们请求通过这个实例去发请求,把需要的配置给这个实例来请求
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 请求的基础路径
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // console.log(data)

    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }

    // axios 默认在内部使用 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
  }]
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
