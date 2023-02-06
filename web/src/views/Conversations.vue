<template>
  <div class="conversations">
    <div class="conversation-list">
      <div class="conversation-list-container">
        <div class="conversation-list-content">
          <div v-if="conversations.length">
            <router-link
              tag="div" replace
              v-for="(conversation, key) in conversations" :key="key"
              :to="chatLocation(conversation)"
            >
              <div class="conversation" @contextmenu.prevent.stop="e => showRightClickMenu(e,conversation)">
                <div class="avatar">
                  <img :src="conversation.data.avatar"/>
                  <div v-if="conversation.unread>0"
                       class="unread-count">
                    <span class="unread">{{ conversation.unread }}</span>
                  </div>
                </div>
                <div class="conversation-message">
                  <div class="conversation-top">
                    <span class="conversation-name">{{ conversation.data.name }}</span>
                    <div class="conversation-time">
                      <div>{{ formatDate(conversation.lastMessage.timestamp) }}</div>
                    </div>
                  </div>
                  <div class="conversation-bottom">
                    <div class="conversation-content" v-if="conversation.lastMessage.recalled">
                      <div v-if="conversation.type === 'private'">
                        {{ conversation.lastMessage.senderId === currentUser.id ? '你' : `"${conversation.data.name}"` }}撤回了一条消息
                      </div>
                      <div v-if="conversation.type === 'group'">
                        {{ conversation.lastMessage.senderId === currentUser.id ? '你' : `"${conversation.lastMessage.senderData.name}"` }}撤回了一条消息
                      </div>
                    </div>
                    <div class="conversation-content" v-else>
                      <div class="unread-text"
                           v-if="conversation.lastMessage.read === false && conversation.lastMessage.senderId === currentUser.id">
                        [未读]
                      </div>
                      <div v-if="conversation.type === 'private'">
                        {{ conversation.lastMessage.senderId === currentUser.id ? '我' : conversation.data.name }}:
                      </div>
                      <div v-else>
                        {{ conversation.lastMessage.senderId === currentUser.id ? '我' : conversation.lastMessage.senderData.name }}:
                      </div>
                      <span class="text" v-if="conversation.lastMessage.type === 'text'">{{conversation.lastMessage.payload.text}}</span>
                      <span v-else-if="conversation.lastMessage.type === 'video'">[视频消息]</span>
                      <span v-else-if="conversation.lastMessage.type === 'audio'">[语音消息]</span>
                      <span v-else-if="conversation.lastMessage.type === 'image'">[图片消息]</span>
                      <span v-else-if="conversation.lastMessage.type === 'file'">[文件消息]</span>
                      <span v-else-if="conversation.lastMessage.type === 'order'">[订单消息]</span>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <div v-else class="no-conversation">- 当前没有会话 -</div>
        </div>
      </div>
      <div v-if="rightClickMenu.visible" :style="{'left': rightClickMenu.x + 'px', 'top': rightClickMenu.y + 'px'}"
           class="action-box">
        <div class="action-item" @click="topConversation">{{ rightClickMenu.conversation.top ? '取消置顶' : '置顶' }}</div>
        <div class="action-item" @click="deleteConversation">删除聊天</div>
      </div>
    </div>
    <div class="chat">
      <router-view :key="$route.params.id"/>
    </div>
  </div>
</template>

<script>
  import restApi from "../api/restapi";
  import {formatDate} from '../utils/utils.js'

  export default {
    name: 'Conversations',
    data() {
      return {
        currentUser: {},
        conversations: [],
        // Conversation右键菜单
        rightClickMenu: {
          conversation: null,
          visible: false,
          x: null,
          y: null,
        },
      };
    },
    created() {
      //隐藏Conversation右键菜单
      document.addEventListener('click', () => {
        this.hideRightClickMenu();
      });
      this.currentUser = this.globalData.currentUser;

      this.listenConversationUpdate(); //监听会话列表变化
      this.loadConversations(); //加载会话列表
      this.subscribeGroup();  //订阅群消息
    },
    beforeDestroy() {
      this.goEasy.im.off(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.renderConversations);
    },
    methods: {
      formatDate,
      loadConversations() {
        this.goEasy.im.latestConversations({
          onSuccess: (result) => {
            let content = result.content;
            this.renderConversations(content);
          },
          onFailed: (error) => {
            console.log('获取最新会话列表失败, code:' + error.code + 'content:' + error.content);
          },
        });
      },
      listenConversationUpdate() {
        // 监听会话列表变化
        this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.renderConversations);
      },
      renderConversations(content) {
        this.conversations = content.conversations;
      },
      subscribeGroup() {
        let groups = restApi.findGroups(this.currentUser);
        let groupIds = groups.map((item) => item.id);
        this.goEasy.im.subscribeGroup({
          groupIds: groupIds,
          onSuccess: function () {
            console.log('订阅群消息成功');
          },
          onFailed: function (error) {
            console.log('订阅群消息失败:', error);
          },
        });
      },
      showRightClickMenu(e, conversation) {
        this.rightClickMenu.conversation = conversation;
        this.rightClickMenu.visible = true;
        this.rightClickMenu.x = e.pageX;
        this.rightClickMenu.y = e.pageY;
      },
      hideRightClickMenu() {
        this.rightClickMenu.visible = false;
      },
      topConversation() {
        let conversation = this.rightClickMenu.conversation;
        let description = conversation.top ? '取消置顶' : '置顶';
        this.goEasy.im.topConversation({
          conversation: conversation,
          top: !conversation.top,
          onSuccess: function () {
            console.log(description, '成功');
          },
          onFailed: function (error) {
            console.log(description, '失败：', error);
          },
        });
      },
      deleteConversation() {
        if (confirm('确认要删除这条会话吗？')) {
          let conversation = this.rightClickMenu.conversation;
          this.goEasy.im.removeConversation({
            conversation: conversation,
            onSuccess: function () {
              console.log('删除会话成功');
            },
            onFailed: function (error) {
              console.log(error);
            },
          });
        }
      },
      chatLocation (conversation) {
        let path = conversation.type === 'private' ?
          '/conversations/privatechat/'+conversation.userId :
          '/conversations/groupchat/'+conversation.groupId
        return {
          path: path,
          query: {
            name: conversation.data.name,
            avatar: conversation.data.avatar
          }
        }
      }
    },
  };
</script>

<style scoped>
  .conversations {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    color: #333333;
  }

  .conversation-list {
    width: 220px;
  }

  .conversation-list-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-right: #dbd6d6 1px solid;
  }

  .conversation-list-content {
    flex: 1;
    overflow-y: auto;
    padding: 10px 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .conversation-list-content::-webkit-scrollbar {
    display: none;
  }

  .no-conversation {
    text-align: center;
    color: #666666;
  }

  .conversation {
    display: flex;
    padding: 10px 5px;
    cursor: pointer;
  }

  .unread-count {
    position: absolute;
    top: -10px;
    left: 30px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    color: white;
    background: #d02129;
  }

  .unread-count .unread {
    display: block;
    font-size: 12px;
    text-align: center;
    line-height: 18px;
  }

  .conversation-message {
    flex: 1;
    padding-left: 5px;
    display: flex;
    width: 160px;
    flex-direction: column;
    justify-content: space-around;
  }

  .conversation-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: right;
  }

  .conversation-name {
    font-size: 12px;
    font-weight: 500;
  }

  .conversation-time {
    width: 75px;
    color: #B9B9B9;
    display: flex;
    flex-direction: column;
  }

  .conversation-bottom {
    display: flex;
    color: #666666;
  }

  .conversation-content {
    display: flex;
    width: 160px;
    color: #b3b3b3;
  }

  .conversation-content .text {
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    white-space: nowrap;
    word-break: break-all;
  }

  .conversation-bottom .unread-text {
    color: #d02129;
    width: 35px !important;
  }

  .conversation .avatar {
    width: 40px;
    height: 40px;
    position: relative;
  }

  .conversation .avatar img {
    width: 100%;
    border-radius: 10%;
  }

  .router-link-active {
    background: #eeeeee;
  }

  .action-box {
    width: 100px;
    height: 60px;
    background: #ffffff;
    border: 1px solid #cccccc;
    position: fixed;
    z-index: 100;
    border-radius: 5px;
  }

  .action-box .action-item {
    padding-left: 15px;
    line-height: 30px;
    font-size: 13px;
    color: #262628;
    cursor: pointer;
  }

  .action-box .action-item:hover {
    background: #dddddd;
  }

  .chat {
    flex: 1;
    display: flex;
  }

</style>
