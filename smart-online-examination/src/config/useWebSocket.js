
export const API_BASE_URL = 'http://localhost:8080'
export const API_BASE_FILE_URL = `${API_BASE_URL}/api/files`
export const API_BASE_PROFILE_URL = `${API_BASE_URL}/api/upload/profile`
export const API_BASE_FILE_MESSAGE_URL = `${API_BASE_URL}/api/files/messages/`;
// src/composables/useWebSocketHandler.js
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

const API_BASE = API_BASE_URL;
let stompClient = null
let isConnected = false
const topicHandlers = {}

export function registerHandler(topic, callback) {
  topicHandlers[topic] = callback
  if (isConnected && stompClient) {
    stompClient.subscribe(topic, (message) => {
      try {
        const data = JSON.parse(message.body)
        callback(data)
      } catch (e) {
        console.error('Failed to parse message on topic:', topic, e)
      }
    })
  }
}

export function connectWebSocket() {
  if (stompClient && stompClient.active) return

  stompClient = new Client({
    webSocketFactory: () => new SockJS(`${API_BASE}/ws`),
    reconnectDelay: 5000,

    onConnect: () => {
      console.log('✅ WebSocket connected')
      isConnected = true
      Object.entries(topicHandlers).forEach(([topic, callback]) => {
        stompClient.subscribe(topic, (message) => {
          try {
            const data = JSON.parse(message.body)
            callback(data)
          } catch (err) {
            console.error(`❌ Failed to parse message on ${topic}`, err)
          }
        })
      })
    },

    onStompError: (frame) => {
      console.error('❌ STOMP error:', frame.headers['message'])
    },

    onWebSocketClose: () => {
      console.warn('⚠️ WebSocket connection closed')
      isConnected = false
    }
  })

  stompClient.activate()
}

export function sendMessage(destination, payload) {
  if (stompClient && stompClient.active && isConnected) {
    stompClient.publish({
      destination,
      body: JSON.stringify(payload)
    })
  } else {
    console.warn('Cannot send message. Not connected.')
  }
}