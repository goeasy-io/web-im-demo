## GoEasy打造开发者最喜爱的Web IM聊天产品 - Uniapp实现IM聊天即时通讯
[开源Demo Git地址和使用说明](https://gitee.com/goeasy-io/GoEasyDemo-Uniapp-IM-Chat)

#### 功能列表
* 私聊、群聊、会话列表，文字、表情，图片，语音，视频消息
* 支持发送自定义业务消息，比如处方，订单，红包，地理位置等
* 手机通知栏提醒，厂商通道支持：iOS，谷歌FCM，华为，小米，VIVO，OPPO，魅族
* 消息已读未读，消息撤回，消息删除和历史查询
* 完美支持消息多端同步，断网自动重连，消息自动补发
* 支持服务端Rest接口
* 音视频实时通话：正在快速推进，敬请期待

#### 我们的优势
* 简单易用，参考demo源码和文档，小白也能快速集成
* 专为Web开发者打造， 一个SDK完美兼容Uniapp，H5和各种小程序
* 性能强悍，安全可靠，成熟稳定，服务众多知名企业：一加手机，爱尔眼科，清华大学出版社，格林豪泰连锁酒店
* 技术人员在线技术支持


### Demo运行步骤
* 访问http://www.goeasy.io  注册GoEasy账号，创建应用，获得appkey
* 在main.js里将appkey替换为您自己的common key，运行即可
* 在restapi.js 里 可以找到登陆用户名和密码


### 注意事项

#### 图片语音和OSS配置
若发送语音、视频和图片，需要先[配置阿里云OSS参数](https://www.goeasy.io/cn/im/media/alioss.html)

#### 通知栏提醒
* 将Uniapp应用运行到手机上，检查手机"系统设置"的通知推送里，确保该app的状态为“允许”
* 若希望APP进程杀掉后收到通知栏提醒，需接入厂商通道，详情请参阅[GoEasy接入厂商通道教程](https://www.goeasy.io/cn/im/notification/notification.html)。

#### 微信小程序
若打包为微信小程序，需要登录微信公众平台->微信小程序开发设置->服务器域名,
添加socket合法域名：wss://wx-hangzhou.goeasy.io

#### 技术支持和咨询
* [官方开发文档](https://www.goeasy.io/cn/developers/2.x.html)
* [访问官网，在线咨询技术专员或拨打技术支持电话](https://www.goeasy.io/)






![image](./static/images/im.gif)
