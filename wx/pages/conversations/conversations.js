const app = getApp();
import restApi from '../../static/lib/restapi.js';
import {formatDate} from '../../static/lib/utils';
Page({
	data : {
		conversations : [],
		actionPopup : {
			visible : false,
			conversation : null
		},
		currentUser: null
	},
	onShow () {
        let currentUser = app.globalData.currentUser;
		if(!currentUser){
			wx.redirectTo({
				url : '../login/login'
			});
			return;
		}
		this.setData({
			currentUser : currentUser
		});

		if (wx.goEasy.getConnectionStatus() === 'disconnected') {
			this.connectGoEasy();  //连接goeasy
			this.subscribeGroup(); //建立连接后，就应该订阅群聊消息，避免漏掉
		}
		this.listenConversationUpdate(); //监听会话列表变化
		this.loadConversations(); //加载会话列表
	},
	onHide(){
		// 销毁conversation监听器
		wx.goEasy.im.off(wx.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.renderConversations);
	},
	connectGoEasy() {
		wx.goEasy.connect({
			id: this.data.currentUser.id,
			data: {
				name: this.data.currentUser.name,
				avatar: this.data.currentUser.avatar
			},
			onSuccess: () => {
				console.log('GoEasy connect successfully.')
			},
			onFailed: (error) => {
				console.log('Failed to connect GoEasy, code:'+error.code+ ',error:'+error.content);
			},
			onProgress: (attempts) => {
				console.log('GoEasy is connecting', attempts);
			}
		});
	},
	// 加载最新的会话列表
	loadConversations() {
		wx.goEasy.im.latestConversations({
			onSuccess: (result) => {
				let content = result.content;
				this.renderConversations(content);
			},
			onFailed: (error) => {
				console.log('获取最新会话列表失败, error:', error);
			}
		});
	},
	listenConversationUpdate() {
		// 监听会话列表变化
		wx.goEasy.im.on(wx.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.renderConversations);
	},
	subscribeGroup() {
		let groups = restApi.findGroups(this.data.currentUser);
		let groupIds = groups.map(item => item.id);
		wx.goEasy.im.subscribeGroup({
			groupIds: groupIds,
			onSuccess: function () {
				console.log('订阅群消息成功');
			},
			onFailed: function (error) {
				console.log('订阅群消息失败:', error);
			}
		});
	},
	topConversation(){
		let self = this;
		let conversation = this.data.actionPopup.conversation;
		let failedDescription = conversation.top ? '取消置顶失败' : '置顶失败';
		wx.showLoading({title: '加载中...',mask: true});
		if(conversation.type === wx.GoEasy.IM_SCENE.PRIVATE){
			wx.goEasy.im.topPrivateConversation({
				userId: conversation.userId,
				top: !conversation.top,
				onSuccess: function () {
					wx.hideLoading();
				},
				onFailed: function (error) {
					self.showToast(failedDescription);
					console.log(error);
				}
			});
		}else{
			wx.goEasy.im.topGroupConversation({
				groupId: conversation.groupId,
				top: !conversation.top,
				onSuccess: function () {
					wx.hideLoading();
				},
				onFailed: function (error) {
					self.showToast(failedDescription);
					console.log(error);
				}
			});
		}
		this.closeMask();
	},
	removeConversation(){
		wx.showLoading({title: '加载中...',mask: true});
		let self = this;
		let failedDescription = '删除失败';
		let conversation = this.data.actionPopup.conversation;
		if(conversation.type ===  wx.GoEasy.IM_SCENE.PRIVATE){
			wx.goEasy.im.removePrivateConversation({
				userId: conversation.userId,
				onSuccess: function () {
					wx.hideLoading();
				},
				onFailed: function (error) {
					self.showToast(failedDescription);
					console.log(error);
				}
			});
		}else {
			wx.goEasy.im.removeGroupConversation({
				groupId: conversation.groupId,
				onSuccess: function () {
					wx.hideLoading();
				},
				onFailed: function (error) {
					self.showToast(failedDescription);
					console.log(error);
				}
			});
		}
		this.closeMask();
	},
	renderConversations (conversations) {
		conversations.conversations && conversations.conversations.map((item) => {
			// 格式化时间格式
			item.lastMessage.date = formatDate(item.lastMessage.timestamp)
		});
		this.setData({
			conversations : conversations.conversations
		});
		this.setUnreadAmount(conversations.unreadTotal);
	},
	setUnreadAmount(unreadTotal) {
		if(unreadTotal >0){
			wx.setTabBarBadge({
				index: 0,
				text: unreadTotal.toString(),
                fail:(e)=>{console.log(e)}
			});
		}else{
			wx.hideTabBarRedDot({
				index :0,
                fail:(e)=>{console.log(e)}
			});
		}
	},
	chat (e) {
		const conversation = e.currentTarget.dataset.conversation;
        let to,path
        if (conversation.type === wx.GoEasy.IM_SCENE.PRIVATE) {
            to = {
                id: conversation.userId,
                name: conversation.data.name,
                avatar: conversation.data.avatar
            }
            path = '../chat/privateChat/privateChat?to='+JSON.stringify(to)
        } else {
            to = {
                id: conversation.groupId,
                name: conversation.data.name,
                avatar: conversation.data.avatar
            }
            path = '../chat/groupChat/groupChat?to='+ JSON.stringify(to);
        }
		wx.navigateTo({ url : path });
	},
	showAction(e){
		const conversation = e.currentTarget.dataset.conversation;
		this.setData({
			['actionPopup.conversation']: conversation,
			['actionPopup.visible']: true
		});
	},
	showToast (failedDescription) {
		wx.hideLoading();
		wx.showToast({
			title: failedDescription,
			duration: 3000,
			icon: 'none'
		});
	},
	closeMask(){
		// 关闭弹窗
		this.setData({
			['actionPopup.visible']: false
		})
	},
})
