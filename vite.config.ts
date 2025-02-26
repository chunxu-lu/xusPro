import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueSetupExtend(),
    AutoImport({
      // 配置选项
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts',
      // element需要通过resolvers引用
      resolvers: [ElementPlusResolver()],
      // 会自动生成eslint规则，防止eslint报错，后续selint配置的时候会讲到
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      // 配置选项
      dirs: ['src/components'], // 指定组件目录
      dts: 'src/components.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
  server: {
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://192.168.1.29:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^/api`), ""),
        secure: false // 如果是 HTTPS 目标，则设为 true
      }
    }
  }
})
