import * as XLSX from 'xlsx'
import MergeCell from './mergecell'
import X_STYLE from 'xlsx-js-style'

type Recordable = Record<string, any>
/**
 * 导出 excel 文件 人口基数管理
 *
 * @param tableData 数据
 * @param sheetName 第一张表名
 * @param fileName 文件名
 * @param columns 表头
 */
export function utilXlsxExportFile(tableData: Recordable[], sheetName: string, fileName: string, mergedCells: any[]) {
  const list = [
    {
      xh: '范例'
    },
    {
      xh: 1,
      qdm: 123,
      qmc: '去名称1'
    },
    {
      xh: 2,
      qdm: 321,
      qmc: '去名称2'
    }
  ]

  // const ws = X_STYLE.utils.json_to_sheet([], { cellStyles: true });
  const { headerValue, headerMerge, bodyValue, deep } = new MergeCell(mergedCells, list)
  // 指定每一列的宽度
  let wscols = [
    // 序号
    { wch: 8 },
    // 区代码
    { wch: 12 },
    // 区名称
    { wch: 12 },
    // 社区代码（22位）
    { wch: 20 },
    // 所在社区名称（第一名称）
    { wch: 30 },
    // 姓名
    { wch: 8 },
    // 身份证号
    { wch: 16 },
    // 报送时间
    { wch: 16 },
    // 签约居民
    { wch: 16 },
    // 医保卡号
    { wch: 16 },
    // 身份证号
    { wch: 16 },
    // 签约一级机构
    { wch: 24 },
    // 签约二级机构
    { wch: 24 },
    // 签约三级机构
    { wch: 24 },
    // 存在问题（客观数据）
    { wch: 30 },
    // 报送原因（判断分析）
    { wch: 30 },
    // 异常线索类型
    { wch: 24 },
    // 序
    { wch: 4 },
    // 就诊时间
    { wch: 16 },
    // 就诊机构
    { wch: 20 },
    // 就诊科室
    { wch: 16 },
    // 诊断
    { wch: 8 },
    // 就诊号
    { wch: 12 },
    // 合计（元）
    { wch: 12 },
    // 药费（元）
    { wch: 12 },
    // 其他费用（元）
    { wch: 20 }
  ]

  // 指定每一行的高度
  let wsrows = [
    // 第一行
    { hpx: 40 }
  ]

  // 使用 forEach 遍历二维数组并修改每个元素
  headerValue.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      headerValue[rowIndex][colIndex] = {
        v: cell || '',
        t: 's',
        s: {
          font: {
            name: '宋体',
            bold: true,
            color: { rgb: '000' }
          },
          alignment: { vertical: 'center', horizontal: 'center' },
          border: {
            top: {
              style: 'thin',
              color: {
                auto: 1
              }
            },
            left: {
              style: 'thin',
              color: {
                auto: 1
              }
            },
            right: {
              style: 'thin',
              color: {
                auto: 1
              }
            },
            bottom: {
              style: 'thin',
              color: {
                auto: 1
              }
            }
          }
        }
      }
    })
  })

  // 使用 forEach 遍历二维数组并修改每个元素
  bodyValue.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      bodyValue[rowIndex][colIndex] = {
        v: cell || '',
        t: 's',
        s: {
          font: {
            name: '宋体',
            bold: false,
            color: { rgb: '000' }
          },
          alignment: { vertical: 'center', horizontal: 'center' },
          border: {
            top: {
              style: 'thin',
              color: {
                auto: 1
              }
            },
            left: {
              style: 'thin',
              color: {
                auto: 1
              }
            },
            right: {
              style: 'thin',
              color: {
                auto: 1
              }
            },
            bottom: {
              style: 'thin',
              color: {
                auto: 1
              }
            }
          }
        }
      }
    })
  })

  // STEP 1: Create a new workbook
  const wb = X_STYLE.utils.book_new()

  // STEP 3: Create worksheet with rows; Add worksheet to workbook
  const ws = X_STYLE.utils.aoa_to_sheet([
    ...headerValue,
    ...bodyValue,
    [
      {
        v: '注：1.本次数据报送统计时段为：2023年1月1日-12月31日。',
        t: 's',
        s: { font: { name: '宋体', sz: 11 } }
      }
    ],
    [
      {
        v: '    2.表中所在社区名称请使用社区卫生服务中心第一名称，第一名称及其他信息严格按照表中示例形式填写内容。',
        t: 's',
        s: { font: { name: '宋体', sz: 11 } }
      }
    ],
    [
      {
        v: '    3.请确保家庭医生和参保人信息唯一且身份证号和医保卡号全部展示，若出现身份证号与姓名无法一一匹配的情况，会影响最终核对结果。',
        t: 's',
        s: { font: { name: '宋体', sz: 11 } }
      }
    ],
    [
      {
        v: '    4.表中所有项目均为必填项。其中，“报送原因（判断分析）”请尽量详细描述；“异常线索类型”从下拉列表中选择类型。',
        t: 's',
        s: { font: { name: '宋体', sz: 11 } }
      }
    ],
    [
      {
        v: '    5.每条数据间不要有空行，不要有合并单元格情况，否则影响最终核对。',
        t: 's',
        s: { font: { name: '宋体', sz: 11 } }
      }
    ],
    [
      {
        v: '    6.请严格按照表格格式报送，每个区信息汇总到一个sheet中。',
        t: 's',
        s: { font: { name: '宋体', sz: 11 } }
      }
    ],
    [
      {
        v: '报送单位：                                    报送人：                               联系方式：',
        t: 's',
        s: { font: { name: '宋体', sz: 11 } }
      }
    ]
  ])
  ws['!merges'] = headerMerge
  ws['!cols'] = wscols
  ws['!rows'] = wsrows
  X_STYLE.utils.book_append_sheet(wb, ws, 'readme demo')

  // STEP 4: Write Excel file to browser
  X_STYLE.writeFile(wb, `${fileName}.xlsx`)
}
