import request from '@/assets/js/request/service'

export const getRoleList = () => {
  return request({
    url: '/sysRole/list',
    method: 'get'
  })
}

// 获取该权限ID对应的所有菜单ID roleResource
export const getResourceIdsByRoleId = roleId => {
  return request({
    url: `/roleResource/${roleId}/resources`,
    method: 'get'
  })
}

// 权限绑定菜单 ==> 授权
export const grantMenuToRoleId = (roleId, menuIds) => {
  return request({
    url: `/roleResource/${roleId}`,
    method: 'post',
    data: menuIds
  })
}

// 添加角色
export const addRole = role => {
  return request({
    url: '/sysRole',
    method: 'post',
    data: role
  })
}

// 修改角色
export const updateRoleById = role => {
  return request({
    url: `/sysRole/${role.roleId}`,
    method: 'put',
    data: role
  })
}
// 删除角色
export const deleteUserById = roleId => {
  return request({
    url: `/sysRole/${roleId}`,
    method: 'delete'
  })
}
