type Recordable = Record<string, any>

export default class MergeCell {
  #map: Map<Recordable[], [number, number]> = new Map()
  #size: number[] = []

  public headerMerge: Recordable[] = []
  public headerValue: string[][] = []
  public bodyMapList: string[] = []
  public deep: number = 0
  public bodyValue: string[][] = []

  constructor(headers: Recordable[], data: Recordable[]) {
    this.init(headers, data)
  }

  /** 数据初始化 */
  init(headers: Recordable[], data: Recordable[]) {
    this.#size = this.getCellsSize(headers)!
    this.getBodyMapList(headers)
    this.mergeHeadersCell(headers, 0, 0)
    this.getHeadersValue(headers, 0, 0, this.getCellsSize(headers) || [])

    this.bodyValue = data.map((item: Recordable) => this.bodyMapList.map(key => item[key]))
    this.deep = this.getDeep(headers)
  }

  /** 获取表头最大深度 */
  getDeep(headers: Recordable[]) {
    return this.#map.get(headers)![0]
  }

  /** 根据节点获取深度广度 */
  getCellsSize(list: Recordable[]) {
    if (this.#map.has(list)) {
      return this.#map.get(list)
    }
    if (list?.length) {
      let rows = -1
      let cols = list.length - 1
      list.forEach(item => {
        if (item.children) {
          const size = this.getCellsSize(item.children)
          rows = Math.max(size![0], rows)
          cols += size![1]
        }
      })

      this.#map.set(list, [rows + 1, cols])
      return [rows + 1, cols]
    }
  }

  /** 合并表头 */
  mergeHeadersCell = (headers: Recordable[], row: number, col: number) => {
    for (let i = 0, len = headers.length; i < len; i++) {
      const cell = headers[i]
      if (!cell.children?.length) {
        if (row !== this.#size[0]) {
          this.headerMerge.push({
            s: { r: row, c: col + i },
            e: { r: this.#size[0], c: col + i }
          })
        }
      } else {
        const size = this.#map.get(cell.children)
        if (!size) return
        this.headerMerge.push({
          s: { r: row, c: col + i },
          e: { r: row, c: col + size[1] + i }
        })
        this.mergeHeadersCell(cell.children, row + 1, col + i)
        col += size[1]
      }
    }
  }

  /** 表头赋值 */
  getHeadersValue(headers: Recordable[] | null, row: number, col: number, size: number[]) {
    if (!this.headerValue[row]) {
      if (row > size[0]) return
      this.headerValue[row] = new Array(col).fill('')
    }
    if (!headers?.length) {
      this.headerValue[row].push('')
      row < size[0] && this.getHeadersValue(null, row + 1, col, size)
      return
    }
    for (let i = 0, len = headers.length; i < len; i++) {
      const cell = headers[i]
      this.headerValue[row].push(cell.name)
      if (cell.children?.length) {
        const len = this.getCellsSize(cell.children)![1]
        const emptyNameList = new Array(len).fill('')
        this.headerValue[row].push(...emptyNameList)
      }
      this.getHeadersValue(cell.children, row + 1, col + i, size)
    }
  }

  /** 正文prop对应 */
  getBodyMapList(list: Recordable[]) {
    if (list?.length) {
      list.forEach(item => {
        if (item.key) {
          this.bodyMapList.push(item.key)
        } else {
          this.getBodyMapList(item.children)
        }
      })
    }
  }
}
