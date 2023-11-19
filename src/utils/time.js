/**
 * 秒转分钟
 */
export const secondToMinute = (second) => {
  if (isNaN(second)) second = 20
  var minute = parseInt(second / 60);
  var second = parseInt(second % 60);
  return addZero(minute) + ":" + addZero(second);
}
// 如果不够10则补0
export const addZero = (num) => {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}
