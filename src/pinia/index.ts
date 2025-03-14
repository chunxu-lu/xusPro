import { createPinia } from 'pinia'
import useThemeStore from './modules/theme'
import useRouterStore from './modules/router'
import useUserStore from './modules/user'
import useAppStore from './modules/app'

const pinia = createPinia()

export { useThemeStore, useRouterStore, useUserStore, useAppStore }
export default pinia
