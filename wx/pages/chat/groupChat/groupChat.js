/* groupChat.js */
// 定义表情
import EmojiDecoder from '../../../static/lib/EmojiDecoder';
import restApi from '../../../static/lib/restapi';
import {formatDate} from '../../../static/lib/utils';

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
        text: '',
        group: null,
        to: {},// 作为createMessage的参数
        currentUser: null,

        // 群名称
        chatTitle: '',
        groupMembers: {},

        // 表情
        emoji: {
            url: emojiUrl,
            map: emojiMap,
            visible: false,
            decoder: new EmojiDecoder(emojiUrl, emojiMap)
        },
        //是否展示‘其他消息类型面板’
        otherTypesMessagePanelVisible: false,
        orderList: {
            orders: [],
            visible: false
        },
        history: {
            messages: [],
            allLoaded: false,
            loading: false
        },
        audio: {
            //录音按钮展示
            visible: false
        },
        // 语音播放器
        audioPlayer: {
            innerAudioContext: null,
            playingMessage: null,
        },
        // 展示消息删除弹出框
        actionPopup: {
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
    onPullDownRefresh() {
        this.loadHistoryMessage(false);
    },
    onLoad(options) {
        // 初始化群数据
        let group = JSON.parse(options.to);
        let currentUser = app.globalData.currentUser;
        let groupMembers = restApi.findGroupMembers(group.id);
        let chatTitle = group.name + '（' + Object.keys(groupMembers).length + '）';

        this.setData({
            group: group,
            chatTitle: chatTitle,
            currentUser: currentUser,
            groupMembers: groupMembers,
            to: {
                id: group.id,
                type: wx.GoEasy.IM_SCENE.GROUP,
                data: {
                    name: group.name,
                    avatar: group.avatar
                }
            }
        });

        this.initialAudioPlayer();
        this.initialGoEasyListeners();
        this.loadHistoryMessage(true);
    },
    onUnload() {
        //退出聊天页面之前，清空监听器
        wx.goEasy.im.off(wx.GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, this.onMessageReceived);
        wx.goEasy.im.off(wx.GoEasy.IM_EVENT.MESSAGE_DELETED, this.onMessageDeleted);
        wx.goEasy.im.off(wx.GoEasy.IM_EVENT.MESSAGE_RECALLED, this.onMessageRecalled);
    },
    initialGoEasyListeners() {
        //监听群聊消息
        wx.goEasy.im.on(wx.GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, this.onMessageReceived);
        //监听消息删除
        wx.goEasy.im.on(wx.GoEasy.IM_EVENT.MESSAGE_DELETED, this.onMessageDeleted);
        // 监听消息撤回
        wx.goEasy.im.on(wx.GoEasy.IM_EVENT.MESSAGE_RECALLED, this.onMessageRecalled);
    },
    onMessageReceived(message) {
        let groupId = message.groupId;
        if (groupId === this.data.group.id) {
            this.data.history.messages.push(message);
            this.renderMessages(this.data.history.messages);
            //聊天时，收到消息标记为已读
            this.markGroupMessageAsRead();
            //收到新消息，是滚动到最底部
            this.scrollToBottom();
        }
    },
    onMessageDeleted(deletedMessages) {
        let needRender = false;
        deletedMessages.forEach(message => {
            let groupId = message.groupId;
            if (groupId && groupId === this.data.group.id) {
                let index = this.data.history.messages.indexOf(message);
                if (index > -1) {
                    needRender = true;
                    this.data.history.messages.splice(index, 1);
                }
            }
        });
        needRender && this.renderMessages(this.data.history.messages);
    },
    onMessageRecalled(recalledMessages) {
        this.renderMessages(this.data.history.messages);
    },
    initialAudioPlayer () {
        this.setData({
            ['audioPlayer.innerAudioContext']: wx.createInnerAudioContext(),
        });
        this.data.audioPlayer.innerAudioContext.onEnded(() => {
            this.setData({
                ['audioPlayer.playingMessage']: null,
            });
        });
        this.data.audioPlayer.innerAudioContext.onStop(() => {
            this.setData({
                ['audioPlayer.playingMessage']: null,
            });
        });
    },
    onRecordStop(res) {
        // 发送语音
        wx.goEasy.im.createAudioMessage({
            to: this.data.to,
            file: res.detail,
            onProgress: function (progress) {
                console.log(progress);
            },
            onSuccess: (message) => {
                this.sendMessage(message);
            },
            onFailed: (e) => {
                console.log('error :', e);
            }
        });
    },
    showActionPopup(e) {
        const selectedMessageId = e.currentTarget.dataset.messageid;
        let selectedMessage;
        this.data.history.messages.forEach(message => {
            if (message.messageId === selectedMessageId) {
                selectedMessage = message;
            }
        });
        const MAX_RECALLABLE_TIME = 3 * 60 * 1000; //3分钟以内的消息才可以撤回
        let recallable = false;
        if ((Date.now() - selectedMessage.timestamp) < MAX_RECALLABLE_TIME && selectedMessage.senderId === this.data.currentUser.id && selectedMessage.status === 'success') {
            recallable = true;
        }
        this.setData({
            ['actionPopup.recallable']: recallable,
            ['messageSelector.messages']: [selectedMessage],
            ['actionPopup.visible']: true,
        });
    },
    hideActionPopup() {
        this.setData({
            ['actionPopup.recallable']: false,
            ['actionPopup.visible']: false,
            ['messageSelector.messages']: [],
        });
    },
    deleteSingleMessage() {
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
    deleteMultipleMessages() {
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
            onSuccess: () => {
                this.data.messageSelector.messages.forEach(message => {
                    let index = this.data.history.messages.indexOf(message);
                    if (index > -1) {
                        this.data.history.messages.splice(index, 1);
                    }
                });
                this.renderMessages(this.data.history.messages);
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
            onSuccess: () => {
                console.log('撤回成功');
                this.renderMessages(this.data.history.messages);
            },
            onFailed: (error) => {
                console.log('撤回失败,error:', error);
            }
        });
    },
    editRecalledMessage(e) {
        if (this.data.audio.visible) {
            this.setData({
                ['audio.visible']: false,
            });
        }
        this.setData({
            ['text']: e.currentTarget.dataset.text,
        });
    },
    showCheckBox() {
        this.setData({
            ['messageSelector.messages']: [],
            ['messageSelector.visible']: true,
            ['actionPopup.visible']: false,
        });
        this.data.history.messages.forEach(message => {
            message.checked = false;
        })
        this.renderMessages(this.data.history.messages);
    },
    selectMessages(e) {
        const selectedMessageIds = e.detail.value;
        let selectedMessages = [];
        this.data.history.messages.forEach(message => {
            if (selectedMessageIds.includes(message.messageId)) {
                selectedMessages.push(message);
                message.checked = true;
            }
        });
        this.setData({
            ['messageSelector.messages']: selectedMessages,
        });
    },
    sendTextMessage() {
        // 发送文本与表情
        if (this.data.text.trim() !== '') {
            wx.goEasy.im.createTextMessage({
                text: this.data.text,
                to: this.data.to,
                onSuccess: (message) => {
                    this.sendMessage(message);
                },
                onFailed: (e) => {
                    console.log('error :', e);
                }
            });
        }
        this.setData({text: ''});
    },
    sendImageMessage() {
        // 发送图片
        let self = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                res.tempFiles.forEach((file) => {
                    wx.goEasy.im.createImageMessage({
                        to: self.data.to,
                        file: file,
                        onProgress: function (progress) {
                            console.log(progress)
                        },
                        onSuccess: (message) => {
                            self.setData({
                                otherTypesMessagePanelVisible: false
                            });
                            self.sendMessage(message);
                        },
                        onFailed: (e) => {
                            console.log('error :', e);
                        }
                    });
                })
            }
        });
    },
    sendVideoMessage() {
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
                    wx.goEasy.im.createVideoMessage({
                        to: self.data.to,
                        file: file,
                        onProgress: function (progress) {
                            console.log(progress)
                        },
                        onSuccess: (message) => {
                            self.setData({
                                otherTypesMessagePanelVisible: false
                            });
                            self.sendMessage(message);
                        },
                        onFailed: (e) => {
                            console.log('error :', e);
                        }
                    });
                })
            }
        })
    },
    sendFileMessage() {
        let self = this;
        wx.chooseMessageFile({
            type: 'file',
            success(res) {
                res.tempFiles.forEach((file) => {
                    wx.goEasy.im.createFileMessage({
                        to: self.data.to,
                        file: file,
                        onProgress: function (progress) {
                            console.log(progress)
                        },
                        onSuccess: (message) => {
                            self.setData({
                                otherTypesMessagePanelVisible: false
                            });
                            self.sendMessage(message);
                        },
                        onFailed: (e) => {
                            console.log('error :', e);
                        }
                    });
                })
            }
        });
    },
    sendOrderMessage(e) {
        let order = e.currentTarget.dataset.order;
        //GoEasyIM自定义消息,实现订单发送
        wx.goEasy.im.createCustomMessage({
            type: 'order',
            payload: order,
            to: this.data.to,
            onSuccess: (message) => {
                this.setData({
                    otherTypesMessagePanelVisible: false
                });
                this.sendMessage(message);
            },
            onFailed: (e) => {
                console.log('error :', e);
            }
        });
        this.setData({
            ['orderList.visible']: false
        });
    },
    sendMessage(message) {
        let self = this;
        let messages = this.data.history.messages;
        messages.push(message);
        this.renderMessages(messages);
        this.scrollToBottom();
        wx.goEasy.im.sendMessage({
            message: message,
            onSuccess: function (message) {
                console.log('发送成功.', message);
                self.renderMessages(self.data.history.messages);
            },
            onFailed: function (error) {
                if (error.code === 507) {
                    console.log('发送语音/图片/视频/文件失败，没有配置OSS存储，详情参考：https://docs.goeasy.io/2.x/im/message/media/alioss');
                } else {
                    console.log('发送失败:', error);
                }
                self.renderMessages(self.data.history.messages);
            }
        });
    },
    loadHistoryMessage(scrollToBottom) { //历史消息
        this.setData({
            ['history.loading']: true
        });
        let self = this;
        let lastMessageTimeStamp;
        let lastMessage = this.data.history.messages[0];
        if (lastMessage) {
            lastMessageTimeStamp = lastMessage.timestamp;
        }
        let groupId = this.data.group.id;
        wx.goEasy.im.history({
            groupId: groupId,
            lastTimestamp: lastMessageTimeStamp,
            onSuccess: function (result) {
                wx.stopPullDownRefresh();
                self.setData({
                    ['history.loading']: false
                });
                let messages = result.content;
                if (messages.length === 0) {
                    self.setData({
                        ['history.allLoaded']: true
                    });
                } else {
                    let messageList
                    if (lastMessageTimeStamp) {
                        messageList = messages.concat(self.data.history.messages);
                    } else {
                        messageList = messages;
                    }
                    if (messages.length < 10) {
                        self.setData({
                            ['history.allLoaded']: true
                        });
                    }
                    self.renderMessages(messageList);
                    if (scrollToBottom) {
                        self.scrollToBottom();
                        //收到的消息设置为已读
                        self.markGroupMessageAsRead();
                    }
                }
            },
            onFailed: function (error) {
                //获取失败
                console.log('获取历史消息失败, code:' + error.code + ',错误信息:' + error.content);
                wx.stopPullDownRefresh();
                self.setData({
                    ['history.loading']: false
                });
            }
        });
    },
    renderMessages(messages) {
        messages.forEach((message, index) => {
            if (index === 0) {
                // 当页面只有一条消息时，显示发送时间
                message.showTime = formatDate(message.timestamp);
            } else {
                // 当前消息与上条消息的发送时间进行比对，超过5分钟则显示当前消息的发送时间
                if (message.timestamp - messages[index - 1].timestamp > 5 * 60 * 1000) {
                    message.showTime = formatDate(message.timestamp);
                }
            }
            if (message.type === 'text') {
                // 渲染表情与文本消息
                let text = this.data.emoji.decoder.decode(message.payload.text);
                message.node = text;
                message.editable = message.type === 'text' && Date.now() - message.timestamp < 60 * 1000;
            }
            if (message.type === 'file') {
                // 渲染文件消息
                message.size = (message.payload.size / 1024).toFixed(2);
            }
            if (message.type === 'audio') {
                message.width = Math.ceil(message.payload.duration)*7+80+'rpx';
                message.finalDuration = Math.ceil(message.payload.duration)
            }
        });
        this.setData({
            ['history.messages']: messages
        });
    },
    showMembers() { //显示群成员
        wx.navigateTo({
            url: '../groupMember/groupMember?group=' + JSON.stringify(this.data.group)
        });
    },
    markGroupMessageAsRead() {
        wx.goEasy.im.markGroupMessageAsRead({
            groupId: this.data.group.id,
            onSuccess: function () {
                //标记成功
                console.log('标记成功');
            },
            onFailed: function (error) {
                //标记失败
                console.log(error);
            }
        });
    },
    setContent(e) {
        // 监听输入的消息
        let text = e.detail.value;
        this.setData({text: text});
    },
    switchAudioKeyboard() {
        // 语音录制按钮和键盘输入的切换
        this.setData({
            ['audio.visible']: !this.data.audio.visible
        });
        if (this.data.otherTypesMessagePanelVisible || this.data.emoji.visible) {
            this.setData({
                otherTypesMessagePanelVisible: false,
                ['emoji.visible']: false
            });
        }
        if (this.data.audio.visible) {
            // 录音授权
            wx.authorize({
                scope: 'scope.record',
                success() {
                }
            });
        }
    },
    playAudio(e) {
        let audioMessage = e.currentTarget.dataset.message;
        let playingMessage = this.data.audioPlayer.playingMessage;

        if (playingMessage) {
            this.data.audioPlayer.innerAudioContext.stop();
            // 如果点击的消息正在播放，就认为是停止播放操作
            if (playingMessage.messageId === audioMessage.messageId) {
                return;
            }
        }
        this.setData({
            ['audioPlayer.playingMessage']: audioMessage
        });
        this.data.audioPlayer.innerAudioContext.src = audioMessage.payload.url;
        this.data.audioPlayer.innerAudioContext.play();
    },
    playVideo(e) {
        //播放视频
        this.selectComponent('#videoPlayer').play({
            url: e.currentTarget.dataset.url,
            duration: e.currentTarget.dataset.duration
        });
    },
    previewImage(event) {
        // 预览图片
        let imagesUrl = [event.currentTarget.dataset.src];
        wx.previewImage({
            urls: imagesUrl // 需要预览的图片http链接列表
        });
    },
    chooseEmoji(e) {
        // 选择表情
        let emojiKey = e.currentTarget.dataset.emojikey;
        emojiKey = this.data.text + emojiKey;
        this.setData({
            text: emojiKey
        });
    },
    messageInputFocusin() {
        this.setData({
            otherTypesMessagePanelVisible: false,
            ['emoji.visible']: false
        });
    },
    showOrderMessageList() {
        this.setData({
            ['orderList.orders']: restApi.getOrderList(),
            ['orderList.visible']: true
        });
    },
    hideOrderMessageList() {
        this.setData({
            ['orderList.visible']: false
        });
    },
    switchEmojiKeyboard() {
        this.setData({
            ['emoji.visible']: !this.data.emoji.visible,
            otherTypesMessagePanelVisible: false,
            ['audio.visible']: false
        });
        // 关闭手机键盘
        wx.hideKeyboard().then(console.log).catch(console.log);
    },
    showOtherTypesMessagePanel() {
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
                scrollTop: 200000,
                duration: 10
            });
        }, 600)
    },
    downLoadFile(e) {
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
                                    success: function (res) {
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
                            console.log('error', error);
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
