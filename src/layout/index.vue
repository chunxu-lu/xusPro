<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <el-radio-group v-model="isCollapse">
            <el-radio-button :value="false">expand</el-radio-button>
            <el-radio-button :value="true">collapse</el-radio-button>
          </el-radio-group>
          <div class="system-name">vite&springboot</div>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="user-dropdown">
              <el-icon class="user-icon"><User /></el-icon>
              admin
              <el-icon><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside :class="isCollapse ? 'collapse-side' : 'expand-side'">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
          >
            <template v-for="item in menuItems" :key="item.index">
              <menu-item :item="item" />
            </template> </el-menu
        ></el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MenuItem from '@/components/menu/MenuItem.vue' // 引入递归组件
import { User, CaretBottom, House, Tools } from '@element-plus/icons-vue'
import { useThemeStore } from '@/pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

watch(
  () => useThemeStore().theme,
  () => {
    useThemeStore().toggleTheme()
  }
)

const menuItems = [
  {
    index: '1',
    title: '首页',
    path: '/home',
    icon: House
  },
  {
    index: '2',
    title: '功能组件',
    path: '/function',
    icon: Tools,
    children: [
      {
        title: '上传图片',
        groupTitle: true,
        path: '/function/upload'
      }
    ]
  }
]

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleLogout = () => {
  sessionStorage.removeItem('token')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-light);

  .header-left {
    display: flex;
    align-items: center;
    .system-name {
      font-size: 18px;
      font-weight: bold;
      color: var(--el-text-color-primary);
    }
  }

  .header-right {
    .user-dropdown {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: var(--el-text-color-primary);

      .user-icon {
        margin-right: 8px;
        font-size: 20px;
      }
    }
  }
}

.el-dropdown-menu {
  .el-dropdown-item {
    padding: 8px 20px;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.expand-side {
  width: 200px;
}
.collapse-side {
  width: 100px;
}
@media (max-width: 768px) {
  .expand-side {
    position: absolute;
    z-index: 1;
  }
  .collapse-side {
    width: 0;
  }
}
</style>
