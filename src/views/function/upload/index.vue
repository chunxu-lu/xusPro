<template>
  <!-- 上传组件 -->
  <div class="upload-section">
    <div class="images">
      <div class="image" v-for="img in images">
        <div class="close" @click="deleteImg(img.id)">×</div>
        <div>
          <el-image
            style="width: 160px; height: 160px"
            :src="img.imgUrl"
            :preview-src-list="images.map(img => img.imgUrl)"
            fit="contain"
          />
        </div>
        <div
          style="
            text-align: center;
            font-family: KaiTi;
            overflow: hidden;
            max-width: 160px;
            text-overflow: ellipsis;
            margin-top: 6px;
            white-space: nowrap;
          "
        >
          {{ img.imgName }}
        </div>
      </div>
    </div>

    <el-form style="max-width: 360px" @submit.prevent="handleSubmit">
      <el-form-item label="图片名称">
        <el-input v-model="imgName" placeholder="图片名称"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="flag">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
          ref="uploadRef"
          class="upload-demo"
          :on-change="handleFileChange"
          :before-upload="beforeUpload"
          list-type="picture"
          :auto-upload="false"
        >
          <el-button type="primary" size="small">点击上传图片</el-button>
          <template #tip>
            <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 5MB</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleSubmit"
          style="width: 200px;margin-left: 66px;"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
    <div class="progress">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="status">{{ status }}</div>
  </div>
</template>

<script lang="ts" setup>
import { uploadImage, getImages, deleteImages } from '@/api/upload'
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
import type { UploadFile, UploadRawFile } from 'element-plus'

const images = ref<any[]>([])

// 获取 el-upload 的实例
const uploadRef = ref()

// 将异步函数改写为具名函数并在 onMounted 中调用
const fetchImages = async () => {
  images.value = await getImages()
}

onMounted(() => {
  fetchImages()
})

const imgName = ref('')
const flag = ref(1)
const progress = ref(0)
const status = ref('')
const selectedFile = ref<UploadRawFile | null>(null)

const handleFileChange = (file: UploadFile) => {
  selectedFile.value = file.raw!
}

const beforeUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isJPG && !isPNG) {
    ElMessage.error('上传图片只能是 JPG 或 PNG 格式!')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('上传图片大小不能超过 5MB!')
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!imgName.value) {
    ElMessage.error('请填写图片名称')
    return
  }

  if (flag.value === null) {
    ElMessage.error('请选择标志')
    return
  }

  if (!selectedFile.value) {
    ElMessage.error('请上传图片')
    return
  }

  try {
    await uploadImage(selectedFile.value, imgName.value, flag.value)
    ElMessage.success('上传成功')
    status.value = '上传成功！'
    progress.value = 100
    // 刷新图片列表
    fetchImages()

    // 清空上传表单和进度条
    uploadRef.value!.clearFiles()
    imgName.value = ''
    flag.value = 1
    selectedFile.value = null // 确保选中的文件被清空
    progress.value = 0
    status.value = ''
  } catch (error: any) {
    ElMessage.error('上传失败')
    status.value = '上传失败：' + error.message
    progress.value = 0
  }
}

async function deleteImg(id: number) {
  await deleteImages({ id })
  ElMessage.success('删除成功')
  fetchImages()
}
</script>

<style lang="scss" scoped>
.upload-section {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  max-width: 100%;

  .images {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    .image {
      position: relative;
      margin-right: 6px;

      .close {
        cursor: pointer;
        text-align: center;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.2);
        font-size: 20px;
        color: #fff;
        top: 2px;
        right: 2px;
        position: absolute;
        z-index: 10;
      }
    }
  }
}

.upload-container {
  padding: 20px;
}

.progress {
  width: 100%;
  height: 20px;
  overflow: hidden;
  margin: 10px 0;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, #4caf50, #81c784);
  transition: width 0.3s;
  border-radius: 10px;
  box-shadow:
    0 3px 3px -5px #4caf50,
    0 2px 5px #81c784;
}

.status {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.weather-info {
  margin-bottom: 20px;
}
</style>
