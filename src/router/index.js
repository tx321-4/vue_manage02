import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Cookies from 'js-cookie'
import Home from '../views/Home.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'// Progress 进度条样式
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: _import('/login'),
    meta: {
      noAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  store.dispatch('initSysConfig').then(() => {
    /* 判断要访问的路由是否需要权限访问 */
    if (to.meta && to.meta.noAuth) {
      next()
    } else {
      if (Cookies.get('PHPSESSID')) {
        /* 判断是否已读取用户信息 */
        if (store.getters.hasUserInfo) {
          next()
        } else {
          /* 获取用户信息 */

        }
      } else {

      }
    }
  })
})

export default router
