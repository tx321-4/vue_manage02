import request from '@/utils/request'
import baseUrl from './baseUrl'
import commonJs from '@/utils/common'
// import qs from 'qs'

const BASE_URL = baseUrl + '/update_record'

export default {
  getList (params) {
    params = commonJs.obj.removeNullKey(params)
    return request({
      url: BASE_URL + '/getList',
      method: 'get',
      params
    })
  },
  create () {
    return request({
      url: BASE_URL + '/create',
      method: 'post'
    })
  }
}
