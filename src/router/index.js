import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const router = new Router({
  routes: [
    // 登录组件
    {
      path: '/',
      name: 'login',
      component: () => import('@/components/Login')
    },
    {
      path: '/user/login',
      component: () => import('@/components/Login')
    }
  ],
  // 配置路由缓存模式
  mode: 'history'
})

// 挂在路由守卫 在检测用户未登录的前提下 引导用户到登录页面
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 代表从哪个路由路径来
//   // next 是一个函数 表示放行
//   // next() 放行
//   // next('/login') 强制跳转
//   if (to.path === '/login') {
//     return next()
//   }
//   const token = window.sessionStorage.getItem('token')
//   if (!token) return next('/login')
//   next()
// })
export default router
