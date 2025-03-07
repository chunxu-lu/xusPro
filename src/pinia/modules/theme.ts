import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  // 使用 ref 定义 theme 状态
  const theme = useStorage('theme', false)

  // 监听 theme 的变化，动态切换 dark 类
  watchEffect(() => {
    if (theme.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  // 切换 theme 的方法
  const toggleTheme = () => {
    theme.value = !theme.value
  }

  return {
    theme,
    toggleTheme
  }
})

export default useThemeStore
