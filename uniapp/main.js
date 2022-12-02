import App from './App'
import './lib/goeasy-2.5.13.min.js'
import { createSSRApp, ref } from 'vue'

const goEasy = GoEasy.getInstance({
  host: 'hangzhou.goeasy.io',	//应用所在的区域地址: [hangzhou.goeasy.io, 新加坡暂不支持IM，敬请期待]
  appkey: 'BC-xxxx',	// common key,
  modules: ['im'],
  // true表示支持通知栏提醒，false则表示不需要通知栏提醒
  allowNotification: true //仅有效于app,小程序和H5将会被自动忽略
});

const currentUser = ref({});

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

export function createApp() {
  const app = createSSRApp(App)

  app.provide('GoEasy', GoEasy);
  app.provide('goEasy', goEasy);
  app.provide('currentUser', currentUser);

  return {
    app
  }
}
