import baseUrl from '../../src/api/sys/baseUrl'
import Mock from 'mockjs'
const BASE_URL = baseUrl + '/role'

const List = [] // 系统更新记录

const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id|1': ['1', '-1', '2'],
    create_time: '@datetime',
    create_user_id: -1,
    create_user_name: '超级用户',
    menu_ids: '151',
    'name|1': ['开发员', '超级角色', '访客'],
    'remarks|1': ['开发测试角色', '系统内置的超级角色，拥有全部菜单，禁止修改删除！', '访问'],
    update_time: '@datetime',
    update_user_id: -1
  }))
}

export default [
  {
    url: BASE_URL + '/getList',
    type: 'get',
    response: config => {
      const { name, remarks, page = 1, limit = 20 } = config.query
      console.log(config)
      const mockList = List.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
        if (remarks && item.remarks.indexOf(remarks) < 0) return false
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
    url: BASE_URL + '/save',
    type: 'post',
    response: config => {
      return {
        code: 0,
        custom: null,
        data: { id: '2' },
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
