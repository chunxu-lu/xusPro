<template>
  <div>
    <h2 style="margin-bottom: 20px">拖拽互换位置（原生写法）</h2>
    <ul>
      <el-card
        v-for="(item, index) in items"
        :key="item.id"
        :data-index="index"
        draggable="true"
        @dragstart="handleDragStart($event, index)"
        @dragover="handleDragOver($event, index)"
        @drop="handleDrop($event, index)"
        @dragend="handleDragEnd"
        :class="[
          'draggable-item',
          { dragging: draggedIndex === index }, // 被拖拽元素的样式
          { 'drop-target': dropTargetIndex === index } // 拖拽目标的样式
        ]"
      >
        {{ item.name }}
      </el-card>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    // 初始化列表数据
    const items = ref([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
      { id: 4, name: 'Item 4' }
    ])

    // 记录被拖拽的元素的索引
    const draggedIndex = ref(null)

    // 记录拖拽目标的索引
    const dropTargetIndex = ref(null)

    // 拖拽开始事件
    const handleDragStart = (event, index) => {
      draggedIndex.value = index
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', index) // 设置拖拽数据
      event.target.classList.add('dragging') // 添加被拖拽元素的样式
    }

    // 拖拽悬停事件
    const handleDragOver = (event, index) => {
      event.preventDefault() // 必须阻止默认行为，才能触发 drop 事件
      event.dataTransfer.dropEffect = 'move'

      // 更新拖拽目标的索引
      dropTargetIndex.value = index
    }

    // 拖拽释放事件
    const handleDrop = (event, targetIndex) => {
      event.preventDefault()

      // 交换起始位置和目标位置的元素
      if (draggedIndex.value !== null && draggedIndex.value !== targetIndex) {
        const newItems = [...items.value]
        // 交换两个元素的位置
        ;[newItems[draggedIndex.value], newItems[targetIndex]] = [newItems[targetIndex], newItems[draggedIndex.value]]
        items.value = newItems // 更新列表
      }

      // 重置拖拽索引和目标索引
      draggedIndex.value = null
      dropTargetIndex.value = null
    }

    // 拖拽结束事件
    const handleDragEnd = event => {
      event.target.classList.remove('dragging') // 移除被拖拽元素的样式
      draggedIndex.value = null
      dropTargetIndex.value = null
    }

    return {
      items,
      draggedIndex,
      dropTargetIndex,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd
    }
  }
}
</script>

<style lang="scss">
.draggable-item {
  padding: 10px;
  margin: 5px;
  border: 1px solid var(--el-border-color); /* 使用 Element Plus 的边框颜色变量 */
  background-color: var(--el-bg-color); /* 使用 Element Plus 的背景颜色变量 */
  cursor: grab;
  transition: all 0.3s ease; /* 平滑过渡效果 */
}

.draggable-item:active {
  cursor: grabbing;
}

/* 被拖拽元素的样式 */
.dragging {
  opacity: 0.5;
  background-color: var(--el-color-primary-light-9); /* 使用 Element Plus 的主色调 */
}

/* 拖拽目标的样式 */
.drop-target {
  border: 2px dashed var(--el-color-primary); /* 使用 Element Plus 的主色调 */
  background-color: var(--el-color-primary-light-8); /* 使用 Element Plus 的主色调 */
}
</style>
