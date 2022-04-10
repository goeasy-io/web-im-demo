<template>
    <el-container class="layout-container">
        <el-aside class="layout-aside" width="100px">
            <div class="user-avatar">
                <el-avatar
                    class="user-avatar"
                    shape="square"
                    :size="50"
                    :src="currentUser.avatar"
                ></el-avatar>
            </div>
            <el-menu class="aside-menu">
                <el-menu-item class="menu-item" index="2">
                    <router-link to="/conversations">
                        <i
                            class="iconfont icon-message"
                            :class="{ current: currentPage !== 'Contacts' }"
                        ></i>
                    </router-link>
                </el-menu-item>
                <el-menu-item class="menu-item" index="3">
                    <router-link to="/contacts">
                        <i
                            class="iconfont icon-deleteuser"
                            :class="{ current: currentPage === 'Contacts' }"
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
        };
    },
    created() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!this.currentUser) {
            const { to = '../login' } = this.$route.params;
            this.$router.push(to);
        }
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
}

.layout-aside {
    width: 100px;
    background-color: #4f4242;
    display: flex;
    flex-direction: column;
    align-items: center;
    .user-avatar {
        margin: 10px;
        border-radius: 5px;
    }
    .aside-menu {
        border: none;
        .menu-item {
            background-color: #4f4242;
        }
        .iconfont {
            padding: 15px;
            font-size: 28px;
            color: #e9e8ee;
        }
    }
    .exit {
        margin-top: 320px;
        .icon-ico-exit {
            padding: 15px;
            font-size: 22px;
            color: #e9e8ee;
            &:active {
                color: #af4e4e;
            }
        }
    }
    .version-tag {
        color: #fff;
        font-size: 12px;
        text-align: center;
        margin: 10px 0;
    }
}

.layout-main {
    color: #333;
    background-color: #e9e8ee;
    padding: 0;
}

.current {
    color: #af4e4e !important;
}
</style>
