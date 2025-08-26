<template>
  <div class="w-full mt-6 h-full">
    <div
      class="bg-white rounded-md h-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-4"
    >
      <div class="flex items-center">
        <img
          :src="API_BASE_PROFILE_URL + '/' + user.profilePicture"
          alt="userprofile"
          class="rounded-md w-24 h-24 object-cover"
        />
        <input
          v-on:change="onFileChange"
          type="file"
          class="hidden"
          ref="fileInput"
          accept="image/png, image/jpg, image/jpng, image/wapg"
        />
        <div class="flex flex-col gap-2 items-start justify-start ms-2">
          <button
            v-on:click="triggerFileInput"
            class="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md"
          >
            Upload New Photo
          </button>
          <p class="text-gray-700 text-sm font-medium text-opacity-70">
            Allowed JPG, GIF or PNG. Max size of 800K
          </p>
        </div>
      </div>
      <form class="mt-10 w-full">
        <div
          class="w-full flex md:flex-row flex-col justify-between gap-3 my-5"
        >
          <div class="w-full">
            <label for="firstname" class="text-gray-500 font-sm block mb-1"
              >First name</label
            >
            <input
              type="text"
              :value="user.firstname"
              class="px-3 py-1 w-full text-gray-600 font-sm font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-md focus:shadow-lg shadow-blue-500"
            />
          </div>
          <div class="w-full">
            <label for="firstname" class="text-gray-500 font-sm block mb-1"
              >Last name</label
            >
            <input
              type="text"
              :value="user.lastname"
              class="px-3 py-1 w-full text-gray-600 font-sm font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-md focus:shadow-lg shadow-blue-500"
            />
          </div>
        </div>
        <div
          class="w-full flex md:flex-row flex-col justify-between gap-2 my-5"
        >
          <div class="w-full">
            <label for="firstname" class="text-gray-500 font-sm block mb-1"
              >Phone number</label
            >
            <input
              type="text"
              :value="user.phone"
              class="px-3 py-1 w-full text-gray-600 font-sm font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-md focus:shadow-lg shadow-blue-500"
            />
          </div>
          <div class="w-full">
            <label for="firstname" class="text-gray-500 font-sm block mb-1"
              >E-mail</label
            >
            <input
              type="text"
              :value="user.email"
              class="px-3 py-1 w-full text-gray-600 font-sm font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-md focus:shadow-lg shadow-blue-500"
            />
          </div>
        </div>
        <div
          class="w-full flex md:flex-row flex-col justify-between gap-2 my-5"
        >
          <div class="w-full">
            <label for="firstname" class="text-gray-500 font-sm block mb-1"
              >Role</label
            >
            <input
              type="text"
              :value="user.role"
              disabled
              class="px-3 py-1 w-full text-gray-600 font-sm font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-md focus:shadow-lg shadow-blue-500"
            />
          </div>
          <div class="w-full">
            <label for="firstname" class="text-gray-500 font-sm block mb-1"
              >Gender</label
            >
            <input
              type="text"
              :value="user.gender"
              disabled
              class="px-3 py-1 w-full text-gray-600 font-sm font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-md focus:shadow-lg shadow-blue-500"
            />
          </div>
        </div>
        <div class="flex justify-start gap-3">
          <button
            class="text-white bg-blue-500 px-4 py-2 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)]shadow-md"
          >
            Save change
          </button>
          <button
            class="text-gray-600 bg-gray-600 bg-opacity-20 font-medium px-4 py-2 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL, API_BASE_PROFILE_URL } from "@/config/useWebSocket";
import axios from "axios";

export default {
  data() {
    return {
      API_BASE_PROFILE_URL,
      API_BASE_URL,
      user: {},
    };
  },
  methods: {
    async loadUserInfo() {
      try {
        const response = await axios.get(API_BASE_URL + "/api/user/info", {
          withCredentials: true,
        });

        this.user = response.data.data;
        console.log(response.data)
      } catch (e) {
        console.log(e);
      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.user.image = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
  },
  mounted() {
    this.loadUserInfo();
  },
};
</script>
