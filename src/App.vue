<script setup lang="ts"></script>

<template>
  <div class="app-container">
    <div class="content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
@import './style/reset.scss';
@import './style/dark.scss';

.app-container {
  box-sizing: border-box;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.content-container {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}
</style>
