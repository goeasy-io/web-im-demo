<template>
  <view class="group-member">
    <view class="member">
      <image :src="member.avatar"
             class="group-member__item"
             v-for="(member, key) in members"
             :key="key">
      </image>
    </view>
  </view>
</template>

<script setup>
  import {ref} from 'vue';
  import {onLoad} from "@dcloudio/uni-app";

  let members = ref([])

  onLoad((options) => {
    members.value = JSON.parse(options.members);
    uni.setNavigationBarTitle({
      title: '成员（' + (Object.keys(members.value).length || 0) + '）'
    });
  })
</script>

<style>
  .member {
    padding: 20rpx;
  }

  .group-member__item {
    width: 96rpx;
    height: 96rpx;
    border-radius: 48rpx;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
  }
</style>
