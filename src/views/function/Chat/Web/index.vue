<template>
  <div>
    <el-button @click="clearAllChat">清空所有聊天</el-button>
  </div>
  <div style="display: flex; justify-content: space-around">
    <div>
      <div style="display: flex; align-items: center; margin-bottom: 10px">
        <div style="margin-right: 20px">
          用户：zhaolei
          <span :class="['status-dot', isOnline ? 'online' : 'offline']"></span>
        </div>
        <el-button @click="joinChat1">加入聊天</el-button>
        <el-button @click="closeChat1">退出聊天</el-button>
      </div>
      <el-card class="chat-container">
        <ul class="message-list">
          <li v-for="(message, index) in messages" :key="index" :style="{
            display: 'flex',
            justifyContent: message.username === 'system' ? 'center' : (message.username === useUserStore().userInfo?.username ? 'end' : 'start')
          }">
            <div class="message" :class="message.username === 'system' ? 'message-nobg' : ''" :style="{ 
              backgroundColor: message.username === useUserStore().userInfo?.username ? '#409EFF' : '',
              color: message.username === useUserStore().userInfo?.username ? '#FFFFFF' : '',
              textAlign: 'left',
              maxWidth: '70%',
              border: message.username === 'system' ? 'none' : '',
              borderRadius: message.username === 'system' ? '0' : '10px',
              padding: '10px',
              margin: '5px 0',
              wordWrap: 'break-word',
              position: 'relative',
              display: 'inline-block',
            }">
              {{ message.username === useUserStore().userInfo?.username ? '' : message.username + ': ' }}{{ message.message }}
            </div>
          </li>
        </ul>
        <div class="input-area">
          <el-input v-model="newMessage" @change="sendMessage" placeholder="Type a message..." class="message-input" />
          <el-button @click="sendMessage" class="send-button">Send</el-button>
        </div>
      </el-card>
    </div>

    <div>
      <div style="display: flex; align-items: center; margin-bottom: 10px">
        <div style="margin-right: 20px">
          用户：qinshihuang
          <span :class="['status-dot', isOnline2 ? 'online' : 'offline']"></span>
        </div>
        <el-button @click="joinChat2">加入聊天</el-button>
        <el-button @click="closeChat2">退出聊天</el-button>
      </div>
      <el-card class="chat-container">
        <ul class="message-list">
          <li v-for="(message, index) in messages2" :key="index" :style="{
            display: 'flex',
            justifyContent: message.username === 'system' ? 'center' : (message.username === 'qinshihuang' ? 'end' : 'start')
          }">
            <div class="message" :class="message.username === 'system' ? 'message-nobg' : ''" :style="{ 
              backgroundColor: message.username === 'qinshihuang' ? '#409EFF' : '',
              color: message.username === 'qinshihuang' ? '#FFFFFF' : '',
              textAlign: 'left',
              maxWidth:'70%',
              border: message.username === 'system' ? 'none' : '',
              borderRadius: message.username === 'system' ? '0' : '10px',
              padding: '10px',
              margin: '5px 0',
              wordWrap: 'break-word',
              position: 'relative',
              display: 'inline-block',
            }">
              {{ message.username === 'qinshihuang' ? '' : message.username + ': ' }}{{ message.message }}
            </div>
          </li>
        </ul>
        <div class="input-area">
          <el-input v-model="newMessage2" @change="sendMessage2" placeholder="Type a message..."
            class="message-input" />
          <el-button @click="sendMessage2" class="send-button">Send</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
  import { useUserStore } from '@/pinia'
  import { ref, onBeforeUnmount } from 'vue'
  import { doLogin, clearChat } from '@/api/login'
  // 读取环境变量
  const wsHost = import.meta.env.VITE_APP_HOST_WS

  const messages = ref([])
  const newMessage = ref('')
  const socket = ref(null)
  const isOnline = ref(false) // 添加在线状态

  const messages2 = ref([])
  const newMessage2 = ref('')
  const socket2 = ref(null)
  const isOnline2 = ref(false) // 添加在线状态

  //zhaolei
  const connectWebSocket1 = () => {
    const token = sessionStorage.getItem('token')

    // 线上
    // socket.value = new WebSocket('wss://www.bytedancing.top/chat');
    // 本地
    socket.value = new WebSocket(`${wsHost}/chat?jwt=${token}`)

    socket.value.onopen = () => {
      ElMessage.success('WebSocket connection established')
      isOnline.value = true
    }

    socket.value.onmessage = event => {
      messages.value.push(JSON.parse(event.data))
    }

    socket.value.onclose = (event) => {
      console.log('WebSocket connection closed',event)
      isOnline.value = false
    }

    socket.value.onerror = error => {
      ElMessage.error('WebSocket connection error')
      console.error('WebSocket error:', error.code)
    }
  }

  // qinshihuang
  const connectWebSocket2 = async () => {
    if (!sessionStorage.getItem('user2token')) {
      const res = await doLogin({
        username: 'qinshihuang',
        password: 'qinshihuang'
      })
      sessionStorage.setItem('user2token', res.data.jwtToken)
    }

    const user2token = sessionStorage.getItem('user2token')

    // 线上
    // socket.value = new WebSocket('wss://www.bytedancing.top/chat');
    // 本地
    socket2.value = new WebSocket(`${wsHost}/chat?jwt=${user2token}`)

    socket2.value.onopen = () => {
      ElMessage.success('WebSocket connection established')
      isOnline2.value = true
    }

    socket2.value.onmessage = event => {
      messages2.value.push(JSON.parse(event.data))
    }

    socket2.value.onclose = () => {
      console.log('WebSocket connection closed')
      isOnline2.value = false
    }

    socket2.value.onerror = error => {
      console.error('WebSocket error:', error)
    }
  }

  const sendMessage = () => {
    if (newMessage.value.trim() !== '') {
      socket.value.send(
        JSON.stringify({
          user: useUserStore().userInfo?.username,
          message: newMessage.value
        })
      )
      newMessage.value = ''
    }
  }

  const sendMessage2 = () => {
    if (newMessage2.value.trim() !== '') {
      socket2.value.send(
        JSON.stringify({
          user: 'qinshihuang',
          message: newMessage2.value
        })
      )
      newMessage2.value = ''
    }
  }

  const joinChat1 = () => {
    if (!socket.value || socket.value.readyState === WebSocket.CLOSED) {
      connectWebSocket1()
    }
  }

  const joinChat2 = () => {
    if (!socket2.value || socket2.value.readyState === WebSocket.CLOSED) {
      connectWebSocket2()
    }
  }

  function closeChat1() {
    if (socket.value) {
      socket.value.close()
      ElMessage.success('WebSocket connection closed')
      messages.value = []
      newMessage.value = ''
    }
  }

  function closeChat2() {
    if (socket2.value) {
      socket2.value.close()
      ElMessage.success('WebSocket connection closed')
      messages2.value = []
      newMessage2.value = ''
    }
  }

  async function clearAllChat() {
    await clearChat()
    messages.value = []
    messages2.value = []
    ElMessage.success('chat message cleared')
  }

  onBeforeUnmount(() => {
    if (socket.value) {
      socket.value.close()
    }
    if (socket2.value) {
      socket2.value.close()
    }
  })
</script>

<style lang="scss" scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    min-width: 300px;
    height: 560px;
    background-color: var(--el-bg-color);
    padding: 10px 0;
    box-sizing: border-box;
    position: relative;
  }

  .message-list {
    height: 460px;
    overflow-y: auto;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .message {
    font-size: 12px;
    background-color: var(--el-fill-color-light);
    border-radius: 10px;
    padding: 10px;
    margin: 5px 0;
    word-wrap: break-word;
    position: relative;
    display: inline-block;
  }

  .message-nobg {
    color: red;
    background-color: transparent !important;
  }

  .input-area {
    display: flex;
    align-items: center;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: 20px;
    width: calc(100% - 20px);
  }

  .message-input {
    flex: 1;
    margin-right: 10px;
  }

  .send-button {
    padding: 10px 20px;
    background-color: var(--el-color-primary);
    color: var(--el-color-white);
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .send-button:hover {
    background-color: var(--el-color-primary-light-3);
  }

  .status-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-left: 5px;
  }

  .online {
    background-color: var(--el-color-success);
  }

  .offline {
    background-color: var(--el-color-danger);
  }
</style>