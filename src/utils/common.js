import Vue from 'vue'
export default {
  textareaToHtml (text) {
    text = text || ''
    if (text) {
      text = text.replace(/\r\n/g, '<br>')
      text = text.replace(/\n/g, '<br>')
      // 替换所的空格（中文空格、英文空格都会被替换）
      text = text.replace(/\s/g, '&nbsp;')
    }
    return text
  },
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
  },
  toTreeData (data) {
    const rootList = []
    data.forEach((item, index) => {
      if (item.parent_id == null) {
        rootList.push(item)
      }
    })
    function convertTree (treeData) {
      treeData.forEach(d => {
        data.forEach((item, index) => {
          if (item.parent_id && item.parent_id == d.id) {
            if (!d.children) d.children = []
            d.children.push(item)
          }
        })
        if (d.children) convertTree(d.children)
      })
    }
    convertTree(rootList)
    return rootList
  }
}
