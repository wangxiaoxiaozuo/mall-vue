import request from '@/assets/js/request/service'

export const loginApi = (username, password) => {
  return request({
    url: '/login',
    method: 'post',
    data: {
      'username': username,
      'password': password
    }
  })
}
