/* login.js */
import restApi from '../../static/lib/restapi';
const app = getApp();
Page({
	data: {
		userSelector: {
			users: [],
			visible: false,
			index: 0,
			selectedUser: null
		},

		username:'',
		password: {
			visible: false,
			value: '123'
		},
		errorVisible: false
	},
	onLoad () {
		let users = restApi.findUsers();
		this.setData({
			['userSelector.users']: users
		})
	},
	switchSelectorVisible() {
		this.setData({
			['userSelector.visible']: !this.data.userSelector.visible
		})
	},
	selectUser(e) {
		let user = e.currentTarget.dataset.user;
		this.setData({
			['userSelector.visible']: false,
			['userSelector.selectedUser']: user,
			['username']: user.name
		})
	},
	switchPasswordVisible() {
		this.setData({
			['password.visible']: !this.data.password.visible
		})
	},
	login: function(e) {
		if (this.data.username.trim() !== '' && this.data.password.value.trim() !== '') {
			let user = restApi.findUser(this.data.username, this.data.password.value);
			if (user) {
				app.globalData.currentUser = user;
				// 页面跳转
				wx.switchTab({url:'../conversations/conversations'});
				return;
			}
		}
		this.setData({
			errorVisible:true
		});
	}
})
