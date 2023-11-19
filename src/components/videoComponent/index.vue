<template>
  <div :style="{ width: props.width + '%', height: props.height + '%' }" class="videoItem" ref="videoBox">
    <video @contextmenu.prevent.stop="rewriteVideoClick" @click="videoClick" @mousemove="mouseMoveHandle"
      :src="props.videoInfo.videoUrl" ref="videoItem" @mouseleave="mouseLeaveHandle"></video>
    <VideoControls v-show="true" @mouseOverControls="mouseUpHandle" :videoStatus="videoStatus" :videoInfo="videoItem"
      @mouseLeaveControls="mouseLeaveControlHandle" @controlsClickHandle="controlsClickHandle" />
    <div class="click-menu" ref="menuList" v-show="menuShow">
      <ul class="menu-ul">
        <li v-for="(item, index) in MOUSE_CLICK_MENU_LIST" @click="menuListClick(item)" v-show="item.show">{{ item.label
        }}</li>
      </ul>
    </div>
    <VideoDesc :videoInfo="videoDescInfo" />
    <VideoZanInfo :videoNumInfo="props.videoInfo" />
    <el-dialog v-model="dialogVisible" title="快捷键说明" width="30%">
      <div>Space（空格）：暂停/播放</div>
      <div>Left（左键）：后退5秒</div>
      <div>Right（右键）：前进5秒</div>
      <div>Down（下键）：下一个视频</div>
      <div>Up（上键）：上一个视频</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
// 引入视频控件
import VideoControls from '@/components/videoComponent/videoControls/index.vue'
// 引入视频信息
import VideoDesc from '@/components/videoComponent/videoDesc/index.vue'
// 引入右侧用户信息
import VideoZanInfo from '@/components/videoComponent/VideoZanInfo/index.vue'
import { MOUSE_CLICK_MENU_LIST } from '@/config/config.js'
// 引入操作视频方法
import {
  play,
  pause,
  seek,
  rewind,
} from '@/utils/video.js'
// 引入操作的时间
import { videoActionTime } from '@/config/config.js'
// 操作剪切板
import { copy } from '@/utils/utils.js'
import useVideoStore from '../../store/videoStore'
const videoStore = useVideoStore()
// 获取菜单实例
const menuList = ref()
// 控制菜单显示和隐藏
const menuShow = ref(false)
// 获取video标签
const videoItem = ref()
// 控件的显示和隐藏
const controlsShow = ref(false)
// 视频播放状态
const videoStatus = ref(true)
// 对话框显示/消失
const dialogVisible = ref(false)
// 定时器
let timer = null
onMounted(async () => {
  keydownEvent()

})
/**
 * 获取到video盒子实例
 */
const videoBox = ref()
const props = defineProps({
  // 视频组件的宽度（百分比）
  width: {
    type: Number,
    default: 100,
  },
  // 视频组件的高度（百分比）
  height: {
    type: Number,
    default: 100,
  },
  videoInfo: {
    type: Object,
    require: false
  }
})
/**
 * 获取事件
 */
const emits = defineEmits(['preVideo', 'nextVideo'])
/**
 * 计算属性，把VideoDesc需要的内容计算出来返回
 */
const videoDescInfo = computed(() => {
  return {
    // 用户名
    userName: props.videoInfo.userName,
    // 用户地址
    videoAddress: props.videoInfo.videoAddress,
    // 发表时间
    videoDate: props.videoInfo.videoDate,
    // 视频描述
    videoDescription: props.videoInfo.videoDescription,
    // 用户id
    videoUserId: props.videoInfo.videoUserId
  }
})
/**
 * 把VideoZanInfo需要的信息返回
 */
const videoNumInfo = computed(() => {
  return {
    // 视频收藏量
    videoCollectNum: props.videoInfo.videoCollectNum,
    // 视频评论量
    videoCommentNum: props.videoInfo.videoCommentNum,
    // 视频点赞量
    videoLikeNum: props.videoInfo.videoLikeNum,
    // 用户头像
    userPhoto: props.videoInfo.userPhoto,
    // 视频id
    videoId: props.videoInfo.videoId
  }
})
/**
 * 为视频组件重写右键点击事件
 */
const rewriteVideoClick = (e) => {
  const X = e.offsetX
  const Y = e.offsetY
  // 切换位置
  menuShow.value = true
  menuList.value.style.left = X + 'px'
  menuList.value.style.top = Y + 'px'
}
/**
 * video的点击
 */
const videoClick = () => {
  menuShow.value = false
  if (videoItem.value.paused) {
    play(videoItem.value)
    videoStatus.value = true
  } else {
    pause(videoItem.value)
    videoStatus.value = false

  }
}
/**
 * 右击列表点击事件
 */
const menuListClick = (item) => {
  menuShow.value = false
  switch (item.value) {
    case 'stop':
      pause(videoItem.value)
      videoStatus.value = false
      break
    case 'play':
      play(videoItem.value)
      videoStatus.value = true
      break
    case 'copy':
      copy(props.videoInfo.videoUrl)
      break
    case 'key':
      dialogVisible.value = true
      break
  }
}
/**
 * 键盘事件
 */
const keydownEvent = () => {
  document.body.onkeyup = (e) => {

    switch (e.code) {
      case 'Space':
        if (videoItem.value.paused) {
          play(videoItem.value)
          videoStatus.value = true
        } else {
          pause(videoItem.value)
          videoStatus.value = false
        }
        break
      case 'ArrowUp':
        emits('preVideo')
        break
      case 'ArrowDown':
        emits('nextVideo')
        break
      case 'ArrowLeft':
        setTimeout(() => {
          const video = document.querySelector('.video-active video');
          rewind(video, videoActionTime)
        }, 10);
        break
      case 'ArrowRight':
        setTimeout(() => {
          const video = document.querySelector('.video-active video');
          seek(video, videoActionTime)
        }, 10);
        break
    }
  }
}

/**
 * 鼠标移出事件
 */
const mouseLeaveHandle = () => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    controlsShow.value = false
    videoItem.value ? videoItem.value.style.cursor = 'none' : ''
    timer = null
  }, 1000);
}
/**
 * 鼠标移入视频
 */
const mouseMoveHandle = () => {
  controlsShow.value = true
  videoItem.value.style.cursor = 'auto'

  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    controlsShow.value = false
    videoItem.value.style.cursor = 'none'

    timer = null
  }, 1000);
}
/**
 * 鼠标置于控件
 */
const mouseUpHandle = () => {
  if (timer) clearTimeout(timer)
  controlsShow.value = true
  videoItem.value.style.cursor = 'auto'

}
/**
 * 鼠标移出控件
 */
const mouseLeaveControlHandle = () => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    controlsShow.value = false
    videoItem.value.style.cursor = 'none'

  }, 1000)
}
/**
 * 控件事件的点击回调
 */
const controlsClickHandle = (type) => {
  switch (type) {
    case 'left':
      rewind(videoItem.value, videoActionTime)
      break
    case 'pause':
      pause(videoItem.value)
      videoStatus.value = false
      break
    case 'play':
      play(videoItem.value)
      videoStatus.value = true
      break
    case 'right':
      seek(videoItem.value, videoActionTime)
      break
    case 'fullScreen':

      break
  }
}


</script>

<style lang="scss">
.videoItem {
  position: relative;

  video {
    width: 100%;
    height: 100%;
  }
}

.click-menu {
  width: 130px;
  background-color: rgba(98, 98, 98, 0.7);
  border-radius: 10px;
  position: absolute;
}

.menu-ul {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  cursor: pointer;
}

.menu-ul li {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 40px;
}

.menu-ul li:hover {
  background-color: rgba(98, 98, 98, 0.9);
}
</style>