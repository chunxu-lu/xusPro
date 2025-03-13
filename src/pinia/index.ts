import { createPinia } from 'pinia'
import useThemeStore from './modules/theme'
import useRouterStore from './modules/router'

const pinia = createPinia()

export { useThemeStore, useRouterStore }
export default pinia
