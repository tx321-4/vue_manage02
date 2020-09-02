
import baseUrl from '../../src/api/sys/baseUrl'

const BASE_URL = baseUrl + '/config'

const List = [
  {
    key: 'version',
    remarks: 'PC端网页版本号',
    value: '20190219001'
  },
  {
    key: 'system_title',
    remarks: '系统标题，包括网页的标题，及登录页上面的名称',
    value: 'IT部门信息管理系统'
  },
  {
    key: 'm_version',
    value: '20190201001',
    remarks: '手机端版本号'
  },
  {
    key: 'login',
    value: 'on',
    remarks: '系统能否登录，开启是on，关闭是off，登录关闭后只能用超级用户登录'
  },
  {
    key: 'company_name',
    value: '企业集团',
    remarks: '公司名称，显示在底部'
  }
]

export default [
  {
    url: baseUrl + '/config_no_auth/getValues',
    type: 'get',
    response: config => {
      return {
        code: 0,
        custom: null,
        data: { company_name: '企业集团', login: 'on', system_title: 'IT部门信息管理系统', version: '20190219001' },
        company_name: '企业集团',
        login: 'on',
        system_title: 'IT部门信息管理系统',
        version: '20190219001',
        message: '',
        msg: null,
        success: true,
        total: null
      }
    }
  },
  {
    url: baseUrl + '/config_no_auth/getValue',
    type: 'get',
    response: config => {
      return {
        code: 0,
        custom: null,
        data: '20190219001',
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
      const { key } = config.query
      console.log(config)
      const mockList = List.filter(item => {
        if (key && item.key.indexOf(key) < 0) return false
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
    url: BASE_URL + '/save',
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
