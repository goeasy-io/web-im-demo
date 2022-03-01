Component({
	options: {
		addGlobalClass: true,
	},
	properties: {
		src: {
			type: String,
			value: ""
		},
		duration: {
			type: Number,
			value: 0
		}
	},
	data: {
		width: "",
		play: false,
		finalDuration: "",
		audioContext: null
	},
	methods: {
		playAudio() {
			// 播放时才创建audioContext,播放完毕销毁
			var self = this;
			this.setData({
				audioContext: wx.createInnerAudioContext()
			});
			this.data.audioContext.src = this.data.src;
			this.switchAudioState();
			setTimeout(() => {
				self.switchAudioState();
				self.data.audioContext.destroy();
			}, self.data.finalDuration*1000);

			this.data.audioContext.play();
			this.data.audioContext.onPlay(()=>{
				console.log("正在播放......");
			});
			this.data.audioContext.onError((res) => {
				console.log("audio error:",res)
			});
		},
		switchAudioState(){
			this.setData({
				play: !this.data.play
			});
		},
	},
	attached: function() {
		// 在组件实例进入页面节点树时执行
		this.setData({
			width: Math.ceil(this.data.duration)*7+80,
			finalDuration: Math.ceil(this.data.duration),
		});
	},
	detached: function() {
		// 在组件实例被从页面节点树移除时执行
		// 语音还在播放时退出该界面时audioContext还没有被销毁，因此调用该方法清空audioContext
		if(this.data.audioContext != null){
			this.data.audioContext.destroy();
		}
	},
})
