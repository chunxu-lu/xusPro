import { useStorage } from '@vueuse/core'

export const useRouterStore = defineStore('router', () => {
  // 布局大小
  const activeIndex = useStorage('activeIndex', '1')

  // 切换设备
  function setActiveIndex(val: string) {
    activeIndex.value = val
  }

  return {
    activeIndex,
    setActiveIndex
  }
})

export default useRouterStore
