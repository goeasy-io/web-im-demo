<template>
    <div class="index">
        <div class="content">
            <router-view></router-view>
        </div>
        <div class="tab-bar">
            <div @click="switchTabBarItem(tabBarImgItem.path)" v-for="(tabBarImgItem,index) in tabBarImgList" :key="index"
                 :class="[tabBarImgItem.path===$route.path ?'active link':'link']">
                <div class="unread-msg-num" v-if="tabBarImgItem.path ==='/conversations' && unreadTotal !==0">
                    {{unreadTotal}}
                </div>
                <div class="tab-bar-item">
                    <img :src="$route.path === tabBarImgItem.path ? tabBarImgItem.selectedIconPath : tabBarImgItem.iconPath"/>
                    <span :class="$route.path === tabBarImgItem.path ? 'active' : ''">{{tabBarImgItem.title}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabBar",
        data() {
            return {
                tabBarImgList: [
                    {
                        path: '/conversations',
                        title: '信息',
                        iconPath: require('../../public/static/images/chat.png'),
                        selectedIconPath: require('../../public/static/images/chat-active.png'),
                    },
                    {
                        path: '/contacts',
                        title: '通讯录',
                        iconPath: require('../../public/static/images/contacts.png'),
                        selectedIconPath: require('../../public/static/images/contacts-active.png'),
                    },
                    {
                        path: '/mine',
                        title: '我',
                        iconPath: require('../../public/static/images/mine.png'),
                        selectedIconPath: require('../../public/static/images/mine-active.png'),
                    },
                ],
                conversations : [],
                unreadTotal : 0
            }
        },
        beforeMount() {
            //监听会话列表变化
            this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, (conversations) => {
                this.conversations = conversations.conversations || [];
                this.unreadTotal = conversations.unreadTotal;
            });
        },
        methods: {
            switchTabBarItem(path) {
                if (this.$route.path !== path) {
                    // 切换tabBarItem
                    this.$router.replace(path);
                }
            }
        }
    }
</script>

<style scoped src="../assets/style/index.css"></style>