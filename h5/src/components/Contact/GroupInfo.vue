<template>
    <div class="info-container">
        <el-card class="group-card">
            <div class="group-item">
                <ul>
                    <li v-for="(item, index) in list" :key="index">
                        <img class="item-avatar" :src="item.avatar" />
                        <span>{{ item.name }}</span>
                    </li>
                </ul>
            </div>
            <el-button style="padding: 3px 0" type="text" @click="goChatPage(currentFriend)"
                >发消息</el-button
            >
        </el-card>
    </div>
</template>

<script>
export default {
    props: ['list', 'currentFriend', 'goChatPage'],
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
.group-item::-webkit-scrollbar {
    width: 3px;
}
.group-item::-webkit-scrollbar-thumb {
    background-color: #af4e4e57;
}
.group-card {
    width: 400px;
    margin: 80px auto;
    background-color: #f9f8ff;
    .group-item {
        max-height: 340px;
        overflow: auto;
        ul {
            width: 340px;
            min-height: 340px;
            margin: 0 auto;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            overflow: hidden;
            li {
                width: 20%;
                display: flex;
                flex-direction: column;
                align-items: center;
                img {
                    width: 58px;
                    margin-top: 20px;
                    border-radius: 5%;
                }
                span {
                    color: gray;
                    margin-top: 10px;
                    font-size: 12px;
                }
            }
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
