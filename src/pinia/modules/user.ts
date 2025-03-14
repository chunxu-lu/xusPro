import pinia from '@/pinia'
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = useStorage('userInfo', {})

  return {
    userInfo
  }
})

export default useUserStore