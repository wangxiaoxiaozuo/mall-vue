<template>
  <div>
    <!-- 导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>后台用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 数据显示区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加按钮区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="userParam.condition"
            :clearable="true"
            @clear="getUserList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 数据展示区域 -->
      <el-table :data="userList" border style="width: 100%" stripe>
        <el-table-column prop="userName" label="用户姓名" width="180"></el-table-column>
        <el-table-column prop="realName" label="真实姓名" width="180"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.sex==='0'">男</span>
            <span v-else>女</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="mail" label="邮箱"></el-table-column>
        <el-table-column prop="locked" label="是否锁定">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.locked"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-value="1"
              inactive-value="0"
              @change="changeUserState(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditUserForm(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row.userId)"
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="权限设置 暂为开发"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userParam.page"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="userParam.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加用户弹出框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
      <!-- 添加用户表单 -->
      <el-form label-width="100px" :model="addUserForm" :rules="addFormRules" ref="addFormRef">
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="addUserForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="addUserForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input type="password" v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-select v-model="addUserForm.sex" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="mail">
          <el-input v-model="addUserForm.mail"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="addUserForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹出对话框 -->

    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="35%"
      :before-close="editHandleClose"
    >
      <!-- 添加用户表单 -->
      <el-form label-width="100px" :model="editUserForm" :rules="addFormRules" ref="editFormRef">
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="editUserForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="editUserForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input type="password" v-model="editUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-select v-model="editUserForm.sex" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="mail">
          <el-input v-model="editUserForm.mail"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="editUserForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, addUser, changeUserState, deleteUserById, updateUserById } from '@/assets/js/api/backstageUser'
export default {
  data () {
    return {
      userParam: {
        condition: '',
        page: 1,
        size: 5
      },
      userList: [],
      total: 0,
      dialogVisible: false,
      editDialogVisible: false,
      addUserForm: {
        userName: '',
        password: '',
        realName: '',
        sex: '0',
        mail: '',
        phone: ''
      },
      editUserForm: {
        userName: '',
        password: '',
        realName: '',
        sex: '0',
        mail: '',
        phone: '',
        userId: ''
      },
      addFormRules: {
        userName: [{ required: true, message: '请填写用户名称', trigger: 'blur' },
          { min: 3,
            max: 10,
            message: '用户名称在3到10个字符之间',
            trigger: 'blur' }],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { min: 6,
            max: 15,
            message: '用户密码在6到15个字符之间',
            trigger: 'blur' }
        ],
        mail: [{ required: true, message: '请填写邮箱', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写手机号码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取用户列表
    async getUserList () {
      const { data: res } = await getUserList(this.userParam)
      this.userList = res.records
      this.total = res.total
    },
    changeUserState (userInfo) {
      // 锁定用户/解锁用户
      changeUserState(userInfo.userId, userInfo.locked).then((res) => {
        if (res.status === 200) {
          this.$message.success('更新成功')
          this.getUserList()
        } else {
          this.$message.error('更新失败')
        }
      })
    },
    // 监听每页条数变更事件
    handleSizeChange (newSize) {
      this.userParam.size = newSize
      this.getUserList()
    },
    // 监听页数变更事件
    handleCurrentChange (newPage) {
      this.userParam.page = newPage
      this.getUserList()
    },
    // 添加用户
    submitForm () {
      addUser(this.addUserForm).then((res) => {
        // 添加成功关闭对话框
        if (res.status === 200) {
          this.$message.success('添加用户成功')
          this.getUserList()
        } else {
          this.$message.error('添加用户失败')
        }
      })
    },
    // 监听添加表单关闭事件
    handleClose () {
      this.dialogVisible = false
      this.$refs.addFormRef.resetFields()
    },
    // 监听修改表单事件
    editHandleClose () {
      this.editDialogVisible = false
      this.$refs.editFormRef.resetFields()
    },
    // 删除用户
    deleteUser (userId) {
      this.$confirm('确认删除该用户吗？')
        .then(_ => {
          deleteUserById(userId).then((res) => {
            if (res.status === 200) {
              this.$message.success('删除用户成功')
              this.getUserList()
            } else {
              this.$message.error('删除用户失败')
            }
          })
        })
        .catch(_ => {
          this.$message.error('删除用户失败')
        })
    },
    // 更新用户
    showEditUserForm (userInfo) {
      // 显示更新用户对话框
      this.editDialogVisible = true
      // 编辑表单赋值
      this.editUserForm.userName = userInfo.userName
      this.editUserForm.realName = userInfo.realName
      this.editUserForm.password = userInfo.password
      this.editUserForm.sex = userInfo.sex
      this.editUserForm.mail = userInfo.mail
      this.editUserForm.phone = userInfo.phone
      this.editUserForm.userId = userInfo.userId
    },
    submitEditForm () {
      updateUserById(this.editUserForm).then((res) => {
        if (res.status === 200) {
          this.$message.success('更新用户成功')
          this.getUserList()
          this.editDialogVisible = false
        } else {
          this.$message.error('更新用户失败')
        }
      })
    }
  },
  created () {
    // 页面加载时查询用户数据
    this.getUserList()
  }
}
</script>

<style>
</style>
