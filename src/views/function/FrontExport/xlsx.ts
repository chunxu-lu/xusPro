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
  // const ws = X_STYLE.utils.json_to_sheet([], { cellStyles: true });
  const { headerValue, headerMerge, bodyValue, deep } = new MergeCell(
    mergedCells,
    tableData.map((item, index) => {
      return { ...item, index: String(index + 1) }
    })
  )

  // 指定每一列的宽度
  let wscols = [
    // 序号
    { wch: 8 },
    // 用户id
    { wch: 8 },
    // 用户名
    { wch: 12 },
    // 昵称
    { wch: 12 },
    // 姓名
    { wch: 12 },
    // 年龄
    { wch: 12 },
    // 手机号
    { wch: 16 },
    // 邮箱
    { wch: 16 },
    // 身份证号
    { wch: 22 },
    // 注册时间
    { wch: 30 }
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
        v: '注：表格数据为虚拟数据',
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
