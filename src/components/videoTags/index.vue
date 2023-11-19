<template>
  <div class="videoTags">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="(item) in videoElseStore.videoLabel" :key="item.labelId" :label="item.labelName"
        :name="item.labelId">
        <videoItem :videoList="videoElseStore.videoByTag"></videoItem>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
const activeName = ref()
// 引入仓库
import useVideoElseStore from '@/store/videoElse';
const videoElseStore = useVideoElseStore();
// 引入视频预览
import videoItem from '@/components/videoItem/index.vue'
onMounted(async () => {
  // 获取所有仓库分类
  await videoElseStore.getAllVideoLabel()
  // 设置第一个分类
  activeName.value = videoElseStore.videoLabel[0].labelId
  await getVideoByLabelId(activeName.value)
})
// 根据标签获取视频
const getVideoByLabelId = async (labelId) => {
  await videoElseStore.getVideoByTag(labelId)
}
// 切换tab
const handleClick = (tab) => {
  getVideoByLabelId(tab.paneName)
}
</script>

<style scoped lang="scss">
:deep(.el-tabs__item) {
  color: white;

  &.is-active {
    color: rgb(85, 158, 255);
  }
}
</style>