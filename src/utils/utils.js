/**
 * 动态引入图片
 * @params name 图片名
 */
export const getImageUrl = (name) => {
  return new URL(`../../assets/images/${name}`, import.meta.url).href
}
/**
 * 动态加载视频
 */
export const getVideoUrl = (name) => {
  return new URL(`../assets/video/${name}`, import.meta.url).href
}
import { ElMessage } from 'element-plus';
/**
 * 写入剪切板
 */
import useClipboard from 'vue-clipboard3';
const { toClipboard } = useClipboard()
export const copy = async (text) => {
  try {
    await toClipboard(text);  //实现复制
    // ElMessage({
    //   message: '复制成功！',
    //   grouping: true,
    //   type: 'success',
    // })
  } catch (e) {
    ElMessage({
      message: '复制失败！',
      grouping: true,
      type: 'error',
    })
  }
};