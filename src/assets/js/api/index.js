import request from '@/assets/js/request/service'

export const loginApi = userInfo => {
  return request({
    url: '/login',
    method: 'post',
    data: userInfo,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function(data) {
        let ret = '' // 注释方法是不使用插件
        // ret = Qs.stringify(data);
        for (let it in data) {
          // ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
          ret += it + '=' + data[it] + '&'
        }
        return ret
      }
    ]
  })
}
