<template>
	<div class="contacts">
	        <div class="contacts-container">
				<div class="user-list">
					<div class="user-list-item" v-for="(group, uuid) in groups" :key="uuid" @click="enterChat(group.uuid, 'group')">
						<div class="user-item-avatar">
							<image :src="group.avatar" />
						</div>
						<div class="user-item-info">
							<span class="user-item-info__name">{{group.name}}</span>
						</div>
					</div>
				</div>
				<view class="contacts-title" v-if="friends && friends.length !=0">联系人</view>
	            <div class="user-list">
	                <div class="user-list-item" v-for="(friend, uuid) in friends" :key="uuid" @click="enterChat(friend.uuid, 'private')">
	                    <div class="user-item-avatar">
							<image :src="friend.avatar"></image>
	                    </div>
	                    <div class="user-item-info">
	                        <span class="user-item-info__name">{{friend.name}}</span>
							<span class="online-tips">{{friend.online ? '在线' :'离线'}}</span>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
</template>

<script>

	import restApi from "../../lib/restapi";

	export default {
		name: "contacts",
		data () {
			return {
				friends : [],
				groups : []
			}
		},
		onShow () {
			this.init()
		},
		methods : {
			init () {
				let currentUser = uni.getStorageSync('currentUser');
				let friendList = restApi.findFriends(currentUser);
				friendList.map((friend ,index)=> {
					friend.online = false;
					this.$set(this.friends, index, friend);
				});
				this.groups = restApi.findGroups(currentUser);
				this.subscribeUserPresence();
				this.hereNow();
				this.goEasy.im.on(this.GoEasy.IM_EVENT.USER_PRESENCE, (user) => {
					this.friends.map(friend => {
						if (friend.uuid == user.id) {
							let state = user.action === 'online' || user.action === 'join';
							this.$set(friend, 'online', state);
						}
					})
				})
			},
			subscribeUserPresence () {
				let friendIds = [];
				this.friends.map(friend => {
					friendIds.push(friend.uuid);
				});
				this.goEasy.im.subscribeUserPresence({
					userIds: friendIds,
					onSuccess: function () {
						console.log('订阅上下线成功')
					},
					onFailed: function (error) {
						console.log('订阅好友上下线失败',error)
					}
				});
			},
			hereNow () {
				let self = this;
				let friendIds = [];
				this.friends.map(friend => {
					friendIds.push(friend.uuid);
				})
				this.goEasy.im.hereNow({
					userIds: friendIds,
					onSuccess: function (result) {
						result.content.map(friend => {
							self.friends.map(item => {
								if(item.uuid == friend.id) {
									item.online = true;
								}
							})
						})
					},
					onFailed: function (error) {
						console.log('获取好友在线状态失败',error)
					}
				});
			},
			enterChat (uuid, type) {//进入私聊
				let path = type === this.GoEasy.IM_SCENE.PRIVATE
						? '../chat/privateChat/privateChat?to=' + uuid
						: '../chat/groupChat/groupChat?to=' + uuid;
				uni.navigateTo({
					url: path
				})
			}
		}
	}
</script>

<style>
	.contacts{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.contacts .contacts-container{
		width: 100%;
		overflow: auto;
	}

	.contacts .user-list-item{
	  height: 132rpx;
	  padding-left: 32rpx;
		display: flex;
		align-items: center;
	}
	.contacts .contacts-title{
		height: 80rpx;
		line-height: 100rpx;
		font-size: 30rpx;
		color: #666666;
		background: #F3F4F7;
		text-indent: 44rpx;
	}

	.contacts .user-list{
		flex-grow: 1;
		background: #ffffff;
		display: flex;
		flex-direction: column;
	}
	.contacts .user-item-avatar{
	  width: 96rpx;
	  height: 96rpx;
	  margin-right: 32rpx;
		overflow: hidden;
		position: relative;
	}
	.contacts .user-item-avatar image{
		width: 100%;
		height: 100%;
		display: block;
	}
	.contacts .user-item-info{
	  	height: 130rpx;
	  	padding-right: 32rpx;
	  	line-height: 88rpx;
		flex-grow: 1;
		border-bottom: 1px solid #EFEFEF;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.contacts .user-item-info__name{
	  	font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-style: normal;
		font-weight: bold;
		color: #262628;
	}
	.contacts .user-item-info__tips{
	  height: 44rpx;
	  width: 64rpx;
	  border-radius: 24rpx;
	  font-size: 26rpx;
	  line-height: 44rpx;
		background: #D02129;
		color: #ffffff;
		font-family: Cabin;
		text-align: center;
	}
	.contacts .online-dot{
	  position: absolute;
	  width: 32rpx!important;
	  height: 32rpx!important;
	  right: 0;
	  bottom: 0;
	}
	.contacts .online-tips{
		font-size: 28rpx;
		color: #666666;
	}
</style>
