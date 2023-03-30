<template>
  <div class="home">
    <div class="home-container">
      <div class="home-menu">
        <div class="menu-header">
          <img class="user-avatar" :src="currentUser.avatar"/>
          <div class="user-profile">
            <div class="user-profile-main">
              <div class="user-profile-header">
                <img :src="currentUser.avatar"/>
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
        </div>
        <div class="menu-box">
          <div class="menu-list">
            <router-link tag="div" class="menu-item" to="/conversations" replace>
              <i class="iconfont icon-zaixiankefu"></i>
              <span v-if="unreadAmount" class="menu-unread">{{ unreadAmount}}</span>
            </router-link>
            <router-link tag="div" class="menu-item" to="/contacts" replace>
              <i class="iconfont icon-haoyou"></i>
            </router-link>
          </div>
          <div class="exit">
            <i class="iconfont icon-h" @click="logout"></i>
          </div>
        </div>
      </div>
      <div class="home-main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentUser: null,
        unreadAmount: null
      };
    },
    created() {
      this.currentUser = this.globalData.currentUser;
      if (this.goEasy.getConnectionStatus() === 'disconnected') {
        this.connectGoEasy();  //连接goeasy
      }
      this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.setUnreadNumber);
    },
    methods: {
      connectGoEasy() {
        this.goEasy.connect({
          id: this.currentUser.id,
          data: {name: this.currentUser.name, avatar: this.currentUser.avatar},
          onSuccess: function () {  //连接成功
            console.log("GoEasy connect successfully.") //连接成功
          },
          onFailed: function (error) { //连接失败
            console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
          },
          onProgress: function (attempts) { //连接或自动重连中
            console.log("GoEasy is connecting", attempts);
          }
        });
      },
      setUnreadNumber(content) {
        this.unreadAmount = content.unreadTotal;
      },
      logout() {
        if (confirm('确认要退出登录吗？')) {
          this.goEasy.disconnect({
            onSuccess: () => {
              this.globalData.currentUser = null;
              this.$router.replace({path: './login'});
            },
            onFailed: (error) => {
              console.log("Failed to disconnect GoEasy, code:" + error.code + ",error:" + error.content);
            }
          });
        }
      },
    },
  };
</script>

<style scoped>
  @media screen and (max-width:1000px) {
    .home-container {
      width: 850px;
      height: 430px;
    }
  }
  @media screen and (min-width:1000px) {
    .home-container {
      width: 850px;
      height: 650px;
    }
  }

  .home {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .home-container {
    background: #FFFFFF;
    display: flex;
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .home-menu {
    width: 60px;
    background-color: #F7F7F7;
    border-right: 1px solid #eeeeee;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .menu-header {
    margin: 20px auto;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
  }

  .user-avatar:hover + .user-profile {
    display: block;
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
  }

  .user-profile-main {
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    border-radius: 4px;
  }

  .user-profile-header {
    padding: 18px 20px;
    border-bottom: 1px solid #EBEEF5;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
  }

  .user-profile-header img {
    width: 45px;
    height: 45px;
  }

  .user-profile-info {
    display: flex;
    padding: 10px 20px;
    font-size: 14px;
    color: #666666;
    line-height: 28px;
  }

  .user-profile-info-title {
    width: 70px;
  }

  .menu-box {
    padding: 40px 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .menu-item {
    color: #303133;
    cursor: pointer;
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
    background-color: #d02129;
    color: #ffffff;
  }

  .router-link-active i {
    color: #d02129 !important;
  }

  .iconfont {
    padding: 15px;
    font-size: 28px;
    color: #606266;
    cursor: pointer;
  }

  .iconfont:active {
    color: #d02129;
  }

  .home-main {
    padding: 0;
    flex: 1;
  }

</style>
