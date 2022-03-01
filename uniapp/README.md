
# Uniapp快速实现IM聊天，支持厂商通道，私聊群聊               
### 已经通过小程序，安卓，ios测试        

![image](./static/images/im.gif)

<p style="color: red; font-weight: bold">
微信小程序特别提醒：</p>
要打包为微信小程序，需要登录微信公众平台->微信小程序开发设置->服务器域名,
添加socket合法域名：wss://wx-hangzhou.goeasy.io            	      


## 运行步骤
* 要发送语音、视频和图片，请先[配置阿里云OSS参数](https://www.goeasy.io/cn/im/media/alioss.html)
* 在main.js里将appkey替换为您自己的common key
* 在restapi.js 里 可以找到用户名和密码 
* 系统默认不启用用户上下线提醒服务，付费应用可以登陆GoEasy，在“我的应用”里启用


### 体验
建议可以同时在浏览器和手机同时运行，体验多个客户端之间互动。

### 体验通知栏提醒
* 将Uniapp应用运行到手机上
* 检查手机"系统设置"的通知推送里，确保该app的状态为“允许”
* 将Uniapp应用运行到浏览器里，发送一条消息
    * 若手机APP在前台运行，APP内收到消息
    * 若手机APP在后台运行，手机收到通知栏提醒

### 接入厂商通道
如果希望APP进程被杀掉后，仍然可以收到通知栏提醒，必须要接入厂商通道，详情请参阅[GoEasy接入厂商通道教程](https://www.goeasy.io/cn/im/notification/notification.html)。

