import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/moment.js'
import './plugins/common.js'
import 'normalize.css'// A modern alternative to CSS resets
import './styles/custom.scss'
import './components'
import './filter'
Vue.config.productionTip = false

const { mockXHR } = require('../mock')
mockXHR()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
