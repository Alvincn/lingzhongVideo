// 通过vue-router插件实现模板路由配置
import { createRouter, createWebHistory } from 'vue-router';
import { constantRoute } from './routes';
import { ElMessage } from 'element-plus';
// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoute,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 };
  },
});
router.beforeEach((to, from, next) => {
  if (to.path === '/user') {
    if (!window.localStorage.getItem('token')) {
      ElMessage.warning('请先登录')
      next('/')
    }
  }
  next()
})

export default router;
