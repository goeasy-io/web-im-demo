<template>
    <div class="info-container">
        <el-card class="friend-card text-center">
            <div slot="header" class="clearfix card-title">
                <div class="item-name">
                    <i class="iconfont icon-people"></i>
                    <p>{{ currentFriend.name }}</p>
                </div>
                <div class="item-avatar">
                    <img :src="currentFriend.avatar" />
                </div>
            </div>
            <div class="info-item">
                <p class="info-name">邮 箱:</p>
                <p class="info-text">{{ currentFriend.email }}</p>
            </div>
            <div class="info-item">
                <p class="info-name">手机号:</p>
                <p class="info-text">{{ currentFriend.phone }}</p>
            </div>
            <el-button style="padding: 3px 0" type="text" @click="goChatPage(currentFriend)">发消息</el-button>
        </el-card>
    </div>
</template>

<script>
export default {
    props: ['currentFriend', 'goChatPage'],
    methods: {},
};
</script>

<style lang="scss">
.clearfix:before,
.clearfix:after {
    display: table;
    content: '';
}
.clearfix:after {
    clear: both;
}
.friend-card {
    width: 400px;
    margin: 100px auto;
    background-color: #f9f8ff;
    .card-title {
        display: flex;
        justify-content: space-around;
        .item-name {
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
        .item-avatar {
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
    .el-button--text {
        width: 80px;
        height: 30px;
        color: white;
        background: #af4e4e;
        font-size: 16px;
        margin-top: 15px;
    }
}
</style>
