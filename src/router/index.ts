import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    // 使用layout布局（头部，侧边导航，tag导航标签）的内页都放这里
    path: '/layout',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/function',
        name: 'function',
        children: [
          {
            path: '/function/upload',
            name: 'Upload',
            component: () => import('@/views/function/upload/index.vue')
          },
          {
            path: '/function/front-export',
            name: 'FrontExport',
            component: () => import('@/views/function/FrontExport/index.vue')
          },
        ]
      },
    ]
  },
  {
    // 非内页，不需要layout布局的放外面，如登录，大屏等
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
