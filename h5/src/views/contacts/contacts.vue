<template>
    <div class="contacts">
        <div class="header">通讯录</div>
        <div class="contacts-container">
            <div class="user-list">
                <div class="user-list-item" v-for="(group, key) in groups || []" :key="key" @click="enterChat(group.uuid, 'group')">
                    <div class="user-item-avatar">
                        <img :src="group.avatar"/>
                    </div>
                    <div class="user-item-info">
                        <span class="user-item-info__name">{{group.name}}</span>
                    </div>
                </div>
            </div>
            <div class="contacts-title">联系人</div>
            <div class="user-list">
                <div class="user-list-item" v-for="(friend, key) in friends || []" :key="key"
                     @click="enterChat(friend.uuid, 'private')">
                    <div class="user-item-avatar">
                        <img :src="friend.avatar"/>
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
    import restApi from "../../assets/lib/restapi";
    export default {
        name: "contacts",
        data() {
            return {
                friends: null,
                groups: null
            }
        },
        beforeMount() {
            let currentUser = JSON.parse(localStorage.getItem("user"));
            let friendList = restApi.findFriends(currentUser);
            this.friends = {};
            this.groups = {};
            friendList.map(friend => {
                this.friends[friend.uuid] = friend;
                this.friends[friend.uuid].online = false;
            });
            this.groups = restApi.findGroups(currentUser);
            this.subscribeUserPresence();
            this.hereNow();
            this.goEasy.im.on(this.GoEasy.IM_EVENT.USER_PRESENCE, (user) => {
                this.friends[user.id].online = (user.action === 'online' || user.action === 'join');
                this.$forceUpdate();
            })
        },
        methods: {
            subscribeUserPresence () {
                let friendIds = Object.keys(this.friends);
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
                let friendIds = Object.keys(this.friends);
                this.goEasy.im.hereNow({
                    userIds: friendIds,
                    onSuccess: function (result) {
                        result.content.map(friend => {
                            self.friends[friend.id].online = true;
                        })
                        self.$forceUpdate();
                    },
                    onFailed: function (error) {
                        console.log('获取好友在线状态失败',error)
                    }
                });
            },
            enterChat(id, type) {//进入私聊
                this.$router.push({
                    name: type,
                    query: {
                        id : id
                    }
                })
            }
        }
    }
</script>

<style scoped>
    @import "./contacts.css";
</style>