import request from '@/utils/request'
import baseUrl from './baseUrl'
import commonJs from '@/utils/common'
// import qs from 'qs'

const BASE_URL = baseUrl + '/menu'

export default {
  getTreeList (params = {}) {
    params = commonJs.obj.removeNullKey(params)
    return request({
      url: BASE_URL + '/getTreeList',
      method: 'get',
      params
    })
  }
}
