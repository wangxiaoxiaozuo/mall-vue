// import Mock from 'mockjs'
// // 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
// Mock.setup({
//   timeout: '200 - 400'
// })

// const username = 'wangjian'
// const password = '123456'
// 定义虚假菜单
export const menu = [
  {
    menuId: 1,
    name: '首页',
    path: '/item/item1',
    children: [
      {
        name: '统计',
        path: '/item/statistics'
      }
    ]
  },
  {
    menuId: 2,
    name: '商品管理',
    path: '/item/item2',
    children: [
      {
        name: '分类管理',
        path: '/item/categor'
      },
      {
        name: '品牌管理',
        path: ''
      },
      {
        name: '商品列表',
        path: ''
      },
      {
        name: '规格参数',
        path: ''
      }
    ]
  },
  {
    menuId: 3,
    name: '会员管理',
    path: '/item/item3'
  },
  {
    menuId: 4,
    name: '销售管理',
    path: '/item/item3'
  },
  {
    menuId: 5,
    name: '权限管理',
    path: '/item/item3'
  }
]
// function loginFun (params) {
//   const paramsObj = JSON.parse(params.body)
//   if (paramsObj.username === username && paramsObj.password === password) {
//     return { code: 1, text: '登录成功' }
//   } else {
//     return { code: 2, text: '验证码有误，登录失败' }
//   }
// }
// 模拟登录请求
// Mock.mock('/login', 'post', loginFun)
