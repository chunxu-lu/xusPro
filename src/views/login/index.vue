<template>
  <div class="page-container">
    <div class="switch">
      <el-switch v-model="useThemeStore().theme" />
    </div>
    <div class="login-wrap">
      <el-form ref="ruleFormRef" :model="ruleForm" size="large">
        <Motion :delay="100">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" :prefix-icon="User" clearable />
          </el-form-item>
        </Motion>

        <Motion :delay="150">
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" :prefix-icon="Lock" clearable show-password />
          </el-form-item>
        </Motion>
      </el-form>
      <el-button class="login-btn" type="primary" @click="login"> 登录 </el-button>
      <Vcode :show="isShow" @success="onSuccess" @close="onClose" successText="哈哈"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useThemeStore } from '@/pinia/index'
  import { doLogin, getUserInfo } from '@/api/login'
  import router from '@/router'
  import { User, Lock } from '@element-plus/icons-vue'
  import { debounce, _ } from 'lodash'
  import Vcode from 'vue3-puzzle-vcode'

  console.log(_.uniq([1, 1, 2, 3]))

  const isShow = ref(true)

  function onSuccess(){

  }

  function onClose(){

  }

  const ruleForm = reactive({
    username: 'user',
    password: 'password'
  })
  watch(
    () => useThemeStore().theme,
    () => {
      useThemeStore().toggleTheme()
    }
  )

  async function login() {
    const res = await doLogin(ruleForm)
    sessionStorage.setItem('token', res.jwtToken)
    await getUserInfo()
    router.push('/home')
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

    .switch {
      position: absolute;
      top: 50px;
      right: 80px;
    }
  }

  .login-wrap {
    width: 300px;

    .login-btn {
      width: 100%;
    }
  }
</style>