<template>
  <el-tree
    :data="data"
    node-key="id"
    default-expand-all
    :expand-on-click-node="false"
    :render-content="renderContent"
    :props="{label:'name'}"
    empty-text="没有数据哦"
  ></el-tree>
</template>

<script>
import { getCategoryList } from '@/assets/js/api/gategory'
let id = 100
export default {

  data() {
    return {
      data: []
    }
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={() => this.append(data)}><i class="el-icon-s-promotion"></i></el-button>
            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}><i class="el-icon-delete-solid"></i></el-button>

          </span>
        </span>)
    }
  },
  created() {
    getCategoryList(0).then(res => {
      res.data.forEach(element => {
        Object.assign(element, { 'children': [], 'isLeaf': true })
      })
      this.data = res.data
      console.log(this.data)
    })
  }
}
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
