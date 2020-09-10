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
  },
  checkLoginNameUnique (login_name, id = null) {
    return request({
      url: BASE_URL + '/checkLoginNameUnique',
      method: 'get',
      params: {
        login_name, id
      }
    })
  },
  save (data) {
    data = commonJs.obj.copyByKey(data, [
      'id',
      'login_name',
      'name',
      'qywx_user',
      'pwd',
      'change_pwd',
      'role_ids'
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
