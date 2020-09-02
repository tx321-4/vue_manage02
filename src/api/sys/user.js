import request from '@/utils/request'
import baseUrl from './baseUrl'
import commonJs from '@/utils/common'

const BASE_URL = baseUrl + '/user'

export default {
  getList (params) {
    params = commonJs.obj.removeNullKey(params)
    return request({
      url: BASE_URL + '/getList',
      method: 'get',
      params
    })
  },
  getDownloadList (params) {
    params = commonJs.obj.removeNullKey(params)
    return request({
      url: BASE_URL + '/getDownloadList',
      method: 'get',
      params
    })
  }
}
