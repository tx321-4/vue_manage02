import Vue from 'vue'

Vue.filter('formatDate', function (value, format) {
  if (!value) return ''
  format = format || 'YYYY-MM-DD HH:mm'
  return Vue.prototype.$moment(value).format(format)
})
