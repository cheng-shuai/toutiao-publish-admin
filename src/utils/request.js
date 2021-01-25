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

// 相应拦截器

// 导出请求方法
export default request

// 谁要使用谁就加载request模块
