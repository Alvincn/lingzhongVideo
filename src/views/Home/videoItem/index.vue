<template>
  <div class='videoItem'>
    <el-carousel @change="videoChange" :initial-index="videoStore.videoCurrentCount" :loop="true" ref="carousel"
      v-if="videoStore.allVideoList.length !== 0" height="calc(100vh - 60px - 30px)" class="carousel-item"
      direction="vertical" :autoplay="false" indicator-position="none">
      <el-carousel-item v-loading="loading" v-for="item in videoStore.allVideoList" :key="item">
        <VideoComponent :videoInfo="item" v-if="videoStore.videoCurrentCount === item.id
          || videoStore.videoCurrentCount === item.id + 1
          || videoStore.videoCurrentCount === item.id - 1" @preVideo="preVideo" @nextVideo="nextVideo"
          :class="{ 'video-active': videoStore.videoCurrentCount === item.id, 'video-display': videoStore.videoCurrentCount !== item.id }" />
      </el-carousel-item>
    </el-carousel>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
/**
 * 引入视频组件
 */
import VideoComponent from '@/components/videoComponent/index.vue'
/**
 * 获取仓库中的数据
 */
import useVideoStore from '@/store/videoStore';
import { ElMessage } from 'element-plus';
const videoStore = useVideoStore()
/**
 * 获取走马灯
 */
const carousel = ref()
/**
 * 加载状态
 */
const loading = ref(false)
onMounted(async () => {
  await videoStore.getVideo()
  loading.value = false
  nextTick(() => {
    const video = document.querySelector('.video-active video');
    video.play()
  })

})
// 上一条视频
const preVideo = () => {
  setTimeout(() => {
    const video = document.querySelector('.video-active video');
    const videoDisplay = document.querySelectorAll('.video-display video');
    videoDisplay.forEach(item => {
      item.pause()
    })
    video.play()
  }, 10);
  if (videoStore.videoCurrentCount <= 0) {
    ElMessage.warning('已经是第一条了')
  } else {
    carousel.value.prev()
    videoStore.videoCurrentCount -= 1
  }
}
// 下一条视频
const nextVideo = async () => {
  if (videoStore.videoCurrentCount >= videoStore.allVideoList.length - 1) {
    loading.value = true
    videoStore.videoListPage += 1
    await videoStore.getVideo()
    carousel.value.next()
    loading.value = false
    videoStore.videoCurrentCount += 1
  } else {
    carousel.value.next()
    videoStore.videoCurrentCount += 1
  }
}
const videoChange = (index, oldIndex) => {
  if (index > oldIndex) {
    setTimeout(() => {
      const video = document.querySelector('.video-active video');
      const videoDisplay = document.querySelectorAll('.video-display video');
      videoDisplay.forEach(item => {
        item.pause()
      })
      video.play()
    }, 10);
  }
}
</script>

<style scoped lang='scss'>
.videoItem {
  height: 100%;
}


.carousel-item {
  height: calc(100vh - 60px - 30px)
}
</style>