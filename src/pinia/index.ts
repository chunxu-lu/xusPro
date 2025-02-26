import { createPinia } from 'pinia'
import useThemeStore from "./modules/theme"

const pinia = createPinia()

export { useThemeStore }
export default pinia
