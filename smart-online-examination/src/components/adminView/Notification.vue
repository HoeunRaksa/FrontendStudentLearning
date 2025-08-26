<template>
  <div class="h-full">
    <main class="flex h-full shadow-lg min-h-[700px] max-h-[800px]">
      <!-- Sidebar -->
      <div class="w-1/4 bg-white shadow-md flex flex-col">
        <!-- Sidebar header -->
        <div
          class="p-4 font-bold text-lg border-b min-h-[80px] border border-e-0"
        >
          <div class="flex flex-col md:flex-row justify-between">
            <div class="relative">
              <img
                class="w-10 h-10 rounded-full"
                src="../../assets/images/a.jpg"
              />
              <span
                class="bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-1 border-white rounded-full"
              ></span>
            </div>
            <div class="flex items-center w-full md:w-auto gap-2">
              <input
                type="text"
                v-model="searchQuery"
                @input="handleSearch"
                placeholder="Search..."
                class="w-full min-w-[50px] md:min-w-[80px] text-md font-normal px-4 py-[6px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8c09f4]"
              />
            </div>
          </div>
        </div>

        <ul class="flex-1 overflow-y-auto">
          <li
            v-for="chat in chats"
            :key="chat.id"
            class="p-3 cursor-pointer flex items-center"
            :class="{
              'bg-blue-100': selectedChat && selectedChat.id === chat.id,
              'hover:bg-gray-200': !(
                selectedChat && selectedChat.id === chat.id
              ),
            }"
            @click="selectChat(chat)"
          >
            <div
              class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white"
            >
              <component :is="chat.icon" class="w-6 h-6" />
            </div>
            <div class="ml-3 flex flex-col w-full">
              <div class="flex justify-between w-full">
                <p class="font-semibold text-gray-600">{{ chat.name }}</p>
                <span
                  v-if="getUnreadCount(chat) > 0"
                  class="bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                >
                  {{ getUnreadCount(chat) }}
                </span>
              </div>
              <p class="text-xs text-gray-500 truncate">
                {{
                  chat.messages.length
                    ? chat.messages[chat.messages.length - 1].content
                    : ""
                }}
              </p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Chat Window -->
      <div class="flex flex-col flex-1">
        <!-- Header -->
        <div
          class="p-4 border-b flex items-center justify-between bg-white min-h-[80px] border border-e-0"
        >
          <h2 class="font-bold text-gray-600">
            {{ activeChat?.name || "Select a chat" }}
          </h2>
          <OptionIcon class="text-gray-600"></OptionIcon>
        </div>

        <!-- Messages -->
        <div
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-4 space-y-3"
        >
          <div
            v-for="msg in activeChat?.messages"
            :key="msg.id"
            class="flex"
            :class="
              msg.senderId === userStore.user.id
                ? 'justify-end'
                : 'justify-start'
            "
          >
            <div class="flex items-end max-w-[60%]">
              <!-- Other user profile on left, current user profile on right -->
              <img
                class="w-8 h-8 rounded-full mr-2"
                v-if="msg.senderId !== userStore.user.id"
                :src="API_BASE_PROFILE_URL + '/' + msg.senderProfile"
                alt="profile"
              />

              <!-- Message + time -->
              <div class="flex flex-col">
                <!-- Message content -->
                <div
                  v-if="msg.type === 'text'"
                  :class="
                    msg.senderId === userStore.user.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600'
                  "
                  class="px-4 py-2 rounded-lg shadow-md"
                >
                  {{ msg.content }}
                </div>

                <!-- File message -->
                <div
                  v-else-if="msg.type === 'file'"
                  class="flex flex-col space-y-2"
                >
                  <!-- Image -->
                  <img
                    v-if="msg.filename.match(/\.(jpg|jpeg|png|gif|webp)$/i)"
                    :src="API_BASE_FILE_MESSAGE_URL + msg.filename"
                    class="max-w-xs max-h-64 rounded-lg shadow"
                  />
                  <!-- Excel -->
                  <div
                    v-else-if="msg.filename.match(/\.(xls|xlsx)$/i)"
                    class="flex items-center space-x-1 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-md"
                  >
                    <EexcelIcon class="w-6 h-6" />
                    <a
                      :href="API_BASE_FILE_MESSAGE_URL + msg.filename"
                      target="_blank"
                      class="truncate max-w-xs hover:underline"
                      :title="msg.filename"
                    >
                      {{
                        msg.filename.length > 20
                          ? msg.filename.slice(0, 15) +
                            "..." +
                            msg.filename.split(".").pop()
                          : msg.filename
                      }}
                    </a>
                  </div>
                  <!-- Word -->
                  <div
                    v-else-if="msg.filename.match(/\.(doc|docx)$/i)"
                    class="flex items-center space-x-1 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-md"
                  >
                    <WordIcon class="w-6 h-6" />
                    <a
                      :href="API_BASE_FILE_MESSAGE_URL + msg.filename"
                      target="_blank"
                      class="truncate max-w-xs hover:underline"
                      :title="msg.filename"
                    >
                      {{
                        msg.filename.length > 20
                          ? msg.filename.slice(0, 15) +
                            "..." +
                            msg.filename.split(".").pop()
                          : msg.filename
                      }}
                    </a>
                  </div>
                  <!-- PDF -->
                  <div
                    v-else-if="msg.filename.match(/\.(pdf)$/i)"
                    class="flex items-center space-x-1 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-md"
                  >
                    <PdfIcon class="w-6 h-6" />
                    <a
                      :href="API_BASE_FILE_MESSAGE_URL + msg.filename"
                      target="_blank"
                      class="truncate max-w-xs hover:underline"
                      :title="msg.filename"
                    >
                      {{
                        msg.filename.length > 20
                          ? msg.filename.slice(0, 15) +
                            "..." +
                            msg.filename.split(".").pop()
                          : msg.filename
                      }}
                    </a>
                  </div>
                  <!-- Other -->
                  <div
                    v-else
                    class="flex items-center space-x-1 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-md"
                  >
                    <GeneraleFileIcon class="w-6 h-6" />
                    <a
                      :href="API_BASE_FILE_MESSAGE_URL + msg.filename"
                      target="_blank"
                      class="truncate max-w-xs hover:underline"
                      :title="msg.filename"
                    >
                      {{
                        msg.filename.length > 20
                          ? msg.filename.slice(0, 15) +
                            "..." +
                            msg.filename.split(".").pop()
                          : msg.filename
                      }}
                    </a>
                  </div>
                </div>

                <div
                  v-else-if="msg.type === 'audio'"
                  class="flex items-center space-x-2"
                >
                  <button
                    @click="togglePlay(msg)"
                    class="inline-flex items-center p-3 rounded-lg min-w-[100px] bg-blue-400 hover:bg-blue-600"
                  >
                    <component
                      :is="
                        !isPlaying(msg) ? 'StartAudioIcon' : 'PauseAudioIcon'
                      "
                      class="w-6 h-6 text-white"
                    />
                    <span class="ml-2 text-white text-sm">{{
                      durations[msg.id] || "0:00"
                    }}</span>
                  </button>
                  <audio
                    :src="API_BASE_URL + '/audio/' + msg.filename"
                    ref="audioElements[msg.id]"
                    @timeupdate="
                      durations[msg.id] = formatTime($event.target.currentTime)
                    "
                    @ended="playingId = null"
                  ></audio>
                </div>

                <!-- Time + Success -->
                <div
                  class="flex items-center space-x-1 text-xs text-gray-400 mt-1"
                >
                  <SuccessWhiteSolidIcon class="w-4 h-4 text-green-700" />
                  <span>{{
                    new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }}</span>
                </div>
              </div>

              <!-- Current user profile on right -->
              <img
                class="w-8 h-8 rounded-full ml-2"
                v-if="msg.senderId === userStore.user.id"
                :src="API_BASE_PROFILE_URL + '/' + userStore.user.profile"
                alt="profile"
              />
            </div>
          </div>
        </div>

        <!-- Input area -->
        <div class="p-3">
          <div
            class="relative flex items-center bg-white rounded-lg shadow-lg px-2"
          >
            <button
              @click="selectFile"
              class="p-2 text-gray-500 hover:text-gray-700"
            >
              <UploadIcon class="w-6 h-6" />
            </button>
            <input
              type="file"
              ref="fileInput"
              @change="uploadFile"
              class="hidden"
            />
            <input
              type="text"
              v-model="newMessage"
              placeholder="Type a message..."
              class="flex-1 px-3 py-3 focus:outline-none focus:ring-0 border-0"
            />
            <button
              @pointerdown="pointerDownMic"
              @pointerup="pointerUpMic"
              @pointercancel="pointerUpMic"
              class="p-2 text-gray-500 hover:text-gray-700"
            >
              <MicIcon class="w-6 h-6" />
            </button>
            <div
              v-if="isRecording"
              @click="stopRecording"
              class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            >
              <div
                class="bg-red-500 text-white px-4 py-2 rounded-full animate-pulse"
              >
                Recording... (Click to stop record)
              </div>
            </div>
            <button
              @click="sendMessage"
              class="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-1"
            >
              <SendIcon class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import UserIcon from "../icons/UserIcon.vue";
import StudentIcon from "../icons/StudentIcon.vue";
import TeacherIcon from "../icons/TeacherIcon.vue";
import EditIcon from "../icons/EditIcon.vue";
import MessageSolidWhiteIcon from "../icons/MessageSolidWhiteIcon.vue";
import OptionIcon from "../icons/OptionIcon.vue";
import MicIcon from "../icons/MicIcon.vue";
import UploadIcon from "../icons/UploadIcon.vue";
import SendIcon from "../icons/SendIcon.vue";
import SuccessWhiteSolidIcon from "../icons/SuccessWhiteSolidIcon.vue";
import PauseAudioIcon from "../icons/PauseAudioIcon.vue";
import StartAudioIcon from "../icons/StartAudioIcon.vue";
import EexcelIcon from "../icons/EexcelIcon.vue";
import WordIcon from "../icons/WordIcon.vue";
import PdfIcon from "../icons/PdfIcon.vue";
import GeneraleFileIcon from "../icons/GeneraleFileIcon.vue";

import {
  API_BASE_PROFILE_URL,
  API_BASE_URL,
  API_BASE_FILE_MESSAGE_URL,
} from "@/config/useWebSocket";

import {
  connectWebSocket,
  registerHandler,
  sendMessage,
} from "@/config/useWebSocket";

import { useUserStore } from "@/store/store";

import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();
export default {
  components: {
    UserIcon,
    StudentIcon,
    TeacherIcon,
    EditIcon,
    MessageSolidWhiteIcon,
    OptionIcon,
    MicIcon,
    UploadIcon,
    SendIcon,
    SuccessWhiteSolidIcon,
    StartAudioIcon,
    PauseAudioIcon,
    EexcelIcon,
    GeneraleFileIcon,
    WordIcon,
    PdfIcon,
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      currentUserId: this.userStore.user.id,
      API_BASE_URL,
      API_BASE_PROFILE_URL,
      API_BASE_FILE_MESSAGE_URL,

      chats: [
        {
          id: 1,
          name: "School Chat",
          icon: UserIcon,
          lastMessage: "",
          messages: [],
          unreadCount: 0,
        },
        {
          id: 2,
          name: "Teacher Chat",
          icon: TeacherIcon,
          lastMessage: "Staff meeting tomorrow.",
          messages: [],
        },
        {
          id: 3,
          name: "Student Chat",
          icon: StudentIcon,
          lastMessage: "Assignment due Friday.",
          messages: [],
        },
        {
          id: 4,
          name: "Custom Group",
          icon: EditIcon,
          lastMessage: "Lab rescheduled.",
          messages: [],
        },
        {
          id: 5,
          name: "Private Chat",
          icon: MessageSolidWhiteIcon,
          lastMessage: "Can you check my assignment?",
          messages: [],
        },
      ],
      activeChat: null,
      newMessage: "",
      selectedChat: null,

      mediaRecorder: null,
      audioChunks: [],
      isRecording: false,
      stream: null,
      holdingMic: false,

      currentAudio: null,
      playingId: null,
      durations: {},
      audioElements: {},
    };
  },
  watch: {
    // Watch messages of active chat
    "activeChat.messages": {
      handler() {
        this.$nextTick(() => {
          const container = this.$refs.messagesContainer;
          if (container) {
            container.scrollTop = container.scrollHeight; // scroll to bottom
          }
        });
      },
      deep: true,
    },
  },
  computed: {
    chatLastMessages() {
      // Return same chats, but update lastMessage dynamically from messages array
      return this.chats.map((chat) => {
        return {
          ...chat,
          lastMessage:
            chat.messages && chat.messages.length
              ? chat.messages[chat.messages.length - 1].content
              : chat.lastMessage, // fallback to original lastMessage if no messages
        };
      });
    },
  },
  methods: {
    togglePlay(msg) {
      if (this.playingId === msg.id) {
        this.currentAudio.pause();
        this.playingId = null;
        return;
      }
      if (this.currentAudio) this.currentAudio.pause();
      const audio = new Audio(this.API_BASE_URL + "/audio/" + msg.filename);
      this.currentAudio = audio;
      this.playingId = msg.id;
      audio.play();
      audio.onended = () => {
        this.playingId = null;
      };
    },
    isPlaying(msg) {
      return this.playingId === msg.id;
    },
    formatTime(seconds) {
      const m = Math.floor(seconds / 60)
        .toString()
        .padStart(1, "0");
      const s = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");
      return `${m}:${s}`;
    },
    selectChat(chat) {
      this.selectedChat = chat;
      this.activeChat = chat;
      chat.unreadCount = 0;

      if (chat.id === 5) {
        // navigate to private chat page
        this.$router.push({ name: "privateChat" });
        return; // stop further logic if needed
      }

      if (chat.id === 1) {
        axios
          .get(`${API_BASE_URL}/api/admin-chat/everyone`, {
            withCredentials: true,
          })
          .then(({ data }) => (this.activeChat.messages = data));
      } else if (chat.id === 2) {
        axios
          .get(`${API_BASE_URL}/api/admin-chat/teachers`, {
            withCredentials: true,
          })
          .then(({ data }) => (this.activeChat.messages = data));
      } else if (chat.id === 3) {
        axios.get(`${API_BASE_URL}/api/admin-chat/students`, {
          withCredentials: true,
        }).then(({ data }) => (this.activeChat.messages = data));
      }
    },
    // Simple getter for unread count
    getUnreadCount(chat) {
      return chat.unreadCount || 0;
    },
    // Send text message
    sendMessage() {
      if (!this.newMessage.trim() || !this.activeChat) return;

      const msg = {
        type: "text",
        content: this.newMessage,
        senderId: this.userStore.user.id,
        senderName: `${this.userStore.user.firstname} ${this.userStore.user.lastname}`,
        chatId: this.activeChat.id, // ✅ dynamic
        timestamp: new Date(),
      };

      sendMessage("/app/chat.send", msg);
      this.newMessage = "";
    },

    selectFile() {
      // Trigger the hidden file input
      this.$refs.fileInput.click();
    },

    // Upload file (image, pdf, word, xlsx)
    async uploadFile(event) {
      const file = event.target.files[0];
      if (!file || !this.activeChat) return;

      let formData = new FormData();
      formData.append("file", file);
      formData.append("type", "file");
      formData.append("senderId", this.userStore.user.id);
      formData.append(
        "senderName",
        `${this.userStore.user.firstname} ${this.userStore.user.lastname}`
      );
      formData.append("chatId", this.activeChat.id); // ✅ dynamic
      formData.append("timestamp", new Date().toISOString().slice(0, 19));

      try {
        await axios.post(`${API_BASE_URL}/api/admin-chat/send`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
      } catch (err) {
        toast.error("File upload failed!");
      }
    },
    startRecording() {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.audioChunks = [];
          this.isRecording = true;

          this.mediaRecorder.ondataavailable = (e) =>
            this.audioChunks.push(e.data);
          this.mediaRecorder.start();
        })
        .catch(() => toast.error("Microphone access denied!"));
    },

    stopRecording() {
      if (!this.mediaRecorder || !this.isRecording) return;

      this.mediaRecorder.onstop = async () => {
        this.isRecording = false;

        const blob = new Blob(this.audioChunks, { type: "audio/webm" });
        const file = new File([blob], "recording.webm", { type: "audio/webm" });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "audio");
        formData.append("senderId", this.userStore.user.id);
        formData.append(
          "senderName",
          `${this.userStore.user.firstname} ${this.userStore.user.lastname}`
        );
        formData.append("chatId", this.activeChat.id); // ✅ dynamic
        formData.append("timestamp", new Date().toISOString().slice(0, 19));

        try {
          await axios.post(`${API_BASE_URL}/api/admin-chat/send`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          });
        } catch (err) {
          toast.error("Audio upload failed!");
        }
      };

      this.mediaRecorder.stop();
    },
    pointerDownMic() {
      this.startRecording();
    },

    pointerUpMic() {
      this.stopRecording();
    },
    registerMessageHandler(msg) {
      // Push message to the correct chat
      const chat = this.chats.find((c) => c.id === msg.chatId);
      if (!chat) return;

      chat.messages.push(msg);

      // Update the chat's lastMessage dynamically
      chat.lastMessage = msg.content;

      // Increment unread only if it's not the current user AND the chat is not active
      if (
        msg.senderId !== this.currentUserId &&
        this.activeChat.id !== chat.id
      ) {
        chat.unreadCount = (chat.unreadCount || 0) + 1;
      }
    },
  },
  mounted() {
    // Default select "Everyone" on mount
    if (this.chats.length > 0) {
      this.selectChat(this.chats[0]);
    }
    // Subscribe to Everyone chat
    // Subscribe to messages
    registerHandler("/topic/public", this.registerMessageHandler);

    connectWebSocket();
  },
};
</script>
