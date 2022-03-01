<template>
	<view class="group-member">
		<view class="member">
			<image :src="member.avatar"
				   class="group-member__item"
				   v-for="(member, key) in users"
				   :key="key">
			</image>
		</view>
	</view>
</template>

<script>
	export default {
		name : 'member',
		data () {
			return {
				users : {}
			}
		},
		onLoad (options) {
			//对话数据
			this.users = JSON.parse(options.users);
			uni.setNavigationBarTitle({
				title : '成员（' + (Object.keys(this.users).length || 0) +'）'
			});
		}
	}
</script>

<style>
	.member{
		padding: 20rpx;
	}
	.group-member__item{
		width: 96rpx;
		height: 96rpx;
		border-radius: 48rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}
</style>
