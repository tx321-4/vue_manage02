import Vue from 'vue'
import Vuex from 'vuex'
import sys from './modules/sys'
import user from './modules/user'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    user,
    sys

  },
  getters
})
