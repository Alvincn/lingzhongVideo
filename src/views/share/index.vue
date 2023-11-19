<template>
  <div style="height: 100%;">
    <div class="userInfo" style="display: flex;justify-content: center;align-items: center;">
      <img :src="userInfo.value.userPhoto" alt="" style="width: 50px;height: 50px;border-radius: 50%;">
      @{{ userInfo.value.userName }}邀请您观看：
    </div>
    <videoComponent :videoInfo="videoInfo.value"></videoComponent>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()
import useUserStore from '@/store/user.js'
const userStore = useUserStore()
import useVideoStore from "@/store/videoStore.js"
const videoStore = useVideoStore()
import videoComponent from '@/components/videoComponent/index.vue'
const userInfo = reactive({
  value: {}
})
const videoInfo = reactive({
  value: {}
})
onMounted(() => {
  console.log(route.query);
  getUserInfo(route.query.userId)
  console.log(userInfo.value);
  getVideo(route.query.videoId)
})
// 首先查询用户
const getUserInfo = async (userId) => {
  userInfo.value = (await userStore.getUserInfoById(userId)).obj
}
// 查询视频
const getVideo = async (videoId) => {
  videoInfo.value = (await videoStore.getVideoById(videoId)).obj
}
</script>

<style scoped lang="scss"></style>