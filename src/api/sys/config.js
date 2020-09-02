import request from '@/utils/request'
import baseUrl from './baseUrl'
import commonJs from '@/utils/common'
// import qs from 'qs'

const BASE_URL = baseUrl + '/config'

export default {
  getValue (key) {
    return request({
      url: baseUrl + '/config_no_auth/getValue',
      method: 'get',
      params: {
        key
      }
    })
  },
  getValues (keys) {
    return request({
      url: baseUrl + '/config_no_auth/getValues',
      method: 'get',
      params: {
        keys
      }
    })
  },
  // 获取系统参数列表
  getList (params) {
    params = commonJs.obj.removeNullKey(params)
    return request({
      url: BASE_URL + '/getList',
      method: 'get',
      params
    })
  },
  // 保存系统参数列表
  save (data) {
    data = commonJs.obj.copyByKey(data, [
      'id',
      'action',
      'key',
      'value',
      'remarks'
    ])
    return request({
      url: BASE_URL + '/save',
      method: 'post',
      data
    })
  }
}
