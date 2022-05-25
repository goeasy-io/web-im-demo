const recorderManager = wx.getRecorderManager();
Component({
	options: {
		addGlobalClass: true, // 加载组件css文件,需在app.wxss中引入组件css文件
	},
	data: {
		recording: false,
		stopSignaled: false,
		clickLongPress: false,
	},
	methods: {
		startRecord: function() {
			console.log('start');
			this.setData({
				clickLongPress: true
			});
			recorderManager.start();
		},
		stopRecord: function() {
			console.log('end');

			if (!this.data.recording && this.data.clickLongPress) {
				console.log('in1', this.data.clickLongPress);

				this.setData({
					stopSignaled: true,
					clickLongPress: false
				});
			} else {
				this.setData({
					recording: false,
				});
				recorderManager.stop();
			}
		}
	},
	attached() {
		var self = this;
		recorderManager.onStart(function() {
			self.setData({
				recording: true,
				clickLongPress: false
			});
			if (self.data.stopSignaled) {
				self.setData({
					stopSignaled: false
				});
				recorderManager.stop();
			}
		});
		recorderManager.onStop(function(res) {

			self.setData({
				recording: false
			});
			if(res.duration < 1000) {
                wx.showToast({
                    icon: 'none',
                    title: '录音时间太短',
                    duration: 500
                });
				return;
			} else {
                self.triggerEvent('onStop', res);
            }
		});
		recorderManager.onError(function() {
			self.setData({
				recording: false
			});
		});
	}
})
