import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GoEasy from 'goeasy'

const goEasy = GoEasy.getInstance({
    host: 'hangzhou.goeasy.io', //应用所在的区域地址: [hangzhou.goeasy.io, 新加坡暂不支持IM，敬请期待]
    appkey: 'BC-xxxx', // common key,
    modules: ['im'],
});

const app = createApp(App)
app.config.globalProperties.GoEasy = GoEasy;
app.config.globalProperties.goEasy = goEasy;

app.use(router).mount('#app')
