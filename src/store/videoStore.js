/**
 * Video相关的仓库
 */
import { defineStore } from "pinia";
import { getVideoByPages } from "@/api/video";
import { ElMessage } from "element-plus";
import { likeVideo, unlikeVideo, isLikeThisVideo, collectVideo, disCollectVideo, loginGetVideo } from "@/api/userControlVideo";
import { getVideoInfoById } from '@/api/video.js'
// 创建Video小仓库
let useVideoStore = defineStore({
  id: 'video',
  state: () => {
    return {
      // 视频列表
      videoList: [],
      // 当前第几页
      videoListPage: 0,
      // 每页请求几个数据
      videoListPageSize: 10,
      // 当前播放的是第几个视频
      videoCurrentCount: 0,
      // 总共播放了多少个视频
      totalVideoCount: 0
    }
  },
  actions: {
    /**
     * 获取视频
     * 如果登录：根据用户推荐
     * 如果未登录：
     * @returns Promise
     */
    getVideo() {
      return new Promise((resolve, reject) => {
        if (localStorage.getItem('token')) {
          loginGetVideo(10).then((res) => {
            if (res.status === 200) {
              this.videoList.push(...res.obj);
              resolve(res);
            } else {
              reject(res);
            }
          }, (err) => {
            ElMessage.error('认证失败，请先登录！')
          });
        } else {
          getVideoByPages(this.videoListPage).then((res) => {
            if (res.status === 200) {
              this.videoList.push(...res.obj);
              resolve(res);
            } else {
              reject(res);
            }
          }, (err) => {
            ElMessage.error('认证失败，请先登录！')
          });
        }

      });
    },
    // 当前视频增加
    addCurrentCount() {
      this.videoCurrent += 1
    },
    // 当前总共播放视频增加
    addTotalVideoCount() {
      this.totalVideoCount += 1
    },
    // 喜欢视频
    likeVideo(userId, videoId) {
      return new Promise((resolve, reject) => {
        likeVideo(userId, videoId).then((res) => {
          resolve(res);
        }, (err) => {
          reject(err)
        });
      })
    },
    // 取消喜欢视频
    cancelLikeVideo(userId, videoId) {
      return new Promise((resolve, reject) => {
        unlikeVideo(userId, videoId).then((res) => {
          resolve(res);
        }, (err) => {
          reject(err)
        });
      })
    },
    // 判断用户是否喜欢了此视频
    isLikeVideo(videoId) {
      return new Promise((resolve, reject) => {
        isLikeThisVideo(videoId).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 收藏视频
    collectVideo(userId, videoId) {
      return new Promise((resolve, reject) => {
        collectVideo(userId, videoId).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 取消收藏视频
    disCollectVideo(userId, videoId) {
      return new Promise((resolve, reject) => {
        disCollectVideo(userId, videoId).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 根据视频id获取视频
    getVideoById(videoId) {
      return new Promise((resolve, reject) => {
        getVideoInfoById(videoId).then(res => {

          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters: {
    allVideoList() {
      return this.videoList.map((item, index) => {
        item.id = index
        return item
      })

    }
  }
})
export default useVideoStore;