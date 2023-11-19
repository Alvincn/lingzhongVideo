import axios from "axios";
import { ElMessage } from "element-plus";
const request = axios.create({
  baseURL: '/api',
  timeout: 500000,
})
// 请求拦截器
request.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  }
  return config
})
// 响应拦截器
request.interceptors.response.use(response => {
  // if (response.data.status === 401) {
  //   return ElMessage.error('登录过期，请重新登录！')
  // }
  // if (response.data.status === 500) {
  //   return ElMessage.error('服务器错误！')
  // }
  // if (response.data.status === 403) {
  //   return ElMessage.error('权限不足，请联系管理员！')
  // }
  return response.data

})
export default request