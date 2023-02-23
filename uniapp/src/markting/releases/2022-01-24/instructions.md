

##关于直播间和聊天室
goeasy.im实现聊天室不够简单，不建议用于聊天室的实现。[点击这里获取](https://gitee.com/goeasy-io/GoEasyDemo-Uniapp-LiveChatRoom) GoEasy在Uniapp插件市场上传了另一个聊天室模板。 


## GoEasy IM介绍

[官方开发文档](https://www.goeasy.io/cn/developers/2.x.html)    [开源Demo下载](https://gitee.com/goeasy-io/GoEasyDemo-Uniapp-IM-Chat)


goeasy.im作为GoEasy的一个子功能，旨在帮助开发者简单、快速的实现聊天类应用（IM聊天，客服系统等）。

使用简单，功能全面，支持：
* 私聊
* 群聊
* 发送文字、表情、图片、语音、视频和自定义消息
* 集成厂商通道，通知栏提醒
* 会话列表
* 聊天历史消息
* 聊天用户上下线提醒
* Rest接口服务端发送


支持所有主流Web技术框架和平台：
* Web页面   
* Uniapp  
* 各种小程序   
* Taro    


### 示例说明
*  示例为方便演示，做了本地化的数据处理，在restapi.js 里可以找到用户名和密码
* 需[注册GoEasy](https://www.goeasy.io/cn/signup.html)平台获得appkey才可以使用相关功能

### 运行步骤
*   要发送语音、视频和图片，请先[配置阿里云OSS参数](https://www.goeasy.io/cn/docs/goeasy-2.x/im/message/media/alioss.html)
*   在main.js里将appkey替换为您[自己的common key](https://www.goeasy.io/cn/docs/goeasy-2.x/common/account/developer-account.html).
```
const goEasy = GoEasy.getInstance({
    host:'hangzhou.goeasy.io',
    appkey: 'BC-xxxx', //替换为自己的appkey
    allowNotification:true, //是否需要通知栏提醒，仅有效于app,小程序和H5将会被自动忽略
    modules:["im"]
});
```
*   在restapi.js 里可以找到用户名和密码

                                	      


### 体验

* <span style="color: red; font-weight: bold"> 微信小程序特别提醒：</span> 要打包为微信小程序，需要登录微信公众平台->微信小程序开发设置->服务器域名,
添加socket合法域名：wss://wx-hangzhou.goeasy.io        
* 建议可以同时在浏览器和手机上运行，体验多个客户端之间互动。

### 体验通知栏提醒
*   将Uniapp应用运行到手机上
*   检查手机"系统设置"的通知推送里，确保该app的状态为“允许”
*   将Uniapp应用运行到浏览器里，发送一条消息
    *   若手机APP在前台运行，APP内收到消息
    *   若手机APP在后台运行，手机收到通知栏提醒

### 接入厂商通道
如果希望APP进程被杀掉后，仍然可以收到通知栏提醒，必须要接入厂商通道，详情请参阅[GoEasy接入厂商通道教程](https://www.goeasy.io/cn/docs/goeasy-2.x/common/notification/notification.html)。





## 官方资源 

[官方开发文档](https://www.goeasy.io/cn/developers/2.x.html)   [开源Demo下载](https://gitee.com/goeasy-io/GoEasyDemo-Uniapp-IM-Chat)


![image](https://gitee.com/goeasy-io/GoEasyDemo-Uniapp-IM-Chat/raw/2.1/static/images/im.gif)



