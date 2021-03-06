import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import layout from '@/views/layout'
import Cookies from 'js-cookie'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'// Progress 进度条样式
const _import = require('./_import_' + process.env.NODE_ENV)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index/updateRecord' },
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
          store.dispatch('getUserInfo').then(res => {
            const menuList = res.data.menuList
            const menuRouters = []
            /* 先取出模块，没有父id的就是模块菜单 */
            menuList.forEach((m, i) => {
              // console.log(i)
              if (m.parent_id == null) {
                m.fullPath = '/' + m.path
                const module = {
                  path: '/' + m.path,
                  component: layout,
                  meta: { id: m.id, title: m.title, fullPath: '/' + m.path },
                  children: [
                    {
                      path: '',
                      component: _import('/' + m.path + '/index'),
                      meta: {
                        menuHide: true,
                        title: m.title
                      }
                    }
                  ]
                }
                menuRouters.push(module)
              }
            })
            function convertTree (routers) {
              routers.forEach(r => {
                menuList.forEach((m, i) => {
                  if (m.parent_id && m.parent_id == r.meta.id) {
                    if (!r.children) r.children = []
                    m.fullPath = r.meta.fullPath + '/' + m.path
                    const menu = {
                      path: m.path,
                      // component: () => import('@/views'+r.meta.fullPath+'/'+m.path),
                      component: _import(r.meta.fullPath + '/' + m.path),
                      meta: { id: m.id, title: m.title, fullPath: r.meta.fullPath + '/' + m.path }
                    }
                    r.children.push(menu)
                    // console.log(i)
                    // menuList.splice(i,1)
                    // i--
                  }
                })
                if (r.children) convertTree(r.children)
              })
            }
            convertTree(menuRouters)
            menuRouters.unshift({
              path: '/index',
              component: layout,
              meta: { title: '首页', fullPath: '/index' },
              children: [
                {
                  path: 'updateRecord',
                  component: _import('/index/updateRecord'),
                  meta: { title: '系统更新记录', fullPath: '/index/updateRecord' }
                },
                {
                  path: 'modifyPwd',
                  component: _import('/index/modifyPwd'),
                  meta: { title: '修改密码', fullPath: '/index/modifyPwd' }
                },
                {
                  path: 'loginLog',
                  component: _import('/index/loginLog'),
                  meta: { title: '登录日志', fullPath: '/index/loginLog' }
                }
              ]
            })
            store.dispatch('setRouters', menuRouters)
            router.addRoutes(menuRouters)
            router.addRoutes([{ path: '*', redirect: '/index/updateRecord' }])
            next({ ...to, replace: true })
          })
        }
      } else {
        next('/login')
      }
    }
  })
})
router.afterEach((to, from) => {
  NProgress.done() // 结束Progress
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + ' | ' + store.state.sys.title
  } else {
    document.title = store.state.sys.title
  }
})

export default router
