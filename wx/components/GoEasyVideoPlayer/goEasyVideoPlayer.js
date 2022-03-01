
Component({
	options: {
		multipleSlots: true, // 在组件定义时的选项中启用多slot支持
	},
	data: {
		videoContext: null,
		show : false,
		src : '',
		duration : 0
	},
	methods: {
		play({url='', duration=0}) {
			this.setData({
				show : true,
				src : url,
				duration : duration,
				videoContext: wx.createVideoContext('videoPlayer', this)
			})
		},
		onPlay () {
			console.log('onplay');
			
			this.data.videoContext.requestFullScreen({
				direction : 0
			})
		},
		onFullScreenChange(e) {
			// 视频的全屏与退出全屏都会执行
			//当退出全屏播放时，隐藏播放器
			if(this.data.show && !e.detail.fullScreen){
					this.setData({
						show : false
					})
					this.data.videoContext.stop();
			}
		}
	},
	attached: function() {
		// 在组件实例进入页面节点树时执行
	},
	detached: function() {
		// 在组件实例被从页面节点树移除时执行
		if(this.data.videoContext != null){
			this.data.videoContext.stop();
		}
	}
})
