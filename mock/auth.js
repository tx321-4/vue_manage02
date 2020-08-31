
import baseUrl from '../src/api/baseUrl'

export default [
  {
    url: baseUrl + '/login/validate',
    type: 'post',
    response: config => {
      return {
        code: 0,
        custom: '',
        data: '',
        message: '',
        msg: '',
        success: true,
        total: '',
        token: 'k71929rlsehnjso20jphgm7fs7'
      }
    }
  },
  {
    url: baseUrl + '/user/getUserInfo',
    type: 'get',
    response: config => {
      return {
        code: 0,
        custom: null,
        data: {
          menuList: [
            // { id: 39, title: 'IT中心', path: 'it', parent_id: null },
            // { id: 150, title: 'IT资产', path: 'asset', parent_id: 39 },
            // { id: 151, title: '资产管理', path: 'edit', parent_id: 150 },
            // { id: 153, title: '时段统计', path: 'time', parent_id: 152 },
            // { id: 161, title: '部门管理', path: 'dep', parent_id: 160 },
            { id: 169, title: '用户管理', path: 'user', parent_id: 168 },
            // { id: 181, title: 'IT资产查询', path: 'asset', parent_id: 158 },
            // { id: 183, title: '合同录入', path: 'edit', parent_id: 164 },
            // { id: 186, title: '合同查询', path: 'contract', parent_id: 185 },
            // { id: 189, title: '合同统计', path: 'contract', parent_id: 188 },
            // { id: 154, title: '资产领用', path: 'use', parent_id: 150 },
            // { id: 160, title: '人力资源', path: 'hr', parent_id: null },
            // { id: 162, title: '员工管理', path: 'employee', parent_id: 160 },
            { id: 170, title: '角色管理', path: 'role', parent_id: 168 },
            // { id: 182, title: '领用交还明细', path: 'useReturn', parent_id: 158 },
            // { id: 184, title: '合同付款', path: 'pay', parent_id: 164 },
            // { id: 187, title: '合同付款明细', path: 'pay', parent_id: 185 },
            // { id: 190, title: '合同付款统计', path: 'pay', parent_id: 188 },
            // { id: 155, title: '资产交还', path: 'return', parent_id: 150 },
            // { id: 159, title: '领用状态列表', path: 'useStatus', parent_id: 158 },
            // { id: 164, title: '合同管理', path: 'contract', parent_id: 39 },
            { id: 168, title: '系统设置', path: 'sys', parent_id: null },
            { id: 171, title: '菜单管理', path: 'menu', parent_id: 168 },
            // { id: 185, title: '查询', path: 'query', parent_id: 164 },
            // { id: 156, title: '资产维修', path: 'repair', parent_id: 150 },
            // { id: 165, title: '账号管理', path: 'account', parent_id: 39 },
            // { id: 172, title: '公司管理', path: 'company', parent_id: 168 },
            // { id: 188, title: '统计', path: 'statistic', parent_id: 164 },
            // { id: 157, title: '资产报废', path: 'scrap', parent_id: 150 },
            // { id: 166, title: '网络结构', path: 'network', parent_id: 39 },
            // { id: 158, title: '资产查询', path: 'query', parent_id: 150 },
            // { id: 167, title: '供应合作商', path: 'supplier', parent_id: 39 },
            { id: 173, title: '系统参数', path: 'config', parent_id: 168 },
            // { id: 152, title: '资产统计', path: 'statistic', parent_id: 150 },
            // { id: 191, title: '邮件通知设置', path: 'mail', parent_id: 168 },
            // { id: 163, title: '资产类型管理', path: 'type', parent_id: 150 },
            { id: 174, title: '系统更新记录', path: 'updateRecord', parent_id: 168 }
            // { id: 175, title: '库存预警', path: 'stockWarning', parent_id: 150 }
          ],
          userid: -1,
          username: '超级管理员'
        },
        message: '',
        msg: null,
        success: true,
        total: null
      }
    }
  }
]
