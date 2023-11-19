<template>
  <div class='user'>
    <img :src="userStore.userInfo.userPhoto" alt="">
    <div>
      <p style="font-size: 20px; font-family: '宋体';">{{ userStore.userInfo.userName }}</p>
    </div>
    <div>
      <span style="margin-right: 20px;cursor: pointer;" @click="showMyFuns">粉丝：{{ myFunsNum }}</span>
      <span style="cursor: pointer;" @click="showMyFollow">关注：{{ followMe }}</span>
    </div>
    <!-- <div>
      邮箱：{{ userStore.userInfo.userMail }}
    </div> -->
  </div>
  <div class="video">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="我的视频" name="myVideo">
        <videoItem :videoList="myVideo.value" v-if="myVideo.value && myVideo.value.length"></videoItem>
        <div class="empty" v-if="videoEmpty">
          <img src="../../assets/images/svg/noData.svg" alt="">
          <span style="color: gray;user-select: none;">没有发表过视频呢</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的喜欢" name="like">
        <videoItem :videoList="myLikeVideo"></videoItem>
        <div class="empty" v-if="likeEmpty">
          <img src="../../assets/images/svg/noLike.svg" alt="">
          <span style="color: gray;user-select: none;">还没有喜欢的视频呢</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的收藏" name="collect">
        <videoItem :videoList="myCollectVideo"></videoItem>
        <div class="empty" v-if="collectEmpty">
          <img src="../../assets/images/svg/noCollect.svg" alt="">
          <span style="color: gray;user-select: none;">还没有收藏的视频呢</span>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog v-model="funsShow" title="我的粉丝">
      <ul>
        <li v-for="item in myFunsList.value">
          <div class="dialogList">
            <div style="display: flex;align-items: center;">
              <img :src="item.userPhoto" alt="">
              <span>@{{ item.userName }}</span>
            </div>
          </div>
        </li>
      </ul>
    </el-dialog>
    <el-dialog v-model="followShow" title="我的关注">
      <ul>
        <li v-for="item in myFollowList.value">
          <div class="dialogList">
            <div style="display: flex;align-items: center;">
              <img :src="item.userPhoto" alt="">
              <span>@{{ item.userName }}</span>
            </div>
            <div class="cancel">
              <el-button @click="cancelFollow(item)">取消关注</el-button>
            </div>
          </div>
        </li>
      </ul>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import useUserStore from '@/store/user';
const userStore = useUserStore()
import videoItem from '@/components/videoItem/index.vue'
// 我的关注
const followMe = ref(0)
const followShow = ref(false)
const myFollowList = reactive({
  value: []
})
// 我的粉丝
const myFunsNum = ref(0)
// 我的粉丝列表
const myFunsList = reactive({
  value: []
})

const funsShow = ref(false)
// 我的视频
let myVideo = reactive({
  value: []
})
// 视频是否为空
const videoEmpty = ref(false)
const likeEmpty = ref(false)
const collectEmpty = ref(false)
// 默认选中
const activeName = ref('myVideo')
// 我喜欢的视频
let myLikeVideo = reactive([])
// 我收藏的视频
let myCollectVideo = reactive([])
onMounted(async () => {
  myFunsNum.value = (await userStore.getFunsNum(userStore.userInfo.userId)).obj
  followMe.value = (await userStore.getFollowNum(userStore.userInfo.userId)).obj
  getMyLikeVideo()
  collectVideo()
  getMyVideo()
})
// 获取我的视频
const getMyVideo = async () => {
  myVideo.value = (await userStore.getVideoByUser(userStore.userInfo.userId)).obj
  if (myVideo === undefined) {
    return videoEmpty.value = true
  }
  if (myVideo.length === 0) {
    videoEmpty.value = true
  } else {
    videoEmpty.value = false
  }
}
// tab点击事件
const handleClick = (tab) => {
  switch (tab.paneName) {
    case 'myVideo':
      getMyVideo()
      break
    case 'like':
      getMyLikeVideo()
      break
    case 'collect':
      collectVideo()
      break
  }
}
// 获取我喜欢过的视频
const getMyLikeVideo = async () => {
  myLikeVideo = reactive((await userStore.getLikeVideo()).obj)
  if (myLikeVideo.length === 0) {
    likeEmpty.value = true
  } else {
    likeEmpty.value = false
  }
}
// 获取我收藏的视频
const collectVideo = async () => {
  myCollectVideo = reactive((await userStore.getCollectVideo()).obj)
  if (myCollectVideo.length === 0) {
    collectEmpty.value = true
  } else {
    collectEmpty.value = false
  }
}
// 显示我的粉丝
const showMyFuns = async () => {
  funsShow.value = true
  myFunsList.value = (await userStore.getMyFunsList(0)).obj
}
// 显示我的关注
const showMyFollow = async () => {
  followShow.value = true
  myFollowList.value = (await userStore.getMyFollowList(0)).obj
}
// 取消关注
const cancelFollow = async (item) => {
  await userStore.unFollowUser(item.userId)

}
</script>

<style scoped lang='scss'>
.user {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  line-height: 30px;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
}

.video {
  width: 100%;
  height: 450px;
  overflow-y: scroll;

  .empty {
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;

    img {
      height: 80%;
    }
  }
}

:deep(.el-tabs__nav-scroll .el-tabs__nav) {
  display: flex;
  width: 100%;
  justify-content: center;
}

:deep(.el-tabs__item) {
  color: white;

  &.is-active {
    color: rgb(85, 158, 255);
  }
}

.dialogList {
  display: flex;
  border-bottom: solid gray 1px;
  padding: 10px;
  justify-content: space-between;

  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>