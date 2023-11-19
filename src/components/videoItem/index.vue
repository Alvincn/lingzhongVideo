<template>
  <div class="videoItemEvent">
    <div class="everyItem" v-for="item in props.videoList" @click="showVideo(item)">
      <video style="width: 100%;height: 100%;" :src="item.videoUrl"></video>
      <div class="userInfo" v-if="item.userName">
        <div style="display: flex;align-items: center;">
          <img :src="item.userPhoto" alt="">
          <span v-html="'@' + item.userName"></span>
        </div>
        <div class="likeInfo">
          <i class="iconfont icon-Heart" ref="iconHeart"></i> {{ item.videoLikeNum }}
          <i class="iconfont icon-Chat" ref="iconChat"></i> {{ item.videoCommentNum }}
          <i class="iconfont icon-Star" ref="iconStar"></i> {{ item.videoCollectNum }}
        </div>
      </div>
      <div class="videoDesc" v-html="item.videoDescription">
      </div>
    </div>
  </div>
  <el-dialog :style="{ backgroundColor: '#333' }" fullscreen destroy-on-close class="dialogItem" v-model="dialogVisible">
    <div class="videoComponentEvent">
      <VideoComponent :videoInfo="selectVideo"></VideoComponent>
    </div>
    <template #footer>
      <span class="dialog-footer">
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
// 获取传过来的内容
const props = defineProps(['videoList'])
const dialogVisible = ref(false)
// 引入视频播放模块
import VideoComponent from '@/components/videoComponent/index.vue'
onMounted(() => {
})
// 选中的标签
let selectVideo = reactive([])
// 点击
const showVideo = (event) => {
  dialogVisible.value = true
  selectVideo = event
}
</script>

<style scoped lang="scss">
.videoItemEvent {
  height: 640px;
  overflow-y: scroll;
  display: grid;
  padding-right: 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;


  .everyItem {
    position: relative;
    height: 300px;
    transition: all 0.5s;

    &:hover {
      cursor: pointer;
      transform: scale(1.05);
      z-index: 999;
    }
  }

  .userInfo {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }

  .videoDesc {
    position: absolute;
    bottom: 0;
  }
}

.videoComponentEvent {
  height: 645px;
}
</style>