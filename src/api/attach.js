import request from '@/utils/request'
import commonJs from '@/utils/common'
import baseUrl from './baseUrl'

const BASE_URL = baseUrl + '/attach'

export default {
  uploadUrl: BASE_URL + '/upload',
  uploadImgUrl: BASE_URL + '/uploadImg',
  getList (params) {
    params = commonJs.obj.removeNullKey(params)
    return request({
      url: BASE_URL + '/getList',
      method: 'get',
      params
    })
  }

}
