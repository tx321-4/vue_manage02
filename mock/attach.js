import baseUrl from '../src/api/baseUrl'

const BASE_URL = baseUrl + '/attach'

export default [
  {
    url: BASE_URL + '/uploadImg',
    type: 'post',
    response: config => {
      return {
        code: 0,
        custom: null,
        data: {
          ext: 'png',
          id: '2',
          name: 'logo-min.png',
          save_name: 'sys_update_record/20200904/c516a5c24e5451d94e05c404e6b6d33d.png',
          size: 1068,
          table_id: '71',
          table_name: 'sys_update_record',
          upload_time: '2020-09-04 09:49:46',
          upload_user: -1
        },
        message: '',
        msg: null,
        success: true,
        total: null
      }
    }
  },
  {
    url: BASE_URL + '/getList',
    type: 'get',
    response: config => {
      return {
        code: 0,
        custom: null,
        data: {

        },
        message: '',
        msg: null,
        success: true,
        total: null
      }
    }
  }
]
