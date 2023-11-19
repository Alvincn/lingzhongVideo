/**
 * 视频操作类接口
 */
// 引入axios
import request from "../utils/request"
export const getVideoByPages = (page) => {
  return request({
    url: `/video/getVideo/${page}`,
    method: "get",
  })
}
// 获取所有视频标签
export const getAllVideoTag = () => {
  return request.get("/label/getAllLabel")
}
/**
 * 根据标签id获取视频
 * @param {*} labelId 标签id
 * @param {*} page 页码
 * @returns Get请求
 */
export const getVideoByTag = (labelId, page) => {
  return request.get(`/label/getVideoByLabelId/${labelId}/${page}`)
}
// 获取用户发的视频
export const getVideoByUser = (userId, page) => {
  return request.get('/video/getUserVideoByUserId', {
    params: {
      count: 20,
      page,
      userId
    }
  })
}
// 用户搜索视频
export const getSearchVideo = (content, count, page) => {
  return request.get(`/video/getVideoByEsAndHighLight/${content}/${page}/${count}`)
}
// 提交视频
export const uploadVideo = (formData) => {
  return request.post(`/video/uploadVideo`, formData)
}
// 根据视频id获取视频信息
export const getVideoInfoById = (videoId) => {
  return request.get('/video/getVideoVoByVideoId', {
    params: {
      videoId
    }
  })
}