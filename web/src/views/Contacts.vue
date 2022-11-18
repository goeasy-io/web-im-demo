<template>
  <div class="contact">
    <div class="contact-left">
      <div class="tab-list">
        <div :class="currentTab === 'friend'? 'tab-item selected' : 'tab-item'" @click="switchTab('friend')">好友</div>
        <div :class="currentTab === 'group'? 'tab-item selected' : 'tab-item'" @click="switchTab('group')">群组</div>
      </div>
      <div class="contact-list" v-if="currentTab === 'friend'">
        <div
          v-for="(friend, key) in friends || []" :key="key"
          :class="profile&&profile.id === friend.id? 'friend-item selected':'friend-item'"
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
      <div class="contact-list" v-if="currentTab === 'group'">
        <div
          v-for="(group, key) in groups || []"
          :class="profile&&profile.id === group.id? 'group-item selected':'group-item'"
          :key="key"
          @click="showGroupProfile(group)"
        >
          <div class="group-avatar">
            <img :src="group.avatar"/>
          </div>
          <div class="group-name">{{ group.name }}({{ group.userList.length }})</div>
        </div>
      </div>
    </div>
    <div class="contact-main" v-if="profile.id">
      <div class="profile-card" v-if="!profile.members">
        <div class="card-title">
          <div class="profile-name">
            <i class="iconfont icon-zhanghu"></i>
            <div>{{ profile.name }}</div>
          </div>
          <div class="profile-avatar">
            <img :src="profile.avatar"/>
          </div>
        </div>
        <div class="info-item">
          <div class="info-name">邮 箱</div>
          <div class="info-text">{{ profile.email }}</div>
        </div>
        <div class="info-item">
          <div class="info-name">手 机</div>
          <div class="info-text">{{ profile.phone }}</div>
        </div>
        <div class="button-box">
          <button class="card-button" @click="privateChat">发消息</button>
        </div>
      </div>
      <div class="profile-card" v-else>
        <div class="group-profile-name">{{ profile.name }}</div>
        <div class="group-members">
          <div class="member" v-for="(member, index) in profile.members" :key="index">
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
        currentTab: 'friend',
        profile: {
          id: null,
          name: null,
          avatar: null
        },
        groupMembers: [],
      };
    },
    mounted() {
      const currentUser = this.globalData.currentUser;
      this.friends = restApi.findFriends(currentUser);
      this.groups = restApi.findGroups(currentUser);
    },
    methods: {
      switchTab(tab) {
        this.currentTab = tab;
      },
      showFriendProfile(friend) {
        this.profile = friend;
      },
      showGroupProfile(group) {
        this.profile = group;
        this.profile.members = [];

        group.userList.map((item) => {
          const info = restApi.findUserById(item);
          this.profile.members.push(info);
        });
      },
      privateChat () {
        this.$router.replace({
          path: '/conversations/privatechat/'+this.profile.id,
          query: {
            name: this.profile.name,
            avatar: this.profile.avatar
          }
        });
      },
      groupChat () {
        this.$router.replace({
          path: '/conversations/groupchat/'+this.profile.id,
          query: {
            name: this.profile.name,
            avatar: this.profile.avatar
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
    width: 260px;
    height: 100%;
    border-right: #dbd6d6 1px solid;
  }

  .tab-list {
    padding: 20px;
    display: flex;
  }

  .tab-item {
    flex: 1;
    text-align: center;
    color: #403a3a;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .tab-list .selected {
    border-bottom: 2px solid #606266;
  }

  .contact-list {
    display: flex;
    flex-direction: column;
  }

  .contact-list .selected {
    background: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  }

  .friend-item {
    display: flex;
    padding: 5px 10px;
    cursor: pointer;
  }

  .friend-avatar {
    width: 58px;
  }

  .friend-avatar img {
    width: 50px;
    height: 50px;
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
    font-size: 16px;
    font-weight: 400;
  }

  .friend-mail {
    line-height: 30px;
    color: #888888;
  }

  .group-item {
    display: flex;
    padding: 5px 10px;
    cursor: pointer;
    align-items: center;
  }

  .group-avatar {
    width: 50px;
    height: 50px;
    margin-left: 10px;
    overflow: hidden;
    display: flex;
  }

  .group-name {
    margin-left: 10px;
    width: 160px;
    text-align: left;
    font-size: 15px;
    line-height: 40px;
  }

  .contact-main {
    flex: 1;
    background: #FFFFFF;
  }

  .profile-card {
    padding: 20px 0;
  }

  .card-title {
    padding: 60px;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-around;
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

  .info-item {
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
