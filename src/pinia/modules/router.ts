import pinia from '@/pinia'
import { useStorage } from '@vueuse/core'

export const useRouterStore = defineStore('app', () => {
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

export function useRouterStoreHook() {
  return useRouterStore(pinia)
}
