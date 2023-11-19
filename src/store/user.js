import { defineStore } from "pinia";
import {
  getCode,
  emailCodeLogin,
  getUserInfo,
  getFollowNum,
  getMyFollowList,
  getMyFansList,
  getFunsNum,
  followUser,
  unFollowUser,
  getLikeVideo,
  getCollectVideo,
  locationCity,
  getUserInfoById,
  followOne
} from '@/api/user.js'
import { getVideoByUser } from '@/api/video.js'
let useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: localStorage.getItem('token') || '',
      userInfo: {},
      followList: [],
      loginShow: false
    }
  },
  actions: {
    // 获取邮箱验证码
    getEmailCode(email) {
      return new Promise(async (resolve, reject) => {
        const formData = new URLSearchParams()
        formData.append('mail', email)
        await getCode(formData).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 邮箱验证码登录
    emailCodeLogin(email, code) {
      return new Promise((resolve, reject) => {
        emailCodeLogin(email, code).then(res => {
          localStorage.setItem('token', res.value)
          this.token = res.value
          resolve(res)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    // 获取用户信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          this.userInfo = res.obj
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    // 退出登录
    logOut() {
      localStorage.removeItem('token')
      this.token = ''
      this.userInfo = {}
    },
    // 获取粉丝信息
    getFunsNum(userId) {
      return new Promise((resolve, reject) => {
        getFunsNum(userId).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取我关注的人列表
    getMyFollowList(page = 0) {
      return new Promise((resolve, reject) => {
        getMyFollowList(page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取关注的人数量
    getFollowNum(userId) {
      return new Promise((resolve, reject) => {
        getFollowNum(userId).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取我的粉丝列表
    getMyFansList() {
      return new Promise((resolve, reject) => {
        getMyFansList().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 关注某人
    followUser(userId) {
      return new Promise((resolve, reject) => {
        followUser(userId).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 取消关注
    unFollowUser(userId) {
      return new Promise((resolve, reject) => {
        unFollowUser(userId).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取某人发过的视频
    getVideoByUser(userId) {
      return new Promise((resolve, reject) => {
        getVideoByUser(userId, 0).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户喜欢的视频
    getLikeVideo() {
      return new Promise((resolve, reject) => {
        getLikeVideo().then(res => {

          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户收藏的视频
    getCollectVideo() {
      return new Promise((resolve, reject) => {
        getCollectVideo().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 根据经纬度获取城市
    getCityFromjw(latitude, longitude) {
      return new Promise((resolve, reject) => {
        locationCity(latitude, longitude).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 根据用户id查询用户
    getUserInfoById(userId) {
      return new Promise((resolve, reject) => {
        getUserInfoById(userId).then(res => {

          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 判断用户是否关注了某人
    followOne(beUserId) {
      console.log(beUserId);
      return new Promise((resolve, reject) => {
        followOne(beUserId).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
})
export default useUserStore;