<template>
  <div class="common-layout">
    <el-container>
      <div v-if="isMobile" class="mobile-drawer">
        <el-drawer size="200px" v-model="drawer" direction="ltr" :show-close="false">
          <template #header>
            <div style="display: flex; align-items: center">
              <img src="./logo.svg" alt="logo" style="width: 26px; height: 26px; margin-right: 2px" />
              <div style="white-space: nowrap">比特跳跃</div>
            </div>
          </template>
          <el-menu
            :default-openeds="['2']"
            @select="selectMenu"
            :default-active="useRouterStore().activeIndex"
            class="menus"
            :collapse="false"
          >
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
          :default-openeds="['2']"
        >
          <div style="display: flex; align-items: center; height: 50px">
            <img src="./logo.svg" alt="logo" style="width: 26px; height: 26px; margin-left: 20px; margin-right: 2px" />
            <div style="white-space: nowrap" v-if="!isCollapse">比特跳跃</div>
          </div>
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
            <!-- <div class="system-name">
              <img src="./logo.svg" alt="logo" />
              <div>比特跳跃</div>
            </div> -->
          </div>
          <div class="header-right">
            <el-switch v-model="useThemeStore().theme" class="switch" />
            <el-dropdown>
              <span class="user-dropdown">
                <el-icon class="user-icon"><User /></el-icon>
                {{ useUserStore().userInfo?.username }}
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
          <el-scrollbar>
            <router-view></router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MenuItem from '@/components/menu/MenuItem.vue' // 引入递归组件
import { User, CaretBottom, House, Setting } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import { useThemeStore } from '@/pinia/modules/theme'
import { useRouterStore } from '@/pinia/modules/router'
import { useAppStore } from '@/pinia/modules/app'
import { useUserStore } from '@/pinia/modules/user'
import { logout } from '@/api/login'

const router = useRouter()

const drawer = ref(false)

const isMobile = computed(() => useWindowSize().width.value < 768)

const isCollapse = ref(false)

// 监听窗口宽度变化，调整设备类型和侧边栏状态
watchEffect(() => {
  if (isMobile.value) {
    isCollapse.value = true
    // useAppStore().toggleDevice('mobile')
    useAppStore().device = 'mobile'
  } else {
    isCollapse.value = false
    // useAppStore().toggleDevice('desktop')
    useAppStore().device = 'desktop'
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
    icon: Setting,
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
      },
      {
        index: '6',
        title: '拖拽',
        groupTitle: true,
        path: '/function/drag'
      },
      {
        index: '7',
        title: '聊天室',
        groupTitle: true,
        path: '/function/chat'
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

const handleLogout = async () => {
  await logout()
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user2token')
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
  border: 1px solid #414243;
  // box-shadow:
  //   0 12px 24px rgba(0, 123, 255, 0.5),
  //   0 0 20px rgba(0, 123, 255, 0.3);
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
      outline: none;

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
  height: calc(100% - 50px);
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
