<template>
  <div class="h-full">
    <main class="flex h-full shadow-lg min-h-[700px] max-h-[800px]">
      <!-- Sidebar: Users to chat with -->
      <div class="w-1/4 bg-white shadow-md flex flex-col">
        <div
          class="p-4 font-bold text-lg border-b min-h-[80px] border border-e-0"
        >
          <input
            type="text"
            v-model="searchQuery"
            @input="handleSearch"
            placeholder="Search users..."
            class="w-full text-md font-normal px-4 py-[6px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8c09f4]"
          />
        </div>

        <ul class="flex-1 overflow-y-auto">
          <li
            v-for="user in filteredUsers"
            :key="user.id"
            class="p-3 cursor-pointer flex items-center"
            :class="{
              'bg-blue-100': selectedUser && selectedUser.id === user.id,
              'hover:bg-gray-200': !(
                selectedUser && selectedUser.id === user.id
              ),
            }"
            @click="selectUser(user)"
          >
            <img
              :src="API_BASE_PROFILE_URL + '/' + user.profile"
              class="w-10 h-10 rounded-full mr-2"
            />
            <div class="ml-2 flex-1">
              <p class="font-semibold text-gray-600">{{ user.name }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Chat Window -->
      <div class="flex flex-col flex-1">
        <div
          class="p-4 border-b flex items-center justify-between bg-white min-h-[80px] border border-e-0"
        >
          <h2 class="font-bold text-gray-600">
            {{ selectedUser?.name || "Select a user" }}
          </h2>
        </div>

        <div
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-4 space-y-3"
        >
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="flex"
            :class="
              msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'
            "
          >
            <div class="flex items-end max-w-[60%]">
              <img
                v-if="msg.senderId !== currentUser.id"
                :src="API_BASE_PROFILE_URL + '/' + msg.senderProfile"
                class="w-8 h-8 rounded-full mr-2"
              />
              <div class="flex flex-col">
                <!-- Text -->
                <div
                  v-if="msg.type === 'text'"
                  :class="
                    msg.senderId === currentUser.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600'
                  "
                  class="px-4 py-2 rounded-lg shadow-md"
                >
                  {{ msg.content }}
                </div>

                <!-- File -->
                <div
                  v-else-if="msg.type === 'file'"
                  class="flex flex-col space-y-2"
                >
                  <a
                    :href="API_BASE_FILE_MESSAGE_URL + msg.filename"
                    target="_blank"
                    class="truncate max-w-xs hover:underline"
                  >
                    {{ msg.filename }}
                  </a>
                </div>

                <!-- Audio -->
                <div
                  v-else-if="msg.type === 'audio'"
                  class="flex items-center space-x-2"
                >
                  <button
                    @click="togglePlay(msg)"
                    class="px-4 py-2 bg-blue-400 rounded-lg"
                  >
                    {{ !isPlaying(msg) ? "Play" : "Pause" }}
                  </button>
                  <audio
                    :src="API_BASE_URL + '/audio/' + msg.filename"
                    ref="audioElements[msg.id]"
                    @ended="playingId = null"
                  ></audio>
                </div>

                <!-- Timestamp -->
                <div
                  class="flex items-center space-x-1 text-xs text-gray-400 mt-1"
                >
                  <span>{{ formatTime(msg.timestamp) }}</span>
                </div>
              </div>

              <img
                v-if="msg.senderId === currentUser.id"
                :src="API_BASE_PROFILE_URL + '/' + currentUser.profile"
                class="w-8 h-8 rounded-full ml-2"
              />
            </div>
          </div>
        </div>

        <!-- Input -->
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
              class="flex-1 px-3 py-3 focus:outline-none border-0"
            />
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
export default {
  data() {
    return {
      chats: [
        {
          id: "everyone",
          name: "School Chat", // instead of "Everyone"
          icon: "GlobeIcon", // optional
          type: "group",
        },
        {
          id: "students",
          name: "Class Chat", // instead of "All Students"
          icon: "GroupIcon",
          type: "group",
        },
        {
          id: "private-chat",
          name: "Private Chat", // stays friendly
          icon: "PrivateChatIcon",
          isPrivate: true,
        },
      ],
      selectedChat: null,
      // other data...

      searchQuery: "",
      allUsers: [],
      filteredUsers: [],
      selectedUser: null,
      messages: [],
      newMessage: "",
      currentUser: {}, // fetched logged in user
      playingId: null,
    };
  },
  methods: {
    handleSearch() {
      this.filteredUsers = this.allUsers.filter((u) =>
        u.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    selectUser(user) {
      this.selectedUser = user;
      this.loadMessages(user.id);
    },
    loadMessages(userId) {
      // fetch private messages between currentUser.id and userId
    },
    sendMessage() {
      if (!this.newMessage || !this.selectedUser) return;
      const msg = {
        senderId: this.currentUser.id,
        senderProfile: this.currentUser.profile,
        content: this.newMessage,
        type: "text",
        timestamp: new Date(),
      };
      this.messages.push(msg);
      this.newMessage = "";
      this.$nextTick(
        () =>
          (this.$refs.messagesContainer.scrollTop =
            this.$refs.messagesContainer.scrollHeight)
      );
    },
    togglePlay(msg) {
      const audio = this.$refs.audioElements[msg.id];
      if (!audio) return;
      if (this.playingId === msg.id) {
        audio.pause();
        this.playingId = null;
      } else {
        if (this.playingId && this.$refs.audioElements[this.playingId]) {
          this.$refs.audioElements[this.playingId].pause();
        }
        audio.play();
        this.playingId = msg.id;
      }
    },
    isPlaying(msg) {
      return this.playingId === msg.id;
    },
    formatTime(ts) {
      return new Date(ts).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    selectFile() {
      this.$refs.fileInput.click();
    },
    uploadFile(event) {
      // handle file upload
    },
  },
  mounted() {
    // fetch currentUser and allUsers allowed by admin
  },
};
</script>
