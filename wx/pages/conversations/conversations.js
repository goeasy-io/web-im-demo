const app = getApp()
import IMService from '../../static/lib/imservice.js';
Page({
	data : {
		conversations : [],
		action : {
			show : false,
			conversation : null
		}
	},
	onShow () {
		let currentUser = wx.getStorageSync("currentUser");
		if(!currentUser){
			wx.redirectTo({
				url : '../login/login'
			});
			return;
		}
		if (wx.goEasy.getConnectionStatus() === 'disconnected') {
			app.globalData.service = new IMService(wx.goEasy,wx.GoEasy);
			app.globalData.service.connect(currentUser);
		}
		wx.showLoading({title: '加载中',mask: true});
		//监听会话列表变化
		let self = this;
		wx.goEasy.im.on(wx.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, (conversations) => {
			// 设置tabBar未读消息总数以及conversation
			self.renderConversations(conversations);
		});
		//加载会话列表
		wx.goEasy.im.latestConversations({
			onSuccess: function (res) {
				let content = res.content;
				self.renderConversations(content);
				wx.hideLoading();
			},
			onFailed: function (error) {
				wx.hideLoading();
				console.log(e);
			}
		});
	},
	onHide(){
		// 销毁conversation监听器
		wx.goEasy.im.on(wx.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, (conversations) => {});
	},
	topConversation(){
		let self = this;
		let conversation = this.data.action.conversation;
		let failedDescription = conversation.top ? '取消置顶失败' : '置顶失败';
		wx.showLoading({title: "加载中...",mask: true});
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
		wx.showLoading({title: "加载中...",mask: true});
		let self = this;
		let failedDescription = "删除失败";
		let conversation = this.data.action.conversation;
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
			item.lastMessage.date = app.formatDate(item.lastMessage.timestamp)
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
				text: unreadTotal.toString()
			});
		}else{
			wx.hideTabBarRedDot({
				index :0
			});
		}
	},
	navigateToChat (e) {
		let conversation = e.currentTarget.dataset.conversation;
		let path = conversation.type === wx.GoEasy.IM_SCENE.PRIVATE?
			'../chat/privateChat/privateChat?to='+conversation.userId
			:'../chat/groupChat/groupChat?to='+ conversation.groupId;
		wx.navigateTo({
			url : path
		});
	},
	showAction(e){
		let conversation = e.currentTarget.dataset.conversation;
		this.setData({
			["action.conversation"]: conversation,
			["action.show"]: true
		});
	},
	showToast (failedDescription) {
		wx.hideLoading();
		wx.showToast({
			title: failedDescription,
			duration: 3000,
			icon: "none"
		});
	},
	closeMask(){
		// 关闭弹窗
		this.setData({
			["action.show"]: false
		})
	},
})