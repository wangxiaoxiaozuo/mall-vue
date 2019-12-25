<template>
  <el-container :style="{height:divHeight}" style="border: 1px solid #eee">
    <Menu></Menu>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  data () {
    return {

    }
  },
  components: {
    Menu
  },
  computed: {
    divHeight: () => {
      return document.documentElement.clientHeight + 'px'
    }
  }
}
</script>

<style>
.el-header {
  color: black;
  line-height: 60px;
  box-shadow: 1px 1px 3px #a1a0a0;
}

.el-aside {
  color: #333;
}
</style>
