<template>
  <div class="roleContainer">
    <!-- 导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体显示区域 -->
    <el-card class="box-card">
      <!-- 添加按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddRoleFrom">新增角色</el-button>
        </el-col>
      </el-row>
      <!-- 数据展示表格 -->
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="expand"></el-table-column>
        <el-table-column prop="roleId" label="权限编号"></el-table-column>
        <el-table-column prop="roleName" label="权限名称">
          <template slot-scope="{row}">
            <el-input v-if="row.edit" v-model="row.roleName" size="mini" style="width:130px;"></el-input>
            <span v-if="!row.edit">{{row.roleName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="scope.row.edit=!scope.row.edit"
              v-if="!scope.row.edit"
            >编辑</el-button>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-check"
              v-if="scope.row.edit"
              @click="updateRole(scope.row)"
            >保存</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteRole(scope.row.roleId)"
            >删除</el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showGrantMenuTree(scope.row)"
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
      @close="closeTreeMenuDialog"
    >
      <!-- 树形菜单 -->
      <el-tree
        :data="menuData"
        show-checkbox
        node-key="value"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
        :props="treeProps"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="grantMenuTreeVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantMenu">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色表单 -->
    <el-dialog title="提示" :visible.sync="addRoledialogVisible" width="30%">
      <el-form
        ref="addRoleFormRef"
        :model="addRoleForm"
        label-width="80px"
        :rules="addRoleFormRules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoledialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, grantMenuToRoleId, getResourceIdsByRoleId, addRole, updateRoleById, deleteUserById } from '@/assets/js/api/role.js'
import { getMenuSelect } from '@/assets/js/api/menu.js'
export default {
  data() {
    return {
      tableData: [],
      grantMenuTreeVisible: false,
      menuData: [],
      defKeys: [],
      treeProps: {
        label: 'label',
        children: 'children'
      },
      roleId: 0,
      addRoledialogVisible: false,
      addRoleForm: {
        roleName: ''
      },
      addRoleFormRules: {
        roleName: [{ required: true, message: '请填写角色名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 单行编辑
    edit(index, row) {
      this.$set(this.showEdit, row, true)
    },
    getRoleList() {
      getRoleList().then((res) => {
        if (res.status === 200) {
          let data = res.data
          data.forEach(row => {
            this.$set(row, 'edit', false)
          })
          this.tableData = data
        }
      })
    },
    showGrantMenuTree(roleInfo) {
      this.roleId = roleInfo.roleId
      // 加载 menu tree
      getMenuSelect().then((res) => {
        this.menuData = res.data
      })
      // 加载已经选中的菜单树
      getResourceIdsByRoleId(roleInfo.roleId).then((res) => {
        this.defKeys = res.data
      })
      this.grantMenuTreeVisible = true
    },
    closeTreeMenuDialog() {
      this.defKeys = []
    },
    grantMenu() {
      this.grantMenuTreeVisible = false
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys()
      ]
      grantMenuToRoleId(this.roleId, keys).then(res => {
        if (res.status === 200) {
          this.$message.success('授权成功')
          this.grantMenuTreeVisible = false
        } else {
          this.$message.error('授权失败')
        }
      })
    },
    // 添加按钮点击事件
    showAddRoleFrom() {
      // 展示弹出框
      this.addRoledialogVisible = true
    },
    // 添加角色事件
    saveRole() {
      addRole(this.addRoleForm).then(res => {
        if (res.status === 200) {
          this.$message.success('添加角色成功')
          this.addRoledialogVisible = false
          // 刷新页面
          this.getRoleList()
        } else {
          this.$message.error('添加角色失败')
        }
      })
    },
    // 修改角色
    updateRole(role) {
      updateRoleById(role).then(res => {
        if (res.status === 200) {
          this.$message.success('修改角色成功')
          // 刷新页面
          this.getRoleList()
        } else {
          this.$message.error('修改角色失败')
        }
      })
    },
    // 删除角色
    deleteRole(roleId) {
      deleteUserById(roleId).then(res => {
        if (res.status === 200) {
          this.$message.success('删除角色成功')
          // 刷新页面
          this.getRoleList()
        } else {
          this.$message.error('删除角色失败')
        }
      })
    }
  }
}
</script>

<style>
</style>
