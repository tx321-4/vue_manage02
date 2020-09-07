import Vue from 'vue'
export default {
  // 格式化日期格式
  formatDate (value, format = 'YYYY-MM-DD HH:mm') {
    if (!value) return ''
    return Vue.prototype.$moment(value).format(format)
  },
  obj: {
    copyByKey (object, keys) {
      const newObject = {}
      for (const key of keys) {
        newObject[key] = object[key]
      }
      return newObject
    },
    // 根据传入的对象，返回一个没有空值的新对象
    removeNullKey (obj) {
      const newObj = {}
      for (const key of Object.keys(obj)) {
        if (obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) {
          newObj[key] = obj[key]
        }
      }
      return newObj
    }
  }
}
