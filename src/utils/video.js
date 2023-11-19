/**
 * 视频播放操作
 */
// 播放
export const play = (video) => {
  video.play();
}
// 暂停
export const pause = (video) => {
  video.pause();
}
// 前进
export const seek = (video, time) => {
  video.currentTime += time;
}
// 后退
export const rewind = (video, time) => {
  video.currentTime -= time;
}
