import request from '@/utils/request'
import baseUrl from './baseUrl'
// import commonJs from '@/utils/common'
// import qs from 'qs'

// const BASE_URL = baseUrl + '/config'

export default {
  getValues (keys) {
    return request({
      url: baseUrl + '/config_no_auth/getValues',
      method: 'get',
      params: {
        keys
      }
    })
  }
}
