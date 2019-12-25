<template>
  <div class="container demo-1">
    <div class="content">
      <div id="large-header" class="large-header">
        <div class="logo_box">
          <h3>后台管理--欢迎你</h3>
          <form action="#" name="f" method="post">
            <div class="input_outer">
              <span class="u_user"></span>
              <input
                name="logname"
                class="text"
                style="color: #FFFFFF !important"
                type="text"
                placeholder="请输入账户"
                v-model="param.username"
              />
            </div>
            <div class="input_outer">
              <span class="us_uer"></span>
              <input
                name="logpass"
                class="text"
                style="color: #FFFFFF !important; position:absolute; z-index:100;"
                value
                type="password"
                placeholder="请输入密码"
                v-model="param.password"
              />
            </div>
            <div class="mb2">
              <a class="act-but submit" href="javascript:;" style="color: #FFFFFF" @click="login">登录</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/assets/js/api/index'
export default {
  data: function () {
    return {
      param: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      if (this.param.username === '' || this.param.password === '') {
        const h = this.$createElement
        this.$notify({
          title: '友情提示',
          message: h('b', { style: 'color: red' }, '用户名密码不能为空')
        })
      } else {
        // 发送登录请求
        loginApi(this.param.username, this.param.password).then(res => {
          console.log(res)
          if (res.data.code === 1) {
            // 登录成功后跳转到 后台管理首页
            this.$router.push('admin')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.container,
.content {
  height: 100%;
}
body {
  background: #fff;
  color: #383a3c;
  font-weight: 400;
  font-size: 1em;
  line-height: 1.25;
  font-family: 'Raleway', Calibri, Arial, sans-serif;
}
/* Header */
.large-header {
  position: relative;
  width: 100%;
  height: 100%;
  background: #333;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  z-index: 1;
}

.demo-1 .large-header {
  background-image: url('../../src/assets/image/demo-1-bg.jpg');
}
.logo_box {
  width: 400px;
  height: 500px;
  padding: 35px;
  color: #eee;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -250px;
}
.logo_box h3 {
  text-align: center;
  height: 20px;
  font: 20px 'microsoft yahei', Helvetica, Tahoma, Arial, 'Microsoft jhengHei',
    sans-serif;
  color: #ffffff;
  height: 20px;
  line-height: 20px;
  padding: 0 0 35px 0;
}
.forms {
  width: 280px;
  height: 485px;
}
.logon_inof {
  width: 100%;
  min-height: 450px;
  padding-top: 35px;
  position: relative;
}
.input_outer {
  height: 46px;
  padding: 0 5px;
  margin-bottom: 30px;
  border-radius: 50px;
  position: relative;
  border: rgba(255, 255, 255, 0.2) 2px solid !important;
}
.u_user {
  width: 25px;
  height: 25px;
  /* background: url(../img/login_ico.png); */
  background-position: -125px 0;
  position: absolute;
  margin: 10px 13px;
}
.us_uer {
  width: 25px;
  height: 25px;
  /* background-image: url(../img/login_ico.png); */
  background-position: -125px -34px;
  position: absolute;
  margin: 10px 13px;
}
.l-login {
  position: absolute;
  z-index: 1;
  left: 50px;
  top: 0;
  height: 46px;
  font: 14px 'microsoft yahei', Helvetica, Tahoma, Arial, 'Microsoft jhengHei';
  line-height: 46px;
}
.text {
  width: 220px;
  height: 46px;
  outline: none;
  display: inline-block;
  font: 14px 'microsoft yahei', Helvetica, Tahoma, Arial, 'Microsoft jhengHei';
  margin-left: 50px;
  border: none;
  background: none;
  line-height: 46px;
}
/*///*/
.mb2 {
  margin-bottom: 20px;
}
.mb2 a {
  text-decoration: none;
  outline: none;
}
.submit {
  padding: 15px;
  margin-top: 20px;
  display: block;
}
.act-but {
  line-height: 20px;
  text-align: center;
  font-size: 20px;
  border-radius: 50px;
  background: #0096e6;
}
</style>
