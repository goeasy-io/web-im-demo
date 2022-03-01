/* login.js */
import restapi from "../../static/lib/restapi";
Page({
	data: {
		username:"",
		password:"",
		showError:false,
	},
	login: function(e) {
		let username = e.detail.value.username;
		let password = e.detail.value.password;
		if (username.trim() !== "" && password.trim() !== "") {
			let user = restapi.findUser(username,password);
			if (user) {
				wx.setStorageSync('currentUser',user);
				// 页面跳转
				wx.switchTab({
					url:'../conversations/conversations'
				});
				return;
			}
		}
		this.setData({
			showError:true
		});
	}
})