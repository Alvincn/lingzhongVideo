<template>
  <div class='videoUserInfo'>
    <div class="user videoInfo">
      <div style="position: relative;top: 5px;left: 3px;">
        <img :src="props.videoNumInfo.userPhoto" />
      </div>
    </div>
    <el-button size="small" style="transform: translate(10px,-30px);" v-show="!followShow"
      @click="followThisOne">关注</el-button>
    <div class="like videoInfo" @click="liveVideo">
      <i class="iconfont icon-Heart" ref="iconHeart"
        :style="{ color: likeVideo === 1 || likeVideo === 3 ? 'red' : 'white' }"></i>
      {{ props.videoNumInfo.videoLikeNum }}
    </div>
    <!-- <div class="comment videoInfo" @click="openChat">
      <i class="iconfont icon-Chat" ref="iconChat"></i>
      {{ props.videoNumInfo.videoCommentNum }}
    </div> -->
    <div class="collect videoInfo" @click="collectVideo">
      <i class="iconfont icon-Star" ref="iconStar"
        :style="{ color: likeVideo === 2 || likeVideo === 3 ? 'yellow' : 'white' }"></i>
      {{ props.videoNumInfo.videoCollectNum }}
    </div>
    <div class="videoInfo" @click="shareVideo">
      <el-icon color="white" class="no-inherit" style="font-size:30px;">
        <Share />
      </el-icon>
      <div style="font-size: 12px;text-align: center;">
        分享

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
const props = defineProps(['videoNumInfo'])
// 引入视频仓库
import useVideoStore from '@/store/videoStore'
import { ElMessage } from 'element-plus';
import useUserStore from '../../../store/user';
const userStore = useUserStore()
import { copy } from '@/utils/utils.js'
const followShow = ref(true)
/**
 * 用户对此视频的状态
 * 0：未喜欢，未收藏
 * 1：喜欢
 * 2：收藏
 * 3：收藏且喜欢
 */
const likeVideo = ref(0)
const videoStore = useVideoStore()
onMounted(() => {
  if (videoStore.videoCurrentCount === props.videoNumInfo.id && localStorage.getItem('token')) {
    getVideoLike()
    isFollowOne()
  }
})
// 获取当前视频点赞消息
const getVideoLike = async () => {
  let res = await videoStore.isLikeVideo(props.videoNumInfo.videoId)
  likeVideo.value = res.obj
}
// 监听props变化
watch(() => props.videoNumInfo, (newValue, oldValue) => {
  getVideoLike()
}, { deep: true, immediate: true })

// 获取到三个图标
const iconHeart = ref()
const iconChat = ref()
const iconStar = ref()
// 喜欢此视频
const liveVideo = async () => {
  if (!localStorage.getItem('token')) {
    ElMessage.warning("请先登录")
    return userStore.loginShow = true
  }
  if (iconHeart.value.style.color === 'red') {
    await videoStore.cancelLikeVideo(props.videoNumInfo.videoUserId, props.videoNumInfo.videoId)
    iconHeart.value.style.color = 'white'
    props.videoNumInfo.videoLikeNum -= 1
    getVideoLike()
  } else {
    await videoStore.likeVideo(props.videoNumInfo.videoUserId, props.videoNumInfo.videoId)
    props.videoNumInfo.videoLikeNum += 1
    iconHeart.value.style.color = 'red'
    getVideoLike()
  }
}
// 打开评论
const openChat = () => {
}
// 收藏此视频
const collectVideo = async () => {
  if (iconStar.value.style.color === 'yellow') {
    await videoStore.disCollectVideo(props.videoNumInfo.videoUserId, props.videoNumInfo.videoId)
    iconHeart.value.style.color = 'white'
    props.videoNumInfo.videoCollectNum -= 1
    getVideoLike()
  } else {
    await videoStore.collectVideo(props.videoNumInfo.videoUserId, props.videoNumInfo.videoId)
    props.videoNumInfo.videoCollectNum += 1
    iconStar.value.style.color = 'yellow'
    getVideoLike()
  }
}
const shareVideo = () => {
  const shareUrl = `http://localhost:3000/share?videoId=${props.videoNumInfo.videoId}&userId=${userStore.userInfo.userId}`
  copy(shareUrl)
  ElMessage.success('分享链接已复制，快去发给好友吧')
}
// 判断用户是否关注了某人
const isFollowOne = async () => {
  let result = await userStore.followOne(props.videoNumInfo.videoUserId)
  followShow.value = result.obj
}
// 关注当前
const followThisOne = async () => {
  let result = await userStore.followUser(props.videoNumInfo.videoUserId)
  console.log(result);
  ElMessage.success('关注成功')
  isFollowOne()
}
</script>

<style scoped lang='scss'>
.videoUserInfo {
  position: absolute;
  user-select: none;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  .videoInfo {
    display: flex;
    cursor: pointer;

    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;

    .iconfont {
      font-size: 30px;
    }

  }

  .user {
    width: 60px;
    height: 60px;
    background-image: url(../../../assets/images/avatar1.png);
    // background-position: -3px -3px;
    background-size: cover;

    img {
      width: 44px;
      height: 44px;
      transform: translate(3px 3px);
      border-radius: 50%;
    }
  }
}
</style>