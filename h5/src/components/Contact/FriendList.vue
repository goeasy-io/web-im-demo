<template>
    <el-container class="list-container">
        <el-header class="header-input">
            <el-input placeholder="" size="small">
            </el-input>
        </el-header>
        <el-tabs :stretch="true" v-model="activeName">
            <el-tab-pane label="好友" name="first">
                <el-row class="friend-items" v-for="(friend, key) in friends || []" :key="key">
                    <div @click="getData(friend)">
                        <el-col :span="5" class="friend-avatar">
                            <img :src="friend.avatar" />
                        </el-col>
                        <el-col class="friend">
                            <el-col :span="5">
                                <p class="friend-name">{{ friend.name }}</p>
                            </el-col>
                            <el-col :span="9">
                                <span class="friend-mail">{{ friend.email }}</span>
                            </el-col>
                        </el-col>
                    </div>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="群组" name="second">
                <el-row class="group-items" v-for="(group, key) in groups || []" :key="key">
                    <div @click="getData(group)">
                        <el-col :span="5" class="group-avatar">
                            <img
                                v-for="(avatar, index) in getGroupAvatar(group.uuid)"
                                :src="avatar"
                                :class="computedAvatar(getGroupAvatar(group.uuid))"
                                :key="index"
                            />
                        </el-col>
                        <el-col class="group">
                            <el-col :span="5">
                                <p class="group-title"> {{ group.name }}<span>({{ group.userList.length }})</span></p>
                            </el-col>
                        </el-col>
                    </div>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </el-container>
</template>

<script>
import restapi from '../../lib/restapi';
export default {
    name: 'FriendList',
    props: ['friends', 'groups'],
    data() {
        return {
            activeName: 'first',
        };
    },
    methods: {
        getData(data) {
            this.$emit('currentFriend', data);
        },
        getGroupAvatar(groupId) {
            let avatarList = restapi.findGroupMemberAvatars(groupId);
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

<style lang="scss">
.list-container {
    width: 300px;
    background-color: white;
    border-right: #dbd6d6 1px solid;
}
.header-input {
    padding-top: 20px;
    margin-bottom: 15px;
}
.el-tabs__active-bar {
    background-color: #4f4242;
}
.el-tabs__item {
    color: 292424;
    &:hover {
        color: #4f4242;
    }
}
.el-tabs__item.is-active {
    color: #4f4242;
}
.el-tabs__content {
    max-height: 460px;
    overflow: auto;
    overflow-y: scroll;
    scrollbar-color: transparent transparent;
    scrollbar-track-color: transparent;
    -ms-scrollbar-track-color: transparent;
}
.el-tabs__content::-webkit-scrollbar {
    display: block;
    width: 3px;
    height: 6px;
}
.el-tabs__content::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
}
.layout-main {
    text-align: left;
}
.friend .el-col-5 {
    width: 80px;
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
    padding: 5px 10px;
    .group-avatar {
        width: 50px;
        height: 50px;
        margin: auto 5px;
        border-radius: 5px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap-reverse;
        .avatarItem--1 {
            width: 98%;
            height: 98%;
        }
        .avatarItem--2 {
            width: 47%;
            height: 47%;
            margin: 1%;
        }
        .avatarItem--3 {
            width: 31%;
            height: 30%;
            margin: 1%;
        }
    }
    .group {
        width: 65%;
        margin: 0;
        .group-title {
            width: 180px;
            text-align: left;
            font-size: 15px;
            line-height: 40px;
        }
    }
}
</style>
