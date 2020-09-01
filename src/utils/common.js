export default {
  obj: {
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
