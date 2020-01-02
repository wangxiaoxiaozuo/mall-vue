<template>
  <div class="roleContainer">
    <!-- 导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="expand"></el-table-column>
        <el-table-column prop="roleId" label="权限编号" width="180"></el-table-column>
        <el-table-column prop="roleName" label="权限名称" width="180"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showGrantMenuTree"
            >授权菜单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 授权菜单 -->
    <el-dialog
      title="授权菜单"
      :visible.sync="grantMenuTreeVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 树形菜单 -->
      <el-tree
        :data="menuData"
        :props="menuDataProps"
        show-checkbox
        node-key="value"
        default-expand-all
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="grantMenuTreeVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantMenuTreeVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList } from '@/assets/js/api/role.js'
import { getMenuSelect } from '@/assets/js/api/menu.js'
export default {
  data() {
    return {
      tableData: [],
      grantMenuTreeVisible: false,
      menuData: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    getRoleList() {
      getRoleList().then((res) => {
        if (res.status === 200) {
          this.tableData = res.data
        }
      })
    },
    showGrantMenuTree() {
      this.grantMenuTreeVisible = true
      // 加载 menu tree
      getMenuSelect().then((res) => {
        this.menuData = res.data
      })
    }
  }
}
</script>

<style>
</style>
