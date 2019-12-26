import request from '@/assets/js/request/service'

export const getUserList = (query) => {
  return request({
    url: '/sysUser/page',
    method: 'get',
    params: query
  })
}

export const addUser = (userInfo) => {
  return request({
    url: '/sysUser',
    method: 'post',
    data: userInfo
  })
}

export const changeUserState = (userId, userState) => {
  return request({
    url: `/sysUser/${userId}/${userState}`,
    method: 'put'
  })
}

export const deleteUserById = (userId) => {
  return request({
    url: `/sysUser/${userId}`,
    method: 'delete'
  })
}

export const updateUserById = (userInfo) => {
  return request({
    url: `/sysUser/${userInfo.userId}`,
    method: 'put',
    data: userInfo
  })
}
