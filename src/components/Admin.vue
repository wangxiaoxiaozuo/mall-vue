<template>
  <el-container class="admin-container">
    <el-header>
      <div>
        <img src="../assets/image/shopLogo.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <!-- <el-button type="info" @click="logout">退出</el-button> -->
      <el-row>
        <el-col>
          <div class="picture">
            <img src="../assets/image/me.jpg" />
          </div>
        </el-col>
        <el-col>
          <el-tooltip
            class="item"
            effect="dark"
            content="退出登录"
            placement="bottom"
          >
            <i
              class="el-icon-switch-button"
              style="margin-left: 7px;font-size:30px; color:#eee;cursor: pointer;"
              @click="logout"
            ></i>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <el-menu
          background-color="#fff"
          text-color="black"
          active-text-color="#409eff"
          router
          unique-opened
          :default-active="navPath"
        >
          <el-submenu
            :index="menu.menuId + ''"
            v-for="menu in menuList"
            :key="menu.menuId"
          >
            <template slot="title">
              <i :class="menu.icon"></i>
              <span>{{ menu.label }}</span>
            </template>
            <el-menu-item
              :index="subMenu.path"
              v-for="subMenu in menu.children"
              :key="subMenu.menuId"
              @click="saveNavPath(subMenu.path)"
            >
              <template slot="title">
                <i :class="subMenu.icon"></i>
                <span>{{ subMenu.label }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import { getOwnMenuByUserId } from '@/assets/js/api/menu.js'

export default {
  data() {
    return {
      menuList: null,
      navPath: '',
      menuRouterList: []
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/user/login')
    },
    saveNavPath(navPath) {
      window.sessionStorage.setItem('navPath', navPath)
    }
  },
  created() {
    // 获取当前激活的菜单
    this.navPath = window.sessionStorage.getItem('navPath')
    const userId = window.sessionStorage.getItem('userId')
    // 获取当前用户的动态菜单
    getOwnMenuByUserId(userId).then(res => {
      if (res.status === 200) {
        this.menuList = res.data
      } else {
        this.$message.error('获取菜单失败')
      }
    })
  },
  computed: {
    ...mapState(['userId'])
  }
}
</script>

<style lang="less" scoped>
.admin-container {
  height: 100%;
}
.el-header {
  background-color: #409eff;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  img {
    width: 70px;
    height: 50px;
  }
  span {
    color: white;
    font-weight: 900;
    margin-left: 10px;
    font-size: 20px;
  }
  > div {
    display: flex;
    align-items: center;
  }
}
.el-menu {
  border-right: none;
}
.el-aside {
  box-shadow: 1px 0px 3px #888888;
}
.picture {
  border: 3px solid #eee;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
</style>
