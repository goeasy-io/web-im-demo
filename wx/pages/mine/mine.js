/* login.js */
const app = getApp();
Page({
	data : {
		currentUser : null
	},
	onShow () {
		this.setData({
			currentUser : app.globalData.currentUser
		});
	},
	logout () {
		if(wx.goEasy.getConnectionStatus() !== 'disconnected') {
			wx.showLoading({
				title: '注销中',
				mask: true,
			});
			wx.goEasy.disconnect({
				onSuccess: function(){
					wx.hideLoading();
					console.log('注销成功');
                    getApp().globalData.currentUser = null;
					wx.redirectTo({
						url: '../login/login'
					});
				},
				onFailed: function(error){
					wx.hideLoading();
					wx.showToast({
						icon: 'none',
						title:'注销超时，请检查网络！（务必确保注销成功才允许客户退出应用，否则有可能会收到上个用户的消息。）',
						duration: 6000
					});
					console.log('注销失败:', error);
				}
			});
		}
	}
})
