<template>
	<view class="chatInterface">
		<view class="scroll-view">
			<view class="all-history-loaded">
				{{allHistoryLoaded ? '已经没有更多的历史消息' : '下拉获取历史消息'}}
			</view>
			<!--已经收到的消息-->
			<view v-for="(message,index) in messages" :key="message.messageId">
				<!--时间显示，类似于微信，隔5分钟不发言，才显示时间-->
				<view class="time-lag">
					{{renderMessageDate(message, index)}}
				</view>
				<view class="message-item" :class="{'self' : message.senderId == (currentUser && currentUser.uuid)}">
					<view class="avatar"
						  v-if="message.senderId != (currentUser && currentUser.uuid)">
						<image :src="friend.avatar"></image>
					</view>
					<view class="avatar" v-else>
						<image :src="currentUser.avatar"></image>
					</view>
					<view class="content">
						<b class="pending" v-if="message.status == 'sending'"></b>
						<b class="send-fail" v-if="message.status == 'fail'"></b>
						<view v-if="message.type == 'text'" v-html="renderTextMessage(message)"></view>
						<image class="image-content" v-if="message.type == 'image'" :src="message.payload.url" :data-url="message.payload.url" @click="showImageFullScreen" mode="widthFix"></image>
						<view class="video-snapshot"  v-if="message.type == 'video'" :data-url="message.payload.video.url" @click="playVideo">
							<image :src="message.payload.thumbnail.url" mode="aspectFit"></image>
							<view class="video-play-icon"></view>
						</view>
						<GoEasyAudioPlayer v-if="message.type =='audio'" :src="message.payload.url" :duration="message.payload.duration" />
						<view class="custom-message" v-if="message.type == 'order'">
							<view class="title">
								<image src="../../../static/images/dingdan.png"></image>
								<text>自定义消息</text>
							</view>
							<view class="custom-message-item">编号：{{message.payload.number}}</view>
							<view class="custom-message-item">商品: {{message.payload.goods}}</view>
							<view class="custom-message-item">金额: {{message.payload.price}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="action-box" v-if="!video.visible">
			<view class="action-top">
				<view :class="[audio.visible ? 'record-icon record-open':'record-icon']" @click="switchAudioKeyboard"></view>
				<view class="record-input" @touchstart="onRecordStart" @touchend="onRecordEnd" v-if="audio.visible" >{{audio.recording ? '松开发送' : '按住录音'}}</view>
				<view class="message-input" v-else>
					<!-- GoEasyIM最大支持3k的文本消息，如需发送长文本，需调整输入框maxlength值 -->
					<input type="text" maxlength="700" placeholder="发送消息" v-model="content" @focus="messageInputFocusin">
				</view>
				<view class="file-icon emoji-icon" @click="showEmoji"></view>
				<view class="file-icon more-icon" @click="showMore"></view>
				<span class="send-message-btn" @click="sendTextMessage">发送</span>
			</view>
			<!--展示表情列表-->
			<view class="action-bottom" v-if="emoji.show" style="justify-content: space-around">
				<image class="emoji-item" v-for="(emojiItem, emojiKey, index) in emoji.map" :key="index" :src="emoji.url + emojiItem" @click="selectEmoji(emojiKey)"></image>
			</view>
			<!--更多-->
			<view class="action-bottom" v-if="more.show">
				<view class="more-item" @click="sendImage">
					<image src="../../../static/images/tupian.png"></image>
					<text>图片</text>
				</view>
				<view class="more-item" @click="sendVideo">
					<image src="../../../static/images/shipin.png"></image>
					<text>视频</text>
				</view>
				<view class="more-item" @click="showCustomMessageForm">
					<image src="../../../static/images/zidingyi.png"></image>
					<text>自定义消息</text>
				</view>
			</view>
		</view>
		<view class="record-loading" v-if="audio.recording"></view>
		<video v-if="video.visible" :src="video.url" id="videoPlayer" @fullscreenchange="onVideoFullScreenChange"></video>
	</view>
</template>

<script>
	import GoEasyAudioPlayer from "../../../components/GoEasyAudioPlayer/GoEasyAudioPlayer";
	import EmojiDecoder from "../../../lib/EmojiDecoder";
	const recorderManager = uni.getRecorderManager();

	export default {
		name: "privateChat",
		components : {
			GoEasyAudioPlayer,
		},
		data() {
			let emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
			let emojiMap = {
				'[么么哒]': 'emoji_3@2x.png',
				'[乒乓]': 'emoji_4@2x.png',
				'[便便]': 'emoji_5@2x.png',
				'[信封]': 'emoji_6@2x.png',
				'[偷笑]': 'emoji_7@2x.png',
				'[傲慢]': 'emoji_8@2x.png'
			};
			return {
				//聊天文本框
				content: '',
				friend: null,
				currentUser: null,
				//已经接收到的消息
				messages: [],
				//已经加载完所有历史消息
				allHistoryLoaded: false,

				//定义表情列表
				emoji : {
					url : emojiUrl,
					map : emojiMap,
                    show: false,
                    decoder:  new EmojiDecoder(emojiUrl, emojiMap),
				},
				more : {//更多按钮
					show : false
				},
				audio : {
					//语音录音中
					recording : false,
					//录音按钮展示
					visible : false
				},
				video : {
					visible : false,
					url : '',
					context : null
				}
			}
		},
		onReady () {
			this.video.context = uni.createVideoContext('videoPlayer',this);
			// https://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbartitle
			uni.setNavigationBarTitle({
				title : this.friend.name
			});
		},
		onShow () {
			this.more.show = false;
			this.emoji.show = false;
		},
		onLoad(options) {
			let imService = getApp().globalData.imService;
			this.currentUser = uni.getStorageSync('currentUser');
			//聊天对象
            let friendId = options.to;
            //从服务器获取最新的好友信息
            this.friend = imService.findFriendById(friendId);
			console.log('onLoad friend - ', this.friend);
			this.messages = imService.getPrivateMessages(friendId);
			//监听新消息
			imService.onNewPrivateMessageReceive =  (friendId, message)=> {
				if (friendId === this.friend.uuid) {
                    //聊天时，收到消息标记为已读
					this.markPrivateMessageAsRead(friendId);
					//收到新消息，是滚动到最底部
					this.scrollToBottom();
				}
			};
			//每次进入聊天页面，总是滚动到底部
			this.scrollToBottom();
            // 录音监听器
            this.initRecorderListeners();
			//收到的消息设置为已读
			if(this.messages.length !==0){
				this.markPrivateMessageAsRead(friendId);
			}
		},
		onPullDownRefresh(e) {
			this.loadMoreHistoryMessage();
		},
		onUnload() {
			//退出聊天页面之前，清空页面传入的监听器
			let imService = getApp().globalData.imService;
			if(imService) {
				imService.onNewPrivateMessageReceive =  (friendId, message)=> {};
			}
		},
		methods: {
            //渲染文本消息，如果包含表情，替换为图片
		    //todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
            renderTextMessage(message) {
				return '<span class="text-content">' + this.emoji.decoder.decode(message.payload.text) + '</span>'
            },
            //像微信那样显示时间，如果有几分钟没发消息了，才显示时间
            //todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
            renderMessageDate(message, index) {
                if (index === 0) {
                    return this.formatDate(message.timestamp)
                } else {
                    if (message.timestamp - this.messages[index - 1].timestamp > 5 * 60 * 1000) {
                        return this.formatDate(message.timestamp)
                    }
                }
                return '';
            },
			initRecorderListeners(){
				// 监听录音开始
				recorderManager.onStart(() => {
					this.audio.recording = true;
				});
				//录音结束后，发送
				recorderManager.onStop((res) => {
					this.audio.recording = false;
					let audioMessage = this.goEasy.im.createAudioMessage({
						to : {
							id : this.friend.uuid,
							type : this.GoEasy.IM_SCENE.PRIVATE,
							data : {
								name:this.friend.name,
								avatar:this.friend.avatar
							}
						},
						file: res,
						onProgress :function (progress) {
							console.log(progress)
						},
						notification : {
							title : this.currentUser.name + '发来一段语音',
							body : '[语音消息]'		// 字段最长 50 字符
						}
					});
					this.sendMessage(audioMessage);
				});
				// 监听录音报错
				recorderManager.onError(function(res){
					console.log("录音报错：",res);
				})
			},
			sendMessage(message){
            	let toId = message.to.id;
				let imService = getApp().globalData.imService;
            	let localHistory = imService.getPrivateMessages(toId);
				localHistory.push(message);
				this.goEasy.im.sendMessage({
					message: message,
					onSuccess: function (message) {
						console.log("发送成功.", message);
					},
					onFailed: function (error) {
						console.log("发送失败:",error);
					}
				});
			},
			sendTextMessage() {//发送消息
				if (this.content.trim() !== '') {
					let body = this.content;
					if(this.content.length >= 50){
						body = this.content.substring(0,30)+"...";
					}
					let textMessage = this.goEasy.im.createTextMessage({
						text: this.content,
						to : {
							id : this.friend.uuid,
							type : this.GoEasy.IM_SCENE.PRIVATE,
							data : {
								name:this.friend.name,
								avatar:this.friend.avatar
							}
						},
						notification : {
							title : this.currentUser.name + '发来一段文字',
							body : body
						}
					});
					this.sendMessage(textMessage);
				}
				this.scrollToBottom();
				this.content = "";
			},
			loadMoreHistoryMessage() {//历史消息
				let self = this;
				let lastMessageTimeStamp = Date.now();
				let lastMessage = this.messages[0];
				if (lastMessage) {
					lastMessageTimeStamp = lastMessage.timestamp;
				}
				let currentLength = this.messages.length;
				this.goEasy.im.history({
					userId: self.friend.uuid,
					lastTimestamp: lastMessageTimeStamp,
					onSuccess: function (result) {
						//获取本地记录
						let imService = getApp().globalData.imService;
						let localHistory = imService.getPrivateMessages(self.friend.uuid);
						//添加加载的记录到本地记录尾部
						let messages = result.content;
						for (let i = messages.length - 1; i >= 0; i--) {
							localHistory.unshift(messages[i]);
						}
						if (localHistory.length === currentLength) {
							self.allHistoryLoaded = true;
						}
						self.messages = localHistory;
						uni.stopPullDownRefresh();
					},
					onFailed: function (error) {
						//获取失败
						if(error.code === 401){
							console.log("获取历史消息失败,默认不开通，付费应用，可以在我的应用->查看详情，高级功能里自助开通");
						}else{
							console.log("获取历史消息失败, code:" + error.code + ",错误信息:" + error.content);
						}
						uni.stopPullDownRefresh();
					}
				});
			},
			//语音录制按钮和键盘输入的切换
			switchAudioKeyboard() {
				this.audio.visible = !this.audio.visible;
				if(uni.authorize){
					uni.authorize({
						scope : 'scope.record'
					})
				}
			},
			onRecordStart () {
				try{
					recorderManager.start();
				}catch(e){
					uni.showModal({
						title: '录音错误',
						content : '请在app和小程序端体验录音，Uni官方明确H5不支持getRecorderManager, 详情查看Uni官方文档'
					});
				}
			},
			onRecordEnd () {
				try{
					recorderManager.stop();
				}catch(e){
					console.log(e)
				}
			},
			sendVideo () {//发送文件
				uni.chooseVideo({
					success : (res) => {
						let videoMessage = this.goEasy.im.createVideoMessage({
							to : {
								id : this.friend.uuid,
								type : this.GoEasy.IM_SCENE.PRIVATE,
								data : {
									name:this.friend.name,
									avatar:this.friend.avatar
								}
							},
							file: res,
							onProgress :function (progress) {
								console.log(progress)
							},
							notification : {
								title : this.currentUser.name + '发来一个视频',
								body : '[视频消息]'		// 字段最长 50 字符
							}
						});
						this.sendMessage(videoMessage);
					}
				})
			},
			sendImage() {
				uni.chooseImage({
					count :1,
					success :(res) => {
						let imageMessage = this.goEasy.im.createImageMessage({
							to : {
								id : this.friend.uuid,
								type : this.GoEasy.IM_SCENE.PRIVATE,
								data : {
									name:this.friend.name,
									avatar:this.friend.avatar
								}
							},
							file: res,
							onProgress :function (progress) {
								console.log(progress)
							},
							notification : {
								title : this.currentUser.name + '发来一张图片',
								body : '[图片消息]'		// 字段最长 50 字符
							}
						});
						this.sendMessage(imageMessage);
					}
				});
			},
			showImageFullScreen (e) {
				var imagesUrl = [e.currentTarget.dataset.url];
				uni.previewImage({
					urls: imagesUrl
				});
			},
			playVideo (e) {
				this.video.visible = true;
				this.video.url = e.currentTarget.dataset.url;
				this.$nextTick(() => {
					this.video.context.requestFullScreen({
						direction : 0
					});
					this.video.context.play();
				});
			},
			onVideoFullScreenChange (e) {
				//当退出全屏播放时，隐藏播放器
				if(this.video.visible && !e.detail.fullScreen){
				    this.video.visible = false;
				    this.video.context.stop();
				}
			},
			messageInputFocusin () {
				this.more.show = false;
				this.emoji.show = false
			},
			showEmoji () {
				this.emoji.show = !this.emoji.show;
				this.more.show = false;
			},
			showMore () {
				this.more.show = !this.more.show;
				this.emoji.show = false
			},
			selectEmoji (emojiKey) {
				this.content +=emojiKey
			},
			showCustomMessageForm () {
            	let to = {
            		id : this.friend.uuid,
					name : this.friend.name,
					avatar : this.friend.avatar,
					type : this.GoEasy.IM_SCENE.PRIVATE
				};
				uni.navigateTo({
					url: '../customMessage/customMessage?to=' + JSON.stringify(to)
				});
			},
			scrollToBottom () {
				this.$nextTick(function(){
					uni.pageScrollTo({
						scrollTop: 2000000,
						duration : 10
					})
				});
			},
			markPrivateMessageAsRead (friendId) {
				this.goEasy.im.markPrivateMessageAsRead({
					userId: friendId,
					onSuccess: function () {
						console.log('标记为已读成功')
					},
					onFailed: function (error) {
						console.log(error);
					}
				});
			}
		}
	}
</script>

<style >
</style>
