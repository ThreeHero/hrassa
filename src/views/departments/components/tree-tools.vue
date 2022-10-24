<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <!-- 右侧内容 -->
      <el-row type="flex" justify="end">
        <el-col>
          {{ treeNode.manager }}
        </el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="operateDepts">
            <!-- 显示内容 -->
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 插槽 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'

export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 操作节点调用的方法
    operateDepts(type) {
      if (type === 'add') {
        // 添加子部门的操作
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        //  编辑部门的操作
        this.$emit('editDepts', this.treeNode)
      } else {
        //  删除操作
        this.$confirm('确定要删除该部门吗').then(() => {
          // 如果点击了确定就会进入then
          return delDepartments(this.treeNode.id)
        }).then(() => {
          //  如果删除成功了  就会进入这里
          this.$emit('delDepts')
          this.$message.success('删除成功')
        })
      }
    }
  }
}
</script>

<style>

</style>
