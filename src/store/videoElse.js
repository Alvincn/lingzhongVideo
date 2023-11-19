import { defineStore } from "pinia";
import { getAllVideoTag, getVideoByTag, getSearchVideo, uploadVideo } from '@/api/video'
/**
 * 视频分类之类的仓库
 */
const useVideoElseStore = defineStore({
  id: "videoElse",
  state() {
    return {
      // 所有标签
      videoLabel: [],
      // 当前页数
      videoPage: 0,
      // 根据标签获取到的视频
      videoByTag: []
    }
  },
  actions: {
    // 获取所有视频标签
    getAllVideoLabel() {
      return new Promise((resolve, reject) => {
        getAllVideoTag().then(res => {
          this.videoLabel = res.obj
          resolve(res.obj)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 根据标签获取视频
    getVideoByTag(labelId) {
      return new Promise((resolve, reject) => {
        getVideoByTag(labelId, this.videoPage).then(res => {
          this.videoByTag = res.obj
          resolve(res.obj)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 根据搜索内容获取视频
    getSearchVideo(content, count = 100, page = 1) {
      return new Promise((resolve, reject) => {
        getSearchVideo(content, count, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 上传视频
    uploadVideo(formData) {
      return new Promise((resolve, reject) => {
        uploadVideo(formData).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }

  },
  getters: {

  }
})
export default useVideoElseStore;