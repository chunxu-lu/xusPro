<template>
  <Waterfall :width="200" :breakpoints="breakpoints" :list="images">
    <template #default="{ item, url, index }">
      <div class="card">
        <LazyImg class="card_img" :url="url" />
        <div class="close" @click="deleteImg(item.id)">
          <div class="close-icon">
            <el-button type="primary" :icon="Delete" circle />
          </div>
        </div>
      </div>
    </template>
  </Waterfall>
</template>

<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
import { deleteImages, getImages } from '@/api/upload'

const breakpoints = {
  768: { rowPerView: 2 }
}

const images = ref<any[]>([])

// 将异步函数改写为具名函数并在 onMounted 中调用
const fetchImages = async () => {
  images.value = (await getImages()).map(item => {
    return {
      ...item,
      src: item.imgUrl
    }
  })
}

onMounted(() => {
  fetchImages()
})

async function deleteImg(id: number) {
  await deleteImages({ id })
  ElMessage.success('删除成功')
  fetchImages()
}
</script>

<style lang="scss" scoped>
:deep(.card) {
  position: relative;
  .close {
    opacity: 0.6;
    bottom: 4px;
    right: 4px;
    position: absolute;
    z-index: 10;
  }
}
</style>
