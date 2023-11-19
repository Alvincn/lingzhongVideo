// 主标题
export const MAIN_TITLE_CHINESE = '凌众短视频';
// 主标题英文
export const MAIN_TITLE_ENGLISH = 'LingZhong Video';
// 菜单
export const MENU_LIST = [
  {
    title: '首页',
    icon: 'House',
    value: '',
    path: '/',
    isActive: false
  },
  {
    title: '分类',
    icon: 'Grid',
    value: '',
    path: '/category',
    isActive: false
  },
  {
    title: '我的',
    icon: 'User',
    value: '',
    path: '/user',
    isActive: false
  },
  // {
  //   title: '关于',
  //   icon: 'StarFilled',
  //   value: '',
  //   path: '/about',
  //   isActive: false
  // },
  // {
  //   title: '关注',
  //   icon: 'Avatar',
  //   value: '',
  //   path: '/follow',
  //   isActive: false
  // },
]
// 视频鼠标右键出现的选项
export const MOUSE_CLICK_MENU_LIST = [
  {
    label: '暂停',
    value: 'stop',
    show: true
  },
  {
    label: '播放',
    value: 'play',
    show: true
  },
  {
    label: '复制视频链接',
    value: 'copy',
    show: true
  },
  {
    label: "评论",
    value: 'comments',
    show: true
  },
  {
    label: "快捷键说明",
    value: 'key',
    show: true
  }
]
// 视频前进和后退一次的时间（秒）
export const videoActionTime = 5