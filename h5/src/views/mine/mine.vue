<template>
    <div class="mine">
        <div class="top">
            <div class="mine-info-title">我的</div>
            <div class="mine-info">
                <img :src="currentUser.avatar"/>
                <div class="name">{{currentUser.name}}</div>
            </div>
        </div>
        <div class="bottom">
            <span class="title">欢迎体验GoEasyIM</span>
            <div class="logout" @click="logout">注销</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Mine",
        data() {
            return {
                currentUser: {}
            }
        },
        created() {
            this.currentUser = JSON.parse(localStorage.getItem("user"));
        },
        methods: {
            logout() {
                let self = this;
                if(this.goEasy.getConnectionStatus() !== 'disconnected') {
                    this.goEasy.disconnect({
                        onSuccess: function(){
                            console.log('注销成功')
                            localStorage.removeItem("user");
                            self.$router.push({name: 'login'});
                        },
                        onFailed: function(error){
                            console.log("注销失败:", error);
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>
    @import "./mine.css";
</style>