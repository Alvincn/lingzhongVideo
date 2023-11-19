<template>
  <div class="videoUpload">
    <div>
      <h1>发布视频</h1>
    </div>
    <el-form style="margin-top: 20px;" :model="videoInfo" label-width="120px">
      <el-form-item label="视频描述">
        <el-input v-model="videoInfo.videoDescription" placeholder="视频描述" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="选择标签">
        <el-select v-model="videoInfo.labelIds" multiple placeholder="选择标签" style="width: 400px;">
          <el-option :label="item.labelName" :value="item.labelId" v-for="(item, index) in  videoElseStore.videoLabel " />
        </el-select>
      </el-form-item>
      <el-form-item label="发布位置">
        <el-input v-model="videoInfo.videoAddress" placeholder="发布位置" :disabled="true" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="上传视频">
        <el-upload accept=".mp3,.mp4" ref="upload" class="upload-demo" v-model="videoInfo.file" :limit="1"
          :auto-upload="false" :on-change="fileChange">
          <template #trigger>
            <el-button type="primary">上传视频</el-button>
          </template>
          <template #tip>
            <div class="el-upload__tip text-red">
              上传MP4
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitVideoInfo">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import useUserStore from '@/store/user.js'
const userStore = useUserStore()
import useVideoElseStore from '@/store/videoElse.js'
import { DEFAULT_DYNAMIC_LIST_ITEM_SIZE } from 'element-plus/es/components/virtual-list/src/defaults';
import { ElMessage } from 'element-plus';
const videoElseStore = useVideoElseStore()
// 上传视频信息
const videoInfo = reactive({
  file: '',
  labelIds: [],
  videoDescription: '',
  videoPrivate: 1,
  videoAddress: ''
})
const showPosition = async (position) => {
  let result = await userStore.getCityFromjw()
  videoInfo.videoAddress = result.province
}
onMounted(async () => {
  showPosition()
  await videoElseStore.getAllVideoLabel()
})
const submitVideoInfo = async () => {
  const formData = new FormData()
  formData.append('file', videoInfo.file)
  console.log(formData.get('file'));
  formData.append('labelIds', videoInfo.labelIds)
  formData.append('videoAddress', videoInfo.videoAddress)
  formData.append('videoDescription', videoInfo.videoDescription)
  formData.append('videoPrivate', videoInfo.videoPrivate)
  console.log(formData);
  await videoElseStore.uploadVideo(formData)
  ElMessage.success('上传成功')
}
const fileChange = (event) => {
  videoInfo.file = event.raw
}
</script>

<style scoped lang="scss">
.videoUpload {
  padding: 10px;
}
</style>