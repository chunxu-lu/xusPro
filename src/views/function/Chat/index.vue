<template>
  <component :is="useAppStore().device === 'mobile' ? Mobile : Web" />
</template>

<script setup>
import { useAppStore } from '@/pinia'
import Mobile from './Mobile/index.vue'
import Web from './Web/index.vue'
</script>
