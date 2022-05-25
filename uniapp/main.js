import Vue from 'vue';
import App from './App';
import GoEasy from './lib/goeasy-2.4.7.min';

Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue({
    ...App
});
app.$mount();
const goEasy = GoEasy.getInstance({
	host:'hangzhou.goeasy.io',//应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
	appkey:'BC-xxxx',	// common key,
    modules:['im'],
	// true表示支持通知栏提醒，false则表示不需要通知栏提醒
    allowNotification: true //仅有效于app,小程序和H5将会被自动忽略
});

goEasy.onClickNotification((message) => {
	let currentUrl;
	const routes = getCurrentPages();

	if ( routes &&  routes.length ) {
		const curRoute = routes[routes.length - 1].route;
		const curParam = routes[routes.length - 1].options;
		currentUrl = '/' + curRoute + `?to=${curParam.to}`;
	}

    let newUrl;
    switch(message.toType) {
        case GoEasy.IM_SCENE.PRIVATE:
            newUrl = '/pages/chat/privateChat/privateChat?to=' + message.senderId;
            break;
        case GoEasy.IM_SCENE.GROUP:
            newUrl = '/pages/chat/groupChat/groupChat?to=' + message.groupId;
            break;
    }

    if (currentUrl !== newUrl) {
        uni.navigateTo({
            url: newUrl,
        });
    }

});

Vue.prototype.GoEasy = GoEasy;
Vue.prototype.goEasy = goEasy;

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
