<template>
  <div class='videoDesc'>
    <div class="userInfo">
      <span class="userName">@{{ props.videoInfo.userName }}</span>
    </div>
    <div class="desc">
      {{ props.videoInfo.videoDescription }}
    </div>
    <div class="videoDate">
      {{ props.videoInfo.videoDate }}
      <span class="location">
        <el-icon>
          <Location />
        </el-icon>
        {{ props.videoInfo.videoAddress }}
      </span>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
// 传过来的视频信息
const props = defineProps(['videoInfo'])
onMounted(() => {
})
</script>

<style scoped lang='scss'>
.videoDesc {
  position: absolute;
  bottom: 10px;

  .userInfo {
    cursor: pointer;
    font-size: 20px;

    .userName {
      margin-left: 5px;
    }
  }

  .desc {
    margin-top: 5px;
  }

  .videoDate {
    font-size: 15px;
    color: rgb(134, 134, 134);
    margin-top: 5px;
  }
}
</style>