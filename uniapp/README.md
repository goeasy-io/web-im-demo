# Uniapp Demo运行步骤


## 获取设置appkey
访问http://www.goeasy.io  注册GoEasy账号，创建应用，获得appkey
在main.js里将appkey替换为您自己的common key

## 运行
hbilderX 直接运行即可


## 注意事项

#### 微信小程序
若打包为微信小程序，需要登录微信公众平台->微信小程序开发设置->服务器域名,
添加socket合法域名：wss://wx-hangzhou.goeasy.io

#### 图片语音和OSS配置
若发送语音、视频和图片，需要先[配置阿里云OSS参数](https://docs.goeasy.io/2.x/im/message/media/alioss)

#### 通知栏提醒
* 将Uniapp应用运行到手机上，检查手机"系统设置"的通知推送里，确保该app的状态为“允许”
* 若希望APP进程杀掉后收到通知栏提醒，需接入厂商通道，详情请参阅[GoEasy接入厂商通道教程](https://docs.goeasy.io/2.x/common/notification/manufacturer_integration)。


