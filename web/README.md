# PC版(H5) Demo运行步骤


## 获取设置appkey
* 访问http://www.goeasy.io  注册GoEasy账号，创建应用，获得appkey
* 在main.js里将appkey替换为您自己的common key，运行即可

## 运行步骤

将目录切换到web-im-demo/web/

#### 安装依赖
```
npm ci
```

#### 运行服务

```
npm run serve
```

## 体验
打开浏览器即可体验

## 注意事项
要发送语音、视频和图片，请先[配置阿里云OSS参数](https://docs.goeasy.io/2.x/im/message/media/alioss)

