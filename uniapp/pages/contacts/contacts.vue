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
				<view class="contacts-title" v-if="friends && friends.length !==0">联系人</view>
	            <div class="user-list">
	                <div class="user-list-item" v-for="(friend, uuid) in friends" :key="uuid" @click="enterChat(friend.uuid, 'private')">
	                    <div class="user-item-avatar">
							<image :src="friend.avatar"></image>
	                    </div>
	                    <div class="user-item-info">
	                        <span class="user-item-info__name">{{friend.name}}</span>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
</template>

<script>
	import restApi from '../../lib/restapi';

	export default {
		name: 'contacts',
		data () {
			return {
				friends : [],
				groups : []
			}
		},
		onShow () {
			let currentUser = uni.getStorageSync('currentUser');
			this.friends = restApi.findFriends(currentUser);
			this.groups = restApi.findGroups(currentUser);
		},
		methods : {
			enterChat (uuid, type) {//进入聊天页面
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
</style>
