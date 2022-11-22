<template>
	<view class="content">
		<scroll-view :style="'height:'+height+'px'" class="scroll-view" :scroll-top="scrollTop" scroll-y @scrolltolower="lower" @scroll="scroll">
			<view v-for="(message,index) in messages">{{message}}</view>
		</scroll-view>
		<view class="footer">
			<button @click="sendMessage()">发送消息</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				height: 0,
				messages: []
			}
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					console.log("res:", res);
					this.height = res.windowHeight - res.statusBarHeight - res.windowTop - 75;
					console.log("res.navigationBarHeight:", this.height);
				}
			})
		},
		methods: {
			sendMessage() {
				let message = "文本消息:" + Date.now();
				this.messages.push(message);
			},
			scrollToBottom() {

			},
			lower() {
				console.log("触发lower...");
			},
			scroll() {
				console.log("监听滚动...");
			}
		}
	}
</script>

<style>
	page {
		/* height: 100%; */
	}
	
	.content {
		/* height: 100%; */
	}
	
	.scroll-view {
		/* height: calc(100vh - 150rpx); */
		/* height: 100%; */
	}
	.footer {
		height: 150rpx;
	}
</style>
