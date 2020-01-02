<template>
  <div>
    <!-- 导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
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
            <el-button slot="append" icon="el-icon-search" @click="loadMenuList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showMenuForm">添加菜单</el-button>
        </el-col>
      </el-row>

      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="5" class="v-center">
                <el-tag closable type="primary">{{scope.row.label}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  :class="['btbottom',index===0?'bttop':'','v-center']"
                  v-for="(item,index) in scope.row.children"
                  :key="item.value"
                >
                  <el-col :span="5">
                    <el-tag closable type="warning">{{item.label}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      closable
                      type="success"
                      v-for="itemSub in item.children"
                      :key="itemSub.value"
                    >{{itemSub.label}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="label" label="菜单名称"></el-table-column>
        <el-table-column prop="path" label="菜单URL"></el-table-column>
        <el-table-column prop="component" label="菜单组件"></el-table-column>
        <el-table-column prop="icon" label="图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="菜单类型">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.type==='0'">目录</el-tag>
            <el-tag type="info" v-else-if="scope.row.type==='1'">菜单</el-tag>
            <el-tag type="warning" v-else>按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template>
            <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="添加菜单"
      :visible.sync="menuFormDialogVisible"
      width="35%"
      :before-close="handleClose"
    >
      <!-- 添加菜单表单 -->
      <el-form label-width="100px" :model="menuForm" ref="menuFormRef">
        <el-form-item label="菜单名称" prop="label">
          <el-input v-model="menuForm.label"></el-input>
        </el-form-item>
        <el-form-item label="菜单URL" prop="path">
          <el-input v-model="menuForm.path"></el-input>
        </el-form-item>
        <el-form-item label="组件名称" prop="component">
          <el-input v-model="menuForm.component"></el-input>
        </el-form-item>
        <el-form-item label="父菜单ID" prop="parentId">
          <!-- <el-input v-model="menuForm.parentId"></el-input> -->
          <el-cascader
            :options="options"
            :show-all-levels="true"
            ref="cascader"
            @change="handleItemChange"
            :props="{ checkStrictly: true,value:'value' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="menuForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="排序值" prop="sort">
          <el-slider v-model="menuForm.sort" show-input :max="50" input-size="mini"></el-slider>
        </el-form-item>
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="menuForm.type" size="mini">
            <el-radio-button label="0">目录</el-radio-button>
            <el-radio-button label="1">菜单</el-radio-button>
            <el-radio-button label="2">按钮</el-radio-button>
          </el-radio-group>
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
import { addMenu, getMenuSelect, getMenuList } from '@/assets/js/api/menu.js'
export default {
  data() {
    return {
      tableData: [],
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
      getMenuList().then((res) => {
        if (res.status === 200) {
          this.tableData = res.data
        }
      })
    },
    submitmenuForm() {
      addMenu(this.menuForm).then((res) => {
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
      getMenuSelect().then((res) => {
        this.options = res.data
      })
    },
    // 监听级联选择框事件改变事件
    handleItemChange() {
      this.menuForm.parentId = this.$refs['cascader'].getCheckedNodes()[0].value
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
</style>
