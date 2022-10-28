<template>
  <div class="conversations">
    <div class="conversation-list">
      <div class="conversation-list-container">
        <div class="conversation-list-content">
          <div v-if="conversations.length">
            <div
              v-for="(conversation, key) in conversations" :key="key"
              class="conversation"
              @click="chat(conversation)"
              @contextmenu.prevent.stop="e => showRightClickMenu(e,conversation)"
              :class="{
                checked:
                  $route.path === '/conversations/privatechat' && conversation.userId === $route.query.id ||
                  $route.path === '/conversations/groupchat' && conversation.groupId === $route.query.id
              }"
            >
              <div class="avatar">
                <img :src="conversation.data.avatar"/>
                <div v-if="conversation.unread && currentUser.id !== conversation.lastMessage.senderId"
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
      <private-chat :key="$route.query.id" v-if="$route.path === '/conversations/privatechat'"/>
      <group-chat :key="$route.query.id" v-if="$route.path === '/conversations/groupchat'"/>
    </div>
  </div>
</template>

<script>
  import PrivateChat from './PrivateChat';
  import GroupChat from './GroupChat';
  import restApi from "../api/restapi";
  import {formatDate} from '../utils/utils.js'

  export default {
    name: 'Conversations',
    components: {
      PrivateChat,
      GroupChat,
    },
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
        this.rightClickMenu = {
          conversation: conversation,
          visible: true,
          x: e.pageX,
          y: e.pageY,
        }
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
        let confirmResult = confirm('确认要删除这条会话吗？');
        if (confirmResult===false) {
          return
        }
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
      },
      chat(conversation) {
        let path = conversation.type === 'private' ? 'privatechat' : 'groupchat';
        let id = conversation.type === 'private' ? conversation.userId : conversation.groupId;
        this.$router.replace({
          path: `/conversations/${path}`,
          query: {
            id: id,
            name: conversation.data.name,
            avatar: conversation.data.avatar
          }
        });
      }
    },
  };
</script>

<style lang="scss" scoped>
  .conversations {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    color: #333333;

    .conversation-list {
      width: 260px;

      .conversation-list-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: white;
        border-right: #dbd6d6 1px solid;

        .conversation-list-content {
          flex: 1;
          overflow-y: auto;
          padding: 20px 0;

          &::-webkit-scrollbar { // Chrome Safari
            display: none;
          }

          scrollbar-width: none; // firefox
          -ms-overflow-style: none; // IE 10+
          .no-conversation {
            text-align: center;
            color: #666666;
          }

          .conversation {
            display: flex;
            padding: 12px 6px;
            cursor: pointer;

            .unread-count {
              position: absolute;
              top: -8px;
              left: 40px;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              color: white;
              background: #d02129;

              .unread {
                display: block;
                font-size: 12px;
                text-align: center;
                line-height: 18px;
              }
            }

            .conversation-message {
              padding-left: 5px;
              display: flex;
              width: 180px;
              flex-direction: column;
              justify-content: space-around;

              .conversation-top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                text-align: right;

                .conversation-name {
                  font-size: 14px;
                  font-weight: 500;
                }

                .conversation-time {
                  width: 75px;
                  color: #B9B9B9;
                  display: flex;
                  flex-direction: column;
                }
              }

              .conversation-bottom {
                display: flex;
                color: #666666;

                .conversation-content {
                  display: flex;
                  width: 180px;
                  color: #b3b3b3;

                  .text {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    flex: 1;
                    white-space: nowrap;
                    word-break: break-all;
                  }
                }

                .unread-text {
                  color: #d02129;
                  width: 35px !important;
                }
              }
            }

            .avatar {
              width: 50px;
              height: 50px;
              position: relative;

              img {
                width: 100%;
                border-radius: 10%;
              }
            }

            .group-avatar {
              width: 50px;
              height: 50px;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
              align-content: center;
              flex-wrap: wrap-reverse;
            }
          }

          .checked {
            background: #eeeeee;
          }
        }
      }

      .action-box {
        width: 100px;
        height: 60px;
        background: #ffffff;
        border: 1px solid #cccccc;
        position: fixed;
        z-index: 100;
        border-radius: 5px;

        .action-item {
          padding-left: 15px;
          line-height: 30px;
          font-size: 13px;
          color: #262628;
          cursor: pointer;

          &:hover {
            background: #dddddd;
          }
        }
      }
    }

    .chat {
      flex: 1;
      display: flex;
    }
  }
</style>
