const useThemeStore = defineStore('theme', {
  state: () => {
    return {
      theme: false
    }
  },
  actions: {
    toggleTheme() {
      if (this.theme) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
})

export default useThemeStore
