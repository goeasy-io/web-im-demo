<template>
    <div class="home">
        <div class="home-container">
            <div class="home-menu">
                <img class="user-avatar" :src="currentUser.avatar"/>
                <div class="user-profile">
                    <div class="user-profile-main">
                        <div class="user-profile-header">
                            <img :src="currentUser.avatar" />
                            <div>{{ currentUser.name }}</div>
                        </div>
                        <div class="user-profile-info">
                            <div class="user-profile-info-title">邮箱</div>
                            <div>{{ currentUser.email }}</div>
                        </div>
                        <div class="user-profile-info">
                            <div class="user-profile-info-title">手机</div>
                            <div>{{ currentUser.phone }}</div>
                        </div>
                    </div>
                </div>
                <div class="menu-list">
                    <div class="menu-item">
                        <router-link to="/conversations">
                            <i
                                class="iconfont icon-message"
                                :class="{ selected: currentPage !== 'Contacts' }"
                            ></i>
                        </router-link>
                        <span v-if="unreadTotal" class="menu-unread">{{ unreadTotal }}</span>
                    </div>
                    <div class="menu-item">
                        <router-link to="/contacts">
                            <i
                                class="iconfont icon-lianxiren1"
                                :class="{ selected: currentPage === 'Contacts' }"
                            ></i>
                        </router-link>
                    </div>
                </div>
                <div class="exit">
                    <i class="iconfont icon-tuichu" @click="logout"></i>
                </div>
            </div>
            <div class="home-main">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentUser: null,
            currentPage: this.$route.name,
            unreadTotal: null
        };
    },
    created() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(this.goEasy.getConnectionStatus() === 'disconnected') {
            this.connectGoEasy();  //连接goeasy
        }
        this.$EventBus.$on('setUnreadAmount', (unreadTotal)=>{
            this.unreadTotal = unreadTotal;
        })
    },
    watch: {
        $route() {
            this.currentPage = this.$route.name;
        },
    },
    methods: {
        connectGoEasy () {
            this.goEasy.connect({
                id: this.currentUser.uuid,
                data: this.currentUser,
                onSuccess: function () {  //连接成功
                    console.log("GoEasy connect successfully.") //连接成功
                },
                onFailed: function (error) { //连接失败
                    console.log("Failed to connect GoEasy, code:"+error.code+ ",error:"+error.content);
                },
                onProgress: function(attempts) { //连接或自动重连中
                    console.log("GoEasy is connecting", attempts);
                }
            });
        },
        logout() {
            this.goEasy.disconnect({
                onSuccess: () => {
                    localStorage.removeItem('currentUser');
                    const { to = '../login' } = this.$route.params;
                    this.$router.push(to);
                },
                onFailed: (error) => {
                    console.log("Failed to disconnect GoEasy, code:"+error.code+ ",error:"+error.content);
                }
            });
        },
    },
    beforeDestroy(){
        this.$EventBus.$off('setUnreadAmount');
    }
};
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .home-container {
        width: 900px;
        height: 700px;
        overflow: hidden;
        background: #FFFFFF;
        border-radius: 12px;
        box-shadow: 0 11px 20px 0 rgba(0, 0, 0, 0.3);
        display: flex;
        position: relative;
        .home-menu {
            width: 70px;
            background-color: #403a3a;
            display: flex;
            flex-direction: column;
            align-items: center;
            .user-avatar {
                width: 50px;
                height: 50px;
                margin: 20px auto;
                border-radius: 50%;
                &:hover + .user-profile {
                    display: block;
                }
            }
            .user-profile {
                display: none;
                color: #FFFFFF;
                position: absolute;
                top: 0;
                left: 70px;
                width: 250px;
                height: 200px;
                background: #FFFFFF;
                z-index: 999;
                .user-profile-main {
                    border: 1px solid #EBEEF5;
                    background-color: #FFF;
                    color: #303133;
                    border-radius: 4px;
                    .user-profile-header {
                        padding: 18px 20px;
                        border-bottom: 1px solid #EBEEF5;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        font-size: 15px;
                        font-weight: bold;
                        img {
                            width: 45px;
                            height: 45px;
                        }
                    }
                    .user-profile-info {
                        display: flex;
                        padding: 10px 20px;
                        font-size: 14px;
                        color: #666666;
                        line-height: 28px;
                        .user-profile-info-title {
                            width: 70px;
                        }
                    }
                }
            }
            .menu-list {
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: #403a3a;
                height: 500px;
                .iconfont {
                    padding: 15px;
                    font-size: 28px;
                    color: #e9e8ee;
                }
                .menu-item {
                    color: #303133;
                    cursor: pointer;
                    box-sizing: border-box;
                    height: 56px;
                    position: relative;
                }
                .menu-unread {
                    position: absolute;
                    top: -5px;
                    right: 5px;
                    width: 18px;
                    height: 18px;
                    line-height: 18px;
                    text-align: center;
                    border-radius: 50%;
                    background-color: #AF4E4E;
                    color: #ffffff;
                }
                .selected {
                    color: #93262b !important;
                }
            }
            .icon-tuichu {
                font-size: 28px;
                color: #e9e8ee;
                cursor: pointer;
                &:active {
                    color: #93262b;
                }
            }
        }

        .home-main {
            background-color: #e9e8ee;
            padding: 0;
            flex: 1;
        }
    }
}
</style>
