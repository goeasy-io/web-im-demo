<template>
  <div class="contact">
    <div class="contact-left">
      <div class="contact-list-title">群组</div>
      <div class="group-list">
        <div
          v-for="(group, key) in groups || []" :key="key" class="group-item"
          :class="{actived: profile.group && profile.group.id === group.id}"
          @click="showGroupProfile(group)"
        >
          <div class="group-avatar">
            <img :src="group.avatar"/>
          </div>
          <div class="group-name">{{ group.name }}({{ group.userList.length }})</div>
        </div>
      </div>
      <div class="contact-list-title">好友</div>
      <div class="friend-list">
        <div
          v-for="(friend, key) in friends || []" :key="key" class="friend-item"
          :class="{actived: profile.friend && profile.friend.id === friend.id}"
          @click="showFriendProfile(friend)"
        >
          <div class="friend-avatar">
            <img :src="friend.avatar"/>
          </div>
          <div class="friend">
            <div class="friend-name">{{ friend.name }}</div>
            <div class="friend-mail">{{ friend.email }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-main">
      <div class="profile-card" v-if="profile.friend">
        <div class="profile-card-title">
          <div class="profile-name">
            <i class="iconfont icon-zhanghu"></i>
            <div>{{ profile.friend.name }}</div>
          </div>
          <div class="profile-avatar">
            <img :src="profile.friend.avatar"/>
          </div>
        </div>
        <div class="friend-info">
          <div class="info-name">邮 箱</div>
          <div class="info-text">{{ profile.friend.email }}</div>
        </div>
        <div class="friend-info">
          <div class="info-name">手 机</div>
          <div class="info-text">{{ profile.friend.phone }}</div>
        </div>
        <div class="button-box">
          <button class="card-button" @click="privateChat">发消息</button>
        </div>
      </div>
      <div class="profile-card" v-if="profile.group">
        <div class="group-profile-name">{{ profile.group.name }}</div>
        <div class="group-members">
          <div class="member" v-for="(member, index) in profile.group.members" :key="index">
            <img class="member-avatar" :src="member.avatar"/>
            <span class="member-name">{{ member.name }}</span>
          </div>
        </div>
        <div class="button-box">
          <button class="card-button" @click="groupChat">发消息</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import restApi from "../api/restapi";

  export default {
    data() {
      return {
        friends: [],
        groups: [],
        profile: {
          friend: null,
          group: null
        },
      };
    },
    mounted() {
      const currentUser = this.globalData.currentUser;
      this.friends = restApi.findFriends(currentUser);
      this.groups = restApi.findGroups(currentUser);
    },
    methods: {
      showFriendProfile(friend) {
        this.profile.group = null;
        this.profile.friend = friend;
      },
      showGroupProfile(group) {
        this.profile.friend = null;
        this.profile.group = group;
        this.profile.group.members = [];

        group.userList.map((item) => {
          const info = restApi.findUserById(item);
          this.profile.group.members.push(info);
        });
      },
      privateChat () {
        this.$router.replace({
          path: '/conversations/privatechat/'+this.profile.friend.id,
          query: {
            name: this.profile.friend.name,
            avatar: this.profile.friend.avatar
          }
        });
      },
      groupChat () {
        this.$router.replace({
          path: '/conversations/groupchat/'+this.profile.group.id,
          query: {
            name: this.profile.group.name,
            avatar: this.profile.group.avatar
          }
        });
      }
    },
  };
</script>

<style scoped>
  .contact {
    width: 100%;
    height: 100%;
    display: flex;
    background: #F7F7F7;
    color: #333333;
  }

  .contact-left {
    width: 220px;
    height: 100%;
    border-right: #dbd6d6 1px solid;
  }

  .contact-list-title {
    margin: 10px 20px;
    font-size: 14px;
  }

  .friend-list {
    display: flex;
    flex-direction: column;
  }

  .group-list {
    display: flex;
    flex-direction: column;
  }

  .actived {
    background: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  }

  .friend-item {
    display: flex;
    padding: 5px 10px;
    cursor: pointer;
  }

  .friend-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 10%;
    margin-left: 10px;
  }

  .friend {
    width: 65%;
    margin: 0;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-left: 10px;
  }

  .friend-name {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
  }

  .friend-mail {
    line-height: 21px;
    color: #888888;
  }

  .group-item {
    display: flex;
    padding: 5px 10px;
    cursor: pointer;
    align-items: center;
  }

  .group-avatar {
    width: 40px;
    height: 40px;
    margin-left: 10px;
  }

  .group-avatar img{
    width: 40px;
    height: 40px;
  }

  .group-name {
    margin-left: 10px;
    width: 160px;
    text-align: left;
    font-size: 14px;
    line-height: 40px;
  }

  .contact-main {
    flex: 1;
    background: #FFFFFF;
  }

  .profile-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .profile-card-title {
    flex: 1;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .profile-name {
    width: 300px;
    font-size: 18px;
    display: flex;
    align-items: center;
  }

  .icon-zhanghu {
    font-size: 26px;
    color: #eeeeee;
    margin-right: 10px;
  }

  .profile-avatar {
    width: 80px;
  }

  .profile-avatar img {
    width: 80px;
    height: 80px;
    border-radius: 10%;
  }

  .friend-info {
    padding: 10px 30px;
    display: flex;
    justify-content: space-around;
    text-align: left;
    font-size: 14px;
    line-height: 45px;
  }

  .info-name {
    width: 100px;
  }

  .info-text {
    width: 200px;
  }

  .group-profile-name {
    font-size: 18px;
    padding: 20px 70px;
    border-bottom: 1px solid #eeeeee;
  }

  .group-members {
    width: 400px;
    min-height: 200px;
    margin: 20px auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }

  .group-members .member {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .group-members .member-avatar {
    width: 58px;
    margin-top: 20px;
    border-radius: 5%;
  }

  .group-members .member-name {
    color: gray;
    margin-top: 10px;
    font-size: 12px;
  }

  .button-box {
    padding: 40px 0;
  }

  .card-button {
    background: #eeeeee;
    color: #000000;
    font-size: 14px;
    border: none;
    display: flex;
    width: 120px;
    height: 35px;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
  }
</style>
