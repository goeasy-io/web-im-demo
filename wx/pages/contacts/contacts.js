/* contacts.js */
import restapi from "../../static/lib/restapi";
const app = getApp()

Page({
	data: {
		groups:{},
		friends:{},
	},
	onShow () {
		let currentUser = app.globalData.service.currentUser;
		let friendList = restapi.findFriends(currentUser);
		friendList.map(friend => {
			this.data.friends[friend.uuid] = friend;
			this.data.friends[friend.uuid].online = false;
		});
		let groups = restapi.findGroups(currentUser);
		this.setData({
			groups:	groups,
			friends: this.data.friends,
		});
		this.hereNow();
		this.subscribeUserPresence();
		wx.goEasy.im.on(wx.GoEasy.IM_EVENT.USER_PRESENCE, (user) => {
			this.data.friends[user.id].online = (user.action === 'online' || user.action === 'join');
			this.setData({
				friends: this.data.friends
			})
		});
	},
	onUnload(){
		app.globalData.service.disconnect();
	},
	subscribeUserPresence () {
		let friendIds = Object.keys(this.data.friends);
		wx.goEasy.im.subscribeUserPresence({
			userIds: friendIds,
			onSuccess: function () {
				console.log('订阅上下线成功')
			},
			onFailed: function (error) {
				console.log('订阅好友上下线失败',error)
			}
		});
	},
	hereNow () {
		let self = this;
		let friendIds = Object.keys(this.data.friends);
		wx.goEasy.im.hereNow({
			userIds: friendIds,
			onSuccess: function (result) {
				result.content.map(friend => {
					self.data.friends[friend.id].online = true;
				});
				self.setData({
					friends: self.data.friends
				});
			},
			onFailed: function (error) {
				console.log('获取好友在线状态失败',error)
			}
		});
	},
	enterChat (e) {//进入私聊
		let type = e.currentTarget.dataset.type;
		let conversation = e.currentTarget.dataset.conversation;
		let path = type === wx.GoEasy.IM_SCENE.PRIVATE?
			'../chat/privateChat/privateChat?to='+conversation.uuid
			:'../chat/groupChat/groupChat?to='+ conversation.uuid;
		wx.navigateTo({
			url : path
		});
	}
})