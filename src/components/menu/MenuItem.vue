<template>
  <el-sub-menu v-if="item.children && item.children.length" :index="item.index">
    <template #title>
      <el-icon><component :is="item.icon" /></el-icon>
      <span>{{ item.title }}</span>
    </template>
    <menu-item v-for="child in item.children" :key="child.index" :item="child" />
  </el-sub-menu>
  <el-menu-item v-else :index="item.index" :disabled="item.disabled" @click="router.push(item.path)">
    <el-icon><component :is="item.icon" /></el-icon>
    <template #title>{{ item.title }}</template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
defineOptions({name:'MenuItem'})

const router = useRouter()

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>
