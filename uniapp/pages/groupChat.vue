<template>
  <view class="chatInterface" @contextmenu.prevent="">
    <image class="group-icon" src="/static/images/group-icon.png" @click="showMembers"/>
    <view class="scroll-view">
      <image v-if="history.loading" class="history-loaded" src="/static/images/loading.svg"/>
      <view v-else :class="history.allLoaded ? 'history-loaded':'load'" @click="loadHistoryMessage(false)">
        <view>{{ history.allLoaded ? '已经没有更多的历史消息' : '点击获取历史消息' }}</view>
      </view>

      <checkbox-group @change="selectMessages">
        <view v-for="(message,index) in history.messages" :key="message.messageId">
          <!--时间显示，类似于微信，隔5分钟不发言，才显示时间-->
          <view class="time-lag">
            {{ renderMessageDate(message, index) }}
          </view>
          <view class="message-recalled" v-if="message.recalled">
            <view v-if="message.senderId !== currentUser.id">{{ message.senderData.name }}撤回了一条消息</view>
            <view v-else class="message-recalled-self">
              <view>你撤回了一条消息</view>
              <span v-if="message.type === 'text' && Date.now()-message.timestamp< 60 * 1000 "
                    @click="editRecalledMessage(message.payload.text)">重新编辑</span>
            </view>
          </view>
          <view class="message-item" v-else>
            <view class="message-item-checkbox">
              <checkbox v-show="messageSelector.visible && message.status !== 'sending'" :value="message.messageId"
                        :checked="messageSelector.messages.includes(message)"/>
            </view>
            <view class="message-item-content" :class="{'self' : message.senderId ===  currentUser.id}">
              <view class="avatar">
                <image :src="message.senderData.avatar"></image>
              </view>

              <view class="content" @click.right="showActionPopup(message)" @longpress="showActionPopup(message)">
                <view class="message-payload">
                  <b class="pending" v-if="message.status === 'sending'"></b>
                  <b class="send-fail" v-if="message.status === 'fail'"></b>
                  <view v-if="message.type === 'text'" v-html="renderTextMessage(message)"></view>
                  <image v-if="message.type === 'image'"
                     :data-url="message.payload.url"
                     :src="message.payload.url"
                     :style="{height: getImageHeight(message.payload.width,message.payload.height)+'rpx' }"
                     class="image-content"
                     mode="heightFix"
                     @click="showImageFullScreen"
                  ></image>
                  <view class="video-snapshot" v-if="message.type === 'video'" :data-url="message.payload.video.url"
                        @click="playVideo">
                    <image
                      :src="message.payload.thumbnail.url"
                      :style="{height: getImageHeight(message.payload.thumbnail.width,message.payload.thumbnail.height)+'rpx' }"
                      mode="heightFix"
                    ></image>
                    <view class="video-play-icon"></view>
                  </view>
                  <view class="file-content" v-if="message.type === 'file'">
                    <view class="file-info">
                      <span class="file-name">{{ message.payload.name }}</span>
                      <span class="file-size">{{ (message.payload.size / 1024).toFixed(2) }}KB</span>
                    </view>
                    <image class="file-img" src="/static/images/file-icon.png"></image>
                  </view>
                  <view v-if="message.type ==='audio'" class="audio-content" @click="playAudio(message)">
                    <view class="audio-facade" :style="{width:Math.ceil(message.payload.duration)*7 + 50 + 'px'}">
                      <view
                        class="audio-facade-bg"
                        :class="{'play-icon':audioPlayer.playingMessage && audioPlayer.playingMessage.messageId === message.messageId}"
                      ></view>
                      <view>{{Math.ceil(message.payload.duration) || 1}}<span>"</span></view>
                    </view>
                  </view>
                  <view v-if="message.type === 'order'" class="order-content">
                    <view class="order-id">订单号：{{ message.payload.id }}</view>
                    <view class="order-body">
                      <image :src="message.payload.url" class="order-img"></image>
                      <view>
                        <view class="order-name">{{ message.payload.name }}</view>
                        <view class="order-info">
                          <view class="order-price">{{ message.payload.price }}</view>
                          <view class="order-count">共{{ message.payload.count }}件</view>
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </checkbox-group>
    </view>
    <view class="action-box" v-if="!videoPlayer.visible && !messageSelector.visible">
      <view class="action-top">
        <view @click="switchAudioKeyboard">
          <image class="more" v-if="audio.visible" src="/static/images/jianpan.png"></image>
          <image class="more" v-else src="/static/images/audio.png"></image>
        </view>
        <view v-if="audio.visible" class="record-input" @click="onRecordStart" @touchend="onRecordEnd" @touchstart="onRecordStart">
          {{ audio.recording ? '松开发送' : '按住录音' }}
        </view>
        <!-- GoEasyIM最大支持3k的文本消息，如需发送长文本，需调整输入框maxlength值 -->
        <input v-else v-model="text" class="consult-input" maxlength="700" placeholder="发送消息" type="text" />
        <view @click="switchEmojiKeyboard">
          <image class="more" v-if="emoji.visible" src="/static/images/jianpan.png"></image>
          <image class="more" v-else src="/static/images/emoji.png"></image>
        </view>
        <view>
          <image @click="showOtherTypesMessagePanel()" class="more" src="/static/images/more.png"/>
        </view>
        <view v-if="text" class="send-btn-box">
          <text class="btn" @click="sendTextMessage()">发送</text>
        </view>
      </view>
      <view class="action-bottom action-bottom-emoji" v-if="emoji.visible">
        <image class="emoji-item" v-for="(emojiItem, key, index) in emoji.map" :key="index" :src="emoji.url + emojiItem"
               @click="chooseEmoji(key)"></image>
      </view>
      <!--其他类型消息面板-->
      <view v-if="otherTypesMessagePanelVisible" class="action-bottom">
        <view class="more-icon">
          <image @click="sendImageMessage()" class="operation-icon" src="/static/images/picture.png"></image>
          <view class="operation-title">图片</view>
        </view>
        <view class="more-icon">
          <image @click="sendVideoMessage()" class="operation-icon" src="/static/images/video.png"></image>
          <view class="operation-title">视频</view>
        </view>
        <view class="more-icon">
          <image @click="showOrderMessageList()" class="operation-icon" src="/static/images/order.png"></image>
          <view class="operation-title">订单</view>
        </view>
      </view>
    </view>
    <view class="action-popup" @touchmove.stop.prevent v-if="actionPopup.visible">
      <view class="layer"></view>
      <view class="action-list">
        <view class="action-item" @click="deleteSingleMessage">删除</view>
        <view class="action-item" v-if="actionPopup.recallable" @click="recallMessage">撤回</view>
        <view class="action-item" @click="showCheckBox">多选</view>
        <view class="action-item" @click="hideActionPopup">取消</view>
      </view>
    </view>
    <view class="messageSelector-box" v-if="messageSelector.visible">
      <image class="messageSelector-btn" @click="deleteMultipleMessages" src="/static/images/delete.png"></image>
    </view>
    <view class="record-loading" v-if="audio.recording"></view>
    <video v-if="videoPlayer.visible" :src="videoPlayer.url" id="videoPlayer"
           @fullscreenchange="onVideoFullScreenChange"></video>
    <view v-if="orderList.visible" class="order-list">
      <view class="orders-content">
        <view class="title">
          <view>请选择一个订单</view>
          <view class="close" @click="hideOrderMessageList">×</view>
        </view>
        <view class="orders">
          <view
            v-for="(order, index) in orderList.orders"
            :key="index" class="order-item"
            @click="sendOrderMessage(order)"
          >
            <view class="order-id">订单号：{{ order.id }}</view>
            <view class="order-body">
              <image :src="order.url" class="order-img"></image>
              <view class="order-name">{{ order.name }}</view>
              <view class="order-right">
                <view class="order-price">{{ order.price }}</view>
                <view class="order-count">共{{ order.count }}件</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import {ref, reactive, inject, nextTick} from 'vue';
  import {onLoad, onShow, onReady, onUnload, onPullDownRefresh} from "@dcloudio/uni-app";
  import EmojiDecoder from '../lib/EmojiDecoder';
  import restApi from '../lib/restapi';
  import {formatDate} from '../lib/utils';

  const GoEasy: any = inject('GoEasy');
  const goEasy: any = inject('goEasy');
  const currentUser: any = inject('currentUser');

  const IMAGE_MAX_WIDTH = 200;
  const IMAGE_MAX_HEIGHT = 150;
  const emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
  const emojiMap = {
    '[么么哒]': 'emoji_3@2x.png',
    '[乒乓]': 'emoji_4@2x.png',
    '[便便]': 'emoji_5@2x.png',
    '[信封]': 'emoji_6@2x.png',
    '[偷笑]': 'emoji_7@2x.png',
    '[傲慢]': 'emoji_8@2x.png'
  };
  // #ifndef H5
  const recorderManager = uni.getRecorderManager();
  // #endif

  //聊天文本框
  let text = ref('');
  let group = ref({} as any);
  let groupMembers = null;
  let to = {} as any;// 作为createMessage的参数

  //定义表情列表
  let emoji = reactive({
    url: emojiUrl,
    map: emojiMap,
    visible: false,
    decoder: new EmojiDecoder(emojiUrl, emojiMap),
  })
  //是否展示‘其他消息类型面板’
  let otherTypesMessagePanelVisible = ref(false)
  let orderList = reactive({
    orders: [],
    visible: false,
  })
  let history = reactive({
    messages: [] as any,
    allLoaded: false,
    loading: true
  })
  let audio = reactive({
    startTime: null,
    //语音录音中
    recording: false,
    //录音按钮展示
    visible: false
  })
  let audioPlayer = reactive({
    innerAudioContext: null,
    audio: {} as any,
    playingMessage: null,
  })
  let videoPlayer = reactive({
    visible: false,
    url: '',
    context: null
  })
  // 展示消息删除弹出框
  let actionPopup = reactive({
    visible: false,
    message: null,
    recallable: false,
  })
  // 消息选择
  let messageSelector = reactive({
    messages: [] as any,
    visible: false,
    ids: [] as any
  }as any)

  onLoad((options) => {
    //聊天对象
    let id = options.to;
    group.value = restApi.findGroupById(id);
    groupMembers = restApi.findGroupMembers(id);
    to = {
      id: group.value.id,
      type: GoEasy.IM_SCENE.GROUP,
      data: {
        name: group.value.name,
        avatar: group.value.avatar
      }
    };

    initialGoEasyListeners();
    // 语音播放器
    initialAudioPlayer();
    // #ifndef H5
    // 录音监听器
    initRecorderListeners();
    // #endif
  })

  onShow(() => {
    otherTypesMessagePanelVisible.value = false;
    emoji.visible = false;
  })

  onReady(() => {
    loadHistoryMessage(true);
    videoPlayer.context = uni.createVideoContext('videoPlayer', this);
    // https://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbartitle
    uni.setNavigationBarTitle({
      title: group.value.name + '（' + Object.keys(groupMembers).length + '）'
    });
  })

  onPullDownRefresh(() => {
    loadHistoryMessage(false);
  })

  onUnload(() => {
    //退出聊天页面之前，清空监听器
    goEasy.im.off(GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, onMessageReceived);
    goEasy.im.off(GoEasy.IM_EVENT.MESSAGE_DELETED, onMessageDeleted);
  })

  //渲染文本消息，如果包含表情，替换为图片
  //todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
  function renderTextMessage(message:any) {
    return '<span class="text-content">' + emoji.decoder.decode(message.payload.text) + '</span>'
  }

  //像微信那样显示时间，如果有几分钟没发消息了，才显示时间
  //todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
  function renderMessageDate(message:any, index:any) {
    if (index === 0) {
      return formatDate(message.timestamp)
    } else {
      if (message.timestamp - history.messages[index - 1].timestamp > 5 * 60 * 1000) {
        return formatDate(message.timestamp)
      }
    }
    return '';
  }

  function initialGoEasyListeners() {
    // 监听私聊消息
    goEasy.im.on(GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, onMessageReceived);
    //监听消息删除
    goEasy.im.on(GoEasy.IM_EVENT.MESSAGE_DELETED, onMessageDeleted);
  }

  function onMessageReceived(message:any) {
    let groupId = message.groupId;
    if (groupId === group.value.id) {
      history.messages.push(message);
      //聊天时，收到消息标记为已读
      markGroupMessageAsRead();
      //收到新消息，是滚动到最底部
      scrollToBottom();
    }
  }

  function onMessageDeleted(deletedMessages:any) {
    deletedMessages.forEach((message:any) => {
      let groupId = message.groupId;
      if (groupId && groupId === group.value.id) {
        let index = history.messages.indexOf(message);
        if (index > -1) {
          history.messages.splice(index, 1);
        }
      }
    });
  }

  function initialAudioPlayer() {
    audioPlayer.innerAudioContext = uni.createInnerAudioContext();
    audioPlayer.innerAudioContext.onEnded(() => {
      audioPlayer.playingMessage = null;
    });
    audioPlayer.innerAudioContext.onStop(() => {
      audioPlayer.playingMessage = null;
    });
  }

  function initRecorderListeners() {
    // 监听录音开始
    recorderManager.onStart(() => {
      audio.recording = true;
      audio.startTime = Date.now();
    });
    //录音结束后，发送
    recorderManager.onStop((res) => {
      let endTime = Date.now();
      audio.recording = false;
      let duration = endTime - audio.startTime;
      if (duration < 1000) {
        uni.showToast({
          icon: 'error',
          title: '录音时间太短',
          duration: 500
        });
        return;
      }
      res.duration = duration;
      goEasy.im.createAudioMessage({
        to: to,
        file: res,
        notification: {
          title: currentUser.value.name + '发来一段语音',
          body: '[语音消息]'		// 字段最长 50 字符
        },
        onProgress: function (progress:any) {
          console.log(progress)
        },
        onSuccess: (message:any) => {
          sendMessage(message);
        },
        onFailed: (e:any) => {
          console.log('error :', e);
        }
      });
    });
    // 监听录音报错
    recorderManager.onError(() => {
      audio.recording = false;
      recorderManager.stop();
      uni.showToast({
        icon: 'none',
        title: '录音失败,请检查麦克风权限',
        duration: 1000
      });
    })
  }
  /**
   * 核心就是设置高度，产生明确占位
   *
   * 小  (宽度和高度都小于预设尺寸)
   *    设高=原始高度
   * 宽 (宽度>高度)
   *    高度= 根据宽度等比缩放
   * 窄  (宽度<高度)或方(宽度=高度)
   *    设高=MAX height
   *
   * @param width,height
   * @returns number
   */

  function getImageHeight(width:number, height:number) {
    if (width < IMAGE_MAX_WIDTH && height < IMAGE_MAX_HEIGHT) {
      return height * 2;
    } else if (width > height) {
      return (IMAGE_MAX_WIDTH / width * height) * 2;
    } else if (width === height || width < height) {
      return IMAGE_MAX_HEIGHT * 2;
    }
  }

  function sendMessage(message:any) {
    let messageRef = ref()
    messageRef.value = message
    history.messages.push(messageRef.value);
    scrollToBottom();
    goEasy.im.sendMessage({
      message: messageRef.value,
      onSuccess: function (message:any) {
        console.log('发送成功.', message);
      },
      onFailed: function (error:any) {
        if (error.code === 507) {
          console.log('发送语音/图片/视频/文件失败，没有配置OSS存储，详情参考：https://www.goeasy.io/cn/docs/goeasy-2.x/im/message/media/send-media-message.html');
        } else {
          console.log('发送失败:', error);
        }
      }
    });
  }

  function sendTextMessage() {
    if (text.value.trim() !== '') {
      let body = text.value;
      if (text.value.length >= 50) {
        body = text.value.substring(0, 30) + '...';
      }
      goEasy.im.createTextMessage({
        text: text.value,
        to: to,
        notification: {
          title: currentUser.value.name + '发来一段文字',
          body: body
        },
        onSuccess: (message:any) => {
          sendMessage(message);
        },
        onFailed: (e:any) => {
          console.log('error :', e);
        }
      });
    }
    text.value = '';
  }

  function sendVideoMessage() {
    uni.chooseVideo({
      success: (res) => {
        goEasy.im.createVideoMessage({
          to: to,
          file: res,
          notification: {
            title: currentUser.value.name + '发来一个视频',
            body: '[视频消息]'		// 字段最长 50 字符
          },
          onProgress: function (progress:any) {
            console.log(progress)
          },
          onSuccess: (message:any) => {
            otherTypesMessagePanelVisible.value = false;
            sendMessage(message);
          },
          onFailed: (e:any) => {
            console.log('error :', e);
          }
        });
      }
    })
  }

  function sendImageMessage() {
    uni.chooseImage({
      count: 9,
      success: (res) => {
        res.tempFiles.forEach((file:any) => {
          goEasy.im.createImageMessage({
            to: to,
            file: file,
            notification: {
              title: currentUser.value.name + '发来一张图片',
              body: '[图片消息]'		// 字段最长 50 字符
            },
            onProgress: function (progress:any) {
              console.log(progress)
            },
            onSuccess: (message:any) => {
              otherTypesMessagePanelVisible.value = false;
              sendMessage(message);
            },
            onFailed: (e:any) => {
              console.log('error :', e);
            }
          });
        })
      }
    });
  }

  function sendOrderMessage(order:any) {
    //GoEasyIM自定义消息,实现订单发送
    goEasy.im.createCustomMessage({
      type: 'order',
      payload: order,
      to: to,
      notification: {
        title: currentUser.value.name + '发来一个订单',
        body: '[订单消息]'
      },
      onSuccess: (message:any) => {
        otherTypesMessagePanelVisible.value = false;
        sendMessage(message);
      },
      onFailed: (e:any) => {
        console.log('error :', e);
      }
    });
    orderList.visible = false;
  }

  function showActionPopup(message:any) {
    const MAX_RECALLABLE_TIME = 3 * 60 * 1000; //3分钟以内的消息才可以撤回
    messageSelector.messages = [message];
    if ((Date.now() - message.timestamp) < MAX_RECALLABLE_TIME && message.senderId === currentUser.value.id && message.status === 'success') {
      actionPopup.recallable = true;
    } else {
      actionPopup.recallable = false;
    }
    actionPopup.visible = true;
  }

  function hideActionPopup() {
    actionPopup.visible = false;
    actionPopup.message = null;
  }

  function deleteSingleMessage() {
    uni.showModal({
      content: '确认删除？',
      success: (res) => {
        actionPopup.visible = false;
        if (res.confirm) {
          deleteMessage();
        }
      },
    })
  }

  function deleteMultipleMessages() {
    if (messageSelector.messages.length > 0) {
      uni.showModal({
        content: '确认删除？',
        success: (res) => {
          messageSelector.visible = false;
          if (res.confirm) {
            deleteMessage();
          }
        },
      })
    }
  }

  function deleteMessage() {
    goEasy.im.deleteMessage({
      messages: messageSelector.messages,
      onSuccess: () => {
        messageSelector.messages.forEach((message:any) => {
          let index = history.messages.indexOf(message);
          if (index > -1) {
            history.messages.splice(index, 1);
          }
        });
        messageSelector.messages = [];
      },
      onFailed: (error:any) => {
        console.log('error:', error);
      }
    });
  }

  function recallMessage() {
    actionPopup.visible = false;
    goEasy.im.recallMessage({
      messages: messageSelector.messages,
      onSuccess: () => {
        console.log('撤回成功');
      },
      onFailed: (error:any) => {
        console.log('撤回失败,error:', error);
      }
    });
  }

  function editRecalledMessage(content:string) {
    if (audio.visible) {
      audio.visible = false;
    }
    text.value = content;
  }

  function showCheckBox() {
    messageSelector.messages = [];
    messageSelector.visible = true;
    actionPopup.visible = false;
  }

  function selectMessages(e:any) {
    const selectedMessageIds = e.detail.value;
    let selectedMessages = [];
    history.messages.forEach((message:any) => {
      if (selectedMessageIds.includes(message.messageId)) {
        selectedMessages.push(message);
      }
    })
    messageSelector.messages = selectedMessages;
  }

  function loadHistoryMessage(isScrollToBottom:boolean) {//历史消息
    history.loading = true;
    let lastMessageTimeStamp: any;
    let lastMessage: any = history.messages[0];
    if (lastMessage) {
      lastMessageTimeStamp = lastMessage.timestamp;
    }
    goEasy.im.history({
      groupId: group.value.id,
      lastTimestamp: lastMessageTimeStamp,
      limit: 10,
      onSuccess: (result:any) => {
        uni.stopPullDownRefresh();
        history.loading = false;
        let messages = reactive([] as any);
        messages.push(...result.content);
        if (messages.length === 0) {
          history.allLoaded = true;
        } else {
          if (lastMessageTimeStamp) {
            messages.push(...history.messages)
            history.messages = messages;
          } else {
            history.messages = messages;
          }
          if (messages.length < 10) {
            history.allLoaded = true;
          }
          if (isScrollToBottom) {
            scrollToBottom();
            //收到的消息设置为已读
            markGroupMessageAsRead();
          }
        }
      },
      onFailed: (error:any) => {
        //获取失败
        console.log('获取历史消息失败:', error);
        uni.stopPullDownRefresh();
        history.loading = false;
      }
    });
  }
  //语音录制按钮和键盘输入的切换

  function switchAudioKeyboard() {
    audio.visible = !audio.visible;
    if (uni.authorize) {
      uni.authorize({
        scope: 'scope.record',
        fail: () => {
          uni.showModal({
            title: '获取录音权限失败',
            content: '请先授权才能发送语音消息！'
          });
        }
      });
    }
  }

  function showMembers() {//显示群成员
    uni.navigateTo({
      url: './member?members=' + JSON.stringify(groupMembers)
    });
  }

  function onRecordStart() {
    try {
      recorderManager.start({});
    } catch (e) {
      uni.showModal({
        title: '录音错误',
        content: '请在app和小程序端体验录音，Uni官方明确H5不支持getRecorderManager, 详情查看Uni官方文档'
      });
    }
  }

  function onRecordEnd() {
    try {
      recorderManager.stop();
    } catch (e) {
      console.log(e);
    }
  }

  function showImageFullScreen(e:any) {
    let imagesUrl = [e.currentTarget.dataset.url];
    uni.previewImage({
      urls: imagesUrl
    });
  }

  function playVideo(e:any) {
    videoPlayer.visible = true;
    videoPlayer.url = e.currentTarget.dataset.url;
    nextTick(() => {
      videoPlayer.context.requestFullScreen({
        direction: 0
      });
      videoPlayer.context.play();
    });
  }

  function playAudio(audioMessage:any) {
    let playingMessage = audioPlayer.playingMessage;

    if (playingMessage) {
      audioPlayer.innerAudioContext.stop();
      // 如果点击的消息正在播放，就认为是停止播放操作
      if (playingMessage === audioMessage) {
        return;
      }
    }
    audioPlayer.playingMessage = audioMessage;
    audioPlayer.innerAudioContext.src = audioMessage.payload.url;
    audioPlayer.innerAudioContext.play();
  }

  function onVideoFullScreenChange(e:any) {
    //当退出全屏播放时，隐藏播放器
    if (videoPlayer.visible && !e.detail.fullScreen) {
      videoPlayer.visible = false;
      videoPlayer.context.stop();
    }
  }

  function switchEmojiKeyboard() {
    emoji.visible = !emoji.visible;
    otherTypesMessagePanelVisible.value = false;
  }

  function showOtherTypesMessagePanel() {
    otherTypesMessagePanelVisible.value = !otherTypesMessagePanelVisible.value;
    emoji.visible = false;
  }

  function chooseEmoji(emojiKey:string) {
    text.value += emojiKey;
  }

  function showOrderMessageList() {
    orderList.orders = restApi.getOrderList();
    orderList.visible = true;
  }

  function hideOrderMessageList() {
    orderList.visible = false;
  }

  function scrollToBottom() {
    nextTick(() => {
      uni.pageScrollTo({
        scrollTop: 2000000,
        duration: 0
      });
    });
  }

  function markGroupMessageAsRead() {
    goEasy.im.markMessageAsRead({
      id: to.id,
      type: to.type,
      onSuccess: function () {
        console.log('标记私聊已读成功');
      },
      onFailed: function (error:any) {
        console.log("标记私聊已读失败", error);
      }
    });
  }
</script>

<style>

</style>
