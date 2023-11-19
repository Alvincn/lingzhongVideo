import request from "../utils/request"
import axios from 'axios'
/**
 * 用户相关接口
 */
// 获取邮箱验证码
export const getCode = (mail) => {
  return request.post('/user/sentMailLoginAuthCode', mail)
}
// 邮箱验证码登录/注册
export const emailCodeLogin = (emailValue, codeValue) => {
  const email = emailValue
  const code = codeValue
  let str = `client_id=lingzhong&client_secret=lingzhong&grant_type=password&username={"userMail":"${email}","checkCode":"${code}","authType":"mail"}`
  return request.post(`/oauth/token`, str)
}
// 获取用户信息
export const getUserInfo = () => {
  return request.get('/user/getLoginUserInfo')
}
// 获取关注的人的数量
export const getFollowNum = (userId) => {
  return request.get('/attention/getMyAttentionCount', {
    params: {
      userId
    }
  })
}
// 获取我关注的人列表
export const getMyFollowList = (page = 0) => {
  return request.get('/attention/getMyAttentionPeople', {
    params: {
      page
    }
  })
}
// 获取我的粉丝列表
export const getMyFansList = (page = 0) => {
  return request.get('/attention/getAttentionMyPeople', {
    params: {
      page
    }
  })
}
// 获取粉丝数量
export const getFunsNum = (userId) => {
  return request.get('/attention/getAttentionMyCount', {
    params: {
      userId
    }
  })
}
// 关注某人
export const followUser = (beUserId) => {
  const data = new URLSearchParams()
  data.append('beUserId', beUserId)
  return request.post('/attention/attentionUserByUserId', data)
}
// 取消对某人的关注
export const unFollowUser = (beUserId) => {
  return request.delete('/attention/deleteAttentionByUserId', {
    params: {
      beUserId
    }
  })
}
// 获取用户喜欢的视频
export const getLikeVideo = () => {
  return request.get('/lingzhong/video/data/like/user')
}
// 获取用户收藏的视频
export const getCollectVideo = () => {
  return request.get('/lingzhong/video/data/collect/user')
}
// 根据经纬度获取城市
export const locationCity = (latitude, longitude) => {
  return axios.get(`https://restapi.amap.com/v3/ip?ip=114.247.50.2&output=json&key=ecbe23551ef1b1eabffd996309f559a5`)
}
// 根据用户id查询用户
export const getUserInfoById = (userId) => {
  return request.get('/user/getUserById', {
    params: {
      userId
    }
  })
}
// 判断用户是否关注了某人
export const followOne = (beUserId) => {
  return request.get('/attention/judgeMyIsAttention', {
    params: { beUserId }
  })
}