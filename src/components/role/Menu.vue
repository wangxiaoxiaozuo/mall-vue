<template>
  <div>
    <!-- 导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <!-- 搜索与添加按钮区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="param.condition"
            :clearable="true"
            @clear="loadMenuList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="loadMenuList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showMenuForm">添加菜单</el-button>
        </el-col>
      </el-row>
      <!-- table tree -->
      <zk-table
        :data="tableData"
        :columns="columns"
        border
        stripe
        tree-type
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        index-text="#"
      >
        <template slot="icon" slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
        <template slot="path" slot-scope="scope">
          <el-tag type="success" v-if="scope.row.path === ''">目录</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.path }}</el-tag>
        </template>

        <template slot="opera" slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteMenu(scope.row.menuId)"
            size="mini"
          ></el-button>
        </template>
      </zk-table>
    </el-card>

    <el-dialog
      title="添加菜单"
      :visible.sync="menuFormDialogVisible"
      width="35%"
      @close="handleClose"
    >
      <!-- 添加菜单表单 -->
      <el-form label-width="100px" :model="menuForm" ref="menuFormRef">
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="menuForm.type" size="mini">
            <el-radio-button label="0">目录</el-radio-button>
            <el-radio-button label="1">菜单</el-radio-button>
            <el-radio-button label="2">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="父菜单ID"
          prop="parentId"
          v-if="menuForm.type != 0"
        >
          <el-select v-model="menuForm.parentId" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.menuId"
              :label="item.label"
              :value="item.menuId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="按钮名称"
          prop="label"
          v-if="menuForm.type === '2'"
        >
          <el-input v-model="menuForm.label"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" prop="label" v-else>
          <el-input v-model="menuForm.label"></el-input>
        </el-form-item>

        <el-form-item label="菜单URL" prop="path" v-if="menuForm.type != 0">
          <el-input v-model="menuForm.path"></el-input>
        </el-form-item>

        <el-form-item
          label="组件名称"
          prop="component"
          v-if="menuForm.type === '1'"
        >
          <el-input v-model="menuForm.component"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon" v-if="menuForm.type != 2">
          <icon-picker v-model="menuForm.icon"></icon-picker>
        </el-form-item>
        <el-form-item label="排序值" prop="sort" v-if="menuForm.type != 2">
          <el-slider
            v-model="menuForm.sort"
            show-input
            :max="50"
            input-size="mini"
          ></el-slider>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="menuFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitmenuForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addMenu,
  getMenuList,
  getRootMenuList,
  deleteMenuById
} from '@/assets/js/api/menu.js'
export default {
  data() {
    return {
      tableData: [],
      columns: [
        {
          label: '菜单名称',
          prop: 'label'
        },
        {
          label: '菜单图标',
          prop: 'icon',
          type: 'template',
          template: 'icon'
        },
        {
          label: '菜单路径或组件',
          prop: 'path',
          type: 'template',
          template: 'path'
        },
        {
          label: '操作',
          prop: 'opera',
          type: 'template',
          template: 'opera'
        }
      ],
      param: {
        condition: ''
      },
      menuForm: {
        label: '',
        path: '',
        component: '',
        parentId: '',
        icon: '',
        sort: 1,
        type: '0'
      },
      menuFormDialogVisible: false,
      options: []
    }
  },
  created() {
    this.loadMenuList()
  },
  methods: {
    loadMenuList() {
      getMenuList().then(res => {
        if (res.status === 200) {
          this.tableData = res.data
        }
      })
    },
    submitmenuForm() {
      addMenu(this.menuForm).then(res => {
        if (res.status === 200) {
          this.$message.success('添加菜单成功')
          this.loadMenuList()
          this.menuFormDialogVisible = false
        } else {
          this.$message.error('添加菜单失败')
        }
      })
    }, // 监听添加表单关闭事件
    handleClose() {
      this.menuFormDialogVisible = false
      this.$refs.menuFormRef.resetFields()
    },
    showMenuForm() {
      this.menuFormDialogVisible = true
      getRootMenuList().then(res => {
        this.options = res.data
      })
    },
    deleteMenu(menuId) {
      deleteMenuById(menuId).then(res => {
        if (res.status === 200) {
          this.$message.success('删除菜单成功')
          this.loadMenuList()
        } else {
          this.$message.error('删除菜单失败')
        }
      })
    }
  }
}
</script>

<style>
.bttop {
  border-top: 1px solid #eee;
}
.btbottom {
  border-bottom: 1px solid #eee;
}
.el-tag {
  margin: 7px;
}
.v-center {
  display: flex;
  align-items: center;
}
.zk-table {
  margin-top: 15px;
}
</style>
