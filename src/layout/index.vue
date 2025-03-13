<template>
  <div class="common-layout">
    <el-container>
      <div v-if="isMobile" class="mobile-drawer">
        <el-drawer size="200px" v-model="drawer" direction="ltr" :show-close="false">
          <template #header>
            <div style="display: flex; align-items: center">
              <img src="./vite.svg" alt="logo" />
              <div>vite&spring</div>
            </div>
          </template>
          <el-menu @select="selectMenu" :default-active="useRouterStore().activeIndex" class="menus" :collapse="false">
            <template v-for="item in menuItems" :key="item.index">
              <menu-item :item="item" />
            </template>
          </el-menu>
        </el-drawer>
      </div>
      <el-aside v-else :class="isCollapse ? 'collapse-side' : 'expand-side'">
        <el-menu
          @select="selectMenu"
          :default-active="useRouterStore().activeIndex"
          class="menus"
          :collapse="isCollapse"
        >
          <template v-for="item in menuItems" :key="item.index">
            <menu-item :item="item" />
          </template> </el-menu
      ></el-aside>
      <el-container>
        <el-header class="header">
          <div class="header-left">
            <div class="header-icon" @click="collapseClick">
              <el-icon v-if="isCollapse"><Expand /></el-icon>
              <el-icon v-else><Fold /></el-icon>
            </div>
            <div class="system-name">
              <img src="./vite.svg" alt="logo" />
              <div>vite&spring</div>
            </div>
          </div>
          <div class="header-right">
            <el-switch v-model="useThemeStore().theme" class="switch" />
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
        <el-main
          :class="[
            useThemeStore().theme ? 'main-section-dark' : 'main-section-light',
            isMobile ? 'main-section-mobile' : 'main-section'
          ]"
        >
          <el-scrollbar height="100%">
            <router-view></router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MenuItem from '@/components/menu/MenuItem.vue' // 引入递归组件
import { User, CaretBottom, House, Tools } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import { useThemeStore } from '@/pinia/modules/theme'
import { useRouterStore } from '@/pinia/modules/router'
import { useAppStoreHook } from '@/pinia/modules/app'

const router = useRouter()

const drawer = ref(false)

const isMobile = computed(() => useWindowSize().width.value < 768)

const isCollapse = ref(false)

// 监听窗口宽度变化，调整设备类型和侧边栏状态
watchEffect(() => {
  if (isMobile.value) {
    isCollapse.value = true
    useAppStoreHook().toggleDevice('mobile')
  } else {
    isCollapse.value = false
    useAppStoreHook().toggleDevice('desktop')
  }
})

function selectMenu(index: string) {
  useRouterStore().activeIndex = index
}

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
        index: '3',
        title: '瀑布流',
        groupTitle: true,
        path: '/function/water-fall'
      },
      {
        index: '4',
        title: '上传图片',
        groupTitle: true,
        path: '/function/upload'
      },
      {
        index: '5',
        title: '前端导出表格',
        groupTitle: true,
        path: '/function/front-export'
      }
    ]
  }
]

function collapseClick() {
  if (!isMobile.value) {
    isCollapse.value = !isCollapse.value
  } else {
    drawer.value = !drawer.value
  }
}

const handleLogout = () => {
  sessionStorage.removeItem('token')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.common-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.main-section {
  width: calc(100vw - 230px);
  height: calc(100vh - 100px);
  overflow: hidden;
  border-radius: 8px;
  margin: 20px;
}
.main-section-mobile {
  width: calc(100vw - 20px);
  height: calc(100vh - 80px);
  overflow: hidden;
  border-radius: 8px;
  margin: 10px;
}
.main-section-light {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.main-section-dark {
  box-shadow:
    0 12px 24px rgba(0, 123, 255, 0.5),
    0 0 20px rgba(0, 123, 255, 0.3);
}
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
    .header-icon {
      cursor: pointer;
      margin-right: 20px;
      font-size: 2em;
    }
    .system-name {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
      color: var(--el-text-color-primary);
    }
  }

  .header-right {
    display: flex;
    align-items: center;

    .switch {
      margin-right: 10px;
    }

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

.mobile-drawer {
  .el-menu {
    border-right: none;
  }
}

.menus:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}

.expand-side {
  width: 200px;
}
.collapse-side {
  width: 70px;
}
.mobile-drawer {
  :deep(.el-drawer__body) {
    padding: 0;
  }
}
</style>
