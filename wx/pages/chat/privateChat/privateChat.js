/* privateChat.js */
import EmojiDecoder from "../../../static/lib/EmojiDecoder";
let emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
let emojiMap = {
	'[么么哒]': 'emoji_3@2x.png',
	'[乒乓]': 'emoji_4@2x.png',
	'[便便]': 'emoji_5@2x.png',
	'[信封]': 'emoji_6@2x.png',
	'[偷笑]': 'emoji_7@2x.png',
	'[傲慢]': 'emoji_8@2x.png'
};
const app = getApp();
Page({
	data: {
		content: '',
		friend: null,
		currentUser: null,
		messages: [],

		//默认为false展示输入框, 为true时显示录音按钮
		recordVisible: false,

		//所有历史消息加载完成标识
		allHistoryLoaded: false,
		//定义表情列表
		emoji : {
			url : emojiUrl,
			map : emojiMap,
			show: false,
			decoder:  new EmojiDecoder(emojiUrl, emojiMap),
		},
		more : {//更多按钮
			show : false
		}
	},
	onPullDownRefresh () {
		this.loadMoreHistoryMessage();
	},
	onLoad: function(options) {
		// 获取初始数据并加载
		let friendId = options.to;
		let service = app.globalData.service;
		let currentUser = service.currentUser;
		let friend = service.findFriendById(friendId);
		this.setData({
			friend: friend,
			currentUser: currentUser
		});
		// 获取消息
		let messages = service.getPrivateMessages(friendId);
		// 渲染表情与消息间隔5分钟显示时间
		this.renderMessages(messages);
		this.scrollToBottom();
		// 收到的消息设置为已读
		if(this.data.messages.length !==0){
			this.markPrivateMessageAsRead(friendId);
		}
        //传入监听器，收到一条私聊消息总是滚到到页面底部
        service.onNewPrivateMessageReceive =  (friendId, message)=> {
            if (friendId === this.data.friend.uuid) {
                this.renderMessages(this.data.messages);
				this.scrollToBottom();
				// 如果是好友发送则清除未读消息
                this.markPrivateMessageAsRead(friendId);
            }
        };
	},
	onUnload () {
		// 退出聊天页面之前，清空页面传入的监听器
		let service = app.globalData.service;
		if(service){
			service.onNewPrivateMessageReceive = function () {};
		}
	},
	onRecordStop(res) {
		// 发送语音
		let audioMessage = wx.goEasy.im.createAudioMessage({
			to: {
				id : this.data.friend.uuid,
				type : wx.GoEasy.IM_SCENE.PRIVATE,
				data : {
					name:this.data.friend.name,
					avatar:this.data.friend.avatar
				}
			},
			file: res.detail,
			onProgress :function (progress) {
				console.log(progress)
			}
		});
		this.sendMessage(audioMessage);
	},
	sendTextMessage() {
		// 发送文本与表情
		if (this.data.content.trim() !== '') {
			let textMessage = wx.goEasy.im.createTextMessage({
				text: this.data.content,
				to : {
					id : this.data.friend.uuid,
					type : wx.GoEasy.IM_SCENE.PRIVATE,
					data : {
						name:this.data.friend.name,
						avatar:this.data.friend.avatar
					}
				}
			});
			this.sendMessage(textMessage);
		}
		this.setData({
			content: ""
		});
	},
	sendImage(){
		// 发送图片
		let self = this;
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success (res) {
				let imageMessage = wx.goEasy.im.createImageMessage({
					to : {
						id : self.data.friend.uuid,
						type : wx.GoEasy.IM_SCENE.PRIVATE,
						data : {
							name: self.data.friend.name,
							avatar: self.data.friend.avatar
						}
					},
					file: res,
					onProgress :function (progress) {
						console.log(progress)
					}
				});
				self.sendMessage(imageMessage);
			}
		});
	},
	sendVideo(){
		// 发送视频
		let self = this;
		wx.chooseVideo({
			sourceType: ['album','camera'],
			maxDuration: 60,
			camera: 'back',
			success(res) {
				let videoMessage = wx.goEasy.im.createVideoMessage({
					to : {
						id : self.data.friend.uuid,
						type : wx.GoEasy.IM_SCENE.PRIVATE,
						data : {
							name: self.data.friend.name,
							avatar: self.data.friend.avatar
						}
					},
					file: res,
					onProgress :function (progress) {
						console.log(progress)
					}
				});
				self.sendMessage(videoMessage);
			}
		})
	},
	sendMessage(message){
		let self = this;
		let toId = message.to.id;
		let localHistory = app.globalData.service.getPrivateMessages(toId);
		localHistory.push(message);
		this.renderMessages(this.data.messages);
		this.scrollToBottom();
		wx.goEasy.im.sendMessage({
			message: message,
			onSuccess: function (message) {
				console.log("发送成功.", message);
				self.renderMessages(self.data.messages);
			},
			onFailed: function (error) {
				console.log("发送失败:",error);
				self.renderMessages(self.data.messages);
			}
		});
	},
	showCustomMessageForm(){
		let self = this;
		let customMessage = this.selectComponent("#customMessage");
		customMessage.setData({
			show: true,
			to: self.data.friend,
			type: wx.GoEasy.IM_SCENE.PRIVATE
		});
	},
	sendCustomMessage(event){
		let customerMessage = event.detail;
		this.sendMessage(customerMessage);
		// 发送自定义消息关闭更多菜单栏
		this.setData({
			["more.show"]: false,
			["emoji.show"]: false,
		});
	},
	loadMoreHistoryMessage() {
		//历史消息
		let self = this;
		let friendId = this.data.friend.uuid;
		let lastMessageTimeStamp = Date.now();
		let lastMessage = this.data.messages[0];
		if (lastMessage) {
			lastMessageTimeStamp = lastMessage.timestamp;
		}
		let currentLength = this.data.messages.length;
		wx.goEasy.im.history({
			userId: friendId,
			lastTimestamp: lastMessageTimeStamp,
			onSuccess: function (result) {
				//获取本地记录
				let localHistory = app.globalData.service.getPrivateMessages(friendId);
				//添加加载的记录到本地记录尾部
				let messages = result.content;
				for (let i = messages.length - 1; i >= 0; i--) {
					localHistory.unshift(messages[i]);
				}
				if (localHistory.length === currentLength) {
					self.setData({
						allHistoryLoaded: true
					});
				}
				self.data.messages = localHistory;
				self.renderMessages(self.data.messages);
				wx.stopPullDownRefresh();
			},
			onFailed: function (error) {
				//获取失败
				if(error.code === 401){
					console.log("获取历史消息失败,默认不开通，付费应用，可以在我的应用->查看详情，高级功能里自助开通");
				}else{
					console.log("获取历史消息失败, code:" + error.code + ",错误信息:" + error.content);
				}
				wx.stopPullDownRefresh();
			}
		});
	},
    renderMessages(messages){
        messages.forEach((message,index)=>{
            if(index === 0){
				// 当页面只有一条消息时，显示发送时间
                message.showTime = app.formatDate(message.timestamp);
            }else {
				// 当前消息与上条消息的发送时间进行比对，超过5分钟则显示当前消息的发送时间
				if (message.timestamp - messages[index - 1].timestamp > 5 * 60 * 1000) {
					message.showTime = app.formatDate(message.timestamp);
				}
            }
            if(message.type === 'text'){
				// 渲染表情与文本消息
                let text = this.data.emoji.decoder.decode(message.payload.text);
                message.node= text;
            }
        });
        this.setData({
            messages: messages
        });
    },
	markPrivateMessageAsRead (friendId) {
		wx.goEasy.im.markPrivateMessageAsRead({
			userId: friendId,
			onSuccess: function () {
				console.log('标记为已读成功')
			},
			onFailed: function (error) {
				console.log(error);
			}
		});
	},
	setContent(e) {
		// 监听输入的消息
		let content = e.detail.value;
		this.setData({
			content: content
		});
	},
	switchAudioKeyboard() {
		// 语音录制按钮和键盘输入的切换
		this.setData({
			recordVisible: !this.data.recordVisible
		});
		if(this.data.more.show || this.data.emoji.show){
			this.setData({
				["more.show"]: false,
				["emoji.show"]: false
			});
		}
		if(this.data.recordVisible){
			// 录音授权
			wx.authorize({
				scope: 'scope.record',
				success() {}
			});
		}
	},
	playVideo (e) {
		//播放视频
		this.selectComponent("#videoPlayer").play({
			url : e.currentTarget.dataset.url,
			duration : e.currentTarget.dataset.duration
		})
	},
	previewImage(event) {
		// 预览图片
		let imagesUrl = [event.currentTarget.dataset.src];
		wx.previewImage({
			urls: imagesUrl // 需要预览的图片http链接列表
		})
	},
    selectEmoji(e){
		// 选择表情
	    let emojiKey = e.currentTarget.dataset.emojikey;
		emojiKey = this.data.content + emojiKey;
	    this.setData({
            content: emojiKey
        });
    },
	messageInputFocusin(){
		this.setData({
			["more.show"]: false,
			["emoji.show"]: false
		});
	},
	showEmoji(){
		this.setData({
			["emoji.show"]: true,
			["more.show"]: false,
			recordVisible: false
		});
		// 关闭手机键盘
		wx.hideKeyboard().then(console.log).catch(console.log);
	},
	showMore(){
		this.setData({
			["more.show"]: true,
			["emoji.show"]: false
		});
		// 关闭手机键盘
		wx.hideKeyboard().then(console.log).catch(console.log);
	},
	scrollToBottom() { // 滑动到最底部
		wx.pageScrollTo({
			scrollTop : 200000,
			duration :10
		})
	}
})
