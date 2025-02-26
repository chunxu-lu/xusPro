<template>
  <div class="weather-container">
    <div class="cloud cloud1"></div>
    <div class="cloud cloud2"></div>
    <div class="weather-info animate-in"></div>
  </div>
</template>

<script lang="ts" setup>
const title = import.meta.env.VITE_APP_TITLE
</script>

<style lang="scss" scoped>
.weather-container {
  padding: 20px;
}

.weather-info {
  margin-bottom: 20px;
}
</style>
