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
            path: '/function/water-fall',
            name: 'WaterFall',
            component: () => import('@/views/function/WaterFall/index.vue')
          },
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
          {
            path: '/function/drag',
            name: 'Drag',
            component: () => import('@/views/function/Drag/index.vue')
          },
          {
            path: '/function/chat',
            name: 'Chat',
            component: () => import('@/views/function/Chat/index.vue')
          },
          {
            path: '/function/permission',
            name: 'Permission',
            component: () => import('@/views/function/permission/index.vue')
          },
          {
            path: '/function/basic-form',
            name: 'BasicForm',
            component: () => import('@/views/function/BasicForm/index.vue')
          }
        ]
      }
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
