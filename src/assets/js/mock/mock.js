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
    icon: 'fa fa-tree',
    children: [
      {
        menuId: 6,
        name: '统计',
        path: '/item/statistics',
        icon: 'fa fa-pie-chart'
      }
    ]
  },
  {
    menuId: 2,
    name: '商品管理',
    path: '/item/item2',
    icon: 'fa fa-sort-amount-asc',
    children: [
      {
        menuId: 7,
        name: '分类管理',
        path: '/item/categor',
        icon: 'fa fa-sort-amount-asc'
      },
      {
        menuId: 8,
        name: '品牌管理',
        path: '',
        icon: 'fa fa-gg-circle'
      },
      {
        menuId: 9,
        name: '商品列表',
        path: '',
        icon: 'fa fa-bars'
      },
      {
        menuId: 10,
        name: '规格参数',
        path: '',
        icon: 'fa fa-thermometer-half'
      }
    ]
  },
  {
    menuId: 3,
    name: '用户管理',
    path: '/user',
    icon: 'fa fa-users',
    children: [
      {
        menuId: 11,
        name: '后台用户管理',
        path: '/user/backstageUser',
        icon: 'fa fa-user-secret'
      },
      {
        menuId: 12,
        name: 'Vip用户管理',
        path: '/item/statistics',
        icon: 'fa fa-user'
      }
    ]
  },
  {
    menuId: 4,
    name: '销售管理',
    path: '/item/item3',
    icon: 'fa fa-jpy',
    children: [
      {
        menuId: 13,
        name: '订单管理',
        path: '/item/statistics',
        icon: 'fa fa-pie-chart'
      }
    ]
  },
  {
    menuId: 5,
    name: '权限管理',
    path: '',
    icon: 'fa fa-rub',
    children: [
      {
        menuId: 14,
        name: '角色管理',
        path: '/user/roles',
        icon: 'fa fa-pie-chart'
      },
      {
        menuId: 15,
        name: '菜单管理',
        path: '/user/menu',
        icon: 'fa fa-pie-chart'
      }
    ]
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
