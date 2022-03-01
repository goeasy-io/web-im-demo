import Vue from 'vue';
import App from './App.vue';
import router from './routers/index';
import GoEasy from "goeasy";
import IMService from "./assets/lib/imservice";

Vue.config.productionTip = false;

const goEasy = GoEasy.getInstance({
    host:'hangzhou.goeasy.io',//应用所在的区域地址: [hangzhou.goeasy.io, 新加坡暂不支持IM，敬请期待]
    appkey: 'BC-xxxx',// common key
    modules:["im"]
});

Vue.prototype.GoEasy = GoEasy;
Vue.prototype.goEasy = goEasy;
Vue.prototype.service = new IMService(goEasy,GoEasy);

Vue.prototype.formatDate = function (t) {
    t = t || Date.now();
    let time = new Date(t);
    let str = time.getMonth() < 9 ? ('0' + (time.getMonth() + 1)) : (time.getMonth() + 1);
    str += '-';
    str += time.getDate() < 10 ? ('0' + time.getDate()) : time.getDate();
    str += ' ';
    str += time.getHours();
    str += ':';
    str += time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes();
    return str;
};


new Vue({
    render: h => h(App),
    router
}).$mount('#app')
