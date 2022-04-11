<template>
  <el-container className="contacts-container">
    <el-aside width="600" className="friendList">
      <FriendList
          :friends="friends"
          :groups="groups"
          @currentFriend="getCurrentFriend"
      />
    </el-aside>
    <el-main className="friendInfo">
      <FriendInfo
          v-if="currentFriend.phone"
          :currentFriend="currentFriend"
          :goChatPage="goChatPage"
      />
      <GroupInfo
          v-else-if="currentFriend.userList"
          :groupMembers="groupMembers"
          :currentFriend="currentFriend"
          :goChatPage="goChatPage"
      />
    </el-main>
  </el-container>
</template>

<script>
import restapi from "../../lib/restapi";
import FriendList from "../../components/Contact/FriendList";
import FriendInfo from "../../components/Contact/FriendInfo";
import GroupInfo from "../../components/Contact/GroupInfo";

export default {
  components: {FriendList, FriendInfo, GroupInfo},
  data() {
    return {
      friends: [],
      groups: [],
      currentFriend: {},
      groupMembers: [],
      friendInfo: {},
    };
  },
  mounted() {
    this.initList();
  },
  methods: {
    initList() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.friends = restapi.findFriends(currentUser);
      this.groups = restapi.findGroups(currentUser);
    },
    getCurrentFriend(e) {
      this.currentFriend = e;
      this.getUserInfo();
    },
    getUserInfo() {
      this.groupMembers = [];
      if (this.currentFriend.userList) {
        this.currentFriend.userList.map((item) => {
          const info = restapi.findUserById(item);
          this.groupMembers.push(info);
        });
      }
    },
    goChatPage(currentFriend) {
      const id = currentFriend.uuid;
      if (currentFriend.phone) {
        this.$router.push({name: "private", params: {id: id}});
      } else {
        this.$router.push({name: "group", params: {id: id}});
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}

.el-main {
  padding: 0;
}

.friendList {
  background-color: white;
  border-right: rgb(219, 214, 214) 1px solid;
}

.friendInfo {
  background-color: #f9f8ff;
}
</style>
