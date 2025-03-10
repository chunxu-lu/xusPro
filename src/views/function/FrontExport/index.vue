<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <el-button type="primary" @click="exportExcel" style="margin-top: 10px">前端导出excel</el-button>
</template>

<script lang="ts" setup>
import { utilXlsxExportFile } from './xlsx'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

const mergedCells = [
  {
    name: '_______区家庭医生管费用不合理医疗行为线索上报汇总表',
    children: [
      {
        name: '',
        children: [
          {
            prop: 'xh',
            name: '序号',
            children: [
              {
                name: '范例'
              }
            ]
          }
        ]
      },
      {
        name: '',
        children: [
          {
            name: '区代码',
            prop: 'qdm',
            children: [
              {
                name: ''
              }
            ]
          }
        ]
      },
      {
        name: '',
        children: [
          {
            name: '区名称',
            prop: 'qmc',
            children: [
              {
                name: ''
              }
            ]
          }
        ]
      },
      {
        name: '',
        children: [
          {
            name: '社区代码（22位）',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          }
        ]
      },
      {
        name: '报送家庭医生',
        children: [
          {
            name: '所在社区名称（第一名称）',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '姓名',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '身份证号',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          }
        ]
      },
      {
        name: '',
        children: [
          {
            name: '报送时间',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          }
        ]
      },
      {
        name: '居民信息',
        children: [
          {
            name: '签约居民',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '医保卡号',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '身份证号',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '签约一级机构',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '签约二级机构',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '签约三级机构',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          }
        ]
      },
      {
        name: '家庭医生反馈信息',
        children: [
          {
            name: '存在问题（客观数据）',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '报送原因（判断分析）',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '异常线索类型',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          }
        ]
      },
      {
        name: '诊疗明细',
        children: [
          {
            name: '序',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '就诊时间',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '就诊机构',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '就诊科室',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '诊断',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '就诊号',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '合计（元）',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '药费（元）',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          },
          {
            name: '其他费用（元）',
            prop: 'baseValue0',
            children: [
              {
                name: ''
              }
            ]
          }
        ]
      }
    ]
  }
]

function exportExcel() {
  utilXlsxExportFile([], '前端导出excel', '前端导出excel', mergedCells)
}
</script>

<style lang="less" scoped></style>
