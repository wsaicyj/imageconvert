import { createApp } from 'vue'
import App from './App.vue'
import { createHead } from '@vueuse/head' // 导入 createHead

const app = createApp(App)
const head = createHead() // 创建 head 实例

app.use(head) // 将 head 插件添加到应用
// ... 其他 app.use() 调用 (router, store 等)

app.mount('#app')