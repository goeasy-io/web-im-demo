//app.js
import GoEasy from './static/lib/goeasy-2.6.6.esm.min';

App({
    globalData: {
        currentUser: null
    },
    onLaunch: function () {
        wx.goEasy = GoEasy.getInstance({
            host:'hangzhou.goeasy.io',//应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
            appkey: 'BC-xxxx',// common key
            modules:['im']
        });
        wx.GoEasy = GoEasy;
    }
})
