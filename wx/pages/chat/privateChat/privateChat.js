/* privateChat.js */
import EmojiDecoder from '../../../static/lib/EmojiDecoder';
import restApi from '../../../static/lib/restapi';
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
			visible: false,
			decoder:  new EmojiDecoder(emojiUrl, emojiMap),
		},
		//是否展示‘其他消息类型面板’
		otherTypesMessagePanelVisible: false,
		// 展示消息删除弹出框
		actionPopup:{
			visible: false,
			message: null,
			recallable: false
		},
		// 消息选择
		messageSelector: {
			visible: false,
			messages: []
        },
	},
	onPullDownRefresh () {
		this.loadHistoryMessage(false);
	},
	onLoad: function(options) {
		// 获取初始数据并加载
		let friendId = options.to;
        let currentUser = wx.getStorageSync('currentUser');
		let friend = restApi.findUserById(friendId);
		this.setData({
			friend: friend,
			currentUser: currentUser
		});

		this.initialGoEasyListeners();
		this.loadHistoryMessage(true);
	},
	onUnload () {
		//退出聊天页面之前，清空监听器
		wx.goEasy.im.on(wx.GoEasy.IM_EVENT.MESSAGE_READ, () => {});
		wx.goEasy.im.on(wx.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, ()=>{});
        wx.goEasy.im.on(wx.GoEasy.IM_EVENT.MESSAGE_DELETED, ()=>{});
        wx.goEasy.im.on(wx.GoEasy.IM_EVENT.MESSAGE_RECALLED, ()=>{});
	},
	initialGoEasyListeners() {
		// 监听私聊消息
		wx.goEasy.im.on(wx.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, (message) => {
			console.log('PRIVATE_MESSAGE_RECEIVED:', message);
			let senderId = message.senderId;
			let receiverId = message.receiverId;
			let friendId = this.data.currentUser.uuid === senderId?receiverId:senderId;
			if (friendId === this.data.friend.uuid) {
				this.data.messages.push(message);
				this.renderMessages(this.data.messages);
				//聊天时，收到消息标记为已读
				this.markPrivateMessageAsRead();
				//收到新消息，是滚动到最底部
				this.scrollToBottom();
			}
		});
        //监听消息删除
		wx.goEasy.im.on(wx.GoEasy.IM_EVENT.MESSAGE_DELETED,(deletedMessages) => {
            let needRender = false;
			deletedMessages.forEach(message => {
				let senderId = message.senderId;
				let receiverId = message.receiverId;
				let friendId = this.data.currentUser.uuid === senderId?receiverId:senderId;
				if (friendId === this.data.friend.uuid) {
                    needRender = true;
					let index = this.data.messages.indexOf(message);
					if (index > -1) {
						this.data.messages.splice(index, 1);
                    }
				}
            });
            needRender && this.renderMessages(this.data.messages);
		})
		// 监听消息已读
		wx.goEasy.im.on(wx.GoEasy.IM_EVENT.MESSAGE_READ,(readMessages) => {
            let needRender = false;
			readMessages.forEach(message => {
				if (message.receiverId === this.data.friend.uuid) {
					needRender = true;
				}
            })
            needRender && this.renderMessages(this.data.messages);
        })
        // 监听消息撤回
		wx.goEasy.im.on(wx.GoEasy.IM_EVENT.MESSAGE_RECALLED,(recalledMessages) => {
            this.renderMessages(this.data.messages);
        })
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
				console.log(progress);
			}
		});
		this.sendMessage(audioMessage);
	},
	showActionPopup(e) {
		const selectedMessageId = e.currentTarget.dataset.messageid;
		let selectedMessage;
		this.data.messages.forEach(message => {
			if(message.messageId === selectedMessageId){
				selectedMessage = message;
			}
		});
		const MAX_RECALLABLE_TIME = 3 * 60 * 1000; //3分钟以内的消息才可以撤回
        let recallable = false;
		if ((Date.now() - selectedMessage.timestamp) < MAX_RECALLABLE_TIME && selectedMessage.senderId === this.data.currentUser.uuid && selectedMessage.status === 'success') {
			recallable = true;
		}
		this.setData({
			['actionPopup.recallable']: recallable,
            ['messageSelector.messages']: [selectedMessage],
			['actionPopup.visible']: true,
        });
	},
	hideActionPopup () {
		this.setData({
			['actionPopup.recallable']: false,
			['actionPopup.visible']: false,
			['messageSelector.messages']: [],
		});
	},
	deleteSingleMessage(){
		wx.showModal({
			content: '确认删除？',
			success: (res) => {
				this.setData({
					['actionPopup.visible']: false,
				});
				if (res.confirm) {
					this.deleteMessage();
				}
			},
		});
	},
	deleteMultipleMessages(){
		if (this.data.messageSelector.messages.length > 0) {
			wx.showModal({
				content: '确认删除？',
				success: (res) => {
					this.setData({
						['actionPopup.visible']: false,
					});
					if (res.confirm) {
						this.deleteMessage();
					}
				},
			});
		}
	},
	deleteMessage() {
		wx.goEasy.im.deleteMessage({
			messages: this.data.messageSelector.messages,
			onSuccess: ()=>{
				this.data.messageSelector.messages.forEach(message => {
					let index = this.data.messages.indexOf(message);
					if (index > -1) {
						this.data.messages.splice(index, 1);
					}
                });
				this.renderMessages(this.data.messages);
				this.setData({
					['messageSelector.messages']: [],
					['messageSelector.visible']: false,
				});
			},
			onFailed: (error) => {
				console.log('error:', error);
			}
		});
    },
    recallMessage() {
        this.setData({
            ['actionPopup.visible']: false,
        });
        wx.goEasy.im.recallMessage({
            messages: this.data.messageSelector.messages,
            onSuccess: ()=>{
                console.log('撤回成功');
                this.renderMessages(this.data.messages);
            },
            onFailed: (error) => {
                console.log('撤回失败,error:', error);
            }
        });
    },
    editRecalledMessage (e) {
	    if (this.data.recordVisible) {
		    this.setData({
			    ['recordVisible']: false,
		    });
	    }
        this.setData({
            ['content']: e.currentTarget.dataset.content,
        });
    },
	showCheckBox () {
		this.setData({
			['messageSelector.messages']: [],
			['messageSelector.visible']: true,
			['actionPopup.visible']: false,
        });
        this.data.messages.forEach(message => {
            message.checked = false;
        })
        this.renderMessages(this.data.messages);
	},
	selectMessages (e) {
		const selectedMessageIds = e.detail.value;
		let selectedMessages = [];
		this.data.messages.forEach(message => {
			if(selectedMessageIds.includes(message.messageId)){
				selectedMessages.push(message);
                message.checked = true;
			}
		})
		this.setData({
			['messageSelector.messages']: selectedMessages
		});
	},
	createTextMessage() {
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
			content: ''
		});
	},
	createImageMessage(){
		// 发送图片
		let self = this;
		wx.chooseImage({
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success (res) {
                res.tempFiles.forEach((file) => {
                    let imageMessage = wx.goEasy.im.createImageMessage({
                        to : {
                            id : self.data.friend.uuid,
                            type : wx.GoEasy.IM_SCENE.PRIVATE,
                            data : {
                                name: self.data.friend.name,
                                avatar: self.data.friend.avatar
                            }
                        },
                        file: file,
                        onProgress :function (progress) {
                            console.log(progress)
                        }
                    });
                    self.sendMessage(imageMessage);
                })
			}
		});
	},
	createVideoMessage(){
		// 发送视频
		let self = this;
        wx.chooseMedia({
            count: 9,
            mediaType: ['video'],
            sourceType: ['album', 'camera'],
            maxDuration: 30,
            camera: 'back',
            success(res) {
                res.tempFiles.forEach((file) => {
                    let videoMessage = wx.goEasy.im.createVideoMessage({
                        to : {
                            id : self.data.friend.uuid,
                            type : wx.GoEasy.IM_SCENE.PRIVATE,
                            data : {
                                name: self.data.friend.name,
                                avatar: self.data.friend.avatar
                            }
                        },
                        file: file,
                        onProgress :function (progress) {
                            console.log(progress)
                        }
                    });
                    self.sendMessage(videoMessage);
                })
            }
        })
    },
    createFileMessage(){
        let self = this;
        wx.chooseMessageFile({
            type: 'file',
            success (res) {
                res.tempFiles.forEach((file) => {
                    let fileMessage = wx.goEasy.im.createFileMessage({
                        to : {
                            id : self.data.friend.uuid,
                            type : wx.GoEasy.IM_SCENE.PRIVATE,
                            data : {
                                name:self.data.friend.name,
                                avatar:self.data.friend.avatar
                            }
                        },
                        file: file,
                        onProgress :function (progress) {
                            console.log(progress)
                        }
                    });
                    self.sendMessage(fileMessage);
                })
            }
        });
    },
	sendMessage(message){
		let self = this;
		let messages = this.data.messages;
		messages.push(message);
		this.renderMessages(messages);
		this.scrollToBottom();
		wx.goEasy.im.sendMessage({
			message: message,
			onSuccess: function (message) {
				console.log('发送成功.', message);
				self.renderMessages(self.data.messages);
			},
			onFailed: function (error) {
				if(error.code === 507){
					console.log('发送语音/图片/视频/文件失败，没有配置OSS存储，详情参考：https://www.goeasy.io/cn/docs/goeasy-2.x/im/message/media/send-media-message.html');
				}else{
					console.log('发送失败:',error);
				}
				self.renderMessages(self.data.messages);
			}
		});
	},
	showCustomMessageForm(){
		let self = this;
		let customMessage = this.selectComponent('#customMessage');
		customMessage.setData({
			show: true,
			to: self.data.friend,
			type: wx.GoEasy.IM_SCENE.PRIVATE
		});
	},
	createCustomMessage(event){
		let customerMessage = event.detail;
		this.sendMessage(customerMessage);
		// 发送自定义消息关闭更多菜单栏
		this.setData({
			otherTypesMessagePanelVisible: false,
			['emoji.visible']: false,
		});
	},
	loadHistoryMessage(scrollToBottom) {
		//历史消息
		let self = this;
		let friendId = this.data.friend.uuid;
		let lastMessageTimeStamp;
		let lastMessage = this.data.messages[0];
		if (lastMessage) {
			lastMessageTimeStamp = lastMessage.timestamp;
		}
		wx.goEasy.im.history({
			userId: friendId,
			lastTimestamp: lastMessageTimeStamp,
			onSuccess: function (result) {
				wx.stopPullDownRefresh();
				let messages = result.content;
				if (messages.length === 0) {
					self.setData({
						allHistoryLoaded: true
					});
				} else {
					let messageList = messages.concat(self.data.messages);
					self.renderMessages(messageList);
					if (scrollToBottom) {
						self.scrollToBottom();
						//收到的消息设置为已读
						self.markPrivateMessageAsRead();
					}
				}
			},
			onFailed: function (error) {
				//获取失败
				console.log('获取历史消息失败, code:' + error.code + ',错误信息:' + error.content);
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
                message.editable = message.type === 'text' && Date.now() - message.timestamp < 60 * 1000;
            }
            if(message.type === 'file'){
				// 渲染文件消息
                message.size = (message.payload.size / 1024).toFixed(2);
			}
        });
        this.setData({
            messages: messages
        });
    },
	markPrivateMessageAsRead () {
		wx.goEasy.im.markPrivateMessageAsRead({
			userId: this.data.friend.uuid,
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
		if(this.data.otherTypesMessagePanelVisible || this.data.emoji.visible){
			this.setData({
				otherTypesMessagePanelVisible: false,
				['emoji.visible']: false
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
		this.selectComponent('#videoPlayer').play({
			url : e.currentTarget.dataset.url,
			duration : e.currentTarget.dataset.duration
		});
	},
	previewImage(event) {
		// 预览图片
		let imagesUrl = [event.currentTarget.dataset.src];
		wx.previewImage({
			urls: imagesUrl // 需要预览的图片http链接列表
		});
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
			otherTypesMessagePanelVisible: false,
			['emoji.visible']: false
		});
	},
	showEmoji(){
		this.setData({
			['emoji.visible']: true,
			otherTypesMessagePanelVisible: false,
			recordVisible: false
		});
		// 关闭手机键盘
		wx.hideKeyboard().then(console.log).catch(console.log);
	},
	showMore(){
		this.setData({
			otherTypesMessagePanelVisible: !this.data.otherTypesMessagePanelVisible,
			['emoji.visible']: false
		});
		// 关闭手机键盘
		wx.hideKeyboard().then(console.log).catch(console.log);
	},
    scrollToBottom() { // 滑动到最底部
        setTimeout(() => {
            wx.pageScrollTo({
                scrollTop : 200000,
                duration :10
            });
        },600)
    },
    downLoadFile (e) {
        const message = e.currentTarget.dataset.message;
        if (message.status !== 'success') {
			return
        }
	    const file = message.payload;
        wx.showModal({
            title: "点击下载文件",
            showCancel: true,
            success: (res) => {
                if (res.confirm) {
                    wx.showLoading({
                        title: "正在下载文件...",
                        mask: true
                    });
                    const downloadTask = wx.downloadFile({
                        url: file.url,
                        success: (res) => {
                            if (res.statusCode === 200) {
                                wx.hideLoading();
                                const filePath = res.tempFilePath
                                wx.openDocument({
                                    filePath: filePath,
                                    success: function(res) {
                                    },
                                    fail(error) {
                                        wx.showToast({
                                            title: "打开文档失败",
                                            icon: "none",
                                            duration: 3000
                                        });
                                    }
                                })
                            }
                        },
                        fail: (error) => {
                            wx.showToast({
                                title: "下载文件失败",
                                icon: "none"
                            });
                            console.log('error',error);
                        }
                    });
                    downloadTask.onProgressUpdate((res) => {
                        console.log('下载进度' + res.progress);
                    });
                }
            }
        });
    }
})
