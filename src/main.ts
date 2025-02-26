import { createApp } from 'vue'
import App from './App.vue'
import pinia from './pinia' // 状态管理器
import router from './router'
import 'element-plus/dist/index.css'

createApp(App).use(pinia).use(router).mount('#app')
