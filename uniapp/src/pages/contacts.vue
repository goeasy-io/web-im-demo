<template>
  <view class="contacts">
    <view class="contacts-container">
      <view class="user-list">
        <view class="user-list-item" v-for="(group, id) in groups" :key="id" @click="groupChat(group)">
          <view class="user-item-avatar">
            <image :src="group.avatar"/>
          </view>
          <view class="user-item-info">
            <span class="user-item-info__name">{{ group.name }}</span>
          </view>
        </view>
      </view>
      <view class="contacts-title" v-if="friends && friends.length !==0">联系人</view>
      <view class="user-list">
        <view class="user-list-item" v-for="(friend, id) in friends" :key="id"
             @click="privateChat(friend)">
          <view class="user-item-avatar">
            <image :src="friend.avatar"></image>
          </view>
          <view class="user-item-info">
            <span class="user-item-info__name">{{ friend.name }}</span>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {inject} from 'vue';
  import restApi from '../lib/restapi';

  const currentUser = inject('currentUser');
  const friends = restApi.findFriends(currentUser.value);
  const groups = restApi.findGroups(currentUser.value);

  function privateChat (friend) {
    uni.navigateTo({
      url: './privateChat?to=' + friend.id
    });
  }
  function groupChat (group) {
    uni.navigateTo({
      url: './groupChat?to=' + group.id
    });
  }
</script>

<style>
  .contacts {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .contacts .contacts-container {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .contacts .user-list-item {
    height: 132rpx;
    padding-left: 32rpx;
    display: flex;
    align-items: center;
  }

  .contacts .contacts-title {
    height: 80rpx;
    line-height: 100rpx;
    font-size: 30rpx;
    color: #666666;
    background: #F3F4F7;
    text-indent: 44rpx;
  }

  .contacts .user-list {
    flex-grow: 1;
    background: #ffffff;
    display: flex;
    flex-direction: column;
  }

  .contacts .user-item-avatar {
    width: 96rpx;
    height: 96rpx;
    margin-right: 32rpx;
    overflow: hidden;
    position: relative;
  }

  .contacts .user-item-avatar image {
    width: 100%;
    height: 100%;
    display: block;
  }

  .contacts .user-item-info {
    height: 130rpx;
    padding-right: 32rpx;
    line-height: 88rpx;
    flex-grow: 1;
    border-bottom: 1px solid #EFEFEF;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .contacts .user-item-info__name {
    font-size: 30rpx;
    font-family: Source Han Sans CN;
    font-style: normal;
    font-weight: bold;
    color: #262628;
  }

</style>
