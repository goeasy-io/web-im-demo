/* login.js */
const app = getApp()
Page({
	data : {
		currentUser : null
	},
	onShow () {
		this.setData({
			currentUser : wx.getStorageSync("currentUser")
		});
	},
	logout () {
		if(wx.goEasy.getConnectionStatus() !== 'disconnected') {
			wx.goEasy.disconnect({
				onSuccess: function(){
					console.log('注销成功')
					wx.removeStorageSync("currentUser");
					wx.redirectTo({
						url: '../login/login'
					});
				},
				onFailed: function(error){
					wx.showToast({
						title: "注销失败",
						duration: 3000
					});
					console.log("注销失败:", error);
				}
			});
		}
	}
})