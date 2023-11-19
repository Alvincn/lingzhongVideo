<template>
  <div class="tabbar">
    <div class="logo">
      <img src="../../assets/images/logo.png" alt="" style="height: 45px;margin-right: 10px;">
      {{ MAIN_TITLE_CHINESE }}
    </div>

    <div class="user">
      <div class="userInfo" v-if="userStore.userInfo.userId">
        <div style="margin-right: 10px;">
          <el-button :icon="Search" circle @click="goSearch" />
          <el-button :icon="Upload" circle @click="goUpload" />
        </div>

        <el-dropdown>
          <span class="el-dropdown-link" style="display: flex;align-items: center;cursor: pointer;">
            <img :src="userStore.userInfo.userPhoto" alt="">
            <span style="color: white;line-height: 20px;">{{ userStore.userInfo.userName }}</span>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>


      </div>
      <el-button v-else @click="loginClick" style="background-color: black;color: white;border: none;">登录</el-button>
    </div>
  </div>
  <!-- 登录弹出框 -->
  <Transition name="slide-fade">
    <LoginItem v-if="userStore.loginShow || loginShow" @maskHidden="maskHidden"></LoginItem>
  </Transition>
</template>

<script setup>
import {
  Search,
  Upload
} from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
import { MAIN_TITLE_CHINESE } from '@/config/config.js'
import { useRouter } from 'vue-router'
const router = useRouter()
// 引入自定义输入框
import inputComponents from '@/components/inputComponent/index.vue'
// 用户仓库
import useUserStore from '@/store/user';
const userStore = useUserStore()
// 引入登录弹出框
import LoginItem from '@/components/loginItem/index.vue'
// 控制登录框是否出现
const loginShow = ref(false)
// 点击登录按钮出现的内容
const loginClick = () => {
  if (loginShow.value) {
    loginShow.value = false
    userStore.loginShow = false
  } else {
    loginShow.value = true
    userStore.loginShow = false

  }
}
// 隐藏蒙层事件
const maskHidden = () => {
  loginShow.value = false
  userStore.loginShow = false

}
onMounted(() => {
  if (localStorage.getItem('token')) {
    getUserInfo()
  }
})
// 获取用户信息
const getUserInfo = async () => {
  try {
    await userStore.getUserInfo()
  } catch (error) {
  }
}
// 退出登录
const logout = () => {
  userStore.logOut()

}
// 去搜索页面
const goSearch = () => {
  router.push('/search')
}
// 上传界面
const goUpload = () => {
  router.push('/upload')
}
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  height: $tabbar-height;

  .logo {
    font-size: $font-size-large;
    font-family: $font-family-default;
    padding-left: 20px;
    display: flex;
    align-items: center;
  }

  .user {
    padding-right: 20px;
  }
}


// Vue动画
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  // transform: translateX(-50%);
  opacity: 0;
}

.userInfo {
  display: flex;
  align-items: center;
  width: 300px;
  justify-content: center;

  img {
    height: 40px;
    width: 40px;
    border-radius: 30px;
    margin-right: 5px;
  }
}
</style>