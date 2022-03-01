//app.js
import GoEasy from './static/lib/goeasy-2.2.7.min';

App({
    onLaunch: function () {
        wx.goEasy = GoEasy.getInstance({
            host:'hangzhou.goeasy.io',//应用所在的区域地址: [hangzhou.goeasy.io, 新加坡暂不支持IM，敬请期待]
            appkey: 'BC-xxxx',// common key
            modules:["im"]
        });
        wx.GoEasy = GoEasy;
    },
    formatDate: function(time) {
        const date = new Date(time);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        return [month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute].map(this.formatNumber).join(':');
    },
    formatNumber:function(n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    },
    globalData: {
        service: null,
    }
})
