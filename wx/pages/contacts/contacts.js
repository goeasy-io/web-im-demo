/* contacts.js */
import restapi from '../../static/lib/restapi';
const app = getApp();

Page({
	data: {
		groups:{},
		friends:{},
	},
	onShow () {
		let currentUser = app.globalData.currentUser;
		let friends = restapi.findFriends(currentUser);
		let groups = restapi.findGroups(currentUser);
		this.setData({
			friends: friends,
			groups:	groups,
		});
	},
	chat (e) {//进入私聊
        let to = e.currentTarget.dataset.to;
        let type = e.currentTarget.dataset.type;
        let path = type === wx.GoEasy.IM_SCENE.PRIVATE?
            '../chat/privateChat/privateChat?to='+JSON.stringify(to)
            :'../chat/groupChat/groupChat?to='+ JSON.stringify(to);
        wx.navigateTo({ url : path });
	}
})
