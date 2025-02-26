<template>
  <canvas ref="canvasRef" class="weather-canvas"></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationId: number
let sunY = 50
let sunDirection = 1
let cloudPositions = [
  { x: 0, speed: 0.5 },
  { x: 200, speed: 0.8 },
  { x: 400, speed: 0.3 },
  { x: 600, speed: 0.6 }
]

// 画太阳
const drawSun = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath()
  ctx.fillStyle = '#FFD700'
  ctx.arc(100, sunY, 30, 0, Math.PI * 2)
  ctx.fill()

  // 画太阳光芒
  for (let i = 0; i < 8; i++) {
    ctx.beginPath()
    ctx.moveTo(100, sunY)
    const angle = (i * Math.PI) / 4
    ctx.lineTo(100 + Math.cos(angle) * 45, sunY + Math.sin(angle) * 45)
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 3
    ctx.stroke()
  }
}

// 画云
const drawCloud = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.save()
  ctx.fillStyle = '#FFFFFF'

  // 主要的云朵形状
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.bezierCurveTo(x - 10, y - 20, x + 30, y - 20, x + 30, y)
  ctx.bezierCurveTo(x + 30, y - 10, x + 70, y - 10, x + 70, y)
  ctx.bezierCurveTo(x + 70, y + 20, x - 10, y + 20, x, y)
  ctx.fill()
  ctx.restore()
}

// 动画循环
const animate = () => {
  if (!ctx || !canvasRef.value) return

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  // 更新太阳位置
  sunY += sunDirection * 0.5
  if (sunY > 80 || sunY < 50) sunDirection *= -1

  // 更新并绘制所有云朵
  cloudPositions.forEach((cloud, index) => {
    cloud.x += cloud.speed
    if (cloud.x > canvasRef.value!.width) {
      cloud.x = -100
    }
    drawCloud(ctx!, cloud.x, 80 + index * 60)
  })

  // 绘制太阳
  drawSun(ctx)

  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth
    canvasRef.value.height = window.innerHeight
    ctx = canvasRef.value.getContext('2d')
    animate()
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.weather-canvas {
  width: 100%;
  height: 100%;
  border-radius: 0;
  background: linear-gradient(to bottom, #87ceeb 0%, #e0f6ff 100%);
}
</style>
