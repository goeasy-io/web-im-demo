<template>
  <div class="conversations">
    <div class="conversation-list">
      <div class="conversation-list-container">
        <div class="conversation-list-content">
          <div v-if="conversations.length">
            <router-link replace
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

<script lang="ts" setup>
  import {ref, reactive, onMounted, onBeforeMount, onBeforeUnmount, inject} from 'vue';
  import {useRouter} from 'vue-router';
  import restApi from "../api/restapi";
  import {formatDate} from '../utils/utils'

  const router = useRouter();
  const GoEasy:any = inject('GoEasy');
  const goEasy:any = inject('goEasy');
  let currentUser:any = inject('currentUser');

  let conversations = ref([]);
  let rightClickMenu = reactive({
    conversation: null,
    visible: false,
    x: null,
    y: null,
  });

  function loadConversations() {
    goEasy.im.latestConversations({
      onSuccess: (result:any) => {
        let content = result.content;
        renderConversations(content);
      },
      onFailed: (error:any) => {
        console.log('获取最新会话列表失败, code:' + error.code + 'content:' + error.content);
      },
    });
  }

  function listenConversationUpdate() {
    // 监听会话列表变化
    goEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, renderConversations);
  }

  function renderConversations(content:any) {
    conversations.value = content.conversations;
  }

  function subscribeGroup() {
    let groups = restApi.findGroups(currentUser.value);
    let groupIds = groups.map((item:any) => item.id);
    goEasy.im.subscribeGroup({
      groupIds: groupIds,
      onSuccess: function () {
        console.log('订阅群消息成功');
      },
      onFailed: function (error:any) {
        console.log('订阅群消息失败:', error);
      },
    });
  }

  function showRightClickMenu(e:any, conversation:any) {
    rightClickMenu.conversation = conversation;
    rightClickMenu.visible = true;
    rightClickMenu.x = e.pageX;
    rightClickMenu.y = e.pageY;
  }

  function hideRightClickMenu() {
    rightClickMenu.visible = false;
  }

  function topConversation() {
    let conversation:any = rightClickMenu.conversation;
    let description = conversation.top ? '取消置顶' : '置顶';
    goEasy.im.topConversation({
      conversation: conversation,
      top: !conversation.top,
      onSuccess: function () {
        console.log(description, '成功');
      },
      onFailed: function (error:any) {
        console.log(description, '失败：', error);
      },
    });
  }

  function deleteConversation() {
    if (confirm('确认要删除这条会话吗？')) {
      let conversation = rightClickMenu.conversation;
      goEasy.im.removeConversation({
        conversation: conversation,
        onSuccess: function () {
          console.log('删除会话成功');
        },
        onFailed: function (error:any) {
          console.log(error);
        },
      });
    }
  }

  function chatLocation (conversation:any) {
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

  onBeforeMount(() => {
    console.log('conversation onBeforeMount')
  })

  onMounted(() => {
    console.log('conversation onMounted')
    //隐藏Conversation右键菜单
    document.addEventListener('click', () => {
      hideRightClickMenu();
    });

    listenConversationUpdate(); //监听会话列表变化
    loadConversations(); //加载会话列表
    subscribeGroup();  //订阅群消息
  })

  onBeforeUnmount(() => {
    goEasy.im.off(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, renderConversations);
  })
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
    width: 260px;
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
    padding: 20px 0;
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
    padding: 12px 6px;
    cursor: pointer;
  }

  .unread-count {
    position: absolute;
    top: -8px;
    left: 40px;
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
    width: 180px;
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
    font-size: 14px;
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
    width: 180px;
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
    width: 50px;
    height: 50px;
    position: relative;
  }

  .conversation .avatar img {
    width: 100%;
    border-radius: 10%;
  }

  .router-link-active .conversation {
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
