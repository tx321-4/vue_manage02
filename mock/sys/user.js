import baseUrl from '../../src/api/sys/baseUrl'

import Mock from 'mockjs'

const BASE_URL = baseUrl + '/user'

const List = [] // 获取用户列表

const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'login_name|1': ['张三', '李四', 'admin'],
    'name|1': ['访问者', '管理员', 'admin'],
    'qywx_user|1': ['000001', '000002', '000003', '000004', '000005'],
    'company_ids|1': ['*,37', '', '11,22,12'],
    factory_ids: '',
    factory_names: '',
    create_user_id: -1,
    create_time: '@datetime',
    'create_user_name|1': ['张', '李', 'adm'],
    'role_ids|1': ['1', '-1', '2'],
    'role_names|1': ['开发员', '超级用户', '管理员'],
    update_time: '@datetime',
    update_user_id: -1,
    last_login_time: '@datetime'

  }))
}

export default [
  {
    url: BASE_URL + '/getList',
    type: 'get',
    response: config => {
      const { name, qywx_user, login_name, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (login_name && item.login_name.indexOf(login_name) < 0) return false
        if (name && item.name.indexOf(name) < 0) return false
        if (qywx_user && item.qywx_user.indexOf(qywx_user) < 0) return false
        return true
      })

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 0,
        custom: null,
        data: {
          list: pageList,
          total: mockList.length
        },
        message: '',
        msg: null,
        success: true,
        total: null
      }
    }
  },
  {
    url: BASE_URL + '/getDownloadList',
    type: 'get',
    response: config => {
      const { name, qywx_user, login_name } = config.query

      const mockList = List.filter(item => {
        if (login_name && item.login_name.indexOf(login_name) < 0) return false
        if (name && item.name.indexOf(name) < 0) return false
        if (qywx_user && item.qywx_user.indexOf(qywx_user) < 0) return false
        return true
      })

      return {
        code: 0,
        custom: null,
        data: {
          list: mockList,
          total: mockList.length
        },
        message: '',
        msg: null,
        success: true,
        total: null
      }
    }
  },
  {
    url: BASE_URL + '/checkLoginNameUnique',
    type: 'get',
    response: config => {
      return {
        code: 0,
        custom: null,
        data: 0,
        message: '',
        msg: null,
        success: true,
        total: null
      }
    }
  },
  {
    url: BASE_URL + '/save',
    type: 'post',
    response: config => {
      return {
        code: 0,
        custom: null,
        data: { id: '66' },
        message: '',
        msg: null,
        success: true,
        total: null
      }
    }
  },
  {
    url: BASE_URL + '/del',
    type: 'post',
    response: config => {
      return {
        code: 0,
        custom: null,
        data: null,
        message: '',
        msg: null,
        success: true,
        total: null
      }
    }
  }
]
