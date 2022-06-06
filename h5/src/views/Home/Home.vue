<template>
    <div class="home">
        <el-container class="home-container">
            <el-aside class="home-menu" width="100px">
                <el-avatar
                    v-if="currentUser"
                    class="user-avatar"
                    shape="square"
                    :size="50"
                    :src="currentUser.avatar"
                ></el-avatar>
                <div class="user-profile">
                    <el-card>
                        <div slot="header" class="user-profile-header">
                            <img :src="currentUser.avatar" />
                            <div>{{ currentUser.name }}</div>
                        </div>
                        <el-row class="user-profile-info">
                            <el-col :span="8">邮箱</el-col>
                            <el-col :span="16">{{ currentUser.email }}</el-col>
                        </el-row>
                        <el-row class="user-profile-info">
                            <el-col :span="8">手机</el-col>
                            <el-col :span="16">{{ currentUser.phone }}</el-col>
                        </el-row>
                    </el-card>
                </div>
                <el-menu class="menu-list">
                    <el-menu-item index="2">
                        <router-link to="/conversations">
                            <i
                                class="iconfont icon-message"
                                :class="{ selected: currentPage !== 'Contacts' }"
                            ></i>
                        </router-link>
                        <span v-if="unreadTotal" class="menu-unread">{{ unreadTotal }}</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <router-link to="/contacts">
                            <i
                                class="iconfont icon-deleteuser"
                                :class="{ selected: currentPage === 'Contacts' }"
                            ></i>
                        </router-link>
                    </el-menu-item>
                </el-menu>
                <div class="exit">
                    <i class="iconfont icon-ico-exit" @click="logout"></i>
                </div>
            </el-aside>
            <el-main class="home-main">
                <router-view />
            </el-main>
        </el-container>
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
        if (!this.currentUser) {
            this.$router.push('../login');
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
    box-sizing: border-box;
    height: 100%;
    min-width: 1150px;
    padding: 3rem 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .home-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        min-height: 640px;
        flex: 1;
        background: #FFFFFF;
        border-radius: 12px;
        box-shadow: 0 11px 20px 0 rgba(0, 0, 0, 0.3);
        display: flex;
        position: relative;
        .home-menu {
            background-color: #4f4242;
            display: flex;
            flex-direction: column;
            align-items: center;
            .user-avatar {
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
                left: 100px;
                width: 250px;
                height: 200px;
                background: #FFFFFF;
                z-index: 999;
                .user-profile-header {
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
                    font-size: 14px;
                    color: #666666;
                    line-height: 28px;
                }
            }
            .menu-list {
                border: none;
                background-color: #4f4242;
                height: calc(100% - 160px);
                .iconfont {
                    padding: 15px;
                    font-size: 28px;
                    color: #e9e8ee;
                }
                .menu-unread {
                    position: absolute;
                    top: 10px;
                    right: 26px;
                    width: 16px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 50%;
                    background-color: #AF4E4E;
                    color: #ffffff;
                }
                .selected {
                    color: #af4e4e !important;
                }
            }
            .menu-list/deep/.el-menu-item:focus, .el-menu-item:hover {
                background-color: #4f4242;
            }
            .exit {
                .icon-ico-exit {
                    padding: 15px;
                    font-size: 22px;
                    color: #e9e8ee;
                    cursor: pointer;
                    &:active {
                        color: #af4e4e;
                    }
                }
            }
        }

        .home-main {
            color: #333;
            background-color: #e9e8ee;
            padding: 0;
        }
    }
}
</style>
