import request from '@/assets/js/request/service'

export const getRoleList = () => {
  return request({
    url: '/sysRole/list',
    method: 'get'
  })
}

// export const addUser = (userInfo) => {
//   return request({
//     url: '/sysUser',
//     method: 'post',
//     data: userInfo
//   })
// }

// export const changeUserState = (userId, userState) => {
//   return request({
//     url: `/sysUser/${userId}/${userState}`,
//     method: 'put'
//   })
// }

// export const deleteUserById = (userId) => {
//   return request({
//     url: `/sysUser/${userId}`,
//     method: 'delete'
//   })
// }

// export const updateUserById = (userInfo) => {
//   return request({
//     url: `/sysUser/${userInfo.userId}`,
//     method: 'put',
//     data: userInfo
//   })
// }
