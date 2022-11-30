import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import GoEasy from 'goeasy'

const goEasy = GoEasy.getInstance({
    host: 'hangzhou.goeasy.io', //应用所在的区域地址: [hangzhou.goeasy.io, 新加坡暂不支持IM，敬请期待]
    appkey: 'BC-xxxx', // common key,
    modules: ['im'],
});

let currentUser = ref({})

const app = createApp(App)
app.provide('GoEasy', GoEasy);
app.provide('goEasy', goEasy);
app.provide('currentUser', currentUser);


app.use(router).mount('#app')
