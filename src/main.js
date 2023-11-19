import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);
// 引入全局重置样式
import "@/styles/reset.scss"
// 引入Elementui-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
// 引入iconFont
import '@/assets/iconfont/iconfont.css'
// 引入Elementui-plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 引入pinia
import pinia from './store'
app.use(pinia)
// 引入路由
import router from './router';
app.use(router);

app.mount('#app')
