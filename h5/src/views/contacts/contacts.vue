<template>
    <el-container>
        <el-aside>
            <el-container class="contacts-list-container">
                <el-header class="contacts-list-title">
                    <el-input placeholder="" size="small"></el-input>
                </el-header>
                <el-tabs :stretch="true" value="first">
                    <el-tab-pane label="好友" name="first">
                        <el-row v-for="(friend, key) in friends || []" :key="key">
                            <div class="friend-items" @click="getCurrentContact(friend,'friend')">
                                <el-col :span="5" class="friend-avatar">
                                    <img :src="friend.avatar" />
                                </el-col>
                                <el-col class="friend">
                                    <el-col :span="5" class="friend-name">{{ friend.name }}</el-col>
                                    <el-col :span="9" class="friend-mail">{{ friend.email }}</el-col>
                                </el-col>
                            </div>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="群组" name="second">
                        <el-row v-for="(group, key) in groups || []" :key="key">
                            <div class="group-items" @click="getCurrentContact(group,'group')">
                                <el-col :span="5" class="group-avatar" :class="computedAvatar(getGroupAvatar(group.uuid))">
                                    <img v-for="(avatar, index) in getGroupAvatar(group.uuid)" :src="avatar" :key="index"/>
                                </el-col>
                                <el-col class="group">
                                    <span class="group-name"> {{ group.name }}({{ group.userList.length }}) </span>
                                </el-col>
                            </div>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-container>
        </el-aside>
        <el-main>
            <el-card class="friend-card" v-if="currentContact.type === 'friend'">
                <div slot="header" class="card-title">
                    <div class="friend-name">
                        <i class="iconfont icon-people"></i>
                        <p>{{ currentContact.data.name }}</p>
                    </div>
                    <div class="friend-avatar">
                        <img :src="currentContact.data.avatar" />
                    </div>
                </div>
                <div class="info-item">
                    <p class="info-name">邮 箱:</p>
                    <p class="info-text">{{ currentContact.data.email }}</p>
                </div>
                <div class="info-item">
                    <p class="info-name">手机号:</p>
                    <p class="info-text">{{ currentContact.data.phone }}</p>
                </div>
                <el-button class="card-button" @click="goChatPage()">发消息</el-button>
            </el-card>
            <el-card class="group-card" v-else-if="currentContact.type === 'group'">
                <div class="group-members">
                    <div class="member" v-for="(member, index) in currentContact.data.userInfoList" :key="index">
                        <img class="member-avatar" :src="member.avatar" />
                        <span class="member-name">{{ member.name }}</span>
                    </div>
                </div>
                <el-button class="card-button" @click="goChatPage(currentContact)">发消息</el-button>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
import restApi from "../../api/restapi";
export default {
    data() {
        return {
            friends: [],
            groups: [],
            currentContact: {
                type: null,
                data: {}
            },
            groupMembers: [],
        };
    },
    mounted() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.friends = restApi.findFriends(currentUser);
        this.groups = restApi.findGroups(currentUser);
    },
    methods: {
        getCurrentContact(contact,type) {
            this.currentContact.data = contact;
            this.currentContact.type = type;
            if (this.currentContact.type === 'group') {
                this.currentContact.data.userInfoList = [];
                this.currentContact.data.userList.map((item) => {
                    const info = restApi.findUserById(item);
                    this.currentContact.data.userInfoList.push(info);
                });
            }
        },
        goChatPage() {
            const id = this.currentContact.data.uuid;
            let name = this.currentContact.type === 'group' ? 'group' : 'private';
            this.$router.push({name: name, params: {id: id}});
        },
        getGroupAvatar(groupId) {
            let avatarList = restApi.findGroupMemberAvatars(groupId);
            return avatarList.slice(0, 9);
        },
        computedAvatar(avatarList) {
            if (avatarList.length > 4) {
                return 'avatarItem--3';
            } else if (avatarList.length > 1) {
                return 'avatarItem--2';
            } else {
                return 'avatarItem--1';
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.contacts-list-container {
    width: 300px;
    background-color: white;
    border-right: #dbd6d6 1px solid;
    .contacts-list-title {
        padding-top: 20px;
        margin-bottom: 15px;
    }
    .friend-items {
        padding: 5px 10px;
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
            .friend-name {
                margin: 0;
                font-size: 16px;
                font-weight: 400;
            }
            .friend-mail {
                line-height: 30px;
                color: #888888;
            }
        }
    }
    .group-items {
        display: flex;
        padding: 5px 10px;
        .group-avatar {
            width: 50px;
            height: 50px;
            margin-left: 10px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
            flex-wrap: wrap-reverse;
        }
        .avatarItem--1 > img {
            width: 98%;
            height: 98%;
        }
        .avatarItem--2 > img {
            width: 47%;
            height: 47%;
            margin: 1%;
        }
        .avatarItem--3 > img {
            width: 31%;
            height: 30%;
            margin: 1%;
        }
        .group {
            width: 65%;
            margin-left: 10px;
            .group-name {
                width: 180px;
                text-align: left;
                font-size: 15px;
                line-height: 40px;
            }
        }
    }
}
.contacts-list-container/deep/.el-tabs__active-bar {
    background-color: #4f4242;
}
.contacts-list-container/deep/.el-tabs__item {
    color: #292424;
    &:hover {
        color: #4f4242;
    }
}
.contacts-list-container/deep/.el-tabs__item.is-active {
    color: #4f4242;
}
.friend-card {
    width: 400px;
    margin: 100px auto;
    background-color: #f9f8ff;
    .card-title {
        display: flex;
        justify-content: space-around;
        .friend-name {
            width: 300px;
            font-size: 18px;
            display: flex;
            align-items: center;
            .icon-people {
                font-size: 20px;
                color: #af4e4e;
                margin-right: 10px;
            }
        }
        .friend-avatar {
            width: 60px;
        }
    }
    .info-item {
        display: flex;
        justify-content: space-around;
        text-align: left;
        font-size: 14px;
        line-height: 45px;
        .info-name {
            width: 100px;
        }
        .info-text {
            width: 200px;
        }
    }
}
.group-card {
    width: 400px;
    margin: 80px auto;
    background-color: #f9f8ff;
    .group-members {
        min-height: 200px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        .member {
            width: 20%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .member-avatar {
                width: 58px;
                margin-top: 20px;
                border-radius: 5%;
            }
            .member-name {
                color: gray;
                margin-top: 10px;
                font-size: 12px;
            }
        }
    }
}
.card-button {
    background: #af4e4e;
    color: white;
    border: none;
    display: flex;
    margin: 10px auto;
    align-items: center;
    justify-content: center;
}
</style>
