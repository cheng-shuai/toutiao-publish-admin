import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '', // path 为空,会默认作为子路由渲染
        name: 'home',
        component: Home
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫: 说白了所有页面的导航都会经过这里
// 守卫页面的导航的
// to: 要去的路由信息
// from: 来自哪里的路由信息
// next: 放行方法
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login, 校验登录状态
  // 如果美誉登录,则跳转到登录页面
  // 如果登录了,则允许通过
  // 允许通过
  // next()
  const user = JSON.parse(window.localStorage.getItem('user'))

  if (to.path !== '/login') {
    if (user) {
      // 如果存在user说明已经登录,允许通过
      next()
    } else {
      // 如果没有存在user说明没有登录,跳转到登录页面
      next('/login')
    }
  } else {
    // 登录页面,正常允许通过
    next()
  }
})

export default router
