<template>
  <div class="mt-12 px-4 xl:px-0 max-w-5xl mx-auto">
    <header class="flex justify-between">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Study Materials</h2>

      <!-- Add Material Button -->
      <button
        @click="showForm = !showForm"
        class="mb-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
      >
        <UploadWhiteIcon class="w-5 h-5" />
        Add New Material
      </button>
    </header>

    <!-- Add Material Form -->
    <div v-if="showForm" class="mb-8 bg-gray-100 p-4 rounded-md shadow">
      <input
        v-model="newMaterial.title"
        type="text"
        placeholder="Title"
        class="border rounded px-3 py-2 w-full mb-3"
      />
      <input type="file" @change="handleFileUpload" class="w-full mb-3" />

      <div class="flex gap-2">
        <button
          @click="addMaterial"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
        <button
          @click="resetForm"
          class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search by title..."
        class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <!-- Materials -->
    <div
      v-if="filteredMaterials.length === 0"
      class="text-center text-gray-500 py-10"
    >
      No materials found.
    </div>

    <ul class="space-y-6">
      <li
        v-for="(material, index) in filteredMaterials"
        :key="index"
        class="bg-white shadow rounded-lg p-6 flex items-center justify-between"
      >
        <div class="flex items-center gap-4">
          <img
            v-if="material.userProfile"
            :src="API_BASE_PROFILE_URL + '/' + material.userProfile"
            alt="Profile"
            class="w-12 h-12 rounded-full object-cover border"
          />
          <div>
            <p class="text-lg font-semibold text-gray-800">
              {{ material.title }}
            </p>
            <p class="text-sm text-gray-600">
              By {{ material.username }} ({{ material.role }})
            </p>
            <p class="text-sm text-gray-500">
              Uploaded:
              <span class="font-medium">{{
                formatDate(material.uploadedDate)
              }}</span>
            </p>
          </div>
        </div>

        <a
          :href="API_BASE_FILE_URL + '/' + material.fileUrl"
          target="_blank"
          download
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
        >
          Download
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  API_BASE_FILE_URL,
  API_BASE_PROFILE_URL,
  API_BASE_URL,
} from "@/config/useWebSocket";
import UploadIcon from "../icons/UploadIcon.vue";
import UploadWhiteIcon from "../icons/UploadWhiteIcon.vue";
import { useUserStore } from "@/store/store";
import { useToast } from "vue-toastification";
import axios from "axios";

const toast = useToast();
export default {
  name: "materails",
  components: { UploadIcon, UploadWhiteIcon },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      API_BASE_PROFILE_URL,
      API_BASE_FILE_URL,
      showForm: false,
      searchQuery: "",
      newMaterial: {
        title: "",
        file: null,
      },
      materials: [],
      user: {
        username: "exampleUser", // replace with real logged-in user
        role: "STUDENT", // replace dynamically
        userProfile: "default.jpg", // replace with actual profile image
      },
    };
  },
  computed: {
    filteredMaterials() {
      if (!this.searchQuery) return this.materials;
      const q = this.searchQuery.toLowerCase();
      return this.materials.filter((m) => m.title.toLowerCase().includes(q));
    },
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    handleFileUpload(e) {
      const file = e.target.files[0];
      if (!file) return;

      const allowed = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ];

      if (!allowed.includes(file.type)) {
        toast.error("Only PDF, Word, Excel, and PPT files are allowed!", {
          position: "bottom-center"
        });
        e.target.value = "";
        return;
      }

      this.newMaterial.file = file;
    },
    async addMaterial() {
      if (!this.newMaterial.title || !this.newMaterial.file) {
        toast.error("Please provide a title and upload a valid file.", {
          position: "bottom-center",
        });
        return;
      }

      const formData = new FormData();
      formData.append("title", this.newMaterial.title);
      formData.append("file", this.newMaterial.file);
      formData.append(
        "username",
        this.userStore.user.firstname + " " + this.userStore.user.lastname
      );
      formData.append("role", this.userStore.user.role);
      formData.append("userProfile", this.userStore.user.profile);

      try {
        const response = await axios.post(
          API_BASE_URL + "/api/materials/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        this.materials.push({
          title: response.data.title,
          username: response.data.username,
          role: response.data.role,
          userProfile: response.data.userProfile,
          fileUrl: response.data.fileUrl,
          uploadedDate: response.data.createdAt,
        });

        this.resetForm();
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload material. Try again.", {
          position: "bottom-center",
        });
      }
    },
    resetForm() {
      this.showForm = false;
      this.newMaterial = { title: "", file: null };
    },
  },
  async mounted() {
    try {
      const res = await axios.get(API_BASE_URL + "/api/materials");
      console.log(res.data);
      this.materials = res.data.map((m) => ({
        title: m.title,
        username: m.username,
        role: m.role,
        userProfile: m.userProfile,
        fileUrl: m.fileUrl,
        uploadedDate: m.createdAt,
      }));
    } catch (err) {
      console.error(err);
    }
  },
};
</script>
