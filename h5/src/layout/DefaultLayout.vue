<template>
    <el-container class="layout-container">
        <el-aside class="layout-aside" width="100px">
            <el-avatar
                v-if="currentUser"
                class="user-avatar"
                shape="square"
                :size="50"
                :src="currentUser.avatar"
            ></el-avatar>
            <el-menu class="aside-menu">
                <el-menu-item index="2">
                    <router-link to="/conversations">
                        <i
                            class="iconfont icon-message"
                            :class="{ selected: currentPage !== 'Contacts' }"
                        ></i>
                    </router-link>
                    <span v-if="unreadTotal" class="unread-total">{{ unreadTotal }}</span>
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
        <el-main class="layout-main">
            <router-view />
        </el-main>
    </el-container>
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
            const { to = '../login' } = this.$route.params;
            this.$router.push(to);
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
.layout-container {
    width: 1000px;
    height: 600px;
    margin: 50px auto;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    .layout-aside {
        width: 100px;
        background-color: #4f4242;
        display: flex;
        flex-direction: column;
        align-items: center;
        .user-avatar {
            margin: 20px auto;
            border-radius: 50%;
        }
        .aside-menu {
            border: none;
            background-color: #4f4242;
            height: 430px;
            .iconfont {
                padding: 15px;
                font-size: 28px;
                color: #e9e8ee;
            }
            .unread-total {
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
        .aside-menu/deep/.el-menu-item:focus, .el-menu-item:hover {
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
    .layout-main {
        color: #333;
        background-color: #e9e8ee;
        padding: 0;
    }
}
</style>
