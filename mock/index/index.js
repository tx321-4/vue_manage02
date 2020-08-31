import baseUrl from '../../src/api/baseUrl'

import Mock from 'mockjs'

const BASE_URL = baseUrl + '/index'

const List = [] // 更新记录
const List2 = [] // 登录日志
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    create_user_id: -1,
    create_time: '@datetime',
    create_user_name: '超级用户',
    input_status: 0,
    'title|1': ['优化IT中心首页', '增加系统设置功能', '增加IT中心功能'],
    'content|1': ['增加IT资产领用交还后对领用或交还人进行邮件的提醒功能。', '增加了IT中心首页的近期领用、资产维修、库存预警、近期合同、即将到期合同的提示。', '增加IT中心的库存预警功能'],
    type: null,
    update_date: '@date',
    update_time: '@datetime',
    update_user_id: -1,
    attach_ids: null
  }))
}

for (let i = 0; i < count; i++) {
  List2.push(Mock.mock({
    id: '@increment',
    user_id: -1,
    'ip|1': ['180.167.210.251', '39.180.26.55', '61.49.68.74', '120.200.177.216'],
    login_time: '@datetime'
  }))
}

export default [
  {
    url: BASE_URL + '/getUpdateRecordList',
    type: 'get',
    response: config => {
      const { keyword, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (keyword && item.title.indexOf(keyword) < 0) return false
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
    url: BASE_URL + '/modifyPwd',
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
  },
  {
    url: BASE_URL + '/getLoginLogList',
    type: 'get',
    response: config => {
      const { ip, page = 1, limit = 20 } = config.query

      const mockList2 = List2.filter(item => {
        if (ip && item.ip.indexOf(ip) < 0) return false
        return true
      })

      const pageList2 = mockList2.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 0,
        custom: null,
        data: {
          list: pageList2,
          total: mockList2.length
        },
        message: '',
        msg: null,
        success: true,
        total: null
      }
    }
  }
]
