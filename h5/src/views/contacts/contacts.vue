<template>
  <el-container className="contacts-container">
    <el-aside width="600" className="friedslist">
      <FriendList
          :frienditem="frienditem"
          :groups="groups"
          @currentFriend="getCurrentFriend"
      />
    </el-aside>
    <el-main className="friedsinfo">
      <FriendInfo
          v-if="currentFriend.phone"
          :currentFriend="currentFriend"
          :goChatPage="goChatPage"
      />
      <GroupInfo
          v-else-if="currentFriend.userList"
          :list="list"
          :currentFriend="currentFriend"
          :goChatPage="goChatPage"
      />
    </el-main>
  </el-container>
</template>

<script>
import restapi from "../../lib/restapi";
import FriendList from "../../components/Contact/friend-list";
import FriendInfo from "../../components/Contact/friend-info";
import GroupInfo from "../../components/Contact/group-info";

export default {
  components: {FriendList, FriendInfo, GroupInfo},
  data() {
    return {
      friends: [],
      groups: [],
      currentFriend: {},
      list: [],
      frienditem: {},
    };
  },
  mounted() {
    this.initList();
  },
  methods: {
    initList() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.friends = restapi.findFriends(currentUser);
      this.friends.map((friend) => {
        this.frienditem[friend.uuid] = friend;
        this.$set(this.frienditem[friend.uuid], "online", false);
      });
      this.groups = restapi.findGroups(currentUser);

      this.subscribeUserPresence();
      this.hereNow();

      this.goEasy.im.on(this.GoEasy.IM_EVENT.USER_PRESENCE, (user) => {
        this.frienditem[user.id].online =
            user.action == "online" || user.action == "join";
        this.$forceUpdate();
      });
    },
    subscribeUserPresence() {
      const friendIds = Object.keys(this.frienditem);
      this.goEasy.im.subscribeUserPresence({
        userIds: friendIds,
        onSuccess: () => {
          console.log("订阅上下线成功");
        },
        onFailed: (e) => {
          console.log("订阅好友上下线失败", e);
        },
      });
    },
    hereNow() {
      const friendIds = Object.keys(this.frienditem);
      this.goEasy.im.hereNow({
        userIds: friendIds,
        onSuccess: (res) => {
          res.content.map((friend) => {
            this.frienditem[friend.id].online = true;
          });
          this.$forceUpdate();
        },
        onFailed: (e) => {
          console.log("获取好友在线状态失败", e);
        },
      });
    },
    getCurrentFriend(e) {
      this.currentFriend = e;
      this.getUserInfo();
    },
    getUserInfo() {
      this.list = [];
      if (this.currentFriend.userList) {
        this.currentFriend.userList.map((item) => {
          const info = restapi.findUserById(item);
          this.list.push(info);
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

.friedslist {
  background-color: white;
  border-right: rgb(219, 214, 214) 1px solid;
}

.friedsinfo {
  background-color: #f9f8ff;
}
</style>
