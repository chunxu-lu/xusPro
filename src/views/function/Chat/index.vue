<template>
  <div class="chat-container">
    <ul class="message-list">
      <li v-for="(message, index) in messages" :key="index" class="message">{{ message }}</li>
    </ul>
    <div class="input-area">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." class="message-input" />
      <button @click="sendMessage" class="send-button">Send</button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/pinia'
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  setup() {
    const messages = ref([])
    const newMessage = ref('')
    const socket = ref(null)

    const connectWebSocket = () => {

      // 线上
      // socket.value = new WebSocket('wss://www.bytedancing.top/chat');
      // 本地
      socket.value = new WebSocket('ws://127.0.0.1:8080/chat');

      socket.value.onopen = () => {
        console.log('WebSocket connection established')
      }

      socket.value.onmessage = event => {
        messages.value.push(event.data)
      }

      socket.value.onclose = () => {
        console.log('WebSocket connection closed')
      }

      socket.value.onerror = error => {
        console.error('WebSocket error:', error)
      }
    }

    const sendMessage = () => {
      if (newMessage.value.trim() !== '') {
        socket.value.send(
          JSON.stringify({
            user: useUserStore().userInfo?.username || 'You',
            message: newMessage.value
          })
        )
        newMessage.value = ''
      }
    }

    onMounted(() => {
      connectWebSocket()
    })

    onBeforeUnmount(() => {
      if (socket.value) {
        socket.value.close()
      }
    })

    return {
      messages,
      newMessage,
      sendMessage
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 600px;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.message {
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  max-width: 70%;
  word-wrap: break-word;
  position: relative;
}

.message::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: -10px;
  border-width: 10px 10px 0 0;
  border-style: solid;
  border-color: #fff transparent transparent transparent;
}

.input-area {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.message-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.send-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #0056b3;
}
</style>
