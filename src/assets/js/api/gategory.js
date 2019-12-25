import request from '@/assets/js/request/service'

export const getCategoryList = (pid) => {
  return request({
    url: `/mall_admin/category/${pid}`,
    method: 'get'
  })
}
