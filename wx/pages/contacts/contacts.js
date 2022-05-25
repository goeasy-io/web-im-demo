/* contacts.js */
import restapi from '../../static/lib/restapi';
const app = getApp();

Page({
	data: {
		groups:{},
		friends:{},
	},
	onShow () {
		let currentUser = wx.getStorageSync('currentUser');
		let friends = restapi.findFriends(currentUser);
		let groups = restapi.findGroups(currentUser);
		this.setData({
			friends: friends,
			groups:	groups,
		});
	},
	onUnload(){
		app.globalData.service.disconnect();
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
