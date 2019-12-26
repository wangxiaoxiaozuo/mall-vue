<template>
  <el-container class="admin-container">
    <el-header>
      <div>
        <img src="../assets/image/shopLogo.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
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
          <el-submenu :index="menu.menuId+''" v-for="menu in menuList" :key="menu.menuId">
            <template slot="title">
              <i :class="menu.icon"></i>
              <span>{{menu.name}}</span>
            </template>
            <el-menu-item
              :index="subMenu.path"
              v-for="subMenu in menu.children"
              :key="subMenu.menuId"
              @click="saveNavPath(subMenu.path)"
            >
              <template slot="title">
                <i :class="subMenu.icon"></i>
                <span>{{subMenu.name}}</span>
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
// import Menu from '@/components/Menu'
import { menu } from '@/assets/js/mock/mock'

export default {
  data () {
    return {
      menuList: menu,
      navPath: ''
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('login')
    },
    saveNavPath (navPath) {
      window.sessionStorage.setItem('navPath', navPath)
    }
  },
  created () {
    // 获取当前激活的菜单
    this.navPath = window.sessionStorage.getItem('navPath')
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
</style>
