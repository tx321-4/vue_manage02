import configApi from '@/api/sys/config'

const sys = {
  state: {
    title: '',
    initConfig: false
  },
  mutations: {
    SET_INITCONFIG (state, initConfig) {
      state.initConfig = initConfig
    },
    SET_TITLE (state, title) {
      state.title = title
    }
  },
  actions: {
    initSysConfig ({ state, commit }, path) {
      return new Promise((resolve, reject) => {
        if (!state.initConfig) {
          configApi.getValues(['system_title']).then(res => {
            commit('SET_INITCONFIG', true)
            commit('SET_TITLE', res.data.system_title)
            resolve()
          })
        } else {
          resolve()
        }
      })
    }
  }
}

export default sys
