<template>
  <div class="login_container">
    <div class="login_form">
      <!-- 头像区域 -->
      <div class="login_header">
        <img src="../assets/image/me.jpg" />
      </div>
      <!-- 表单区域 -->
      <el-form
        label-width="0px"
        class="login_form_t"
        :model="form"
        :rules="loginRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-denglu" v-model="form.username"></el-input>
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-mima" v-model="form.password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login" class="login_btn">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="footer">
        <div class="other">
          <el-divider>其他登录</el-divider>
        </div>
        <el-row>
          <el-col :span="8" style="text-align:right">
            <button>
              <i class="fa fa-weixin" aria-hidden="true"></i>
            </button>
          </el-col>
          <el-col :span="8" style="text-align:center">
            <button>
              <i class="fa fa-qq" aria-hidden="true"></i>
            </button>
          </el-col>
          <el-col :span="8" style="text-align:left">
            <button>
              <i class="fa fa-weibo" aria-hidden="true"></i>
            </button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    restLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // 表单预验证
      this.$refs.loginFormRef.validate((validated) => {
        if (validated) {
          // 调用登录请求
          const loginResult = true
          if (loginResult) {
            // this.$message.success('登录成功')
            // 登录成功以后token 保存到sessionStorage中
            sessionStorage.setItem('token', '909090')
            this.$router.push('admin')
            // 跳转到主页
          } else {
            this.$message.error('登录失败')
          }
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
@keyframes animate-cloud {
  from {
    background-position: 600px 100%;
  }
  to {
    background-position: 0 100%;
  }
}

.login_container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: url('http://www.17sucai.com/preview/242158/2015-01-10/%E7%99%BB%E5%BD%95/images/cloud.jpg')
    0 bottom repeat-x #049ec4;
  animation: animate-cloud 20s linear infinite;
}
@keyframes login_form_tran {
  0% {
    top: -50%;
  }
  100% {
    top: 50%;
  }
}
.login_form {
  width: 400px;
  height: 450px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  // top: 50%;
  // left: 50%;
  margin: 10% auto;
  // transform: translate(-50%, -50%);
  box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);
  .el-input-group__append {
    border: none;
  }
  animation: bounceInDown 1s;
  .login_header {
    height: 130px;
    width: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form_t {
  position: absolute;
  top: 20%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
// .btns {
//   display: flex;
//   justify-content: flex-end;
// }
.login_btn {
  width: 80%;
  text-align: center;
  font-size: 17px;
  margin-left: 10%;
}
.footer {
  width: 100%;
  position: absolute;
  bottom: 20%;
  left: 0px;
  .other {
    width: 70%;
    margin: 30px auto;
  }
  button {
    font-size: 32px;
    color: #848383;
    border: none;
    cursor: pointer;
  }
  button:hover {
    color: red;
  }
}
@-webkit-keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>
