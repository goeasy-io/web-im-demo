import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import GoEasy from 'goeasy'

// 引入阿里字体图标
import './assets/iconfont/iconfont.css'; //todo：是否要在这里做？index.html或者app vue?

Vue.config.productionTip = false;

Vue.prototype.globalData = {
    currentUser: null
};

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');

const goEasy = GoEasy.getInstance({
    host: 'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
    appkey: 'BC-xxxx', // common key,
    modules: ['im'],
});

Vue.prototype.GoEasy = GoEasy;
Vue.prototype.goEasy = goEasy;

