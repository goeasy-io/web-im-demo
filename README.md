# GoEasy IM Demo

GoEasy IM是GoEasy专门为Web前端开发者打造, 天生支持H5、Uniapp和各种小程序的IM即时通讯, 快速实现私聊、群聊、在线客服!

## 免注册体验在线示例
* [IM示例体验](https://baidu.com)
* [在线客服示例体验](https://baidu.com)


## 源码说明

````
web-im-demo------------------包含三个版本的IM聊天demo
    ├── uniapp---------------基于Uniapp，可直接编译为H5，微信小程序和App（iOS/Android）
    │    └── src-------------源码根目录  
    │        └── README.MD---运行步骤
    ├── web------------------PC版Demo，基于vue开发   
    │    └── README.MD-------运行步骤
    └── wx-------------------微信小程序原生开发
         └── README.MD-------运行步骤
````


## 应用场景
GoEasy IM可以帮助Web前端开发者快速实现私聊、群聊、在线客服等各种场景的IM功能

| 场景分类    | 场景     |
|---------|--------|
| 平台互动  | 站内私信  医患沟通 在线招聘   游戏互动  家校交流   线上课堂  |
| 政企办公  | 政府办公交流  企业工作沟通  |
| 社交沟通 | 兴趣社群   婚恋交友  校园交友  私密交友 |
| 在线客服 | 电商沟通 用户咨询 技术支持 |



## 主要功能和开发文档

[GoEasy IM开发文档](http://localhost:3000/2.x/im)

| 场景分类    | 场景     |
|---------|--------|
| 支持各种消息类型  | 支持发送文字、表情、图片、语音、和视频消息，也支持开发者根据业务需求实现类似于医生处方、电商订单以及红包等自定义类型消息的发送。 |
| 会话列表  | 支持发送文字、表情、图片、语音、和视频消息，也支持开发者根据业务需求实现类似于医生处方、电商订单以及红包等自定义类型消息的发送。|
| 消息云端存储 | 在任何设备上均可同步拉取云端消息历史记录，支持消息撤回、删除操作。也可以通过Webhook调用开发者设置的回调地址，将消息同步至指定服务器。 |
| 通知提醒和离线补发 |用户不在线或网络不稳定，系统将自动补发离线期间消息。<br/>支持通过微信公众号模板消息或手机通知栏推送提醒用户(支持所有主流手机厂商通道）|
| 多设备消息同步 | 支持同一用户的消息在多个不同设备（app、小程序和网页）之间保持实时同步，支持一个用户最多8个设备同时在线。 |



## GoEasy IM优势

| 优势   | 描述                                  |
|------|-------------------------------------|
| 集成简单 | 傻瓜式API， 最快半天集成！  |
| 高性价比 | 免费试用1年, 付费套餐最低199元/月起      |
| 一对一技术支持 | 技术人员在线提供1对1技术支持(周一至周五)， 紧急事务7 X 24小时电话技术支持             |
| 性能卓越 | 海量用户同时在线， 每秒千万级消息实时必达！                      |
| 安全私密 |独创GoEasy OTP技术结合HTTPS，确保您的数据私密传输|
| 健壮可靠 |跨区多活灾备，自动水平扩展，99.95%高可用承诺，完美应对爆发式活动支持|




