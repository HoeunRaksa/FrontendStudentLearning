<template>
  <div class="h-full">
    <section class="bg-white shadow-lg p-2 md:p-4 lg:p-6 mt-2 rounded-md">
      <!-- Toolbar: search left, controls right -->
      <div
        class="flex flex-col md:flex-row justify-between items-center gap-4 mb-4"
      >
        <!-- Left: Search -->
        <div class="flex items-center w-full md:w-auto gap-2">
          <input
            type="text"
            v-model="searchQuery"
            @input="handleSearch"
            placeholder="Search users or roles..."
            class="w-full min-w-[150px] md:min-w-[280px] px-4 py-[6px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8c09f4]"
          />
          <SearchIcon
            class="w-[38px] h-[38px] text-white bg-[#8c09f4] shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-1 rounded-md ms-2"
          />
        </div>

        <!-- Right: Export controls -->
        <div class="flex flex-wrap items-center gap-2">
          <!-- Format group -->
          <div
            class="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1 shadow-sm"
          >
            <button
              :class="
                exportFormat === 'excel'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700'
              "
              @click="exportFormat = 'excel'"
              class="px-3 py-1 rounded-full font-medium hover:bg-green-700 hover:text-white transition"
            >
              Excel
            </button>
            <button
              :class="
                exportFormat === 'pdf'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-700'
              "
              @click="exportFormat = 'pdf'"
              class="px-3 py-1 rounded-full font-medium hover:bg-red-700 hover:text-white transition"
            >
              PDF
            </button>
          </div>

          <!-- Rows group -->
          <div
            class="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1 shadow-sm"
          >
            <span class="text-gray-600 font-medium px-2">Rows:</span>
            <button
              v-for="n in [10, 20, 50, 1000]"
              :key="n"
              :class="
                rowsToExport === n ? 'bg-blue-600 text-white' : 'text-gray-700'
              "
              @click="rowsToExport = n"
              class="px-3 py-1 rounded-full font-medium hover:bg-blue-700 hover:text-white transition"
            >
              {{ n }}
            </button>
            <button
              :class="
                rowsToExport === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700'
              "
              @click="rowsToExport = 'all'"
              class="px-3 py-1 rounded-full font-medium hover:bg-blue-700 hover:text-white transition"
            >
              All
            </button>
          </div>

          <!-- Export button -->
          <button
            @click="exportSelected"
            class="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition"
          >
            <ExportWhiteIcon class="h-5 w-5" />
            Export
          </button>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="border-b mb-4 flex space-x-4">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="selectTab(tab)"
          :class="[
            'px-4 py-2 font-medium',
            currentTab === tab
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-800',
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <!-- all ? -->
      <div class="max-h-[500px] min-h-[300px] overflow-y-auto p-2">
        <div
          v-if="filteredActions.length === 0"
          class="text-center text-gray-500 py-10"
        >
          No results found.
        </div>
        <div
          v-for="item in filteredActions"
          :key="item.id"
          class="flex flex-row justify-between items-center transition-all duration-300 hover:shadow-md cursor-pointer p-4 mb-2 bg-white rounded-lg border-b border-gray-200"
        >
          <!-- Left: User info -->
          <div class="flex items-center gap-4">
            <input
              type="checkbox"
              v-model="selectedIds"
              :value="item.id"
              class="me-2"
            />
            <!-- If profile picture exists -->
            <img
              v-if="item.profilePicture"
              class="w-10 h-10 rounded-full"
              :src="API_BASE_PROFILE_URL + '/' + item.profilePicture"
              alt="profile"
            />
            <!-- If no profile picture -->
            <div
              v-else
              class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
            >
              <span class="font-medium text-gray-600 dark:text-gray-300">
                {{ getInitials(item.firstName, item.lastName) }}
              </span>
            </div>

            <div class="font-medium text-gray-600">
              <div>{{ item.firstName }} {{ item.lastName }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ item.role }}
              </div>
            </div>
          </div>

          <!-- Middle: Description -->
          <div class="flex items-center gap-4">
            <div class="font-medium text-gray-600">
              <div>{{ formatType(item.type) }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ item.description }}
              </div>
            </div>
          </div>

          <!-- Right: Timestamp + icons -->
          <div class="flex items-center gap-4">
            <div class="font-medium text-gray-600">
              <div>{{ formatDate(item.timestamp) }}</div>
              <div
                class="text-sm text-gray-500 dark:text-gray-400 flex flex-row"
              >
                <MessageBlackIcon class="text-black h-6 w-6 me-2" />
                <ExportBlackIcon class="text-black h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import SearchIcon from "../icons/SearchIcon.vue";
import CanlenderIcon from "../icons/CanlenderIcon.vue";
import MessageBlackIcon from "../icons/MessageBlackIcon.vue";
import ExportBlackIcon from "../icons/ExportBlackIcon.vue";
import ExportWhiteIcon from "../icons/ExportWhiteIcon.vue";

import axios from "axios";
import { fetchActionMeta } from "@/services/userActionService";
import { API_BASE_PROFILE_URL } from "@/config/useWebSocket";
import { API_BASE_URL } from "@/config/useWebSocket";
import { useToast } from "vue-toastification";

const toast = useToast();
export default {
  components: {
    SearchIcon,
    CanlenderIcon,
    MessageBlackIcon,
    ExportBlackIcon,
    ExportWhiteIcon,
  },
  data() {
    return {
      API_BASE_PROFILE_URL,
      API_BASE_URL,
      tabs: ["Today", "All"],
      currentTab: "Today",

      actions: [],

      filteredActions: [],
      defaultProfile:
        "../../assets/images/85806da35744d137146ba5f57e4dcc1f.jpg",

      selectedIds: [], // <-- store selected row IDs
      exportFormat: "excel", // Excel / PDF
      rowsToExport: 10, // 10 / 20 / 50 / 1000 / all
    };
  },
  methods: {
    async exportSelected() {
      let payload = {
        all: false,
        ids: null,
        rows: null,
      };

      if (this.rowsToExport === "all") {
        payload.all = true;
      } else if (this.selectedIds.length > 0) {
        // Convert selected IDs to numbers
        payload.ids = this.selectedIds.map((id) => Number(id));
      } else if (typeof this.rowsToExport === "number") {
        payload.rows = this.rowsToExport;
      } else {
        return toast.error("No users selected for export", {
          position: "bottom-center"
        });
      }

      try {
        const response = await axios.post(
          `${this.API_BASE_URL}/api/reports/export/${this.exportFormat}`,
          payload,
          { responseType: "blob" }
        );

        console.log("Payload going to backend:", payload);

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `UserActions_${new Date()
            .toLocaleDateString("en-GB")
            .replace(/\//g, "-")}.${
            this.exportFormat === "excel" ? "xlsx" : "pdf"
          }`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Export failed", err);
      }
    },
    today() {
      const date = new Date();
      // Format as dd/mm/yyyy
      return date.toLocaleDateString("en-GB");
    },
    async fetchActionMeta() {
      const meta = await fetchActionMeta();
      this.actions = meta.actions;

      // <-- add this
      this.filterActions();

      console.table(this.actions);
    },

    filterActions() {
      let filtered = [];

      if (this.currentTab === "Today") {
        const todayStr = new Date().toLocaleDateString("en-GB");
        filtered = this.actions.filter(
          (a) => this.formatDate(a.timestamp) === todayStr
        );
      } else {
        filtered = this.actions;
      }

      // Apply search filter if searchQuery is not empty
      if (this.searchQuery && this.searchQuery.trim() !== "") {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (a) =>
            a.firstName.toLowerCase().includes(query) ||
            a.lastName.toLowerCase().includes(query) ||
            a.type.toLowerCase().includes(query) ||
            (a.description && a.description.toLowerCase().includes(query))
        );
      }

      this.filteredActions = filtered;
    },
    selectTab(tab) {
      this.currentTab = tab;
      this.filterActions();
    },

    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB"); // "dd/mm/yyyy"
    },

    formatType(type) {
      return type.charAt(0).toUpperCase() + type.slice(1).replace("_", " ");
    },
    getInitials(first, last) {
      const firstInitial = first ? first.charAt(0).toUpperCase() : "";
      const lastInitial = last ? last.charAt(0).toUpperCase() : "";
      return firstInitial + lastInitial;
    },
    handleSearch() {
      this.filterActions();
    },
  },
  mounted() {
    this.fetchActionMeta();
  },
};
</script>
