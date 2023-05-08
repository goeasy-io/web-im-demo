import Vue from 'vue';
import App from './App';
import GoEasy from '@/uni_modules/GOEASY-IM/js_sdk/goeasy-2.6.6.esm.min.js'

Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue({
    ...App
});
app.$mount();
const goEasy = GoEasy.getInstance({
    host: 'hangzhou.goeasy.io',	//应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
    appkey: 'BC-xxxx',	// common key,
    modules: ['im'],
    // true表示支持通知栏提醒，false则表示不需要通知栏提醒
    allowNotification: true //仅有效于app,小程序和H5将会被自动忽略
});

goEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, setUnreadNumber);
function setUnreadNumber (content) {
    let unreadTotal = content.unreadTotal;
    if(unreadTotal > 0) {
        uni.setTabBarBadge({
            index: 0,
            text: unreadTotal.toString()
        });
    }else{
        uni.removeTabBarBadge({index: 0});
    }
}

goEasy.onClickNotification((message) => {
    let currentUrl;
    const routes = getCurrentPages();

    if (routes && routes.length) {
        const curRoute = routes[routes.length - 1].route;
        const curParam = routes[routes.length - 1].options;
        currentUrl = '/' + curRoute + `?to=${curParam.to}`;
    }

    let newUrl;
    switch (message.toType) {
        case GoEasy.IM_SCENE.PRIVATE:
            newUrl = '/pages/privateChat?to=' + message.senderId;
            break;
        case GoEasy.IM_SCENE.GROUP:
            newUrl = '/pages/groupChat?to=' + message.groupId;
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

