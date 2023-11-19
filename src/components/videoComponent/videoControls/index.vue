<template>
  <div class='videoControls' @mouseover="mouseUpHandle" @mouseleave="mouseLeaveHandle">
    <el-slider v-model="currentTime" :format-tooltip="formatTooltip" @change="timeChange" :max="maxTime" placement="right"
      style="height: 5px;" size="small" />
    <div class="icons" v-if="showControls">
      <div class="iconLeft">
        <div class="iconItem" @click="controlsClickHandle('left')">
          <el-icon size="22">
            <DArrowLeft />
          </el-icon>
        </div>
        <div class="iconItem" v-show="props.videoStatus" @click="controlsClickHandle('pause')">
          <el-icon size="22">
            <VideoPause />
          </el-icon>
        </div>
        <div class="iconItem" v-show="!props.videoStatus" @click="controlsClickHandle('play')">
          <el-icon size="22">
            <VideoPlay />
          </el-icon>
        </div>
        <div class="iconItem" @click="controlsClickHandle('right')">
          <el-icon size="22">
            <DArrowRight />
          </el-icon>
        </div>
        <div class="videoTime">
          {{ secondToMinute(currentTime) }} / {{ secondToMinute(maxTime) }}
        </div>
      </div>
      <div class="iconRight" @click="controlsClickHandle('fullScreen')">
        <el-icon size="25">
          <FullScreen />
        </el-icon>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, onUnmounted } from 'vue'
import { secondToMinute } from '@/utils/time.js'
// 当前视频时间
const currentTime = ref(0)
// 当前视频最大时间（秒）
const maxTime = ref(0)
// 视频暂停/继续显示内容
const playOrPause = ref(true)
// 视频是否完成
const videoEnded = ref(false)
// 是否显示控件
const showControls = ref(false)
let timer = ref(null)
// 当前视频播放状态
const props = defineProps(['videoStatus', 'videoInfo'])
// 自定义事件
const emits = defineEmits(['mouseOverControls', 'mouseLeaveControls', 'controlsClickHandle'])
onMounted(() => {
  chargePauseOrPlay()
  setTimeout(() => {
    maxTime.value = props.videoInfo.duration
  }, 1000);
  timer.value = setInterval(() => {
    currentTime.value = props.videoInfo.currentTime
    if (props.videoInfo.ended) {
      timer.value = null
      videoEnded.value = true
    }
  }, 1000);
})
onUnmounted(() => {
  clearInterval(timer.value)
})
/**
 * 鼠标置上事件
 */
const mouseUpHandle = () => {
  emits('mouseOverControls')
}
/**
 * 鼠标移出事件
 */
const mouseLeaveHandle = () => {
  emits('mouseLeaveControls')
}
/**
 * 判断是暂停图标还是播放图标
 */
const chargePauseOrPlay = () => {
  if (props.videoStatus) {
    playOrPause.value = false
  } else {
    playOrPause.value = true
  }
}
/**
 * 图标点击回调
 */
const controlsClickHandle = (type) => {
  emits('controlsClickHandle', type)
}
/**
 * 拖拽时间条
 */
const timeChange = (e) => {
  emits('controlsClickHandle', 'play')
  props.videoInfo.currentTime = e

}
/**
 * 格式化时间条信息
 */
const formatTooltip = (val) => {
  if (NaN) {
    return secondToMinute(10)

  }
  return secondToMinute(val)

}
</script>

<style scoped lang='scss'>
.videoControls {
  width: 100%;
  // height: $video-contorls-height;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  z-index: 999;
  bottom: 0;
  border-radius: 0 0 10px 10px;
}


.icons {
  display: flex;
  width: 100%;
  height: 0;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  svg {
    color: lightgray;
  }

  svg:hover {
    color: white
  }

  .iconItem {
    margin-right: 10px;
  }

  .iconLeft {
    display: flex;
    width: 200px;
    margin-left: 10px;
    justify-content: space-between;
  }

  .iconRight {
    margin-right: 10px;
  }

}

.videoTime {
  color: lightgray;
  line-height: 22px
}
</style>