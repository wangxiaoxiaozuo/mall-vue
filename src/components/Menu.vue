<template>
  <el-aside width="250px">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu :index="item.menuId" v-for="item in items" :key="item.menuId">
        <template slot="title">
          <i class="el-icon-message"></i>
          {{item.name}}
        </template>
        <el-menu-item v-for="(menu,i) in item.children" :key="i">
          <router-link :to="{path:menu.path}">{{menu.name}}</router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { menu } from '@/assets/js/mock/mock'

export default {
  data () {
    return {
      items: menu
    }
  }
}
</script>

<style>
.el-menu-item a {
  width: 100%;
  text-decoration: none;
  display: block;
  color: white;
}
.el-aside {
  background: rgba(17, 22, 22, 0.932);
  opacity: 0.9;
}
.el-aside li {
  background: rgba(17, 22, 22, 0.932);
}
.el-menu-item:hover {
  background: #d73564;
}
.el-submenu__title {
  color: white;
}
.el-submenu__title:hover {
  background: #d73564;
}
.el-menu {
  border-right: none;
}
</style>
