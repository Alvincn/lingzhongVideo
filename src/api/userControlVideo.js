/**
 * 用户操作视频接口
 */
import request from "../utils/request"
/**
 * 喜欢视频
 * @param {*} userId 用户Id
 * @param {*} videoId 视频Id
 * @returns Post请求
 */
export const likeVideo = (userId, videoId) => {
  const data = new URLSearchParams()
  data.append('beUserId', userId)
  data.append('videoId', videoId)
  return request.post('/lingzhong/video/data/like/add', data)
}
/**
 * 取消喜欢视频
 * @param {*} userId 用户Id
 * @param {*} videoId 视频Id
 * @returns Post请求
 */
export const unlikeVideo = (userId, videoId) => {
  const data = new URLSearchParams()
  data.append('beUserId', userId)
  data.append('videoId', videoId)
  return request.delete('/lingzhong/video/data/like/cancel', {
    params: {
      beUserId: userId,
      videoId: videoId
    }
  })
}
/**
 * 用户是否喜欢了这个视频，后端返回
 * 0：未喜欢，未收藏
 * 1：喜欢
 * 2：收藏
 * 3：收藏且喜欢
 * @param {*} videoId 视频id
 * @returns Get请求
 */
export const isLikeThisVideo = (videoId) => {
  return request.get('/lingzhong/video/data/check/like/collect', {
    params: {
      videoId: videoId
    }
  })
}
/**
 * 收藏视频
 * @param {*} userId 此视频发布者
 * @param {*} videoId 此视频id
 * @returns Post方法
 */
export const collectVideo = (userId, videoId) => {
  const data = new URLSearchParams()
  data.append('beUserId', userId)
  data.append('videoId', videoId)
  return request.post('/lingzhong/video/data/collect/add', data)
}
/**
 * 取消收藏视频
 * @param {*} userId 此视频发布者id
 * @param {*} videoId 此视频id
 * @returns Delete请求
 */
export const disCollectVideo = (userId, videoId) => {
  return request.delete('/lingzhong/video/data/collect/cancel', {
    params: {
      beUserId: userId,
      videoId: videoId
    }
  })
}
// 用户登录后推荐视频
export const loginGetVideo = (count) => {
  return request.get(`/video/recommendVideo/${count}`)
}