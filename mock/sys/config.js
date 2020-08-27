
import baseUrl from '../../src/api/sys/baseUrl'

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
  }

]
