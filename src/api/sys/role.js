import request from '@/utils/request'
import baseUrl from './baseUrl'
import commonJs from '@/utils/common'
// import qs from 'qs'

const BASE_URL = baseUrl + '/role'

export default {
  getList (params) {
    params = commonJs.obj.removeNullKey(params)
    return request({
      url: BASE_URL + '/getList',
      method: 'get',
      params
    })
  },
  save (data) {
    data = commonJs.obj.copyByKey(data, [
      'id',

      'name',
      'remarks',
      'menu_ids'
    ])
    return request({
      url: BASE_URL + '/save',
      method: 'post',
      data
    })
  },
  del (id) {
    return request({
      url: BASE_URL + '/del',
      method: 'post',
      data: {
        id
      }
    })
  }
}
