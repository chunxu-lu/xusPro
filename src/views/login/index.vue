<template>
  <div class="page-container">
    <div class="switch">
      <el-switch v-model="useThemeStore().theme" />
    </div>
    <Verify
      @success="handleCaptchaSuccess"
      @fail="handleCaptchaFail"
      mode="pop"
      :captchaType="'blockPuzzle'"
      :imgSize="{ width: '330px', height: '155px' }"
      ref="verify"
    />

    <div class="login-wrap" :class="{ 'dark-theme': useThemeStore().theme }">
      <div style="display: flex; align-items: center; height: 100px">
        <img src="./logo.svg" alt="logo" style="width: 36px; height: 36px" />
        <h2 class="login-title">登 录</h2>
      </div>

      <el-form ref="ruleFormRef" :model="ruleForm" size="large" class="login-form">
        <Motion :delay="100">
          <el-form-item label="用户名" prop="username" label-position="top">
            <el-input v-model="ruleForm.username" :prefix-icon="User" clearable />
          </el-form-item>
        </Motion>

        <Motion :delay="150">
          <el-form-item label="密码" prop="password" label-position="top">
            <el-input v-model="ruleForm.password" :prefix-icon="Lock" clearable show-password />
          </el-form-item>
        </Motion>
      </el-form>
      <el-button class="capatch-btn" type="primary" plain @click="useVerify">点 击 验 证</el-button>
      <el-button class="login-btn" type="primary" @click="login"> 登 录 </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouterStore, useThemeStore } from '@/pinia/index'
import { doLogin, getUserInfo } from '@/api/login'
import router from '@/router'
import { User, Lock } from '@element-plus/icons-vue'
import Verify from '@/components/verifition/Verify.vue'
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import useUserStore from '@/pinia/modules/user'

const verify = ref()

const loginFlag = ref(false)

function useVerify() {
  verify.value.show()
}

const ruleForm = reactive({
  username: 'zhaolei',
  password: 'zhaolei'
})

const handleCaptchaSuccess = () => {
  ElMessage.success('验证码通过')
  loginFlag.value = true
}

const handleCaptchaFail = () => {
  ElMessage.error('验证码失败，请重试')
}

async function login() {
  if (!loginFlag.value) {
    ElMessage.error('请先通过验证')
    return
  }
  const res = await doLogin(ruleForm)
  sessionStorage.setItem('token', res.data.jwtToken)
  const res2 = await getUserInfo()
  useUserStore().userInfo = res2.data
  router.push('/home')
  useRouterStore().activeIndex = '1'
}
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1; /* 确保背景图在其他元素下 */

  .switch {
    position: absolute;
    top: 50px;
    right: 80px;
    z-index: 2; /* 确保切换按钮在背景图上 */
  }
}

.page-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('./bg.svg');
  background-size: cover;
  background-position: center;
  z-index: 0; /* 确保背景图在其他元素下 */
}

.login-wrap {
  width: 400px; /* 调整表单宽度 */
  padding: 20px;
  background-color: var(--form-bg-color);
  border-radius: 8px;
  box-shadow:
    0 12px 24px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(0, 0, 0, 0.2); /* 增加阴影效果 */
  animation: slide-down 0.5s ease-out;
  z-index: 1; /* 确保表单在背景图上 */

  &.dark-theme {
    background-color: var(--form-bg-color-dark);
    box-shadow:
      0 12px 24px rgba(0, 123, 255, 0.5),
      0 0 20px rgba(0, 123, 255, 0.3); /* 蓝色阴影 */
  }

  .login-title {
    margin-left: 10px;
    text-align: center;
    font-size: 18px;
    color: var(--text-color);
  }

  .login-form {
    margin-bottom: 20px;

    .el-form-item__label {
      font-size: 14px;
      color: var(--text-color);
    }
  }

  .capatch-btn,
  .login-btn {
    width: 100%;
    height: 40px;
    margin: 0;
  }

  .capatch-btn {
    margin-bottom: 10px;
  }
}

@media (max-width: 768px) {
  .login-wrap {
    width: 80% !important; /* 调整表单宽度 */
  }

  .switch {
    right: 20px !important; /* 调整切换按钮位置 */
  }
}

@keyframes slide-down {
  0% {
    transform: translateY(-150%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
