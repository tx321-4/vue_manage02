import authApi from '@/api/auth'
import Cookies from 'js-cookie'

const SessionKey = 'PHPSESSID'

const user = {
  state: {
    id: null,
    name: '',
    menus: [],
    routers: [],
    version: '',
    sysTitle: ''
  },
  mutations: {
    SET_USERID (state, id) {
      state.id = id
    },
    SET_NAME (state, name) {
      state.name = name
    },
    SET_EMPLOYEE (state, employee) {
      state.employee = employee
    },
    SET_MENUS (state, menus) {
      state.menus = menus
    },
    SET_ROUTERS (state, routers) {
      state.routers = routers
    },
    SET_VERSION (state, version) {
      state.version = version
    }
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        authApi.login(user.username, user.password).then(res => {
          Cookies.set(SessionKey, res.token)
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    getUserInfo ({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        authApi.getUserInfo().then(res => {
          commit('SET_USERID', res.data.userid)
          commit('SET_NAME', res.data.username)
          commit('SET_MENUS', res.data.menuList)
          resolve(res)
        }).catch(error => {
          dispatch('logout')
          reject(error)
        })
      })
    },
    logout ({ commit }) {
      Cookies.remove(SessionKey)
      window.location.reload()
    },

    setRouters ({ commit }, routers) {
      commit('SET_ROUTERS', routers)
    }

  }
}

export default user
