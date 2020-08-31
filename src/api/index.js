import request from '@/utils/request'
import baseUrl from './baseUrl'

const BASE_URL = baseUrl + '/index'

export default {
  // 获取更新记录列表
  getUpdateRecordList (params) {
    return request({
      url: BASE_URL + '/getUpdateRecordList',
      method: 'get',
      params
    })
  }
}
