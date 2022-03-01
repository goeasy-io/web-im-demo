<template>
	<div class="message-item" :class="{'self' : message.senderId == currentUser.uuid}">
		<img :src="message.senderData.avatar" class="chat-avatar" v-if="type == 'group'"/>
		<img :src="currentUser.avatar" class="chat-avatar" v-else-if="message.senderId == currentUser.uuid">
		<img :src="to.avatar" class="chat-avatar" v-else>
		<div class="chat-message">
			<div class="pending" v-if="message.status == 'sending'"></div>
			<div class="send-fail" v-if="message.status == 'fail'"></div>
			<div class="text-content" v-if="message.type =='text'" v-html="decoder.decode(message.payload.text)"></div>
			<div class="image-content"  v-if="message.type == 'image'">
				<img :src="message.payload.url" @click="showImageFullScreen" />
			</div>
			<div class="file-content" v-if="message.type == 'file'">
				<img src="/static/images/file-content.png" alt="">
				<div class="description">
					<span class="title">{{message.payload.name}}</span>
					<span class="size">{{(message.payload.size/1024).toFixed(2)}} KB</span>
				</div>
			</div>
			<GoEasyVideoPlayer v-if="message.type == 'video'" :video="message.payload.video" :thumbnail="message.payload.thumbnail" />
			<GoEasyAudioPlayer v-if="message.type =='audio'" :src="message.payload.url" :duration="message.payload.duration" />
			<div class="custom-message" v-if="message.type == 'order'">
				<div class="title">
					<img src="/static/images/order.png" />
					<span>自定义消息</span>
				</div>
				<div class="custom-message-item">编号: {{message.payload.number}}</div>
				<div class="custom-message-item">商品: {{message.payload.goods}}</div>
				<div class="custom-message-item">金额: {{message.payload.price}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import GoEasyAudioPlayer from "../../../components/GoEasyAudioPlayer/GoEasyAudioPlayer";
	import GoEasyVideoPlayer from "../../../components/GoEasyVideoPlayer/GoEasyVideoPlayer";
	import EmojiDecoder from "../../../assets/lib/EmojiDecoder";
	export default {
		name: "chatMessage",
		props : ['message', 'to', 'currentUser','type'],
		components : {
			GoEasyAudioPlayer,
			GoEasyVideoPlayer
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
				decoder : new EmojiDecoder(emojiUrl, emojiMap)
			}
		},
		methods: {
			showImageFullScreen () {
				this.$emit('showImageFullScreen', this.message)
			}
		}
	}
</script>

<style>
	@import "./chatMessage.css";
</style>
