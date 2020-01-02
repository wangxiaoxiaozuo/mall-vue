import request from '@/assets/js/request/service'

export const getMenuListByPage = (query) => {
  return request({
    url: '/sysResource/page',
    method: 'get',
    params: query
  })
}

export const getRootMenuList = () => {
  return request({
    url: '/sysResource/root',
    method: 'get'
  })
}

export const addMenu = (menu) => {
  return request({
    url: '/sysResource',
    method: 'post',
    data: menu
  })
}

export const deleteMenuById = (menuId) => {
  return request({
    url: `/sysResource/${menuId}`,
    method: 'delete'
  })
}

export const updateMenuById = (menu) => {
  return request({
    url: `/sysResource/${menu.menuId}`,
    method: 'put',
    data: menu
  })
}

export const getMenuSelect = () => {
  return request({
    url: '/sysResource/menu',
    method: 'get'
  })
}

export const getMenuList = () => {
  return request({
    url: '/sysResource/menuList',
    method: 'get'
  })
}
