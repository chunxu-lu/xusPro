<template>
  <!-- 上传组件 -->
  <div class="upload-section">
    <div class="myform">
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
            :show-file-list="false"
            list-type="picture"
            :auto-upload="false"
          >
            <el-image
              style="width: 180px; height: 180px"
              v-if="imageUrl"
              :src="imageUrl"
              fit="contain"
              class="uploader-img"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <div>只能上传 jpg/png 文件，且不超过 5MB</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" style="width: 200px; margin-left: 66px">提交</el-button>
        </el-form-item>
      </el-form>
      <el-progress
        :show-text="false"
        :percentage="progress"
        :stroke-width="15"
        status="success"
        striped
        striped-flow
        :duration="duration"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { uploadImage } from '@/api/upload'
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
import type { UploadFile, UploadRawFile } from 'element-plus'

// 获取 el-upload 的实例
const uploadRef = ref()
const imgName = ref('')
const flag = ref(1)
const progress = ref(0)
const status = ref('')
const imageUrl = ref('')
const duration = computed(() => Math.floor(progress.value / 10))

const selectedFile = ref<UploadRawFile | null>(null)

const handleFileChange = (file: UploadFile) => {
  selectedFile.value = file.raw!
  imageUrl.value = URL.createObjectURL(file.raw!)
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
    await uploadImage(selectedFile.value, imgName.value, flag.value, percentCompleted => {
      progress.value = percentCompleted
    })
    ElMessage.success('上传成功')
    status.value = '上传成功！'
    // 清空上传表单和进度条
    uploadRef.value!.clearFiles()
    imgName.value = ''
    flag.value = 1
    selectedFile.value = null // 确保选中的文件被清空
    progress.value = 0
    status.value = ''
    imageUrl.value = ''
  } catch (error: any) {
    ElMessage.error('上传失败')
    status.value = '上传失败：' + error.message
    progress.value = 0
  }
}
</script>

<style lang="scss" scoped>
.upload-section {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  max-width: 100%;
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

:deep(.upload-demo) {
  width: 180px;
  height: 180px;
  display: block;
  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 180px;
    height: 180px;
    text-align: center;
  }
}
</style>
