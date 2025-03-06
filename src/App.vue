<script setup lang="ts">
</script>

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
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.background-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.content-container {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
