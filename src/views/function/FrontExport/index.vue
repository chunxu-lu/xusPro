<template>
  <el-table :data="tableData" stripe border style="min-width: 100%" :row-style="rowStyle">
    <el-table-column align="center" label="网站用户信息表">
      <el-table-column>
        <el-table-column align="center" type="index" label="序号" width="80" />
      </el-table-column>
      <el-table-column>
        <el-table-column align="center" prop="id" label="用户id" width="180" />
      </el-table-column>
      <el-table-column>
        <el-table-column align="center" prop="userName" label="用户名" width="180" />
      </el-table-column>
      <el-table-column>
        <el-table-column align="center" prop="nickName" label="昵称" width="180" />
      </el-table-column>
      <el-table-column align="center" label="个人信息">
        <el-table-column align="center" prop="name" label="姓名" width="180" />
        <el-table-column align="center" prop="age" label="年龄" width="180" />
        <el-table-column align="center" prop="mobile" label="手机号" width="180" />
        <el-table-column align="center" prop="email" label="邮箱" width="180" />
        <el-table-column align="center" prop="cardNumber" label="身份证号" width="180" />
      </el-table-column>
      <el-table-column>
        <el-table-column align="center" prop="registrationTime" label="注册时间" width="300" />
      </el-table-column>
    </el-table-column>
  </el-table>
  <el-button type="primary" @click="exportExcel" style="margin-top: 10px">前端导出表格</el-button>
</template>

<script lang="ts" setup>
import { utilXlsxExportFile } from './xlsx'
import { getUserList } from '@/api/user'

const tableData = ref([])

onMounted(async () => {
  const res = await getUserList()
  tableData.value = res.data
})

function rowStyle() {
  return { height: '50px' } // 设置行高为50px
}

const mergedCells = [
  {
    name: '网站用户信息表',
    children: [
      {
        name: '',
        children: [
          {
            key: 'index',
            name: '序号'
          }
        ]
      },
      {
        name: '',
        children: [
          {
            name: '用户id',
            key: 'id'
          }
        ]
      },
      {
        name: '',
        children: [
          {
            name: '用户名',
            key: 'userName'
          }
        ]
      },
      {
        name: '',
        children: [
          {
            name: '昵称',
            key: 'nickName'
          }
        ]
      },
      {
        name: '个人信息',
        children: [
          {
            name: '姓名',
            key: 'name'
          },
          {
            name: '年龄',
            key: 'age'
          },
          {
            name: '手机号',
            key: 'mobile'
          },
          {
            name: '邮箱',
            key: 'email'
          },
          {
            name: '身份证号',
            key: 'cardNumber'
          }
        ]
      },
      {
        name: '',
        children: [
          {
            name: '注册时间',
            key: 'registrationTime'
          }
        ]
      }
    ]
  }
]

function exportExcel() {
  utilXlsxExportFile(tableData.value, '网站用户信息表', '网站用户信息表', mergedCells)
}
</script>

<style lang="less" scoped></style>
