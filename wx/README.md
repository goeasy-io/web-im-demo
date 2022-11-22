
# 微信小程序运行步骤               


## 获取设置appkey
* 访问http://www.goeasy.io  注册GoEasy账号，创建应用，获得appkey
* 在app.js里将appkey替换为您自己的common key


## 添加微信合法域名
https://mp.weixin.qq.com，进入微信公众平台|小程序 -> 设置 -> 开发设置 ->服务器域名   
socket合法域名-> 添加GoEasy的地址： wss://wx-hangzhou.goeasy.io（记得wx-开头）


## 运行
直接运行即可

## 注意事项
要发送语音、视频和图片，请先[配置阿里云OSS参数](https://docs.goeasy.io/2.x/im/message/media/alioss)

